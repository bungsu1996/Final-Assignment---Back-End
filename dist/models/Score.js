"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var scoreSchema = new mongoose_1.Schema({
    nameWork: { type: mongoose_1.Schema.Types.ObjectId, ref: "schoolwork" },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "course" },
    dailyScore: { type: Number, default: 0, min: 0, max: 100 },
    midtest: { type: Number, default: 0, min: 0, max: 100 },
    finaltest: { type: Number, default: 0, min: 0, max: 100 },
    resultScore: { type: Number, default: 0, min: 0, max: 100 },
}, {
    timestamps: true,
    versionKey: false,
});
var Score = (0, mongoose_1.model)("score", scoreSchema);
exports.default = Score;
