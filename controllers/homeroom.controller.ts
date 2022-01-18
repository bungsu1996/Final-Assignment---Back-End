import { NextFunction, Request, Response } from "express";
import Teacher from "../models/Teachers";

class homeroomController {
  static async seeScoreByClass(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      if (!id) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Teacher.find()
        .select("teachClass")
        .populate({
          path: "teachClass",
          populate: {
            path: "student",
            model: "student",
            populate: { path: "score", model: "score" },
          },
        });
        res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }
}

export default homeroomController;
