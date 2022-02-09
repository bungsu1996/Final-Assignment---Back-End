import { Request, Response, NextFunction } from "express";
import Calendar from "../models/calendar";
import Class from "../models/Class";

class calendarController {
  static async createCalendar(req: Request, res: Response, next: NextFunction) {
    const { title, start, end, allDay } = req.body;
    try {
      const result = await Calendar.create({
        title: title,
        start: start,
        end: end,
        allDay: allDay,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCalendar(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Calendar.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addNewSchedule(req: Request, res: Response, next: NextFunction) {
    const { title, start, end, classes, daysOfWeek, allDay } = req.body;
    try {
      const foundClass = await Class.findOne({ className: classes });
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      const result = await Calendar.create({
        title: title,
        start: new Date(start),
        end: new Date(end),
        classes: foundClass,
        daysOfWeek: daysOfWeek,
        allDay: allDay,
      });
      await Class.findByIdAndUpdate(foundClass, {
        $push: { schedule: result._id },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async validationSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { title, start, end, classes, daysOfWeek, allDay } = req.body;
    try {
      const foundSchedule = await Calendar.find();
      if (!foundSchedule) {
        throw { name: "NOT_FOUND" };
      }
      const foundClass = await Class.findOne({ className: classes });
      if (!foundClass) {
        throw { name: "NOT_FOUND_CLASS" };
      }
      foundSchedule.forEach(function (item) {
        console.log(item.title);
        if (item.title === title) {
          console.log("Pelajaran sama, error");
        }
      });
      const result = await Calendar.create({
        title: title,
        start: new Date(start),
        end: new Date(end),
        classes: foundClass,
        daysOfWeek: daysOfWeek,
        allDay: allDay,
      });
      await Class.findByIdAndUpdate(foundClass, {
        $push: { schedule: result._id },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findSchedule(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const foundSchedule = await Calendar.findById(id);
      if (!foundSchedule) {
        throw { name: "NOT_FOUND" };
      }
      const result = await Calendar.findById(foundSchedule).populate({
        path: "classes",
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }

  static async findAllSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await Calendar.find().populate({
        path: "classes",
        select: "className",
      });
      res.status(200).json(result);
    } catch (error) {
      console.log((error as Error).name);
      next(error);
    }
  }
}

export default calendarController;
