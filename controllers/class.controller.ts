import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Schedule from "../models/Schedule";
import Student from "../models/Students";
import Teacher from "../models/Teachers";

class ClassConttroller {
  static async createClass(req: Request, res: Response, next: NextFunction) {
    const { className, yearAcademic, homeTeacher } = req.body;
    try {
      const foundHomeroom = await Teacher.findById(homeTeacher);
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const result = await Class.create({
        className: className,
        yearAcademic: yearAcademic,
        homeTeacher: foundHomeroom,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async scorebyClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundClass = await Class.findById(id);
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Class.findById(foundClass)
        .select("student")
        .populate({ path: "student", select: "fullName score" });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async classFilterByYear(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { yearAcademic } = req.body;
    try {
      const foundYearAcademic = await Class.findOne({
        yearAcademic: yearAcademic,
      });
      if (!foundYearAcademic) {
        throw { name: "NOT_FOUND_YEAR" };
      }
      res.status(200).json(foundYearAcademic);
    } catch (error) {
      next(error);
    }
  }

  static async findAllClass(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Class.find()
        .populate({ path: "homeTeacher", select: "fullName" })
        .populate({ path: "student", select: "fullName" })
        .populate({
          path: "schedule",
          select: "hari course startTeach endTeach",
        });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundClass = await Class.findById(id);
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Class.findById(foundClass);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { className, yearAcademic, homeTeacher, schedule } =
      req.body;
    try {
      const foundClass = await Class.findById(id);
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const foundhomeTeacher = await Teacher.findById({
        _id: homeTeacher,
      });
      if (!foundhomeTeacher) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const foundSchedule = await Schedule.findById({ _id: schedule });
      if (!foundSchedule) {
        throw { name: "NOT_FOUND_SCHEDULE" };
      }
      const result = await Class.findByIdAndUpdate(foundClass,
        {
          className: className,
          yearAcademic: yearAcademic,
          homeTeacher: foundhomeTeacher,
          schedule: foundSchedule,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundClass = await Class.findById({ _id: id });
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Class.findByIdAndDelete(foundClass);
      res.status(200).json(result);
    } catch (error) {}
  }
}

export default ClassConttroller;
