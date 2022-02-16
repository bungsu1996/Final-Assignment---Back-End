"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
var express_1 = require("express");
var course_controller_1 = __importDefault(require("../controllers/course.controller"));
var grade_controller_1 = __importDefault(require("../controllers/grade.controller"));
var score_controller_1 = __importDefault(require("../controllers/score.controller"));
var teacher_controller_1 = __importDefault(require("../controllers/teacher.controller"));
var TeacherRoutes = /** @class */ (function () {
    function TeacherRoutes() {
        var _this = this;
        this.teacher = function () {
            _this.teacherRoute.get("/:id", teacher_controller_1.default.getTeacher);
        };
        this.spesificCourse = function () {
            _this.teacherRoute.get("/course/:id", course_controller_1.default.findCourse);
        };
        this.teacherControlScore = function () {
            _this.teacherRoute.post("/score/create", score_controller_1.default.createScore);
            _this.teacherRoute.post("/score/set-score", score_controller_1.default.createTestScore);
            _this.teacherRoute.get("/score/search-by", teacher_controller_1.default.searchManageScore);
            _this.teacherRoute.put("/score/update-score/:id", teacher_controller_1.default.updateScore);
            _this.teacherRoute.get("/score/:id", score_controller_1.default.spesificScore);
            _this.teacherRoute.put("/score/manageScore/:id", teacher_controller_1.default.manageAllScore);
        };
        this.teacherScoreSpesific = function () {
            _this.teacherRoute.get("/score/spesific/:id", teacher_controller_1.default.getScoreSpecific);
        };
        this.teacherForgotPassword = function () {
            _this.teacherRoute.post("/forgot-password", teacher_controller_1.default.forgotPasswordTeacher);
            _this.teacherRoute.put("/change-password", teacher_controller_1.default.changePasswordTeacher);
        };
        this.findScoreStudent = function () {
            _this.teacherRoute.get("/score/search/:id", teacher_controller_1.default.findStudentScore);
            _this.teacherRoute.get("/score/student/:id", teacher_controller_1.default.spesificScore);
            _this.teacherRoute.get("/student/grade/:id", teacher_controller_1.default.getGrade);
            _this.teacherRoute.post("/student/grade/setGrade", grade_controller_1.default.setGradeStudent);
            _this.teacherRoute.get("/student/grade", grade_controller_1.default.findAllGrade);
        };
        this.getSpesificClass = function () {
            _this.teacherRoute.get("/class/:id", teacher_controller_1.default.getClass);
            _this.teacherRoute.get("/teach-class/:id", teacher_controller_1.default.findTeacher);
        };
        this.teacherRoute = (0, express_1.Router)();
        this.teacher();
        this.teacherControlScore();
        this.teacherScoreSpesific();
        this.teacherForgotPassword();
        this.findScoreStudent();
        this.getSpesificClass();
        this.spesificCourse();
    }
    return TeacherRoutes;
}());
var teacherRouter = new TeacherRoutes().teacherRoute;
exports.teacherRouter = teacherRouter;
