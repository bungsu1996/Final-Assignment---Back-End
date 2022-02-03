import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Grade from "../models/Grade";
import Student from "../models/Students";

class GradeController {
  static async createGrade(req: Request, res: Response, next: NextFunction) {
    const { grade } = req.body;
    try {
      const result = await Grade.create({
        grade: grade,
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async setGradeStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { grade, student } = req.body;
    try {
      const foundGrade = await Grade.findOne({ grade: grade });
      if (!foundGrade) {
        throw { name: "NOT_FOUND" };
      }
      const foundStudent = await Student.findOne({ fullName: student });
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findByIdAndUpdate(
        foundStudent,
        {
          $set: { grade: foundGrade._id },
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async getGradeStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { className } = req.body;
    try {
      const result = await Class.find({ className: className })
        .select("className student")
        .populate({
          path: "student",
          select: "fullName email status grade",
          populate: {
            path: "grade",
          },
        });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async findAllGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Grade.find();
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  // .populate({
  //   path: "student",
  //   select: "fullName status score grade",
  //   populate: {
  //     path: "score", select: "course dailyScore midtest finaltest resultScore",
  //     populate: { path: "course" },
  //   },
  // });
}

export default GradeController;
