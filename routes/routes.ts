import { Request, Response, Router } from "express";
import calendarController from "../controllers/calendar.controller";
import users from "../controllers/user.controller";
import auth from "../middlewares/authJwt";
import authJwt from "../middlewares/authJwt";
import courseRoutes from "./course.routes";
import { headmasterRouter } from "./headmaster.routes";
import { homeroomRouter } from "./homeroom.routes";
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
    this.headmasterRoute();
    this.teacherRoute();
    this.homeroomRoute();
    this.studentRoute();
    this.parentRoute();
  }
  protected routes = () => {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Success!" });
    });
    this.router.post("/register", users.register);
    this.router.post("/login", users.login);
    this.router.post("/forgot-password", users.userForgotPassword);
    this.router.put("/change-password", users.userChangePassword);
    this.router.use("/schoolwork", schoolworkRoutes);
    this.router.use("/course", courseRoutes);
    this.router.use("/schedule", scheduleRoutes);
    this.router.post("/addEvent", calendarController.createCalendar);
    this.router.get("/getEvent", calendarController.getCalendar);
  };
  protected headmasterRoute = () => {
    this.router.use("/headmaster", auth.authentication, auth.isHeadmaster, headmasterRouter);
   
  };
  protected teacherRoute = () => {
    this.router.use("/teacher", auth.authentication, auth.isTeacher, teacherRouter);
  };
  protected homeroomRoute = () => {
    this.router.use("/homeroom", homeroomRouter);
  }
  protected studentRoute = () => {
    this.router.use("/student", studentRouter);
  };
  protected parentRoute = () => {
    this.router.use("/parent", parentRouter);
  };
}

export default new Routes().router;
