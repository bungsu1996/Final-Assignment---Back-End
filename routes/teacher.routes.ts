import { Router } from "express";
import coursesController from "../controllers/course.controller";
import GradeController from "../controllers/grade.controller";
import scoreController from "../controllers/score.controller";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
  public teacherRoute: Router;
  constructor() {
    this.teacherRoute = Router();
    this.teacher();
    this.teacherControlScore();
    this.teacherScoreSpesific();
    this.teacherForgotPassword();
    this.findScoreStudent();
    this.getSpesificClass();
    this.spesificCourse();
  }
  protected teacher = () => {
    this.teacherRoute.get("/:id", TeacherController.getTeacher);
  }
  protected spesificCourse = () => {
    this.teacherRoute.get("/course/:id", coursesController.findCourse);
  }
  protected teacherControlScore = () => {
    this.teacherRoute.post("/score/create", scoreController.createScore);
    this.teacherRoute.post("/score/set-score", scoreController.createTestScore);
    this.teacherRoute.get("/score/search-by", TeacherController.searchManageScore);
    this.teacherRoute.put("/score/update-score/:id", TeacherController.updateScore);
    this.teacherRoute.get("/score/:id", scoreController.spesificScore);
    this.teacherRoute.put("/score/manageScore/:id", TeacherController.manageAllScore);
  };
  protected teacherScoreSpesific = () => {
    this.teacherRoute.get("/score/spesific/:id", TeacherController.getScoreSpecific);
  }
  protected teacherForgotPassword = () => {
    this.teacherRoute.post("/forgot-password", TeacherController.forgotPasswordTeacher);
    this.teacherRoute.put("/change-password", TeacherController.changePasswordTeacher);
  }
  protected findScoreStudent = () => {
    this.teacherRoute.get("/score/search/:id", TeacherController.findStudentScore);
    this.teacherRoute.get("/score/student/:id", TeacherController.spesificScore);
    this.teacherRoute.get("/student/grade/:id", TeacherController.getGrade);
    this.teacherRoute.post("/student/grade/setGrade", GradeController.setGradeStudent);
    this.teacherRoute.get("/student/grade", GradeController.findAllGrade);
  }
  protected getSpesificClass = () => {
    this.teacherRoute.get("/class/:id", TeacherController.getClass);
    this.teacherRoute.get("/teach-class/:id", TeacherController.findTeacher);
  }
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
