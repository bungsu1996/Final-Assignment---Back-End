import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Homeroom from "../models/Homeroom";
import Student from "../models/Students";
import Teacher from "../models/Teachers";

class homeroomController {
  static async setHomeroom(req: Request, res: Response, next: NextFunction) {
    const { homeroomName, className } = req.body;
    try {
      const foundHomeroom = await Teacher.findOne({ fullName: homeroomName });
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const foundClass = await Class.findOne({ className: className });
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Homeroom.create({
        homeroomName: foundHomeroom._id,
        className: foundClass._id,
      });
      await Teacher.findByIdAndUpdate(foundHomeroom, {
        $set: { homeClass: result._id },
      });
      await Class.findByIdAndUpdate(foundClass, {
        $set: { homeTeacher: result._id },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async changeHomeroom(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { homeroomName, classBefore, classAfter } = req.body;
    try {
      const foundHomeroom = await Homeroom.findById(id);
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const foundTeacher = await Teacher.findOne({ fullName: homeroomName });
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const findClassBefore = await Class.findOne({ className: classBefore });
      if (!findClassBefore) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const findClassAfter = await Class.findOne({ className: classAfter });
      if (!findClassAfter) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Homeroom.findByIdAndUpdate(
        foundHomeroom,
        {
          className: findClassAfter._id,
        },
        { new: true }
      );
      await Teacher.findByIdAndUpdate(foundTeacher, {
        $unset: { homeClass: "" },
      });
      await Class.findByIdAndUpdate(findClassBefore, {
        $unset: { homeTeacher: "" },
      });
      await Teacher.findByIdAndUpdate(foundTeacher, {
        $set: { homeClass: findClassAfter },
      });
      await Class.findByIdAndUpdate(findClassAfter, {
        $set: { homeTeacher: foundHomeroom },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async seeHomeroom(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Homeroom.find()
        .populate({ path: "homeroomName", select: "email fullName" })
        .populate({
          path: "className",
          populate: {
            path: "student",
            select: "email fullName score status",
            populate: { path: "score", populate: { path: "course" } },
          },
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async findHomeroom(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundHomeroom = await Homeroom.findById(id);
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const result = await Homeroom.findById(foundHomeroom)
        .populate({ path: "homeroomName", select: "email fullName" })
        .populate({
          path: "className",
          populate: {
            path: "student",
            select: "email fullName score status",
            populate: { path: "score", populate: { path: "course" } },
          },
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async scoreByClassHomeroom(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findById(foundStudent).populate({
        path: "score",
        populate: { path: "course" },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
}

export default homeroomController;
