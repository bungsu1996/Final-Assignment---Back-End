"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var studentSchema = new mongoose_1.Schema({
    nis: { type: String, unique: true, default: 0 },
    email: { type: String, unique: true },
    emailSend: { type: String, required: true, unique: true },
    password: { type: String, default: "1234abcd" },
    fullName: { type: String },
    birthDate: { type: String },
    yearAcademic: { type: String, default: "2021/2022" },
    role: { type: String, default: "student" },
    status: { type: String, default: "active" },
    classes: { type: mongoose_1.Schema.Types.ObjectId, ref: "class" },
    schedule: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "calendar" }],
    score: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "score" }],
    parent: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "parent" }],
    grade: { type: mongoose_1.Schema.Types.ObjectId, ref: "grade" },
});
var Student = (0, mongoose_1.model)("student", studentSchema);
exports.default = Student;
