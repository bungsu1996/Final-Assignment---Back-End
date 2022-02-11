import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teachers";
import Courses from "../models/Courses";
import Class from "../models/Class";
import Course from "../models/Courses";
import Score from "../models/Score";
import nodemailer from "nodemailer";
import Student from "../models/Students";
import dotenv from 'dotenv'
dotenv.config();

class TeacherController {
  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    const { emailSend, fullName, birthDate, course, teachClass } = req.body;
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
      const schoolEmail = "@sdsukamaju.co.id";
      const setEmail = word[0].toLowerCase() + "." + num + schoolEmail;
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
        email: setEmail,
        emailSend: emailSend,
        password: hashedPass,
        fullName: fullName,
        birthDate: birthDate,
        course: findCourse,
        teachClass: findClass,
      });
      await Course.findByIdAndUpdate(findCourse, {
        $set: { teacher: result._id },
      });
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAILER_USER_EMAIL,
          pass: process.env.MAILER_USER_PASSWORD,
        },
      });
      let mailOption = {
        from: process.env.MAILER_USER_EMAIL,
        to: result.emailSend,
        subject:
          "Account Teacher School For Access Teacher Data School Sdn Sukamaju",
        html: `<p>Welcome to ${fullName} in Teacher Teams Sdn Sukamaju<br />Please use this account for login to School Sdn Sukamaju :<br /><b>Email:</b> ${result.email}<br /><b>Password:</b> ${password}</p><br /><b>Dont Tell To Another This Account! Private Account Teacher</b><br />`,
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
      const foundTeacher = await Teacher.findById(id);
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Teacher.findById(foundTeacher).populate(
        "course teachClass"
      );
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
    const { fullName, birthDate, course, teachClass } = req.body;
    try {
      const findCourse = await Courses.findOne({ course: course });
      if (!findCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const findClass = await Class.findOne({ nameClass: teachClass });
      if (!findClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Teacher.findByIdAndUpdate(
        id,
        {
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

  static async manageAllScore(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { dailyScore, midtest, finaltest } = req.body;
    try {
      const update: any = await Score.findByIdAndUpdate(
        id,
        {
          dailyScore: dailyScore,
          midtest: midtest,
          finaltest: finaltest,
        },
        { new: true }
      );
      const reScore = update.dailyScore + update.midtest + update.finaltest / 3;
      const result = await Score.findByIdAndUpdate(
        id,
        {
          resultScore: reScore,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async spesificScore(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await Score.findById(id).populate("course");
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

  static async getClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await Class.findById(id).populate({
        path: "student",
        populate: { path: "grade" },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async getGrade(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findById(foundStudent)
        .populate("grade")
        .populate({ path: "score", populate: { path: "course" } });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default TeacherController;
