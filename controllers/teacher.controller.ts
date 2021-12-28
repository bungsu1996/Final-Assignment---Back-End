import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teachers";
import Courses from "../models/Courses";
import Class from "../models/Class";

class TeacherController {
  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    const { email, password, fullname, birthDate, course, teachClass } =
      req.body;
    const hashPass = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, hashPass);
    const findCourse = await Courses.findById({ _id: course });
    const findClass = await Class.findById({ _id: teachClass });
    try {
      const result = await Teacher.create({
        email: email.toLowerCase(),
        password: hashedPass,
        fullname: fullname,
        birthDate: birthDate,
        course: findCourse,
        teachClass: findClass,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findAllTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Teacher.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      const result = await Teacher.findById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateTeacher(req: Request, res: Response, next: NextFunction) {
    const { id, email, password, fullname, birthDate, course, teachClass } =
      req.body;
    const hashPass = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, hashPass);
    const findCourse = await Courses.findById({ _id: course });
    const findClass = await Class.findById({ _id: teachClass });
    try {
      const result = await Teacher.findByIdAndUpdate(
        id,
        {
          email: email.toLowerCase(),
          password: hashedPass,
          fullname: fullname,
          birthData: birthDate,
          course: findCourse,
          teachClass: findClass,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      const result = await Teacher.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default TeacherController;
