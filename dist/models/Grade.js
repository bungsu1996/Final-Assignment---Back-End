"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var gradeSchema = new mongoose_1.Schema({
    grade: { type: String, unique: true }
}, {
    versionKey: false,
});
var Grade = (0, mongoose_1.model)("grade", gradeSchema);
exports.default = Grade;
