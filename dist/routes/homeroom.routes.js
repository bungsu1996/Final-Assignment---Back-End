"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeroomRouter = void 0;
var express_1 = require("express");
var homeroom_controller_1 = __importDefault(require("../controllers/homeroom.controller"));
var HomeroomRoutes = /** @class */ (function () {
    function HomeroomRoutes() {
        var _this = this;
        this.homeroomControlScore = function () {
            _this.homeroomRoute.get("/score/:homeroom", homeroom_controller_1.default.scoreByClassHomeroom);
        };
        this.homeroomRoute = (0, express_1.Router)();
        this.homeroomControlScore();
    }
    return HomeroomRoutes;
}());
var homeroomRouter = new HomeroomRoutes().homeroomRoute;
exports.homeroomRouter = homeroomRouter;
