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
var Grade_1 = __importDefault(require("../models/Grade"));
var Students_1 = __importDefault(require("../models/Students"));
var GradeController = /** @class */ (function () {
    function GradeController() {
    }
    GradeController.createGrade = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var grade, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        grade = req.body.grade;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Grade_1.default.create({
                                grade: grade,
                            })];
                    case 2:
                        result = _a.sent();
                        res.status(201).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GradeController.setGradeStudent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, grade, student, foundGrade, foundStudent, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, grade = _a.grade, student = _a.student;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Grade_1.default.findOne({ grade: grade })];
                    case 2:
                        foundGrade = _b.sent();
                        if (!foundGrade) {
                            throw { name: "NOT_FOUND" };
                        }
                        return [4 /*yield*/, Students_1.default.findOne({ fullName: student })];
                    case 3:
                        foundStudent = _b.sent();
                        if (!foundStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        return [4 /*yield*/, Students_1.default.findByIdAndUpdate(foundStudent, {
                                $set: { grade: foundGrade._id },
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
    GradeController.getGradeStudent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var className, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        className = req.body.className;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.find({ className: className })
                                .select("className student")
                                .populate({
                                path: "student",
                                select: "fullName email status grade",
                                populate: {
                                    path: "grade",
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GradeController.findAllGrade = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Grade_1.default.find()];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4.message);
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GradeController;
}());
exports.default = GradeController;
