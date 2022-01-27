import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teachers";
import Courses from "../models/Courses";
import Class from "../models/Class";
import Course from "../models/Courses";
import Score from "../models/Score";
import nodemailer from "nodemailer";
import Otp from "../models/Otp";
import Student from "../models/Students";

class TeacherController {
  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    const { email, fullName, birthDate, course, teachClass } = req.body;
    try {
      const word = fullName.split(" ");
      const num = birthDate.replace(/-/g, "");
      const password = word[0].toLowerCase() + num;
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const findCourse = await Courses.findOne({ course: course });
      if (!findCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const findClass = await Class.findOne({ className: teachClass });
      if (!findClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      // let nip: string = "";
      // const getnip = await Teacher.find({}).sort({ _id: -1 }).limit(1);
      // if (getnip.length < 1) {
      //   const n = 1;
      //   nip = String(n).padStart(6, "0");
      // } else {
      //   const n = parseInt(getnip[0].nip);
      //   nip = String(n + 1).padStart(6, "0");
      // }
      const result = await Teacher.create({
        // nip: nip,
        email: email.toLowerCase(),
        password: hashedPass,
        fullName: fullName,
        birthDate: birthDate,
        course: findCourse,
        teachClass: findClass,
      });
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "studentt872@gmail.com",
          pass: "Abcd_1234",
        },
      });
      let mailOption = {
        from: "studentt872@gmail.com",
        to: result.email,
        subject: "Register Teacher School! This Your Account Student School Sukamaju.",
        text: `Email: ${result.email}, Password: ${password}`,
      };
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log("Error! Sendemail Failed!", err);
        } else {
          console.log("Sendemail Succesfull!", info.response);
        }
      });
      res.status(201).json({ Message: result });
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async findAllTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Teacher.find().populate("course teachClass");
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Teacher.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async getTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Teacher.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async updateTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { email, password, fullName, birthDate, course, teachClass } =
      req.body;
    try {
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const findCourse = await Courses.findById({ _id: course });
      if (!findCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const findClass = await Class.findById({ _id: teachClass });
      if (!findClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Teacher.findByIdAndUpdate(
        id,
        {
          email: email.toLowerCase(),
          password: hashedPass,
          fullName: fullName,
          birthData: birthDate,
          course: findCourse,
          teachClass: findClass,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Teacher.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async addSpesificCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { course } = req.body;
    try {
      const foundTeacher = await Teacher.findById(id);
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Teacher.findByIdAndUpdate(foundTeacher, {
        $push: { course: foundCourse },
      }).populate("course");
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async updateSpesificCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { course } = req.body;
    try {
      const foundTeacher = await Teacher.findById(id);
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Teacher.findByIdAndUpdate(
        foundTeacher,
        {
          course: course,
        },
        { new: true }
      ).populate("course");
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async searchManageScore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { academicYear, semester, classes } = req.query;
    try {
      const result = await Class.find({
        className: classes,
        yearAcademic: academicYear,
        semester: semester,
      }).populate({
        path: "student",
        select: "fullName score",
        populate: {
          path: "score",
          select: "course dailyScore midtest finaltest resultScore",
          populate: { path: "course" },
        },
      });
      if (result.length === 0) {
        throw { name: "NOT_FOUND_SEARCH" };
      }
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async getScoreSpecific(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const result = await Score.findOne({ id }).populate("course");
      if (!result) {
        throw { name: "NOT_FOUND_SEARCH" };
      }
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async setDailyScore(req: Request, res: Response, next: NextFunction) {
    const { score } = req.params;
    const { course, dailyScore } = req.body;
    try {
      if (dailyScore <= 0 && dailyScore > 100) {
        throw { name: "RANGE_TEST_SCORE" };
      }
      const foundScoreStudent = await Score.findById(score);
      if (!foundScoreStudent) {
        throw { name: "NOT_FOUND_SCORE" };
      }
      const foundCourse = await Course.findById(course);
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Score.findByIdAndUpdate(
        foundScoreStudent,
        {
          dailyScore: dailyScore,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async setMidScore(req: Request, res: Response, next: NextFunction) {
    const { score } = req.params;
    const { course, midscore } = req.body;
    try {
      if (midscore <= 0 && midscore > 100) {
        throw { name: "RANGE_TEST_SCORE" };
      }
      const foundScoreStudent = await Score.findById(score);
      if (!foundScoreStudent) {
        throw { name: "NOT_FOUND_SCORE" };
      }
      const foundCourse = await Course.findById(course);
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Score.findByIdAndUpdate(
        foundScoreStudent,
        {
          midtest: midscore,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async setFinalScore(req: Request, res: Response, next: NextFunction) {
    const { score } = req.params;
    const { course, finalscore } = req.body;
    try {
      if (finalscore <= 0 && finalscore > 100) {
        throw { name: "RANGE_TEST_SCORE" };
      }
      const foundScoreStudent = await Score.findById(score);
      if (!foundScoreStudent) {
        throw { name: "NOT_FOUND_SCORE" };
      }
      const foundCourse = await Course.findById(course);
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Score.findByIdAndUpdate(
        foundScoreStudent,
        {
          finaltest: finalscore,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async updateScore(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { nama, value } = req.body;
    try {
      if (nama === "dailyScore") {
        const updateScore = await Score.findByIdAndUpdate(
          id,
          {
            dailyScore: value,
          },
          { new: true }
        ).populate("course");
        const resultScore =
          (updateScore.dailyScore +
            updateScore.midtest +
            updateScore.finaltest) /
          3;
        const result = await Score.findByIdAndUpdate(
          id,
          {
            resultScore,
          },
          {
            new: true,
          }
        ).populate("course");
        res.status(200).json(result);
      } else if (nama === "midtest") {
        const updateScore = await Score.findByIdAndUpdate(
          id,
          {
            midtest: value,
          },
          { new: true }
        ).populate("course");
        const resultScore =
          (updateScore.dailyScore +
            updateScore.midtest +
            updateScore.finaltest) /
          3;
        const result = await Score.findByIdAndUpdate(
          id,
          {
            resultScore,
          },
          {
            new: true,
          }
        ).populate("course");
        res.status(200).json(result);
      } else if (nama === "finaltest") {
        const updateScore = await Score.findByIdAndUpdate(
          id,
          {
            finaltest: value,
          },
          { new: true }
        ).populate("course");
        const resultScore =
          (updateScore.dailyScore +
            updateScore.midtest +
            updateScore.finaltest) /
          3;
        const result = await Score.findByIdAndUpdate(
          id,
          {
            resultScore,
          },
          {
            new: true,
          }
        ).populate("course");
        res.status(200).json(result);
      } else {
        throw { name: "Name Score not found" };
      }
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async findStudentScore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const result = await Score.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async forgotPasswordTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    try {
      const foundTeacher = await Teacher.findOne({ email: email });
      const response: any = {};
      if (foundTeacher) {
        const otpCode = Math.floor(Math.random() * 10000 + 1);
        const otpData = new Otp({
          email: email.toLowerCase(),
          code: otpCode,
          expireIn: new Date().getTime() + 300 * 1000,
        });
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "studentt872@gmail.com",
            pass: "Abcd_1234",
          },
        });
        let mailOption = {
          from: "studentt872@gmail.com",
          to: foundTeacher.email,
          subject: "Forgot Password. This Code OTP For Verification Account",
          text: `Code OTP: ${otpCode}`,
        };
        transporter.sendMail(mailOption, function (err, info) {
          if (err) {
            console.log("Error! Sendemail Failed!", err);
          } else {
            console.log("Sendemail Succesfull!", info.response);
          }
        });
        await otpData.save();
        response.statusText = "succes";
        response.message = "Please check your email id";
      } else {
        response.statusText = "error";
        response.message = "Email id teacher does not exists";
      }
      res.status(200).json(response);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async changePasswordTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, code, password } = req.body;
    try {
      const response: any = {};
      const foundOtp: any = await Otp.find({ email: email, code: code });
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      if (foundOtp) {
        let currentTime = new Date().getTime();
        let diff = foundOtp.expireIn - currentTime;
        if (diff) {
          response.message = "Token Expire";
          response.statusText = "error";
        } else {
          const foundTeacher = await Teacher.findOneAndUpdate(
            { email: email },
            {
              password: hashedPass,
            },
            { new: true }
          );
          response.message = `Change password succesfull. New Password: ${foundTeacher}`;
          response.statusText = "success";
        }
      } else {
        response.message = "Invalid Otp";
        response.statusText = "error";
      }
      res.status(200).json(response);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async getClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    console.log(id)
    try {
      const result = await Class.findById(id).populate("student")
      res.status(200).json(result)
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default TeacherController;
