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
var Parents_1 = __importDefault(require("../models/Parents"));
var Students_1 = __importDefault(require("../models/Students"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var Otp_1 = __importDefault(require("../models/Otp"));
var ParentController = /** @class */ (function () {
    function ParentController() {
    }
    ParentController.createParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, emailSend, father, mother, birthDate, student, word, num, password, hashPass, hashedPass, findStudent, schoolEmail, setEmail, result, transporter, mailOption, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, emailSend = _a.emailSend, father = _a.father, mother = _a.mother, birthDate = _a.birthDate, student = _a.student;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        word = father.split(" ");
                        num = birthDate.replace(/-/g, "");
                        password = word[0].toLowerCase() + num;
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                        return [4 /*yield*/, Students_1.default.findOne({ fullName: student })];
                    case 2:
                        findStudent = _b.sent();
                        if (!findStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        schoolEmail = "@sdsukamaju.co.id";
                        setEmail = word[0].toLowerCase() + "." + num + schoolEmail;
                        return [4 /*yield*/, Parents_1.default.create({
                                email: setEmail,
                                emailSend: emailSend,
                                password: hashedPass,
                                father: father,
                                mother: mother,
                                birthDate: birthDate,
                                student: findStudent,
                            })];
                    case 3:
                        result = _b.sent();
                        transporter = nodemailer_1.default.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "studentt872@gmail.com",
                                pass: "Abcd_1234",
                            },
                        });
                        mailOption = {
                            from: "studentt872@gmail.com",
                            to: result.emailSend,
                            subject: "Account Parent School For Access Parent Data School Sdn Sukamaju",
                            html: "<p>Welcome to " + father + " in School Sdn Sukamaju<br />Please use this account for login to School Sdn Sukamaju :<br /><b>Email:</b> " + result.email + "<br /><b>Password:</b> " + password + "<br /><b>Student:</b> " + student + "</p><br /><b>Dont Tell To Another This Account! Private Account Student</b><br />",
                        };
                        transporter.sendMail(mailOption, function (err, info) {
                            if (err) {
                                console.log("Error! Sendemail Failed!", err);
                            }
                            else {
                                console.log("Sendemail Succesfull!", info.response);
                            }
                        });
                        return [4 /*yield*/, Students_1.default.findByIdAndUpdate(findStudent, {
                                $push: { parent: result._id },
                            })];
                    case 4:
                        _b.sent();
                        res.status(201).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1.name);
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.findAllParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Parents_1.default.find().populate("student")];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.name);
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.findParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundParent, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Parents_1.default.findById(id)];
                    case 2:
                        foundParent = _a.sent();
                        if (!foundParent) {
                            throw { name: "NOT_FOUND_PARENT" };
                        }
                        return [4 /*yield*/, Parents_1.default.findById(foundParent).populate("student")];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3.name);
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.updateParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, father, mother, birthDate, student, foundParent, findStudent, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, father = _a.father, mother = _a.mother, birthDate = _a.birthDate, student = _a.student;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Parents_1.default.findById(id)];
                    case 2:
                        foundParent = _b.sent();
                        if (!foundParent) {
                            throw { name: "NOT_FOUND_PARENT" };
                        }
                        return [4 /*yield*/, Students_1.default.findOne({ fullName: student })];
                    case 3:
                        findStudent = _b.sent();
                        if (!findStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        console.log(findStudent);
                        return [4 /*yield*/, Parents_1.default.findByIdAndUpdate(foundParent, {
                                father: father,
                                mother: mother,
                                birthData: birthDate,
                            }, { $push: { student: findStudent.id }, new: true })];
                    case 4:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _b.sent();
                        console.log(error_4.name);
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.deleteParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundParent, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Parents_1.default.findById(id)];
                    case 2:
                        foundParent = _a.sent();
                        if (!foundParent) {
                            throw { name: "NOT_FOUND_PARENT" };
                        }
                        return [4 /*yield*/, Parents_1.default.findByIdAndDelete(foundParent)];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5.name);
                        next(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.changeStatusParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, status, foundParent, result, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, status = _a.status;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Parents_1.default.findById(id)];
                    case 2:
                        foundParent = _b.sent();
                        if (!foundParent) {
                            throw { name: "NOT_FOUND_PARENT" };
                        }
                        return [4 /*yield*/, Parents_1.default.findByIdAndUpdate(foundParent, {
                                status: status,
                            }, { new: true })];
                    case 3:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _b.sent();
                        console.log(error_6.name);
                        next(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.forgotPasswordParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, foundParent, response, otpCode, otpData, transporter, mailOption, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Parents_1.default.findOne({ email: email })];
                    case 2:
                        foundParent = _a.sent();
                        response = {};
                        if (!foundParent) return [3 /*break*/, 4];
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
                    case 3:
                        _a.sent();
                        response.statusText = "succes";
                        response.message = "Please check your email id";
                        return [3 /*break*/, 5];
                    case 4:
                        response.statusText = "error";
                        response.message = "Email id parent does not exists";
                        _a.label = 5;
                    case 5:
                        res.status(200).json(response);
                        return [3 /*break*/, 7];
                    case 6:
                        error_7 = _a.sent();
                        console.log(error_7.name);
                        next(error_7);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.changePasswordParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, code, password, response, foundOtp, hashPass, hashedPass, currentTime, diff, foundParent, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, code = _a.code, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
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
                    case 3: return [4 /*yield*/, Parents_1.default.findOneAndUpdate({ email: email }, {
                            password: hashedPass,
                        }, { new: true })];
                    case 4:
                        foundParent = _b.sent();
                        response.message = "Change password succesfull. New Password: " + foundParent;
                        response.statusText = "success";
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        response.message = "Invalid Otp";
                        response.statusText = "error";
                        _b.label = 7;
                    case 7:
                        res.status(200).json(response);
                        return [3 /*break*/, 9];
                    case 8:
                        error_8 = _b.sent();
                        console.log(error_8.name);
                        next(error_8);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ParentController.seeScoreStudentParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundParent, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Parents_1.default.findById(id)];
                    case 2:
                        foundParent = _a.sent();
                        if (!foundParent) {
                            throw { name: "NOT_FOUND_PARENT" };
                        }
                        return [4 /*yield*/, Parents_1.default.findById(foundParent)
                                .select("student")
                                .populate({
                                path: "student",
                                select: "fullName score",
                                populate: {
                                    path: "score",
                                    select: "course dailyScore midtest finaltest resultScore",
                                    populate: { path: "course" },
                                },
                            })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_9 = _a.sent();
                        console.log(error_9.name);
                        next(error_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ParentController;
}());
exports.default = ParentController;
