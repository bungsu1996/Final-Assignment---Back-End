import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import HeadMaster from "../models/HeadMasters";
import Teacher from "../models/Teachers";
import Student from "../models/Students";
import Parent from "../models/Parents";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Otp from "../models/Otp";

class users {
  static async register(req: Request, res: Response) {
    const {
      email,
      password,
      role,
      fullName,
      birthDate,
      course,
      classes,
      child,
      father,
      mother,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (role === "Headmaster") {
      const result = await HeadMaster.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        birthDate: new Date(birthDate),
      });
      res.status(200).json({ result });
    } else if (role === "Teacher") {
      const result = await Teacher.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        birthDate: new Date(birthDate),
        course,
      });
      res.status(200).json({ result });
    } else if (role === "Student") {
      const result = await Student.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        birthDate: new Date(birthDate),
        class: classes,
      });
      res.status(200).json({ result });
    } else if (role === "Parent") {
      const result = await Parent.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        father,
        mother,
        birthDate: new Date(birthDate),
        child,
      });
      res.status(200).json({ result });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password, role } = req.body;
    if (role === "Headmaster") {
      const result = await HeadMaster.findOne({
        email: email.toLowerCase(),
      });
      if (!result) {
        res.status(404).json({ message: "Account not found" });
      }
      const checkPass = bcrypt.compareSync(password, result!.password);
      if (!checkPass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      const token = jwt.sign(
        {
          id: result!.id,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          birthDate: result!.birthDate,
        },
        "this is a secret key token",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({
        token: token,
        user: {
          id: result!.id,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          birthDate: result!.birthDate,
        },
      });
    } else if (role === "Teacher") {
      const result = await Teacher.findOne({
        email: email.toLowerCase(),
      }).populate("teachClass course homeClass");
      if (!result) {
        res.status(404).json({ message: "Account not found" });
      }
      const checkPass = bcrypt.compareSync(password, result!.password);
      if (!checkPass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      const token = jwt.sign(
        {
          id: result!.id,
          nip: result!.nip,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          teachClass: result!.teachClass,
          birthDate: result!.birthDate,
          course: result!.course,
          homeClass: result!.homeClass,
        },
        "this is a secret key token",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({
        token: token,
        user: {
          id: result!.id,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          teachClass: result!.teachClass,
          birthDate: result!.birthDate,
          course: result!.course,
          homeClass: result!.homeClass,
        },
      });
    } else if (role === "Student") {
      const result = await Student.findOne({
        email: email.toLowerCase(),
      });
      if (!result) {
        res.status(404).json({ message: "Account not found" });
      }
      const checkPass = bcrypt.compareSync(password, result!.password);
      if (!checkPass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      const token = jwt.sign(
        {
          id: result!.id,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          birthDate: result!.birthDate,
          status: result!.status,
          classes: result!.classes,
          parent: result!.parent,
          score: result!.score,
          grade: result!.grade,
          schedule: result!.schedule,
        },
        "this is a secret key token",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({
        token: token,
        user: {
          id: result!.id,
          email: result!.email,
          fullName: result!.fullName,
          role: result!.role,
          birthDate: result!.birthDate,
          status: result!.status,
          classes: result!.classes,
          parent: result!.parent,
          score: result!.score,
          grade: result!.grade,
          schedule: result!.schedule,
        },
      });
    } else if (role === "Parent") {
      const result = await Parent.findOne({
        email: email.toLowerCase(),
      });
      if (!result) {
        res.status(404).json({ message: "Account not found" });
      }
      const checkPass = bcrypt.compareSync(password, result!.password);
      if (!checkPass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      const token = jwt.sign(
        {
          id: result!.id,
          email: result!.email,
          father: result!.father,
          mother: result!.mother,
          role: result!.role,
        },
        "this is a secret key token",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({
        token: token,
        user: {
          id: result!.id,
          email: result!.email,
          father: result!.father,
          mother: result!.mother,
          role: result!.role,
        },
      });
    }
  }

  static async userForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role, email } = req.body;
    try {
      if (role === "Teacher") {
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
            html: "<p>Click This Link to Change Password<p> <br/ > <a>http://localhost:4200/changePassword</a>",
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
          response.message = "Please check your email Teacher id";
        } else {
          response.statusText = "error";
          response.message = "Email id teacher does not exists";
        }
        res.status(200).json(response);
      } else if (role === "Student") {
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
          response.message = "Please check your email Student id";
        } else {
          response.statusText = "error";
          response.message = "Email id student does not exists";
        }
        res.status(200).json(response);
      } else if (role === "Parent") {
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
          response.message = "Please check your email Parent id";
        } else {
          response.statusText = "error";
          response.message = "Email id parent does not exists";
        }
        res.status(200).json(response);
      }
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async userChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role, email, code, password } = req.body;
    try {
      if (role === "Teacher") {
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
      } else if (role === "Student") {
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
      } else if (role === "Parent") {
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
      }
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default users;
