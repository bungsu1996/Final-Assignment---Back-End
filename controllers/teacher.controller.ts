import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teachers";
import Courses from "../models/Courses";
import Class from "../models/Class";
import Course from "../models/Courses";
import Score from "../models/Score";

class TeacherController {
    static async createTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email, fullName, birthDate, course, teachClass } = req.body;
        try {
            const word = fullName.split(" ");
            const num = birthDate.replace(/-/g, "");
            const password = word[0].toLowerCase() + num;
            console.log(password);
            const hashPass = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, hashPass);
            const findCourse = await Courses.findById({ _id: course });
            let nip: string = "";
            await Teacher.find({})
                .sort({ _id: -1 })
                .limit(1)
                .then((teacher) => {
                    if ((teacher[0].nip += 0 == 0 || !teacher)) {
                        const n = 1;
                        nip = String(n).padStart(3, "0");
                    } else {
                        const n = parseInt(teacher[0].nip);
                        nip = String(n + 1).padStart(3, "0");
                    }
                });
            if (!findCourse) {
                throw { name: "NOT_FOUND_COURSE" };
            }
            const findClass = await Class.findById({ _id: teachClass });
            if (!findClass) {
                throw { name: "NOT_FOUND_CLASS" };
            }
            const result = await Teacher.create({
                nip: nip,
                email: email.toLowerCase(),
                password: hashedPass,
                fullName: fullName,
                birthDate: birthDate,
                course: findCourse,
                teachClass: findClass,
            });
            res.status(201).json(result);
        } catch (error) {
            console.log((error as Error).message);
            next(error);
        }
    }

    static async findAllTeacher(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await Teacher.find().populate("course teachClass");
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
                    birthData: birthDate,
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

    static async addSpesificCourse(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const { course } = req.body;
        try {
            const foundTeacher = await Teacher.findById(id);
            if (!foundTeacher) {
                throw { name: "NOT_FOUND_TEACHER" };
            }
            const foundCourse = await Course.findById({ _id: course });
            if (!foundCourse) {
                throw { name: "NOT_FOUND_COURSE" };
            }
            const result = await Teacher.findByIdAndUpdate(foundTeacher, {
                $push: { course: foundCourse },
            }).populate("course");
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateSpesificCourse(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const { course } = req.body;
        try {
            const foundTeacher = await Teacher.findById(id);
            if (!foundTeacher) {
                throw { name: "NOT_FOUND_TEACHER" };
            }
            const foundCourse = await Course.findById({ _id: course });
            if (!foundCourse) {
                throw { name: "NOT_FOUND_COURSE" };
            }
            const result = await Teacher.findByIdAndUpdate(
                foundTeacher,
                {
                    course: course,
                },
                { new: true }
            ).populate("course");
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async searchManageScore(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { academicYear, semester, classes } = req.params;
        try {
            const result = await Class.findOne({
                className: classes,
                yearAcademic: academicYear,
                semester: semester,
            }).populate({
                path: "student",
                select: "nis fullName score",
                populate: {
                    path: "score",
                    select: "course dailyScore midtest finaltest resultScore",
                    populate: { path: "course" },
                },
            });
            // if (result.length === 0) {
            //     throw { name: "NOT_FOUND_SEARCH" };
            // }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getScoreSpecific(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        try {
            const result = await Score.findOne({ id }).populate("course");
            if (!result) {
                throw { name: "NOT_FOUND_SEARCH" };
            }
            res.status(200).json(result);
        } catch (error) {
            console.log((error as Error).message);
            next(error);
        }
    }

    static async updateScore(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { nama, value } = req.body;
        try {
            if (nama === "dailyScore") {
                const updateScore = await Score.findByIdAndUpdate(
                    id,
                    {
                        dailyScore: value,
                    },
                    { new: true }
                ).populate("course");
                const resultScore =
                    (updateScore.dailyScore +
                        updateScore.midtest +
                        updateScore.finaltest) /
                    3;
                const result = await Score.findByIdAndUpdate(
                    id,
                    {
                        resultScore,
                    },
                    {
                        new: true,
                    }
                ).populate("course");
                res.status(200).json(result);
            } else if (nama === "midtest") {
                const updateScore = await Score.findByIdAndUpdate(
                    id,
                    {
                        midtest: value,
                    },
                    { new: true }
                ).populate("course");
                const resultScore =
                    (updateScore.dailyScore +
                        updateScore.midtest +
                        updateScore.finaltest) /
                    3;
                const result = await Score.findByIdAndUpdate(
                    id,
                    {
                        resultScore,
                    },
                    {
                        new: true,
                    }
                ).populate("course");
                res.status(200).json(result);
            } else if (nama === "finaltest") {
                const updateScore = await Score.findByIdAndUpdate(
                    id,
                    {
                        finaltest: value,
                    },
                    { new: true }
                ).populate("course");
                const resultScore =
                    (updateScore.dailyScore +
                        updateScore.midtest +
                        updateScore.finaltest) /
                    3;
                const result = await Score.findByIdAndUpdate(
                    id,
                    {
                        resultScore,
                    },
                    {
                        new: true,
                    }
                ).populate("course");
                res.status(200).json(result);
            } else {
                throw { name: "Name Score not found" };
            }
        } catch (error) {
            console.log((error as Error).message);
            next(error);
        }
    }
}

export default TeacherController;
