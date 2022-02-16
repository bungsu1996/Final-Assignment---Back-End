"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var HeadMasters_1 = __importDefault(require("../models/HeadMasters"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var Students_1 = __importDefault(require("../models/Students"));
var Parents_1 = __importDefault(require("../models/Parents"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var Otp_1 = __importDefault(require("../models/Otp"));
var users = /** @class */ (function () {
    function users() {
    }
    users.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, role, fullName, birthDate, course, classes, child, father, mother, salt, hashedPassword, result, result, result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, role = _a.role, fullName = _a.fullName, birthDate = _a.birthDate, course = _a.course, classes = _a.classes, child = _a.child, father = _a.father, mother = _a.mother;
                        salt = bcryptjs_1.default.genSaltSync(10);
                        hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                        if (!(role === "Headmaster")) return [3 /*break*/, 2];
                        return [4 /*yield*/, HeadMasters_1.default.create({
                                email: email.toLowerCase(),
                                password: hashedPassword,
                                fullName: fullName,
                                birthDate: new Date(birthDate),
                            })];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ result: result });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(role === "Teacher")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Teachers_1.default.create({
                                email: email.toLowerCase(),
                                password: hashedPassword,
                                fullName: fullName,
                                birthDate: new Date(birthDate),
                                course: course,
                            })];
                    case 3:
                        result = _b.sent();
                        res.status(200).json({ result: result });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(role === "Student")) return [3 /*break*/, 6];
                        return [4 /*yield*/, Students_1.default.create({
                                email: email.toLowerCase(),
                                password: hashedPassword,
                                fullName: fullName,
                                birthDate: new Date(birthDate),
                                class: classes,
                            })];
                    case 5:
                        result = _b.sent();
                        res.status(200).json({ result: result });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(role === "Parent")) return [3 /*break*/, 8];
                        return [4 /*yield*/, Parents_1.default.create({
                                email: email.toLowerCase(),
                                password: hashedPassword,
                                father: father,
                                mother: mother,
                                birthDate: new Date(birthDate),
                                child: child,
                            })];
                    case 7:
                        result = _b.sent();
                        res.status(200).json({ result: result });
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    users.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, role, result, checkPass, token, result, checkPass, token, result, checkPass, token, result, checkPass, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                        if (!(role === "Headmaster")) return [3 /*break*/, 2];
                        return [4 /*yield*/, HeadMasters_1.default.findOne({
                                email: email.toLowerCase(),
                            })];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            res.status(404).json({ message: "Account not found" });
                        }
                        checkPass = bcryptjs_1.default.compareSync(password, result.password);
                        if (!checkPass) {
                            res.status(404).json({ message: "Password wrong!" });
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: result.id,
                            email: result.email,
                            fullName: result.fullName,
                            role: result.role,
                            birthDate: result.birthDate,
                        }, "this is a secret key token", {
                            expiresIn: 86400,
                        });
                        res.status(200).json({
                            token: token,
                            user: {
                                id: result.id,
                                email: result.email,
                                fullName: result.fullName,
                                role: result.role,
                                birthDate: result.birthDate,
                            },
                        });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(role === "Teacher")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Teachers_1.default.findOne({
                                email: email.toLowerCase(),
                            }).populate("teachClass course homeClass")];
                    case 3:
                        result = _b.sent();
                        if (!result) {
                            res.status(404).json({ message: "Account not found" });
                        }
                        checkPass = bcryptjs_1.default.compareSync(password, result.password);
                        if (!checkPass) {
                            res.status(404).json({ message: "Password wrong!" });
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: result.id,
                            nip: result.nip,
                            email: result.email,
                            fullName: result.fullName,
                            role: result.role,
                            teachClass: result.teachClass,
                            birthDate: result.birthDate,
                            course: result.course,
                            homeClass: result.homeClass,
                        }, "this is a secret key token", {
                            expiresIn: 86400,
                        });
                        res.status(200).json({
                            token: token,
                            user: {
                                id: result.id,
                                email: result.email,
                                fullName: result.fullName,
                                role: result.role,
                                teachClass: result.teachClass,
                                birthDate: result.birthDate,
                                course: result.course,
                                homeClass: result.homeClass,
                            },
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(role === "Student")) return [3 /*break*/, 6];
                        return [4 /*yield*/, Students_1.default.findOne({
                                email: email.toLowerCase(),
                            })];
                    case 5:
                        result = _b.sent();
                        if (!result) {
                            res.status(404).json({ message: "Account not found" });
                        }
                        checkPass = bcryptjs_1.default.compareSync(password, result.password);
                        if (!checkPass) {
                            res.status(404).json({ message: "Password wrong!" });
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: result.id,
                            email: result.email,
                            fullName: result.fullName,
                            role: result.role,
                            birthDate: result.birthDate,
                            status: result.status,
                            classes: result.classes,
                            parent: result.parent,
                            score: result.score,
                            grade: result.grade,
                            schedule: result.schedule,
                        }, "this is a secret key token", {
                            expiresIn: 86400,
                        });
                        res.status(200).json({
                            token: token,
                            user: {
                                id: result.id,
                                email: result.email,
                                fullName: result.fullName,
                                role: result.role,
                                birthDate: result.birthDate,
                                status: result.status,
                                classes: result.classes,
                                parent: result.parent,
                                score: result.score,
                                grade: result.grade,
                                schedule: result.schedule,
                            },
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(role === "Parent")) return [3 /*break*/, 8];
                        return [4 /*yield*/, Parents_1.default.findOne({
                                email: email.toLowerCase(),
                            })];
                    case 7:
                        result = _b.sent();
                        if (!result) {
                            res.status(404).json({ message: "Account not found" });
                        }
                        checkPass = bcryptjs_1.default.compareSync(password, result.password);
                        if (!checkPass) {
                            res.status(404).json({ message: "Password wrong!" });
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: result.id,
                            email: result.email,
                            father: result.father,
                            mother: result.mother,
                            role: result.role,
                        }, "this is a secret key token", {
                            expiresIn: 86400,
                        });
                        res.status(200).json({
                            token: token,
                            user: {
                                id: result.id,
                                email: result.email,
                                father: result.father,
                                mother: result.mother,
                                role: result.role,
                            },
                        });
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    users.userForgotPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, role, email, foundTeacher, response, otpCode, otpData, transporter, mailOption, foundStudent, response, otpCode, otpData, transporter, mailOption, foundParent, response, otpCode, otpData, transporter, mailOption, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, role = _a.role, email = _a.email;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 17, , 18]);
                        if (!(role === "Teacher")) return [3 /*break*/, 6];
                        return [4 /*yield*/, Teachers_1.default.findOne({ email: email })];
                    case 2:
                        foundTeacher = _b.sent();
                        response = {};
                        if (!foundTeacher) return [3 /*break*/, 4];
                        otpCode = Math.floor(Math.random() * 10000 + 1);
                        otpData = new Otp_1.default({
                            email: email.toLowerCase(),
                            code: otpCode,
                            expireIn: new Date().getTime() + 300 * 1000,
                        });
                        transporter = nodemailer_1.default.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "studentt872@gmail.com",
                                pass: "Abcd_1234",
                            },
                        });
                        mailOption = {
                            from: "studentt872@gmail.com",
                            to: foundTeacher.email,
                            subject: "Forgot Password. This Code OTP For Verification Account",
                            text: "Code OTP: " + otpCode,
                            html: "<p>Click This Link to Change Password<p> <br/ > <a>http://localhost:4200/changePassword</a>",
                        };
                        transporter.sendMail(mailOption, function (err, info) {
                            if (err) {
                                console.log("Error! Sendemail Failed!", err);
                            }
                            else {
                                console.log("Sendemail Succesfull!", info.response);
                            }
                        });
                        return [4 /*yield*/, otpData.save()];
                    case 3:
                        _b.sent();
                        response.statusText = "succes";
                        response.message = "Please check your email Teacher id";
                        return [3 /*break*/, 5];
                    case 4:
                        response.statusText = "error";
                        response.message = "Email id teacher does not exists";
                        _b.label = 5;
                    case 5:
                        res.status(200).json(response);
                        return [3 /*break*/, 16];
                    case 6:
                        if (!(role === "Student")) return [3 /*break*/, 11];
                        return [4 /*yield*/, Students_1.default.findOne({ email: email })];
                    case 7:
                        foundStudent = _b.sent();
                        response = {};
                        if (!foundStudent) return [3 /*break*/, 9];
                        otpCode = Math.floor(Math.random() * 10000 + 1);
                        otpData = new Otp_1.default({
                            email: email.toLowerCase(),
                            code: otpCode,
                            expireIn: new Date().getTime() + 300 * 1000,
                        });
                        transporter = nodemailer_1.default.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "studentt872@gmail.com",
                                pass: "Abcd_1234",
                            },
                        });
                        mailOption = {
                            from: "studentt872@gmail.com",
                            to: foundStudent.email,
                            subject: "Forgot Password. This Code OTP For Verification Account",
                            text: "Code OTP: " + otpCode,
                        };
                        transporter.sendMail(mailOption, function (err, info) {
                            if (err) {
                                console.log("Error! Sendemail Failed!", err);
                            }
                            else {
                                console.log("Sendemail Succesfull!", info.response);
                            }
                        });
                        return [4 /*yield*/, otpData.save()];
                    case 8:
                        _b.sent();
                        response.statusText = "succes";
                        response.message = "Please check your email Student id";
                        return [3 /*break*/, 10];
                    case 9:
                        response.statusText = "error";
                        response.message = "Email id student does not exists";
                        _b.label = 10;
                    case 10:
                        res.status(200).json(response);
                        return [3 /*break*/, 16];
                    case 11:
                        if (!(role === "Parent")) return [3 /*break*/, 16];
                        return [4 /*yield*/, Parents_1.default.findOne({ email: email })];
                    case 12:
                        foundParent = _b.sent();
                        response = {};
                        if (!foundParent) return [3 /*break*/, 14];
                        otpCode = Math.floor(Math.random() * 10000 + 1);
                        otpData = new Otp_1.default({
                            email: email.toLowerCase(),
                            code: otpCode,
                            expireIn: new Date().getTime() + 300 * 1000,
                        });
                        transporter = nodemailer_1.default.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "studentt872@gmail.com",
                                pass: "Abcd_1234",
                            },
                        });
                        mailOption = {
                            from: "studentt872@gmail.com",
                            to: foundParent.email,
                            subject: "Forgot Password. This Code OTP For Verification Account",
                            text: "Code OTP: " + otpCode,
                        };
                        transporter.sendMail(mailOption, function (err, info) {
                            if (err) {
                                console.log("Error! Sendemail Failed!", err);
                            }
                            else {
                                console.log("Sendemail Succesfull!", info.response);
                            }
                        });
                        return [4 /*yield*/, otpData.save()];
                    case 13:
                        _b.sent();
                        response.statusText = "succes";
                        response.message = "Please check your email Parent id";
                        return [3 /*break*/, 15];
                    case 14:
                        response.statusText = "error";
                        response.message = "Email id parent does not exists";
                        _b.label = 15;
                    case 15:
                        res.status(200).json(response);
                        _b.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        error_1 = _b.sent();
                        console.log(error_1.message);
                        next(error_1);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    users.userChangePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, role, email, code, password, response, foundOtp, hashPass, hashedPass, currentTime, diff, foundTeacher, response, foundOtp, hashPass, hashedPass, currentTime, diff, foundStudent, response, foundOtp, hashPass, hashedPass, currentTime, diff, foundParent, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, role = _a.role, email = _a.email, code = _a.code, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 23, , 24]);
                        if (!(role === "Teacher")) return [3 /*break*/, 8];
                        response = {};
                        return [4 /*yield*/, Otp_1.default.find({ email: email, code: code })];
                    case 2:
                        foundOtp = _b.sent();
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                        if (!foundOtp) return [3 /*break*/, 6];
                        currentTime = new Date().getTime();
                        diff = foundOtp.expireIn - currentTime;
                        if (!diff) return [3 /*break*/, 3];
                        response.message = "Token Expire";
                        response.statusText = "error";
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Teachers_1.default.findOneAndUpdate({ email: email }, {
                            password: hashedPass,
                        }, { new: true })];
                    case 4:
                        foundTeacher = _b.sent();
                        response.message = "Change password succesfull. New Password: " + foundTeacher;
                        response.statusText = "success";
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        response.message = "Invalid Otp";
                        response.statusText = "error";
                        _b.label = 7;
                    case 7:
                        res.status(200).json(response);
                        return [3 /*break*/, 22];
                    case 8:
                        if (!(role === "Student")) return [3 /*break*/, 15];
                        response = {};
                        return [4 /*yield*/, Otp_1.default.find({ email: email, code: code })];
                    case 9:
                        foundOtp = _b.sent();
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                        if (!foundOtp) return [3 /*break*/, 13];
                        currentTime = new Date().getTime();
                        diff = foundOtp.expireIn - currentTime;
                        if (!diff) return [3 /*break*/, 10];
                        response.message = "Token Expire";
                        response.statusText = "error";
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, Students_1.default.findOneAndUpdate({ email: email }, {
                            password: hashedPass,
                        }, { new: true })];
                    case 11:
                        foundStudent = _b.sent();
                        response.message = "Change password succesfull. New Password: " + foundStudent;
                        response.statusText = "success";
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        response.message = "Invalid Otp";
                        response.statusText = "error";
                        _b.label = 14;
                    case 14:
                        res.status(200).json(response);
                        return [3 /*break*/, 22];
                    case 15:
                        if (!(role === "Parent")) return [3 /*break*/, 22];
                        response = {};
                        return [4 /*yield*/, Otp_1.default.find({ email: email, code: code })];
                    case 16:
                        foundOtp = _b.sent();
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                        if (!foundOtp) return [3 /*break*/, 20];
                        currentTime = new Date().getTime();
                        diff = foundOtp.expireIn - currentTime;
                        if (!diff) return [3 /*break*/, 17];
                        response.message = "Token Expire";
                        response.statusText = "error";
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, Parents_1.default.findOneAndUpdate({ email: email }, {
                            password: hashedPass,
                        }, { new: true })];
                    case 18:
                        foundParent = _b.sent();
                        response.message = "Change password succesfull. New Password: " + foundParent;
                        response.statusText = "success";
                        _b.label = 19;
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        response.message = "Invalid Otp";
                        response.statusText = "error";
                        _b.label = 21;
                    case 21:
                        res.status(200).json(response);
                        _b.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        error_2 = _b.sent();
                        console.log(error_2.name);
                        next(error_2);
                        return [3 /*break*/, 24];
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    return users;
}());
exports.default = users;
