"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var yearAcademicSchema = new mongoose_1.Schema({
    yearAcademic: { type: String },
}, {
    versionKey: false,
});
var YearAcademic = (0, mongoose_1.model)("yearacademic", yearAcademicSchema);
exports.default = YearAcademic;
