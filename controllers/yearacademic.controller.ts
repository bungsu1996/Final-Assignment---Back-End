import { NextFunction, Request, Response } from "express";
import Student from "../models/Students";
import YearAcademic from "../models/YearAcademic";

class yearAcademicController {
  static async createYearAcadmeic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { yearAcademic } = req.body;
    try {
      const result = await YearAcademic.create({
        yearAcademic: yearAcademic,
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findAllYearAcademic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await YearAcademic.find();
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async studentByYear(req: Request, res: Response, next: NextFunction) {
    const { yearAcademic } = req.body;
    try {
      if (!yearAcademic) {
        throw { name: "NOT_FOUND" };
      }
      const result = await Student.find({ yearAcademic: yearAcademic });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default yearAcademicController;
