"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var otpSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    code: { type: String },
    expireIn: { type: Number }
}, {
    timestamps: true,
    versionKey: false,
});
var Otp = (0, mongoose_1.model)("otp", otpSchema, 'otp');
exports.default = Otp;
