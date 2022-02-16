"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var courseRoutes = /** @class */ (function () {
    function courseRoutes() {
        this.courseroutes = function () { };
        this.courseRoutes = (0, express_1.Router)();
        this.courseroutes();
    }
    return courseRoutes;
}());
exports.default = new courseRoutes().courseRoutes;
