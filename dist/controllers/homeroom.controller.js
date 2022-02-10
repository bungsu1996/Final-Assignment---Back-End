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
var Homeroom_1 = __importDefault(require("../models/Homeroom"));
var Students_1 = __importDefault(require("../models/Students"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var homeroomController = /** @class */ (function () {
    function homeroomController() {
    }
    homeroomController.setHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, homeroomName, className, foundHomeroom, foundClass, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, homeroomName = _a.homeroomName, className = _a.className;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, Teachers_1.default.findOne({ fullName: homeroomName })];
                    case 2:
                        foundHomeroom = _b.sent();
                        if (!foundHomeroom) {
                            throw { name: "NOT_FOUND_HOMEROOM" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ className: className })];
                    case 3:
                        foundClass = _b.sent();
                        if (!foundClass) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Homeroom_1.default.create({
                                homeroomName: foundHomeroom._id,
                                className: foundClass._id,
                            })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundHomeroom, {
                                $set: { homeClass: result._id },
                            })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(foundClass, {
                                $set: { homeTeacher: result._id },
                            })];
                    case 6:
                        _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.log(error_1.message);
                        next(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    homeroomController.changeHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, homeroomName, classBefore, classAfter, foundHomeroom, foundTeacher, findClassBefore, findClassAfter, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, homeroomName = _a.homeroomName, classBefore = _a.classBefore, classAfter = _a.classAfter;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, Homeroom_1.default.findById(id)];
                    case 2:
                        foundHomeroom = _b.sent();
                        if (!foundHomeroom) {
                            throw { name: "NOT_FOUND_HOMEROOM" };
                        }
                        return [4 /*yield*/, Teachers_1.default.findOne({ fullName: homeroomName })];
                    case 3:
                        foundTeacher = _b.sent();
                        if (!foundTeacher) {
                            throw { name: "NOT_FOUND_TEACHER" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ className: classBefore })];
                    case 4:
                        findClassBefore = _b.sent();
                        if (!findClassBefore) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Class_1.default.findOne({ className: classAfter })];
                    case 5:
                        findClassAfter = _b.sent();
                        if (!findClassAfter) {
                            throw { name: "NOT_FOUND_CLASS" };
                        }
                        return [4 /*yield*/, Homeroom_1.default.findByIdAndUpdate(foundHomeroom, {
                                className: findClassAfter._id,
                            }, { new: true })];
                    case 6:
                        result = _b.sent();
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                $unset: { homeClass: "" },
                            })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(findClassBefore, {
                                $unset: { homeTeacher: "" },
                            })];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, Teachers_1.default.findByIdAndUpdate(foundTeacher, {
                                $set: { homeClass: findClassAfter },
                            })];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, Class_1.default.findByIdAndUpdate(findClassAfter, {
                                $set: { homeTeacher: foundHomeroom },
                            })];
                    case 10:
                        _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        console.log(error_2.message);
                        next(error_2);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    homeroomController.seeHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Homeroom_1.default.find()
                                .populate({ path: "homeroomName", select: "email fullName" })
                                .populate({
                                path: "className",
                                populate: {
                                    path: "student",
                                    select: "email fullName score status",
                                    populate: { path: "score", populate: { path: "course" } },
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    homeroomController.findHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundHomeroom, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Homeroom_1.default.findById(id)];
                    case 2:
                        foundHomeroom = _a.sent();
                        if (!foundHomeroom) {
                            throw { name: "NOT_FOUND_HOMEROOM" };
                        }
                        return [4 /*yield*/, Homeroom_1.default.findById(foundHomeroom)
                                .populate({ path: "homeroomName", select: "email fullName" })
                                .populate({
                                path: "className",
                                populate: {
                                    path: "student",
                                    select: "email fullName score status",
                                    populate: { path: "score", populate: { path: "course" } },
                                },
                            })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4.message);
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    homeroomController.scoreByClassHomeroom = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundStudent, result, error_5;
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
                        return [4 /*yield*/, Students_1.default.findById(foundStudent).populate({
                                path: "score",
                                populate: { path: "course" },
                            })];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5.message);
                        next(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return homeroomController;
}());
exports.default = homeroomController;
