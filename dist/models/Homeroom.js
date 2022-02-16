"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var homeroomSchema = new mongoose_1.Schema({
    homeroomName: { type: mongoose_1.Schema.Types.ObjectId, ref: "teacher" },
    className: { type: mongoose_1.Schema.Types.ObjectId, ref: "class" },
    role: { type: String, default: 'homeroom' }
}, {
    versionKey: false,
});
var Homeroom = (0, mongoose_1.model)("homeroom", homeroomSchema);
exports.default = Homeroom;
