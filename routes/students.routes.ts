import { Router } from "express";
import StudentController from "../controllers/students.controller";

class StudentRoutes {
  public studentRoute: Router;
  constructor() {
    this.studentRoute = Router();
    this.studentControl();
    this.studentForgotPass();
    this.studentScore();
  }
  protected studentControl = () => {
    this.studentRoute.get("/:id", StudentController.findStudent);
    this.studentRoute.put("/update/:id", StudentController.updateStudent);
  };
  protected studentForgotPass = () => {
    this.studentRoute.post("/forgot-password", StudentController.forgotPasswordStudent);
    this.studentRoute.put("/change-password", StudentController.changePasswordStudent);
  }
  protected studentScore = () => {
    this.studentRoute.get("/score/:id", StudentController.seeScore);
  }
}

const studentRouter = new StudentRoutes().studentRoute;
export { studentRouter };
