import { Request, Response, Router } from "express";
import users from "../controllers/user.controller";
import courseRoutes from "./course.routes";
import { parentRouter } from "./parents.routes";
import scheduleRoutes from "./schedule.routes";
import schoolworkRoutes from "./schoolwork.routes";
import { studentRouter } from "./students.routes";
import { teacherRouter } from "./teacher.routes";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.teacherRoute();
    this.studentRoute();
    this.parentRoute();
  }
  routes = () => {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success!" });
    });
    this.router.post("/register", users.register);
    this.router.post("/login", users.login);
    this.router.use("/schoolwork", schoolworkRoutes);
    this.router.use("/course", courseRoutes);
    this.router.use("/schedule", scheduleRoutes);
  };
  protected teacherRoute = () => {
    this.router.use("/teacher", teacherRouter);
  };
  protected studentRoute = () => {
    this.router.use("/student", studentRouter);
  };
  protected parentRoute = () => {
    this.router.use("/parent", parentRouter);
  };
}

export default new Routes().router;
