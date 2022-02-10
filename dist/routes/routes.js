"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var calendar_controller_1 = __importDefault(require("../controllers/calendar.controller"));
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var authJwt_1 = __importDefault(require("../middlewares/authJwt"));
var course_routes_1 = __importDefault(require("./course.routes"));
var headmaster_routes_1 = require("./headmaster.routes");
var homeroom_routes_1 = require("./homeroom.routes");
var parents_routes_1 = require("./parents.routes");
var schedule_routes_1 = __importDefault(require("./schedule.routes"));
var schoolwork_routes_1 = __importDefault(require("./schoolwork.routes"));
var students_routes_1 = require("./students.routes");
var teacher_routes_1 = require("./teacher.routes");
var Routes = /** @class */ (function () {
    function Routes() {
        var _this = this;
        this.routes = function () {
            _this.router.get("/", function (req, res) {
                res.status(200).json({ message: "Success!" });
            });
            _this.router.post("/register", user_controller_1.default.register);
            _this.router.post("/login", user_controller_1.default.login);
            _this.router.post("/forgot-password", user_controller_1.default.userForgotPassword);
            _this.router.put("/change-password", user_controller_1.default.userChangePassword);
            _this.router.use("/schoolwork", schoolwork_routes_1.default);
            _this.router.use("/course", course_routes_1.default);
            _this.router.use("/schedule", schedule_routes_1.default);
            _this.router.post("/addEvent", calendar_controller_1.default.createCalendar);
            _this.router.get("/getEvent", calendar_controller_1.default.getCalendar);
        };
        this.headmasterRoute = function () {
            _this.router.use("/headmaster", authJwt_1.default.authentication, authJwt_1.default.isHeadmaster, headmaster_routes_1.headmasterRouter);
        };
        this.teacherRoute = function () {
            _this.router.use("/teacher", authJwt_1.default.authentication, authJwt_1.default.isTeacher, teacher_routes_1.teacherRouter);
        };
        this.homeroomRoute = function () {
            _this.router.use("/homeroom", homeroom_routes_1.homeroomRouter);
        };
        this.studentRoute = function () {
            _this.router.use("/student", students_routes_1.studentRouter);
        };
        this.parentRoute = function () {
            _this.router.use("/parent", parents_routes_1.parentRouter);
        };
        this.router = (0, express_1.Router)();
        this.routes();
        this.headmasterRoute();
        this.teacherRoute();
        this.homeroomRoute();
        this.studentRoute();
        this.parentRoute();
    }
    return Routes;
}());
exports.default = new Routes().router;
