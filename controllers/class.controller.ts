import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
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
    const { idClass } = req.params;
    try {
      const foundClass = await Class.findById(idClass);
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Class.findById(foundClass)
        .select("student")
        .populate({ path: "student", select: "score" });
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
      if (!yearAcademic) {
        throw { name: "NOT_FOUND_YEAR" };
      }
      const result = await Class.findOne({ yearAcademic: yearAcademic });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ClassConttroller;
