"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var teacherSchema = new mongoose_1.Schema({
    // nip: { type: String, default: 0 },
    email: { type: String, unique: true },
    emailSend: { type: String, unique: true, required: true },
    password: { type: String, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    course: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "course" }],
    schedule: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "calendar" }],
    teachClass: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "class" }],
    role: { type: String, default: "Teacher" },
    homeClass: { type: mongoose_1.Schema.Types.ObjectId, ref: "class" }
});
var Teacher = (0, mongoose_1.model)("teacher", teacherSchema);
exports.default = Teacher;
