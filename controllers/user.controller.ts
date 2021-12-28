import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import HeadMaster from "../models/HeadMasters";
import Teacher from "../models/Teachers";
import Student from "../models/Students";
import Parent from "../models/Parents";
import jwt from "jsonwebtoken";

class users {
    static async register(req: Request, res: Response) {
        const {
            email,
            password,
            role,
            fullName,
            birthDate,
            course,
            classes,
            child,
        } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (role === "HeadMaster") {
            const result = await HeadMaster.create({
                email: email.toLowerCase(),
                password: hashedPassword,
                fullName,
                birthDate: new Date(birthDate),
            });
            res.status(200).json({ result });
        } else if (role === "Teacher") {
            const result = await Teacher.create({
                email: email.toLowerCase(),
                password: hashedPassword,
                fullName,
                birthDate: new Date(birthDate),
                course,
            });
            res.status(200).json({ result });
        } else if (role === "Student") {
            const result = await Student.create({
                email: email.toLowerCase(),
                password: hashedPassword,
                fullName,
                birthDate: new Date(birthDate),
                class: classes,
            });
            res.status(200).json({ result });
        } else if (role === "Parent") {
            const result = await Parent.create({
                email: email.toLowerCase(),
                password: hashedPassword,
                fullName,
                birthDate: new Date(birthDate),
                child,
            });
            res.status(200).json({ result });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password, role } = req.body;
        if (role === "HeadMaster") {
            const result = await HeadMaster.findOne({
                email: email.toLowerCase(),
            });
            if (!result) {
                res.status(404).json({ message: "Account not found" });
            }
            const checkPass = bcrypt.compareSync(password, result!.password);
            if (!checkPass) {
                res.status(404).json({ message: "Password wrong!" });
            }
            const token = jwt.sign(
                {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
                "this is a secret key token",
                {
                    expiresIn: 86400,
                }
            );
            res.status(200).json({
                token: token,
                user: {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
            });
        } else if (role === "Teacher") {
            const result = await Teacher.findOne({
                email: email.toLowerCase(),
            });
            if (!result) {
                res.status(404).json({ message: "Account not found" });
            }
            const checkPass = bcrypt.compareSync(password, result!.password);
            if (!checkPass) {
                res.status(404).json({ message: "Password wrong!" });
            }
            const token = jwt.sign(
                {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
                "this is a secret key token",
                {
                    expiresIn: 86400,
                }
            );
            res.status(200).json({
                token: token,
                user: {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
            });
        } else if (role === "Student") {
            const result = await Student.findOne({
                email: email.toLowerCase(),
            });
            if (!result) {
                res.status(404).json({ message: "Account not found" });
            }
            const checkPass = bcrypt.compareSync(password, result!.password);
            if (!checkPass) {
                res.status(404).json({ message: "Password wrong!" });
            }
            const token = jwt.sign(
                {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
                "this is a secret key token",
                {
                    expiresIn: 86400,
                }
            );
            res.status(200).json({
                token: token,
                user: {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
            });
        } else if (role === "Parent") {
            const result = await Parent.findOne({
                email: email.toLowerCase(),
            });
            if (!result) {
                res.status(404).json({ message: "Account not found" });
            }
            const checkPass = bcrypt.compareSync(password, result!.password);
            if (!checkPass) {
                res.status(404).json({ message: "Password wrong!" });
            }
            const token = jwt.sign(
                {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
                "this is a secret key token",
                {
                    expiresIn: 86400,
                }
            );
            res.status(200).json({
                token: token,
                user: {
                    id: result!.id,
                    email: result!.email,
                    fullName: result!.fullName,
                },
            });
        }
    }
}

export default users;
