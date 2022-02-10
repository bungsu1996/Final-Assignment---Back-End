"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var calendarSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    // endTime: { type: String, requried: true },
    classes: { type: mongoose_1.Schema.Types.ObjectId, ref: "class" },
    daysOfWeek: [{ type: String, default: null }],
    allDay: { type: Boolean, default: false },
}, { versionKey: false });
var Calendar = (0, mongoose_1.model)("calendar", calendarSchema);
exports.default = Calendar;
