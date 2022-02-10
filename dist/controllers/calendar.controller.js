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
var M_Calendar_1 = __importDefault(require("../models/M_Calendar"));
var Class_1 = __importDefault(require("../models/Class"));
var calendarController = /** @class */ (function () {
    function calendarController() {
    }
    calendarController.createCalendar = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, start, end, allDay, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, start = _a.start, end = _a.end, allDay = _a.allDay;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, M_Calendar_1.default.create({
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay,
                            })];
                    case 2:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    calendarController.getCalendar = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, M_Calendar_1.default.find()];
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
    calendarController.addNewSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, start, end, classes, daysOfWeek, allDay, foundClass, result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, start = _a.start, end = _a.end, classes = _a.classes, daysOfWeek = _a.daysOfWeek, allDay = _a.allDay;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Class_1.default.findOne({ className: classes })];
                    case 2:
                        foundClass = _b.sent();
                        if (!foundClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, M_Calendar_1.default.create({
                                title: title,
                                start: new Date(start),
                                end: new Date(end),
                                classes: foundClass,
                                daysOfWeek: daysOfWeek,
                                allDay: allDay,
                            })];
                    case 3:
                        result = _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClass, {
                                $push: { schedule: result._id },
                            })];
                    case 4:
                        _b.sent();
                        res.status(201).json(result);
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _b.sent();
                        console.log(error_3.name);
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    calendarController.validationSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, start, end, classes, daysOfWeek, allDay, foundSchedule, foundClass, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, start = _a.start, end = _a.end, classes = _a.classes, daysOfWeek = _a.daysOfWeek, allDay = _a.allDay;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, M_Calendar_1.default.find()];
                    case 2:
                        foundSchedule = _b.sent();
                        if (!foundSchedule) {
                            throw { name: "NOT_FOUND" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ className: classes })];
                    case 3:
                        foundClass = _b.sent();
                        if (!foundClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        foundSchedule.forEach(function (item) {
                            console.log(item.title);
                            if (item.title === title) {
                                console.log("Pelajaran sama, error");
                            }
                        });
                        return [4 /*yield*/, M_Calendar_1.default.create({
                                title: title,
                                start: new Date(start),
                                end: new Date(end),
                                classes: foundClass,
                                daysOfWeek: daysOfWeek,
                                allDay: allDay,
                            })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClass, {
                                $push: { schedule: result._id },
                            })];
                    case 5:
                        _b.sent();
                        res.status(201).json(result);
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
    calendarController.findSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundSchedule, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, M_Calendar_1.default.findById(id)];
                    case 2:
                        foundSchedule = _a.sent();
                        if (!foundSchedule) {
                            throw { name: "NOT_FOUND" };
                        }
                        return [4 /*yield*/, M_Calendar_1.default.findById(foundSchedule).populate({
                                path: "classes",
                            })];
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
    calendarController.findAllSchedule = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, M_Calendar_1.default.find().populate({
                                path: "classes",
                                select: "className",
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6.name);
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return calendarController;
}());
exports.default = calendarController;
