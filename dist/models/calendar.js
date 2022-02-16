"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var calendarSchema = new mongoose_1.Schema({
    title: { type: String },
    start: { type: String },
    end: { type: String },
    allDay: { type: String },
}, { versionKey: false });
var Calendar = (0, mongoose_1.model)("calendar", calendarSchema);
exports.default = Calendar;
