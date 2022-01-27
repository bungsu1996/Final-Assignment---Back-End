import { Request, Response, NextFunction } from "express";
import Calendar from "../models/calendar";

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
}

export default calendarController;
