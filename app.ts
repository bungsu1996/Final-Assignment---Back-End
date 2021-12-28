import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "./configs/db";
import HeadMaster from "./models/HeadMasters";
import Teacher from "./models/Teachers";
import Student from "./models/Students";
import Parent from "./models/Parents";
import SchoolWork from "./models/SchoolWorks";
import Course from "./models/Courses";
import Schedule from "./models/Schedule";
import routes from "./routes/routes";

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
        this.app.use("/api", routes);
    };
}

const app = new App().app;
const port = process.env.PORT || 3535;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
