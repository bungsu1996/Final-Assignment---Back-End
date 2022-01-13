import express, { Application, NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import mongoDB from "./configs/db";
import routes from "./routes/routes";
import { errorHandler } from "./middlewares/errorHandler";
import HeadMaster from "./models/HeadMasters";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.route();
    this.errorHandler();
  }
  protected plugin = () => {
    mongoDB.connect();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
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
    this.app.post("/headmaster/create", async (req: Request, res: Response) => {
      const { email, fullName, birthDate } = req.body;
      const word = fullName.split(" ");
      const num = birthDate.replace(/-/g, "");
      const password = word[0].toLowerCase() + num;
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const result = await HeadMaster.create({
        email: email.toLowerCase(),
        password: hashedPass,
        fullName,
        birthDate: birthDate,
      });
      res.status(200).json(result);
    });
  };
  protected errorHandler = () => {
    this.app.use(errorHandler.errHandle);
  };
}

const app = new App().app;
export default app;
