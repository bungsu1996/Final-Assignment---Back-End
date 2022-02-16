"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentRouter = void 0;
var express_1 = require("express");
var parents_controller_1 = __importDefault(require("../controllers/parents.controller"));
var ParentRoutes = /** @class */ (function () {
    function ParentRoutes() {
        var _this = this;
        this.parentScoreStudent = function () {
            _this.parentRoute.get("/score-student/:id", parents_controller_1.default.seeScoreStudentParent);
        };
        this.parentForgotPassword = function () {
            _this.parentRoute.post("/forgot-password", parents_controller_1.default.forgotPasswordParent);
            _this.parentRoute.put("/change-password", parents_controller_1.default.changePasswordParent);
        };
        this.parentRoute = (0, express_1.Router)();
        this.parentScoreStudent();
        this.parentForgotPassword();
    }
    return ParentRoutes;
}());
var parentRouter = new ParentRoutes().parentRoute;
exports.parentRouter = parentRouter;
