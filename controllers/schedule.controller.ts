import { Response, Request, NextFunction } from "express";
import Course from "../models/Courses";
import Schedule from "../models/Schedule";
import Teacher from "../models/Teachers";

class scheduleController {
  static async createSchedule(req: Request, res: Response, next: NextFunction) {
    const { hari, course, teacher, startTeach, endTeach, hourlyTeach } =
      req.body;
    try {
      if (!hari && !startTeach && !endTeach && !hourlyTeach) {
        throw { name: "NOT_FOUND" };
      }
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const foundTeacher = await Teacher.findById({ _id: teacher });
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Schedule.create({
        hari: hari,
        course: foundCourse,
        teacher: foundTeacher,
        hourlyTeach: hourlyTeach,
        startTeach: startTeach,
        endTeach: endTeach,
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async listSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Schedule.find()
        .populate({ path: "teacher", select: "fullName" })
        .populate({ path: "course", select: "course" });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async spesificSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const foundSchedule = await Schedule.findById(id).populate(
        "teacher course"
      );
      if (!foundSchedule) {
        throw { name: "NOT_FOUND_SCHEDULE" };
      }
      res.status(200).json(foundSchedule);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async updateSchedule(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { hari, course, teacher, startTeach, endTeach, hourlyTeach } =
      req.body;
    try {
      const foundSchedule = await Schedule.findById({ _id: id });
      if (!foundSchedule) {
        throw { name: "NOT_FOUND_SCHEDULE" };
      }
      const foundCourse = await Course.findById({ _id: course });
      if (!foundCourse) {
        throw { name: "NOT_FOUND_COURSE" };
      }
      const foundTeacher = await Teacher.findById({ _id: teacher });
      if (!foundTeacher) {
        throw { name: "NOT_FOUND_TEACHER" };
      }
      const result = await Schedule.findByIdAndUpdate(
        foundSchedule,
        {
          hari: hari,
          course: foundCourse,
          teacher: foundTeacher,
          hourlyTeach: hourlyTeach,
          startTeach: startTeach,
          endTeach: endTeach,
        },
        { new: true }
      )
        .populate({ path: "teacher", select: "fullName" })
        .populate({ path: "course", select: "course" });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

}

export default scheduleController;
