"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var scheduleSchema = new mongoose_1.Schema({
    hari: { type: String, required: true },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "course" },
    teacher: { type: mongoose_1.Schema.Types.ObjectId, ref: "teacher" },
    clock: { type: mongoose_1.Schema.Types.ObjectId, ref: "clock" },
    hourlyTeach: { type: String, default: "1 hour" },
    startTeach: { type: String, default: "00:00" },
    endTeach: { type: String, default: "00:00" },
}, {
    versionKey: false,
});
var Schedule = (0, mongoose_1.model)("schedule", scheduleSchema);
exports.default = Schedule;
