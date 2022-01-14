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
        const { email, fullName, birthDate, classes } = req.body;
        try {
            const word = fullName.split(" ");
            const num = birthDate.replace(/-/g, "");
            const password = word[0].toLowerCase() + num;
            console.log(password);
            const findClass = await Class.findById({ _id: classes });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            let nis: string = "";
            await Student.find({})
                .sort({ _id: -1 })
                .limit(1)
                .then((student) => {
                    console.log(student[0].nis);
                    if ((student[0].nis += 0 == 0 || !student)) {
                        const n = 1;
                        nis = String(n).padStart(6, "0");
                    } else {
                        const n = parseInt(student[0].nis);
                        nis = String(n + 1).padStart(6, "0");
                    }
                    console.log(nis);
                });
            console.log(nis);
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const result = await Student.create({
                email: email.toLowerCase(),
                password: hashedPass,
                fullName: fullName,
                birthDate: birthDate,
                classes: findClass,
            });
            await Student.findByIdAndUpdate(result._id, {
                $inc: { nis: 1 },
            });
            await Class.findByIdAndUpdate(findClass, {
                $push: { student: result._id },
            });
            res.status(201).json({ result });
        } catch (error) {
            console.log((error as Error).message);
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
