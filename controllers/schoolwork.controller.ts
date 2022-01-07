import { Response, Request } from "express";
import SchoolWork from "../models/SchoolWorks";

class schoolworks {
    static async create(req: Request, res: Response) {
        try {
            const { nama } = req.body;
            const result = await SchoolWork.create({
                nameWork: nama,
            });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async getList(req: Request, res: Response) {
        try {
            const result = await SchoolWork.find();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default schoolworks;
