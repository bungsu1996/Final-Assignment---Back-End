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
var Schedule_1 = __importDefault(require("../models/Schedule"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var scheduleController = /** @class */ (function () {
    function scheduleController() {
    }
    scheduleController.createSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hari, course, teacher, startTeach, endTeach, hourlyTeach, foundCourse, foundTeacher, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, hari = _a.hari, course = _a.course, teacher = _a.teacher, startTeach = _a.startTeach, endTeach = _a.endTeach, hourlyTeach = _a.hourlyTeach;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!hari && !startTeach && !endTeach && !hourlyTeach) {
                            throw { name: "NOT_FOUND" };
                        }
                        return [4 /*yield*/, Courses_1.default.findById({ _id: course })];
                    case 2:
                        foundCourse = _b.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findById({ _id: teacher })];
                    case 3:
                        foundTeacher = _b.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Schedule_1.default.create({
                                hari: hari,
                                course: foundCourse,
                                teacher: foundTeacher,
                                hourlyTeach: hourlyTeach,
                                startTeach: startTeach,
                                endTeach: endTeach,
                            })];
                    case 4:
                        result = _b.sent();
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
    scheduleController.listSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Schedule_1.default.find()
                                .populate({ path: "teacher", select: "fullName" })
                                .populate({ path: "course", select: "course" })];
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
    scheduleController.spesificSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundSchedule, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Schedule_1.default.findById(id).populate("teacher course")];
                    case 2:
                        foundSchedule = _a.sent();
                        if (!foundSchedule) {
                            throw { name: "NOT_FOUND_SCHEDULE" };
                        }
                        res.status(200).json(foundSchedule);
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
    scheduleController.updateSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, hari, course, teacher, startTeach, endTeach, hourlyTeach, foundSchedule, foundCourse, foundTeacher, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, hari = _a.hari, course = _a.course, teacher = _a.teacher, startTeach = _a.startTeach, endTeach = _a.endTeach, hourlyTeach = _a.hourlyTeach;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Schedule_1.default.findById({ _id: id })];
                    case 2:
                        foundSchedule = _b.sent();
                        if (!foundSchedule) {
                            throw { name: "NOT_FOUND_SCHEDULE" };
                        }
                        return [4 /*yield*/, Courses_1.default.findById({ _id: course })];
                    case 3:
                        foundCourse = _b.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findById({ _id: teacher })];
                    case 4:
                        foundTeacher = _b.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Schedule_1.default.findByIdAndUpdate(foundSchedule, {
                                hari: hari,
                                course: foundCourse,
                                teacher: foundTeacher,
                                hourlyTeach: hourlyTeach,
                                startTeach: startTeach,
                                endTeach: endTeach,
                            }, { new: true })
                                .populate({ path: "teacher", select: "fullName" })
                                .populate({ path: "course", select: "course" })];
                    case 5:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _b.sent();
                        console.log(error_4.name);
                        next(error_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return scheduleController;
}());
exports.default = scheduleController;
