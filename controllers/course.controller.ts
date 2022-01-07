import { Response, Request } from "express";
import Course from "../models/Courses";

class courses {
    static async create(req: Request, res: Response) {
        try {
            const { course } = req.body;
            const result = await Course.create({
                course,
            });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async getList(req: Request, res: Response) {
        try {
            const result = await Course.find();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default courses;
