import { Router } from "express";
import calendarController from "../controllers/calendar.controller";
import StudentController from "../controllers/students.controller";

class StudentRoutes {
  public studentRoute: Router;
  constructor() {
    this.studentRoute = Router();
    this.studentControl();
    this.studentScore();
    this.studentSchedule();
  }
  protected studentControl = () => {
    this.studentRoute.get("/:id", StudentController.findStudent);
    this.studentRoute.put("/update/:id", StudentController.updateStudent);
  };
  protected studentScore = () => {
    this.studentRoute.get("/score/:id", StudentController.seeScore);
  }
  protected studentSchedule = () => {
    this.studentRoute.get("/calendar/:id", calendarController.findSchedule);
  }
}

const studentRouter = new StudentRoutes().studentRoute;
export { studentRouter };
