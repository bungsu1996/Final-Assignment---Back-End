import { Router } from "express";
import ClassConttroller from "../controllers/class.controller";
import ParentController from "../controllers/parents.controller";
import StudentController from "../controllers/students.controller";
import TeacherController from "../controllers/teacher.controller";

class headmasterRoutes {
  public headmasterRoute: Router;
  constructor() {
    this.headmasterRoute = Router();
    this.headmasterControlTeacher();
    this.headmasterControlStudent();
    this.headmasterControlParent();
    this.headmasterControlClasses();
  }
  protected headmasterControlTeacher = () => {
    this.headmasterRoute.post('/teacher/create', TeacherController.createTeacher);
    this.headmasterRoute.get('/teacher', TeacherController.findAllTeacher);
    this.headmasterRoute.get('/teacher/:id', TeacherController.findTeacher);
    this.headmasterRoute.put('/teacher/update', TeacherController.updateTeacher);
    this.headmasterRoute.delete('/teacher/teacher', TeacherController.deleteTeacher);
  }
  protected headmasterControlStudent = () => {
    this.headmasterRoute.post('/student/create', StudentController.createStudent);
    this.headmasterRoute.get('/student', StudentController.findAllStudent);
    this.headmasterRoute.get('/student/:id', StudentController.findStudent);
    this.headmasterRoute.put('/student/update', StudentController.updateStudent);
    this.headmasterRoute.delete('/student/delete', StudentController.deleteStudent);
  }
  protected headmasterControlParent = () => {
    this.headmasterRoute.post('/parent/create', ParentController.createParent);
    this.headmasterRoute.get('/parent', ParentController.findAllParent);
    this.headmasterRoute.get('/parent/:id', ParentController.findParent);
    this.headmasterRoute.put('/parent/update', ParentController.updateParent);
    this.headmasterRoute.delete('/parent/delete', ParentController.deleteParent);
  }
  protected headmasterControlClasses = () => {
    this.headmasterRoute.post('/class/create', ClassConttroller.createClass);
    this.headmasterRoute.get('/class/:id', ClassConttroller.scorebyClass);
    this.headmasterRoute.get('/class/year', ClassConttroller.classFilterByYear);
    this.headmasterRoute.get('/class', ClassConttroller.findAllClass);
    this.headmasterRoute.get('/class/:id', ClassConttroller.findClass);
    this.headmasterRoute.put('/class/update/:id', ClassConttroller.updateClass);
  }
}

const headmasterRouter = new headmasterRoutes().headmasterRoute;
export { headmasterRouter }