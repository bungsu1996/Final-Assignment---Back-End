import { Router } from "express";
import scoreController from "../controllers/score.controller";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacherControlScore();
  }
  protected teacherControlScore = () => {
    this.teacherRoute.post('/score/create', scoreController.createScore);
    
  };
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
