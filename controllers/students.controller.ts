import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Class from "../models/Class";
import Student from "../models/Students";
import Score from "../models/Score";
import nodemailer from "nodemailer";
import Otp from "../models/Otp";

class StudentController {
  static async createStudent(req: Request, res: Response, next: NextFunction) {
    const { email, fullName, birthDate, classes } = req.body;
    try {
      const word = fullName.split(" ");
      const num = birthDate.replace(/-/g, "");
      const password = word[0].toLowerCase() + num;
      const findClass = await Class.findById({ _id: classes });
      if (!findClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      let nis: string = "";
      const getNis = await Student.find({}).sort({ _id: -1 }).limit(1);
      if (getNis.length < 1) {
        const n = 1;
        nis = String(n).padStart(6, "0");
      } else {
        const n = parseInt(getNis[0].nis);
        nis = String(n + 1).padStart(6, "0");
      }
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const result = await Student.create({
        email: email.toLowerCase(),
        password: hashedPass,
        fullName: fullName,
        birthDate: birthDate,
        classes: findClass,
        nis: nis,
      });
      await Class.findByIdAndUpdate(findClass, {
        $push: { student: result._id },
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
        subject: "Register Student School! This Your Account Student School Sukamaju.",
        text: `Email: ${result.email}, Password: ${password}`,
      };
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log("Error! Sendemail Failed!", err);
        } else {
          console.log("Sendemail Succesfull!", info.response);
        }
      });
      res.status(201).json({ result });
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async findAllStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Student.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findStudent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findById(foundStudent);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateStudent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { email, password, fullName, birthDate, classes, score } = req.body;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const findClass = await Class.findById({ _id: classes });
      if (!findClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const findScore = await Score.findById({ _id: score });
      if (!findScore) {
        throw { name: "NOT_FOUND_SCORE" };
      }
      const result = await Student.findByIdAndUpdate(
        foundStudent,
        {
          email: email.toLowerCase(),
          password: hashedPass,
          fullName: fullName,
          birthData: birthDate,
          classes: findClass,
          score: score,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async changeStatusStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id, status } = req.body;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findByIdAndUpdate(
        foundStudent,
        {
          status: status,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async deleteStudent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findByIdAndDelete(foundStudent);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async forgotPasswordStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    try {
      const foundStudent = await Student.findOne({ email: email });
      const response: any = {};
      if (foundStudent) {
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
          to: foundStudent.email,
          subject:
            "Forgot Password. This Code OTP For Verification Account",
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
        response.message = "Email id student does not exists";
      }
      res.status(200).json(response);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async changePasswordStudent(
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
          const foundStudent = await Student.findOneAndUpdate(
            { email: email },
            {
              password: hashedPass,
            },
            { new: true }
          );
          response.message = `Change password succesfull. New Password: ${foundStudent}`;
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

  static async seeScore(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findById(foundStudent)
        .select("score")
        .populate({
          path: "score",
          select: "course dailyScore midtest finaltest resultScore",
          populate: { path: "course" },
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default StudentController;
