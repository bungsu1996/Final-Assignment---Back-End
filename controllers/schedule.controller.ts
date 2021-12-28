import { Response, Request } from "express";
import Schedule from "../models/Schedule";

class schedules {
    static async create(req: Request, res: Response) {
        try {
            const { hari, course, start, end } = req.body;
            const result = await Schedule.create({
                hari,
                course,
                start,
                end,
            });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async getList(req: Request, res: Response) {
        try {
            const result = await Schedule.find();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default schedules;
