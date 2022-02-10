"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schoolworkSchema = new mongoose_1.Schema({
    nameWork: { type: String, required: true },
}, {
    versionKey: false,
});
var SchoolWork = (0, mongoose_1.model)("schoolwork", schoolworkSchema);
exports.default = SchoolWork;
