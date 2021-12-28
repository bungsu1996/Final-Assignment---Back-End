import { Router } from "express";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacherCRUD();
  }
  protected teacherCRUD = () => {
    this.teacherRoute.post("/create", TeacherController.createTeacher);
    this.teacherRoute.get("/teacher", TeacherController.findAllTeacher);
    this.teacherRoute.post("/find-teacher", TeacherController.findTeacher);
    this.teacherRoute.put("/update-teacher", TeacherController.updateTeacher);
    this.teacherRoute.delete(
      "/delete-teacher",
      TeacherController.deleteTeacher
    );
  };
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
