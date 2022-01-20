import { Response, Request, NextFunction } from "express";
import Course from "../models/Courses";

class coursesController {
  static async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { course } = req.body;
      const result = await Course.create({
        course: course,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findAllCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Course.find();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Course.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default coursesController;
