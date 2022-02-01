import { Response, Request, NextFunction } from "express";
import Class from "../models/Class";
import Course from "../models/Courses";
import Teacher from "../models/Teachers";

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
      const result = await Course.find().populate("teacher");
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
      const result = await Course.findById(id).populate("teacher");
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { course } = req.body;
    try {
      const foundCourse = await Course.findById(id);
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Course.findByIdAndUpdate(
        foundCourse,
        {
          course: course,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async setCourseTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { course, teacher } = req.body;
    try {
      const foundCourse = await Course.findOne({ course: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const foundTeacher = await Teacher.findOne({ fullName: teacher });
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Course.findByIdAndUpdate(
        foundCourse,
        {
          $set: { teacher: foundTeacher },
        },
        { new: true }
      );
      await Teacher.findByIdAndUpdate(foundTeacher, {
        $set: { course: foundCourse },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateCourseTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { teacher, courseBefore, courseAfter } = req.body;
    try {
      const foundTeacher = await Teacher.findOne({ fullName: teacher });
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const foundBefore = await Course.findOne({ course: courseBefore });
      if (!foundBefore) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const foundAfter = await Course.findOne({ course: courseAfter });
      if (!foundAfter) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const result = await Course.findByIdAndUpdate(
        foundAfter,
        {
          teacher: foundTeacher,
        },
        { new: true }
      );
      await Course.findByIdAndUpdate(foundBefore, {
        $unset: { teacher: "" },
      });
      await Teacher.findByIdAndUpdate(foundTeacher, {
        course: foundAfter,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default coursesController;
