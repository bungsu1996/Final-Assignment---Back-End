"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
var express_1 = require("express");
var students_controller_1 = __importDefault(require("../controllers/students.controller"));
var StudentRoutes = /** @class */ (function () {
    function StudentRoutes() {
        var _this = this;
        this.studentControl = function () {
            _this.studentRoute.get("/:id", students_controller_1.default.findStudent);
            _this.studentRoute.put("/update/:id", students_controller_1.default.updateStudent);
        };
        this.studentForgotPass = function () {
            _this.studentRoute.post("/forgot-password", students_controller_1.default.forgotPasswordStudent);
            _this.studentRoute.put("/change-password", students_controller_1.default.changePasswordStudent);
        };
        this.studentScore = function () {
            _this.studentRoute.get("/score/:id", students_controller_1.default.seeScore);
        };
        this.studentRoute = (0, express_1.Router)();
        this.studentControl();
        this.studentForgotPass();
        this.studentScore();
    }
    return StudentRoutes;
}());
var studentRouter = new StudentRoutes().studentRoute;
exports.studentRouter = studentRouter;
