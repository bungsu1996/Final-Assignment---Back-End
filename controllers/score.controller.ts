import { NextFunction, Request, Response } from "express";
import Course from "../models/Courses";
import Score from "../models/Score";

class scoreController {
  static async createScore(req: Request, res: Response, next: NextFunction) {
    const { course, dailyScore, midtest, finaltest, resultScore } = req.body;
    try {
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Score.create({
        course: foundCourse,
        dailyScore: dailyScore,
        midtest: midtest,
        finaltest: finaltest,
        resultScore: resultScore,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createTestScore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { course, dailyScore, midtest, finaltest, score } = req.body;
    try {
      const foundScore = await Score.findById({ _id: id });
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
      next(error);
    }
  }

  static async listDailyScore(req: Request, res: Response, next: NextFunction) {
    
  }
}

export default scoreController;
