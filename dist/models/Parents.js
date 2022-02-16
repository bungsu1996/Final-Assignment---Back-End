"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var parentSchema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    emailSend: { type: String, required: true, unique: true },
    password: { type: String, default: "1234abcd" },
    father: { type: String, required: true },
    mother: { type: String, required: true },
    birthDate: { type: String },
    role: { type: String, default: 'parent' },
    status: { type: String, default: 'active' },
    student: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "student" }],
    class: { type: mongoose_1.Schema.Types.ObjectId, ref: "class" },
});
var Parent = (0, mongoose_1.model)("parent", parentSchema);
exports.default = Parent;
