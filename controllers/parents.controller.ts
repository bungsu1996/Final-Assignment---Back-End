import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Class from "../models/Class";
import Parent from "../models/Parents";
import Student from "../models/Students";
import nodemailer from "nodemailer";
import Otp from "../models/Otp";

class ParentController {
  static async createParent(req: Request, res: Response, next: NextFunction) {
    const { emailSend, father, mother, birthDate, student } = req.body;
    try {
      const word = father.split(" ");
      const num = birthDate.replace(/-/g, "");
      const password = word[0].toLowerCase() + num;
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const findStudent = await Student.findOne({ fullName: student });
      if (!findStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const schoolEmail = "@sdsukamaju.co.id";
      const setEmail = word[0].toLowerCase() + "." + num + schoolEmail;
      const result = await Parent.create({
        email: setEmail,
        emailSend: emailSend,
        password: hashedPass,
        father: father,
        mother: mother,
        birthDate: birthDate,
        student: findStudent,
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
        to: result.emailSend,
        subject:
          "Account Parent School For Access Parent Data School Sdn Sukamaju",
        html: `<p>Welcome to ${father} in School Sdn Sukamaju<br />Please use this account for login to School Sdn Sukamaju :<br /><b>Email:</b> ${result.email}<br /><b>Password:</b> ${password}<br /><b>Student:</b> ${student}</p><br /><b>Dont Tell To Another This Account! Private Account Student</b><br />`,
      };
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log("Error! Sendemail Failed!", err);
        } else {
          console.log("Sendemail Succesfull!", info.response);
        }
      });
      await Student.findByIdAndUpdate(findStudent, {
        $push: { parent: result._id },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findAllParent(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Parent.find().populate("student");
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findParent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findById(foundParent).populate("student");
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateParent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { father, mother, birthDate, student } = req.body;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const findStudent = await Student.findOne({ fullName: student });
      if (!findStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      console.log(findStudent)
      const result = await Parent.findByIdAndUpdate(
        foundParent,
        {
          father: father,
          mother: mother,
          birthData: birthDate,
        },
        { $push: { student: findStudent.id }, new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async deleteParent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findByIdAndDelete(foundParent);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async changeStatusParent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id, status } = req.body;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findByIdAndUpdate(
        foundParent,
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

  static async forgotPasswordParent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    try {
      const foundParent = await Parent.findOne({ email: email });
      const response: any = {};
      if (foundParent) {
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
          to: foundParent.email,
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
        response.message = "Email id parent does not exists";
      }
      res.status(200).json(response);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async changePasswordParent(
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
          const foundParent = await Parent.findOneAndUpdate(
            { email: email },
            {
              password: hashedPass,
            },
            { new: true }
          );
          response.message = `Change password succesfull. New Password: ${foundParent}`;
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

  static async seeScoreStudentParent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findById(foundParent)
        .select("student")
        .populate({
          path: "student",
          select: "fullName score",
          populate: {
            path: "score",
            select: "course dailyScore midtest finaltest resultScore",
            populate: { path: "course" },
          },
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default ParentController;
