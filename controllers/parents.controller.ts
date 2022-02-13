import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Parent from "../models/Parents";
import Student from "../models/Students";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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
          user: process.env.MAILER_USER_EMAIL,
          pass: process.env.MAILER_USER_PASSWORD,
        },
      });
      let mailOption = {
        from: process.env.MAILER_USER_EMAIL,
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
      const result = await Parent.findById(foundParent).populate({
        path: "student",
        populate: { path: "classes" },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
  static async findParentStudent(
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
          populate: [
            {
              path: "classes",
              model: "class",
            },
            { path: "score", model: "score", populate: { path: "course" } },
            { path: "grade" },
          ],
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateParent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { father, mother, birthDate, addStudent } = req.body;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const findStudent = await Student.findOne({ fullName: addStudent });
      if (!findStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Parent.findByIdAndUpdate(
        foundParent,
        {
          father: father,
          mother: mother,
          birthData: birthDate,
        },
        { new: true }
      );
      await Parent.findByIdAndUpdate(foundParent, {
        $push: { student: findStudent._id },
      });
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

  static async toActive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { toActive } = req.body;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findByIdAndUpdate(
        foundParent,
        {
          status: toActive,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async toDeadActive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { toDeadActive } = req.body;
    try {
      const foundParent = await Parent.findById(id);
      if (!foundParent) {
        throw { name: "NOT_FOUND_PARENT" };
      }
      const result = await Parent.findByIdAndUpdate(
        foundParent,
        {
          status: toDeadActive,
        },
        { new: true }
      );
      res.status(200).json(result);
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
