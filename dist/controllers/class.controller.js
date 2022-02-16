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
var Class_1 = __importDefault(require("../models/Class"));
var Students_1 = __importDefault(require("../models/Students"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var ClassConttroller = /** @class */ (function () {
    function ClassConttroller() {
    }
    ClassConttroller.createClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, className, yearAcademic, semester, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, className = _a.className, yearAcademic = _a.yearAcademic, semester = _a.semester;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.create({
                                className: className,
                                yearAcademic: yearAcademic,
                                semester: semester,
                            })];
                    case 2:
                        result = _b.sent();
                        res.status(201).json({ Message: result });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1.message);
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.setHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, classes, homeroom, foundTeach, foundClasses, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, classes = _a.classes, homeroom = _a.homeroom;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Teachers_1.default.findById({ _id: homeroom })];
                    case 2:
                        foundTeach = _b.sent();
                        if (!foundTeach) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Class_1.default.findById({ _id: classes })];
                    case 3:
                        foundClasses = _b.sent();
                        if (!foundClasses) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClasses, {
                                homeTeacher: foundTeach,
                            }, { new: true })];
                    case 4:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        console.log(error_2.message);
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.scorebyClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundClassAfter, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Class_1.default.findById(id)];
                    case 2:
                        foundClassAfter = _a.sent();
                        if (!foundClassAfter) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findById(foundClassAfter)
                                .select("className semester student")
                                .populate({
                                path: "student",
                                select: "fullName score",
                                populate: {
                                    path: "score",
                                    model: "score",
                                    populate: { path: "course", model: "course" },
                                },
                            })];
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
    ClassConttroller.classFilterByYear = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var yearAcademic, foundYearAcademic, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        yearAcademic = req.body.yearAcademic;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.find({
                                yearAcademic: yearAcademic,
                            })];
                    case 2:
                        foundYearAcademic = _a.sent();
                        if (!foundYearAcademic) {
                            throw { name: "NOT_FOUND_YEAR" };
                        }
                        res.status(200).json(foundYearAcademic);
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
    ClassConttroller.findAllClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Class_1.default.find()
                                .populate({ path: "homeTeacher", populate: { path: "homeroomName" } })
                                .populate({ path: "student", select: "fullName status" })
                                .populate({
                                path: "schedule",
                                select: "hari course startTeach endTeach",
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5.message);
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.findClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundClass, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Class_1.default.findById(id)];
                    case 2:
                        foundClass = _a.sent();
                        if (!foundClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findById(foundClass).populate({ path: "homeTeacher", select: "fullName" })
                                .populate({ path: "student", select: "fullName status" })
                                .populate({
                                path: "schedule",
                                select: "hari course startTeach endTeach",
                            })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6.message);
                        next(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.updateClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, classes, yearAcademic, semester, foundClass, result, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, classes = _a.classes, yearAcademic = _a.yearAcademic, semester = _a.semester;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Class_1.default.findById(id)];
                    case 2:
                        foundClass = _b.sent();
                        if (!foundClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClass, {
                                className: classes,
                                semester: semester,
                                yearAcademic: yearAcademic,
                            }, { new: true })];
                    case 3:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _b.sent();
                        console.log(error_7.message);
                        next(error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.deleteClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundClassAfter, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Class_1.default.findById({ _id: id })];
                    case 2:
                        foundClassAfter = _a.sent();
                        if (!foundClassAfter) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findByIdAndDelete(foundClassAfter)];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassConttroller.changeClass = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var student, _a, classBefore, classAfter, foundStudent, foundClassBefore, foundClassAfter, result, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        student = req.params.student;
                        _a = req.body, classBefore = _a.classBefore, classAfter = _a.classAfter;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, Students_1.default.findById(student)];
                    case 2:
                        foundStudent = _b.sent();
                        if (!foundStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        return [4 /*yield*/, Class_1.default.findById(classBefore)];
                    case 3:
                        foundClassBefore = _b.sent();
                        if (!foundClassBefore) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findById(classAfter)];
                    case 4:
                        foundClassAfter = _b.sent();
                        if (!foundClassAfter) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Students_1.default.findByIdAndUpdate(foundStudent, {
                                classes: foundClassAfter,
                            }, { new: true })];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClassBefore, {
                                $pull: { student: foundStudent.id },
                            })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClassAfter, {
                                $push: { student: foundStudent.id },
                            })];
                    case 7:
                        _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 9];
                    case 8:
                        error_9 = _b.sent();
                        console.log(error_9.name);
                        next(error_9);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ClassConttroller;
}());
exports.default = ClassConttroller;
