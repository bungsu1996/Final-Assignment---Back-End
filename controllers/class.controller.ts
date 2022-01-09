import { NextFunction, Request, Response } from "express";
import Class from "../models/Class";
import Schedule from "../models/Schedule";
import Student from "../models/Students";
import Teacher from "../models/Teachers";

class ClassConttroller {
    static async createClass(req: Request, res: Response, next: NextFunction) {
        const { className, yearAcademic, homeTeacher } = req.body;
        try {
            const foundHomeroom = await Teacher.findById(homeTeacher);
            if (!foundHomeroom) {
                throw { name: "NOT_FOUND_HOMEROOM" };
            }
            const result = await Class.create({
                className: className,
                yearAcademic: yearAcademic,
                homeTeacher: foundHomeroom,
            });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async scorebyClass(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const foundClass = await Class.findById(id);
            if (!foundClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Class.findById(foundClass)
                .select("student")
                .populate({ path: "student", select: "score" });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async classFilterByYear(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { yearAcademic } = req.body;
        try {
            if (!yearAcademic) {
                throw { name: "NOT_FOUND_YEAR" };
            }
            const result = await Class.findOne({ yearAcademic: yearAcademic });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findAllClass(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await Class.find();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findClass(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const foundClass = await Class.findById(id);
            if (!foundClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Class.findById(foundClass);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateClass(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { className, yearAcademic, homeTeacher, student, schedule } =
            req.body;
        try {
            const foundClass = await Class.findById(id);
            if (!foundClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const foundhomeTeacher = await Teacher.findById({
                _id: homeTeacher,
            });
            if (!foundhomeTeacher) {
                throw { name: "NOT_FOUND_HOMEROOM" };
            }
            const foundStudent = await Student.findById({ _id: student });
            if (!student) {
                throw { name: "NOT_FOUND_STUDENT" };
            }
            const foundSchedule = await Schedule.findById({ _id: schedule });
            if (!foundSchedule) {
                throw { name: "NOT_FOUND_SCHEDULE" };
            }
            const result = await Class.findByIdAndUpdate(
                {
                    className: className,
                    yearAcademic: yearAcademic,
                    homeTeacher: foundhomeTeacher,
                    student: foundStudent,
                    schedule: foundSchedule,
                },
                { new: true }
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ClassConttroller;
