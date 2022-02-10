"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
var express_1 = require("express");
var calendar_controller_1 = __importDefault(require("../controllers/calendar.controller"));
var students_controller_1 = __importDefault(require("../controllers/students.controller"));
var StudentRoutes = /** @class */ (function () {
    function StudentRoutes() {
        var _this = this;
        this.studentControl = function () {
            _this.studentRoute.get("/:id", students_controller_1.default.findStudent);
            _this.studentRoute.put("/update/:id", students_controller_1.default.updateStudent);
        };
        this.studentScore = function () {
            _this.studentRoute.get("/score/:id", students_controller_1.default.seeScore);
        };
        this.studentSchedule = function () {
            _this.studentRoute.get("/calendar/:id", calendar_controller_1.default.findSchedule);
        };
        this.studentRoute = (0, express_1.Router)();
        this.studentControl();
        this.studentScore();
        this.studentSchedule();
    }
    return StudentRoutes;
}());
var studentRouter = new StudentRoutes().studentRoute;
exports.studentRouter = studentRouter;
