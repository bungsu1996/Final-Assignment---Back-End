import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Class from "../models/Class";
import Parent from "../models/Parents";
import Student from "../models/Students";

class ParentController {
    static async createParent(req: Request, res: Response, next: NextFunction) {
        const { email, password, fullName, birthDate, student, classes } =
            req.body;
        try {
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findStudent = await Student.findById({ _id: student });
            if (!findStudent) {
                throw { name: "NOT_FOUND_STUDENT" };
            }
            const findClass = await Class.findById({ _id: classes });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Parent.create({
                email: email.toLowerCase(),
                password: hashedPass,
                fullName: fullName,
                birthDate: new Date(birthDate),
                student: findStudent,
                classes: findClass,
            });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findAllParent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await Parent.find();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findParent(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_PARENT" };
            }
            const result = await Parent.findById(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateParent(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { email, password, fullName, birthDate, student, classes } =
            req.body;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_PARENT" };
            }
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findStudent = await Student.findById({ _id: student });
            if (!findStudent) {
                throw { name: "NOT_FOUND_STUDENT" };
            }
            const findClass = await Class.findById({ _id: classes });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Parent.findByIdAndUpdate(
                id,
                {
                    email: email.toLowerCase(),
                    password: hashedPass,
                    fullName: fullName,
                    birthData: new Date(birthDate),
                    student: findStudent,
                    classes: findClass,
                },
                { new: true }
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteParent(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_PARENT" };
            }
            const result = await Parent.findByIdAndDelete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ParentController;
