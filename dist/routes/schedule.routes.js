"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
var scheduleRoutes = /** @class */ (function () {
    function scheduleRoutes() {
        var _this = this;
        this.scheduleroutes = function () {
            _this.scheduleRoutes.get("/", schedule_controller_1.default.listSchedule);
            _this.scheduleRoutes.post("/create", schedule_controller_1.default.createSchedule);
        };
        this.scheduleRoutes = (0, express_1.Router)();
        this.scheduleroutes();
    }
    return scheduleRoutes;
}());
exports.default = new scheduleRoutes().scheduleRoutes;
