import { Router } from "express";
import scoreController from "../controllers/score.controller";
import TeacherController from "../controllers/teacher.controller";
import Teacher from "../models/Teachers";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacherControlScore();
    this.teacherDailyScore();
    this.teacherScoreSpesific();
    this.teacherForgotPassword();
    this.findScoreStudent();
    this.getSpesificClass();
  }
  protected teacherControlScore = () => {
    this.teacherRoute.post("/score/create", scoreController.createScore);
    this.teacherRoute.post("/score/set-score", scoreController.createTestScore);
    this.teacherRoute.get("/score/search-by", TeacherController.searchManageScore);
    this.teacherRoute.put("/score/update-score/:id", TeacherController.updateScore);
  };
  protected teacherDailyScore = () => {
    this.teacherRoute.put("/score/set-dailyscore/:score", TeacherController.setDailyScore);
    this.teacherRoute.put("/score/set-midscore/:score", TeacherController.setMidScore);
    this.teacherRoute.put("/score/set-finalscore/:score", TeacherController.setFinalScore);
  }
  protected teacherScoreSpesific = () => {
    this.teacherRoute.get("/score/spesific/:id", TeacherController.getScoreSpecific);
  }
  protected teacherForgotPassword = () => {
    this.teacherRoute.post("/forgot-password", TeacherController.forgotPasswordTeacher);
    this.teacherRoute.put("/change-password", TeacherController.changePasswordTeacher);
  }
  protected findScoreStudent = () => {
    this.teacherRoute.get("/score/search/:id", TeacherController.findStudentScore);
  }
  protected getSpesificClass = () => {
    this.teacherRoute.get("/class/:id", TeacherController.getClass);
  }
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
