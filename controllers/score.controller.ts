import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Course from "../models/Courses";
import Score from "../models/Score";
import Student from "../models/Students";

class scoreController {
  static async createScore(req: Request, res: Response, next: NextFunction) {
    const { student, course } = req.body;
    try {
      const foundStudent = await Student.findOne({ fullName: student });
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const foundCourse = await Course.findOne({ course: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Score.create({
        course: foundCourse,
      });
      await Student.findByIdAndUpdate(foundStudent, {
        $push: { score: result._id },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async createTestScore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { scores, course, dailyScore, midtest, finaltest, score } = req.body;
    try {
      const foundScore = await Score.findById({ _id: scores });
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      if (score === "Daily Tests") {
        const resultDaily = await Score.findByIdAndUpdate(
          foundScore,
          {
            dailyScore: dailyScore,
          },
          { new: true }
        );
        res.status(200).json(resultDaily);
      } else if (score === "Middterm tests") {
        const resultMidtest = await Score.findByIdAndUpdate(
          foundScore,
          {
            midtest: midtest,
          },
          { new: true }
        );
        res.status(200).json(resultMidtest);
      } else if (score === "Final Tests") {
        const resultFinalTest = await Score.findByIdAndUpdate(
          foundScore,
          {
            finaltest: finaltest,
          },
          { new: true }
        );
        res.status(200).json(resultFinalTest);
      }
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async studentScore(req: Request, res: Response, next: NextFunction) {
    const { className } = req.body;
    try {
      const result = await Class.find({ className: className }).populate({
        path: "student",
        select: "fullName status score",
        populate: {
          path: "score",
          select: "course dailyScore midtest finaltest resultScore",
          populate: { path: "course" },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async spesificScore(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundStudent = await Student.findById(id);
      if (!foundStudent) {
        throw { name: "NOT_FOUND_STUDENT" };
      }
      const result = await Student.findById(foundStudent)
        .select("fullName email score")
        .populate({ path: "score", populate: { path: "course" } });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
}

export default scoreController;
