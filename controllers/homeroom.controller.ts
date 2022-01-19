import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Homeroom from "../models/Homeroom";
import Teacher from "../models/Teachers";

class homeroomController {
  static async setHomeroom(req: Request, res: Response, next: NextFunction) {
    const { classes } = req.params;
    const { homeroom } = req.body;
    try {
      const foundClass = await Class.findById(classes);
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const foundHomeroom = await Teacher.findById(homeroom);
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const createHomeroom = await Homeroom.create({});
      await Class.findByIdAndUpdate(foundClass, {
        homeTeacher: foundHomeroom,
      });
      const result = await Homeroom.findByIdAndUpdate(
        createHomeroom.id,
        {
          homeroomName: foundHomeroom.id,
          className: foundClass.id,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async seeHomeroom(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Homeroom.find()
        .select("className homeroomName")
        .populate({ path: "className", select: "className semester" })
        .populate({ path: "homeroomName", select: "fullName" });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async scoreByClassHomeroom(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { homeroom } = req.params;
    try {
      const foundHomeroom = await Homeroom.findById(homeroom);
      if (!foundHomeroom) {
        throw { name: "NOT_FOUND_HOMEROOM" };
      }
      const result = await Homeroom.findById(foundHomeroom)
        .select("className homeroomName")
        .populate({
          path: "className",
          select: "className student",
          populate: {
            path: "student",
            select: "fullName score",
            populate: {
              path: "score",
              select: "course dailyScore midtest finaltest resultScore",
              populate: { path: "course", model: "course" },
            },
          },
        })
        .populate({ path: "homeroomName", model: "teacher" });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async seeScoreByClass(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { classname } = req.body;
    try {
      if (!classname) {
        throw { name: "NOT_FOUND_CLASSS" };
      }
      const result = await Class.find({ className: classname })
        .select("className student")
        .populate({
          path: "className",
          select: "className student semester",
        })
        .populate({
          path: "student",
          select: "fullName score",
          populate: {
            path: "score",
            select: "course dailyScore midtest finaltest resultScore",
            populate: { path: "course" },
          },
        });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default homeroomController;
