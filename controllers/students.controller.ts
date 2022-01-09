import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Class from "../models/Class";
import Student from "../models/Students";
import Score from "../models/Score";

class StudentController {
    static async createStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email, password, fullName, birthDate, classes } = req.body;
        try {
            const findClass = await Class.findById({ _id: classes });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const result = await Student.create({
                email: email.toLowerCase(),
                password: hashedPass,
                fullName: fullName,
                birthDate: new Date(birthDate),
                classes: findClass,
            });
            await Class.findByIdAndUpdate(findClass, {
                $push: { student: result._id },
            });
            res.status(201).json({ result });
        } catch (error) {
            next(error);
        }
    }

    static async findAllStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await Student.find();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findStudent(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_STUDENT" };
            }
            const result = await Student.findById(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const { email, password, fullName, birthDate, classes, score } =
            req.body;
        try {
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findClass = await Class.findById({ _id: classes });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const findScore = await Score.findById({ _id: score });
            if (!findScore) {
                throw { name: "NOT_FOUND_SCORE" };
            }
            const result = await Student.findByIdAndUpdate(
                id,
                {
                    email: email.toLowerCase(),
                    password: hashedPass,
                    fullName: fullName,
                    birthData: birthDate,
                    classes: findClass,
                    score: score,
                },
                { new: true }
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteStudent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_STUDENT" };
            }
            const result = await Student.findByIdAndDelete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default StudentController;
