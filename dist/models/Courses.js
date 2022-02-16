"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var courseSchema = new mongoose_1.Schema({
    course: { type: String, required: true },
    teacher: { type: mongoose_1.Schema.Types.ObjectId, ref: 'teacher' }
}, {
    versionKey: false,
});
var Course = (0, mongoose_1.model)("course", courseSchema);
exports.default = Course;
