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
var Courses_1 = __importDefault(require("../models/Courses"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var coursesController = /** @class */ (function () {
    function coursesController() {
    }
    coursesController.createCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var course, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        course = req.body.course;
                        return [4 /*yield*/, Courses_1.default.create({
                                course: course,
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.name);
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    coursesController.findAllCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Courses_1.default.find().populate("teacher")];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    coursesController.findCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Courses_1.default.findById(id).populate("teacher")];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3.name);
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    coursesController.updateCourse = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, course, foundCourse, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        course = req.body.course;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Courses_1.default.findById(id)];
                    case 2:
                        foundCourse = _a.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Courses_1.default.findByIdAndUpdate(foundCourse, {
                                course: course,
                            }, { new: true })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4.name);
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    coursesController.setCourseTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, course, teacher, foundCourse, foundTeacher, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, course = _a.course, teacher = _a.teacher;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Courses_1.default.findOne({ course: course })];
                    case 2:
                        foundCourse = _b.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findOne({ fullName: teacher })];
                    case 3:
                        foundTeacher = _b.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Courses_1.default.findByIdAndUpdate(foundCourse, {
                                $set: { teacher: foundTeacher },
                            }, { new: true })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                $set: { course: foundCourse },
                            })];
                    case 5:
                        _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _b.sent();
                        console.log(error_5.name);
                        next(error_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    coursesController.updateCourseTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, teacher, courseBefore, courseAfter, foundTeacher, foundBefore, foundAfter, result, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, teacher = _a.teacher, courseBefore = _a.courseBefore, courseAfter = _a.courseAfter;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, Teachers_1.default.findOne({ fullName: teacher })];
                    case 2:
                        foundTeacher = _b.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Courses_1.default.findOne({ course: courseBefore })];
                    case 3:
                        foundBefore = _b.sent();
                        if (!foundBefore) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Courses_1.default.findOne({ course: courseAfter })];
                    case 4:
                        foundAfter = _b.sent();
                        if (!foundAfter) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Courses_1.default.findByIdAndUpdate(foundAfter, {
                                teacher: foundTeacher,
                            }, { new: true })];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, Courses_1.default.findByIdAndUpdate(foundBefore, {
                                $unset: { teacher: "" },
                            })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                course: foundAfter,
                            })];
                    case 7:
                        _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 9];
                    case 8:
                        error_6 = _b.sent();
                        console.log(error_6.name);
                        next(error_6);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return coursesController;
}());
exports.default = coursesController;
