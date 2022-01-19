import { Router } from "express";
import StudentController from "../controllers/students.controller";

class StudentRoutes {
  public studentRoute: Router;
  constructor() {
    this.studentRoute = Router();
    this.studentControl();
  }
  protected studentControl = () => {
    this.studentRoute.put("/update/:id", StudentController.updateStudent);
  };
}

const studentRouter = new StudentRoutes().studentRoute;
export { studentRouter };
