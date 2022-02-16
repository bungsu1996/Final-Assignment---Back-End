"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var classSchema = new mongoose_1.Schema({
    className: { type: String, required: true },
    yearAcademic: { type: String, required: true },
    semester: { type: String, required: true },
    homeTeacher: { type: mongoose_1.Schema.Types.ObjectId, ref: "homeroom" },
    student: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "student" }],
    schedule: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "schedule" }],
}, {
    versionKey: false,
});
var Class = (0, mongoose_1.model)("class", classSchema);
exports.default = Class;
