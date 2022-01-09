import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teachers";
import Courses from "../models/Courses";
import Class from "../models/Class";

class TeacherController {
    static async createTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email, password, fullName, birthDate, course, teachClass } =
            req.body;
        try {
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findCourse = await Courses.findById({ _id: course });
            if (!findCourse) {
                throw { name: "NOT_FOUND_COURSE" };
            }
            const findClass = await Class.findById({ _id: teachClass });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Teacher.create({
                email: email.toLowerCase(),
                password: hashedPass,
                fullName: fullName,
                birthDate: new Date(birthDate),
                course: findCourse,
                teachClass: findClass,
            });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findAllTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await Teacher.find();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async findTeacher(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_TEACHER" };
            }
            const result = await Teacher.findById(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const { email, password, fullName, birthDate, course, teachClass } =
            req.body;
        try {
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findCourse = await Courses.findById({ _id: course });
            if (!findCourse) {
                throw { name: "NOT_FOUND_COURSE" };
            }
            const findClass = await Class.findById({ _id: teachClass });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Teacher.findByIdAndUpdate(
                id,
                {
                    email: email.toLowerCase(),
                    password: hashedPass,
                    fullName: fullName,
                    birthData: new Date(birthDate),
                    course: findCourse,
                    teachClass: findClass,
                },
                { new: true }
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        try {
            if (!id) {
                throw { name: "NOT_FOUND_TEACHER" };
            }
            const result = await Teacher.findByIdAndDelete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default TeacherController;
