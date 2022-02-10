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
var Teachers_1 = __importDefault(require("../models/Teachers"));
var Courses_1 = __importDefault(require("../models/Courses"));
var Class_1 = __importDefault(require("../models/Class"));
var Courses_2 = __importDefault(require("../models/Courses"));
var Score_1 = __importDefault(require("../models/Score"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var Otp_1 = __importDefault(require("../models/Otp"));
var Students_1 = __importDefault(require("../models/Students"));
var TeacherController = /** @class */ (function () {
    function TeacherController() {
    }
    TeacherController.createTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, emailSend, fullName, birthDate, course, teachClass, word, num, password, hashPass, hashedPass, findCourse, findClass, schoolEmail, setEmail, result, transporter, mailOption, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, emailSend = _a.emailSend, fullName = _a.fullName, birthDate = _a.birthDate, course = _a.course, teachClass = _a.teachClass;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        word = fullName.split(" ");
                        num = birthDate.replace(/-/g, "");
                        password = word[0].toLowerCase() + num;
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                        return [4 /*yield*/, Courses_1.default.findOne({ course: course })];
                    case 2:
                        findCourse = _b.sent();
                        if (!findCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ className: teachClass })];
                    case 3:
                        findClass = _b.sent();
                        if (!findClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        schoolEmail = "@sdsukamaju.co.id";
                        setEmail = word[0].toLowerCase() + "." + num + schoolEmail;
                        return [4 /*yield*/, Teachers_1.default.create({
                                // nip: nip,
                                email: setEmail,
                                emailSend: emailSend,
                                password: hashedPass,
                                fullName: fullName,
                                birthDate: birthDate,
                                course: findCourse,
                                teachClass: findClass,
                            })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, Courses_2.default.findByIdAndUpdate(findCourse, {
                                $set: { teacher: result._id },
                            })];
                    case 5:
                        _b.sent();
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
                            subject: "Account Teacher School For Access Teacher Data School Sdn Sukamaju",
                            html: "<p>Welcome to " + fullName + " in Teacher Teams Sdn Sukamaju<br />Please use this account for login to School Sdn Sukamaju :<br /><b>Email:</b> " + result.email + "<br /><b>Password:</b> " + password + "</p><br /><b>Dont Tell To Another This Account! Private Account Teacher</b><br />",
                        };
                        transporter.sendMail(mailOption, function (err, info) {
                            if (err) {
                                console.log("Error! Sendemail Failed!", err);
                            }
                            else {
                                console.log("Sendemail Succesfull!", info.response);
                            }
                        });
                        res.status(201).json({ Message: result });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.log(error_1.message);
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.findAllTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Teachers_1.default.find().populate("course teachClass")];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.findTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundTeacher, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Teachers_1.default.findById(id)];
                    case 2:
                        foundTeacher = _a.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findById(foundTeacher).populate("course teachClass")];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.getTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findById(id)];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4.message);
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.updateTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, fullName, birthDate, course, teachClass, findCourse, findClass, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, fullName = _a.fullName, birthDate = _a.birthDate, course = _a.course, teachClass = _a.teachClass;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Courses_1.default.findOne({ course: course })];
                    case 2:
                        findCourse = _b.sent();
                        if (!findCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ nameClass: teachClass })];
                    case 3:
                        findClass = _b.sent();
                        if (!findClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(id, {
                                fullName: fullName,
                                birthData: birthDate,
                                course: findCourse,
                                teachClass: findClass,
                            }, { new: true })];
                    case 4:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _b.sent();
                        console.log(error_5.message);
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.deleteTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findByIdAndDelete(id)];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6.message);
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.addSpesificCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, course, foundTeacher, foundCourse, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        course = req.body.course;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Teachers_1.default.findById(id)];
                    case 2:
                        foundTeacher = _a.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Courses_2.default.findById({ _id: course })];
                    case 3:
                        foundCourse = _a.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                $push: { course: foundCourse },
                            }).populate("course")];
                    case 4:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        console.log(error_7.message);
                        next(error_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.updateSpesificCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, course, foundTeacher, foundCourse, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        course = req.body.course;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Teachers_1.default.findById(id)];
                    case 2:
                        foundTeacher = _a.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Courses_2.default.findById({ _id: course })];
                    case 3:
                        foundCourse = _a.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                course: course,
                            }, { new: true }).populate("course")];
                    case 4:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        console.log(error_8.message);
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.searchManageScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, academicYear, semester, classes, result, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, academicYear = _a.academicYear, semester = _a.semester, classes = _a.classes;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.find({
                                className: classes,
                                yearAcademic: academicYear,
                                semester: semester,
                            }).populate({
                                path: "student",
                                select: "fullName score",
                                populate: {
                                    path: "score",
                                    select: "course dailyScore midtest finaltest resultScore",
                                    populate: { path: "course" },
                                },
                            })];
                    case 2:
                        result = _b.sent();
                        if (result.length === 0) {
                            throw { name: "NOT_FOUND_SEARCH" };
                        }
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _b.sent();
                        console.log(error_9.message);
                        next(error_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.getScoreSpecific = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Score_1.default.findOne({ id: id }).populate("course")];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            throw { name: "NOT_FOUND_SEARCH" };
                        }
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        console.log(error_10.message);
                        next(error_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.manageAllScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, dailyScore, midtest, finaltest, update, reScore, result, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, dailyScore = _a.dailyScore, midtest = _a.midtest, finaltest = _a.finaltest;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                dailyScore: dailyScore,
                                midtest: midtest,
                                finaltest: finaltest,
                            }, { new: true })];
                    case 2:
                        update = _b.sent();
                        reScore = update.dailyScore + update.midtest + update.finaltest / 3;
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                resultScore: reScore,
                            }, { new: true })];
                    case 3:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _b.sent();
                        console.log(error_11.message);
                        next(error_11);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.spesificScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Score_1.default.findById(id).populate("course")];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _a.sent();
                        console.log(error_12.message);
                        next(error_12);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.updateScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, nama, value, updateScore, resultScore, result, updateScore, resultScore, result, updateScore, resultScore, result, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, nama = _a.nama, value = _a.value;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 12, , 13]);
                        if (!(nama === "dailyScore")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                dailyScore: value,
                            }, { new: true }).populate("course")];
                    case 2:
                        updateScore = _b.sent();
                        resultScore = (updateScore.dailyScore +
                            updateScore.midtest +
                            updateScore.finaltest) /
                            3;
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                resultScore: resultScore,
                            }, {
                                new: true,
                            }).populate("course")];
                    case 3:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(nama === "midtest")) return [3 /*break*/, 7];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                midtest: value,
                            }, { new: true }).populate("course")];
                    case 5:
                        updateScore = _b.sent();
                        resultScore = (updateScore.dailyScore +
                            updateScore.midtest +
                            updateScore.finaltest) /
                            3;
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                resultScore: resultScore,
                            }, {
                                new: true,
                            }).populate("course")];
                    case 6:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(nama === "finaltest")) return [3 /*break*/, 10];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                finaltest: value,
                            }, { new: true }).populate("course")];
                    case 8:
                        updateScore = _b.sent();
                        resultScore = (updateScore.dailyScore +
                            updateScore.midtest +
                            updateScore.finaltest) /
                            3;
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(id, {
                                resultScore: resultScore,
                            }, {
                                new: true,
                            }).populate("course")];
                    case 9:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 11];
                    case 10: throw { name: "Name Score not found" };
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_13 = _b.sent();
                        console.log(error_13.message);
                        next(error_13);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.findStudentScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Score_1.default.findById(id)];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_14 = _a.sent();
                        console.log(error_14.message);
                        next(error_14);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.forgotPasswordTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, foundTeacher, response, otpCode, otpData, transporter, mailOption, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Teachers_1.default.findOne({ email: email })];
                    case 2:
                        foundTeacher = _a.sent();
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
                        response.message = "Email id teacher does not exists";
                        _a.label = 5;
                    case 5:
                        res.status(200).json(response);
                        return [3 /*break*/, 7];
                    case 6:
                        error_15 = _a.sent();
                        console.log(error_15.name);
                        next(error_15);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.changePasswordTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, code, password, response, foundOtp, hashPass, hashedPass, currentTime, diff, foundTeacher, error_16;
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
                        return [3 /*break*/, 9];
                    case 8:
                        error_16 = _b.sent();
                        console.log(error_16.name);
                        next(error_16);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.getClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.findById(id).populate({
                                path: "student",
                                populate: { path: "grade" },
                            })];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_17 = _a.sent();
                        console.log(error_17.name);
                        next(error_17);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherController.getGrade = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundStudent, result, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Students_1.default.findById(id)];
                    case 2:
                        foundStudent = _a.sent();
                        if (!foundStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        return [4 /*yield*/, Students_1.default.findById(foundStudent)
                                .populate("grade")
                                .populate({ path: "score", populate: { path: "course" } })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_18 = _a.sent();
                        console.log(error_18.name);
                        next(error_18);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TeacherController;
}());
exports.default = TeacherController;
