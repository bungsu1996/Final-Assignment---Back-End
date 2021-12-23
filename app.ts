import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "./configs/db";
import HeadMaster from "./models/HeadMasters";
import Teacher from "./models/Teachers";
import Student from "./models/Students";
import Parent from "./models/Parents";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugin();
        this.route();
    }

    protected plugin = () => {
        mongoDB.connect();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(function (
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS"
            );
            next();
        });
    };

    protected route = () => {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json({ message: "Success!" });
        });
        this.app.post("/api/register", async (req: Request, res: Response) => {
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
        });

        this.app.post("/api/login", async (req: Request, res: Response) => {
            const { email, password, role } = req.body;
            if (role === "HeadMaster") {
                const result = await HeadMaster.findOne({
                    email: email.toLowerCase(),
                });
                if (!result) {
                    res.status(404).json({ message: "Account not found" });
                }
                const checkPass = bcrypt.compareSync(
                    password,
                    result!.password
                );
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
                const checkPass = bcrypt.compareSync(
                    password,
                    result!.password
                );
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
                const checkPass = bcrypt.compareSync(
                    password,
                    result!.password
                );
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
                const checkPass = bcrypt.compareSync(
                    password,
                    result!.password
                );
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
        });
    };
}

const app = new App().app;
const port = process.env.PORT || 3535;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
