import { Router } from "express";
import scoreController from "../controllers/score.controller";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacherControlScore();
    this.teacherDailyScore();
  }
  protected teacherControlScore = () => {
    this.teacherRoute.post("/score/create", scoreController.createScore);
    this.teacherRoute.post("/score/set-score", scoreController.createTestScore);
    this.teacherRoute.get("/score/search-by", TeacherController.searchManageScore);
  };
  protected teacherDailyScore = () => {
    this.teacherRoute.put("/score/set-dailyscore/:score", TeacherController.setDailyScore);
    this.teacherRoute.put("/score/set-midscore/:score", TeacherController.setMidScore);
    this.teacherRoute.put("/score/set-finalscore/:score", TeacherController.setFinalScore);
  }
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
