"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var schoolwork_controller_1 = __importDefault(require("../controllers/schoolwork.controller"));
var schoolworkRoutes = /** @class */ (function () {
    function schoolworkRoutes() {
        var _this = this;
        this.schoolworkroutes = function () {
            _this.schoolworkRoutes.get("/", schoolwork_controller_1.default.getList);
            _this.schoolworkRoutes.post("/create", schoolwork_controller_1.default.create);
        };
        this.schoolworkRoutes = (0, express_1.Router)();
        this.schoolworkroutes();
    }
    return schoolworkRoutes;
}());
exports.default = new schoolworkRoutes().schoolworkRoutes;
