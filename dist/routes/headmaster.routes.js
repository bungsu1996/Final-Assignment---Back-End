"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headmasterRouter = void 0;
var express_1 = require("express");
var class_controller_1 = __importDefault(require("../controllers/class.controller"));
var course_controller_1 = __importDefault(require("../controllers/course.controller"));
var grade_controller_1 = __importDefault(require("../controllers/grade.controller"));
var homeroom_controller_1 = __importDefault(require("../controllers/homeroom.controller"));
var parents_controller_1 = __importDefault(require("../controllers/parents.controller"));
var schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
var score_controller_1 = __importDefault(require("../controllers/score.controller"));
var students_controller_1 = __importDefault(require("../controllers/students.controller"));
var teacher_controller_1 = __importDefault(require("../controllers/teacher.controller"));
var headmasterRoutes = /** @class */ (function () {
    function headmasterRoutes() {
        var _this = this;
        this.headmasterSelf = function () { };
        this.headmasterControlTeacher = function () {
            _this.headmasterRoute.post("/teacher/create", teacher_controller_1.default.createTeacher);
            _this.headmasterRoute.get("/teacher", teacher_controller_1.default.findAllTeacher);
            _this.headmasterRoute.get("/teacher/:id", teacher_controller_1.default.findTeacher);
            _this.headmasterRoute.put("/teacher/:id", teacher_controller_1.default.updateTeacher);
            _this.headmasterRoute.post("/teacher/add-course/:id", teacher_controller_1.default.addSpesificCourse);
            _this.headmasterRoute.put("/teacher/update-course/:id", teacher_controller_1.default.updateSpesificCourse);
        };
        this.headmasterControlHomeroom = function () {
            _this.headmasterRoute.post("/homeroom/set-roomteacher", homeroom_controller_1.default.setHomeroom);
            _this.headmasterRoute.get("/homeroom", homeroom_controller_1.default.seeHomeroom);
            _this.headmasterRoute.get("/homeroom/:id", homeroom_controller_1.default.findHomeroom);
            _this.headmasterRoute.get("/homeroom/student/:id", homeroom_controller_1.default.scoreByClassHomeroom);
            _this.headmasterRoute.put("/homeroom/change/:id", homeroom_controller_1.default.changeHomeroom);
        };
        this.headmasterControlStudent = function () {
            _this.headmasterRoute.post("/student/create", students_controller_1.default.createStudent);
            _this.headmasterRoute.get("/student", students_controller_1.default.findAllStudent);
            _this.headmasterRoute.get("/student/:id", students_controller_1.default.findStudent);
            _this.headmasterRoute.put("/student/:id", students_controller_1.default.updateStudent);
            _this.headmasterRoute.put("/student/change-status", students_controller_1.default.changeStatusStudent);
        };
        this.headmasterControlParent = function () {
            _this.headmasterRoute.post("/parent/create", parents_controller_1.default.createParent);
            _this.headmasterRoute.get("/parent", parents_controller_1.default.findAllParent);
            _this.headmasterRoute.get("/parent/:id", parents_controller_1.default.findParent);
            _this.headmasterRoute.put("/parent/:id", parents_controller_1.default.updateParent);
            _this.headmasterRoute.put("/parent/change-status", parents_controller_1.default.changeStatusParent);
        };
        this.headmasterControlClasses = function () {
            _this.headmasterRoute.post("/class/create", class_controller_1.default.createClass);
            _this.headmasterRoute.put("/class/set-hometeach", class_controller_1.default.setHomeroom);
            _this.headmasterRoute.get("/class/score/:id", class_controller_1.default.scorebyClass);
            _this.headmasterRoute.get("/class/year", class_controller_1.default.classFilterByYear);
            _this.headmasterRoute.get("/class", class_controller_1.default.findAllClass);
            _this.headmasterRoute.get("/class/:id", class_controller_1.default.findClass);
            _this.headmasterRoute.put("/class/:id", class_controller_1.default.updateClass);
            _this.headmasterRoute.put("/class/change/:student", class_controller_1.default.changeClass);
        };
        this.headmasterControlCourse = function () {
            _this.headmasterRoute.post("/course/create", course_controller_1.default.createCourse);
            _this.headmasterRoute.get("/course", course_controller_1.default.findAllCourse);
            _this.headmasterRoute.get("/course/:id", course_controller_1.default.findCourse);
            _this.headmasterRoute.put("/course/:id", course_controller_1.default.updateCourse);
            _this.headmasterRoute.post("/course/set-course", course_controller_1.default.setCourseTeacher);
            _this.headmasterRoute.post("/course/update-course", course_controller_1.default.updateCourseTeacher);
        };
        this.headmasterControlScore = function () {
            _this.headmasterRoute.post("/score/create", score_controller_1.default.createScore);
            _this.headmasterRoute.post("/score", score_controller_1.default.studentScore);
            _this.headmasterRoute.get("/score/:id", score_controller_1.default.spesificScore);
        };
        this.headmasterControlSchedule = function () {
            _this.headmasterRoute.post("/schedule/create", schedule_controller_1.default.createSchedule);
            _this.headmasterRoute.get("/schedule", schedule_controller_1.default.listSchedule);
            _this.headmasterRoute.get("/schedule/:id", schedule_controller_1.default.spesificSchedule);
            _this.headmasterRoute.put("/schedule/:id", schedule_controller_1.default.updateSchedule);
        };
        this.headmasterControlGrade = function () {
            _this.headmasterRoute.post("/grade/create", grade_controller_1.default.createGrade);
            _this.headmasterRoute.post("/grade/setToStudent", grade_controller_1.default.setGradeStudent);
            _this.headmasterRoute.post("/grade/getGradeStudent", grade_controller_1.default.getGradeStudent);
        };
        this.headmasterRoute = (0, express_1.Router)();
        this.headmasterControlTeacher();
        this.headmasterControlHomeroom();
        this.headmasterControlStudent();
        this.headmasterControlParent();
        this.headmasterControlClasses();
        this.headmasterControlCourse();
        this.headmasterControlScore();
        this.headmasterControlSchedule();
        this.headmasterControlGrade();
    }
    return headmasterRoutes;
}());
var headmasterRouter = new headmasterRoutes().headmasterRoute;
exports.headmasterRouter = headmasterRouter;
