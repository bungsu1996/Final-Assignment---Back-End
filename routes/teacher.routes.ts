import { Router } from "express";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacherCRUD();
  }
  protected teacherCRUD = () => {};
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
