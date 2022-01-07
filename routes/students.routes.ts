import { Router } from "express";
import StudentController from "../controllers/students.controller";

class StudentRoutes {
  public studentRoute: Router;
  constructor() {
    this.studentRoute = Router();
    this.studentCRUD();
  }
  protected studentCRUD = () => {
    this.studentRoute.post("/create", StudentController.createStudent);
    this.studentRoute.get("/", StudentController.findAllStudent);
    this.studentRoute.get("/:id", StudentController.findStudent);
    this.studentRoute.put("/update-student", StudentController.updateStudent);
    this.studentRoute.delete(
      "/delete-student",
      StudentController.deleteStudent
    );
  };
}

const studentRouter = new StudentRoutes().studentRoute;
export { studentRouter };
