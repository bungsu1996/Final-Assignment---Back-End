"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var headMasterSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    role: { type: String, default: "headmaster" },
});
var HeadMaster = (0, mongoose_1.model)("headmaster", headMasterSchema);
exports.default = HeadMaster;
