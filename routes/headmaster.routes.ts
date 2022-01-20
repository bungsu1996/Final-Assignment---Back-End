import { Router } from "express";
import ClassConttroller from "../controllers/class.controller";
import coursesController from "../controllers/course.controller";
import homeroomController from "../controllers/homeroom.controller";
import ParentController from "../controllers/parents.controller";
import scheduleController from "../controllers/schedule.controller";
import scoreController from "../controllers/score.controller";
import StudentController from "../controllers/students.controller";
import TeacherController from "../controllers/teacher.controller";
import authJwt from "../middlewares/authJwt";

class headmasterRoutes {
  public headmasterRoute: Router;
  constructor() {
    this.headmasterRoute = Router();
    this.headmasterControlTeacher();
    this.headmasterControlHomeroom();
    this.headmasterControlStudent();
    this.headmasterControlParent();
    this.headmasterControlClasses();
    this.headmasterControlCourse();
    this.headmasterControlScore();
    this.headmasterControlSchedule();
  }
  protected headmasterControlTeacher = () => {
    this.headmasterRoute.post(
      "/teacher/create",
      TeacherController.createTeacher
    );
    this.headmasterRoute.get("/teacher", TeacherController.findAllTeacher);
    this.headmasterRoute.get("/teacher/:id", TeacherController.findTeacher);
    this.headmasterRoute.put("/teacher/:id", TeacherController.updateTeacher);
    this.headmasterRoute.post(
      "/teacher/add-course/:id",
      TeacherController.addSpesificCourse
    );
    this.headmasterRoute.put(
      "/teacher/update-course/:id",
      TeacherController.updateSpesificCourse
    );
  };
  protected headmasterControlHomeroom = () => {
    this.headmasterRoute.put(
      "/homeroom/set-roomteacher/:classes",
      homeroomController.setHomeroom
    );
    this.headmasterRoute.get("/homeroom", homeroomController.seeHomeroom);
    this.headmasterRoute.get(
      "/homeroom/:homeroom",
      homeroomController.scoreByClassHomeroom
    );
  };
  protected headmasterControlStudent = () => {
    this.headmasterRoute.post(
      "/student/create",
      StudentController.createStudent
    );
    this.headmasterRoute.get("/student", StudentController.findAllStudent);
    this.headmasterRoute.get("/student/:id", StudentController.findStudent);
    this.headmasterRoute.put("/student/:id", StudentController.updateStudent);
    this.headmasterRoute.put(
      "/student/change-status",
      StudentController.changeStatusStudent
    );
  };
  protected headmasterControlParent = () => {
    this.headmasterRoute.post("/parent/create", ParentController.createParent);
    this.headmasterRoute.get("/parent", ParentController.findAllParent);
    this.headmasterRoute.get("/parent/:id", ParentController.findParent);
    this.headmasterRoute.put("/parent/:id", ParentController.updateParent);
    this.headmasterRoute.put(
      "/parent/change-status",
      ParentController.changeStatusParent
    );
  };
  protected headmasterControlClasses = () => {
    this.headmasterRoute.post("/class/create", ClassConttroller.createClass);
    this.headmasterRoute.put(
      "/class/set-hometeach",
      ClassConttroller.setHomeroom
    );
    this.headmasterRoute.get("/class/score/:id", ClassConttroller.scorebyClass);
    this.headmasterRoute.get("/class/year", ClassConttroller.classFilterByYear);
    this.headmasterRoute.get("/class", ClassConttroller.findAllClass);
    this.headmasterRoute.get("/class/:id", ClassConttroller.findClass);
    this.headmasterRoute.put("/class/:id", ClassConttroller.updateClass);
    this.headmasterRoute.put(
      "/class/change/:student",
      ClassConttroller.changeClass
    );
  };
  protected headmasterControlCourse = () => {
    this.headmasterRoute.post("/course/create", coursesController.createCourse);
    this.headmasterRoute.get("/course", coursesController.findAllCourse);
    this.headmasterRoute.get("/course/:id", coursesController.findCourse);
  };
  protected headmasterControlScore = () => {
    this.headmasterRoute.post("/score/create", scoreController.createScore);
    this.headmasterRoute.get(
      "/score/by-class",
      homeroomController.seeScoreByClass
    );
  };
  protected headmasterControlSchedule = () => {
    this.headmasterRoute.post(
      "/schedule/create",
      scheduleController.createSchedule
    );
    this.headmasterRoute.get("/schedule", scheduleController.listSchedule);
    this.headmasterRoute.get(
      "/schedule/:id",
      scheduleController.spesificSchedule
    );
    this.headmasterRoute.put(
      "/schedule/:id",
      scheduleController.updateSchedule
    );
  };
}

const headmasterRouter = new headmasterRoutes().headmasterRoute;
export { headmasterRouter };
