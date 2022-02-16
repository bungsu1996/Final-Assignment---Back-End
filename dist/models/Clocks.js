"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var clockSchema = new mongoose_1.Schema({
    no: { type: String, required: true },
    jam: { type: String, required: true },
});
var Clock = (0, mongoose_1.model)("clock", clockSchema);
exports.default = Clock;
