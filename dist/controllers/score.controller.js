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
var Courses_1 = __importDefault(require("../models/Courses"));
var Score_1 = __importDefault(require("../models/Score"));
var Students_1 = __importDefault(require("../models/Students"));
var scoreController = /** @class */ (function () {
    function scoreController() {
    }
    scoreController.createScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, student, course, foundStudent, foundCourse, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, student = _a.student, course = _a.course;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Students_1.default.findOne({ fullName: student })];
                    case 2:
                        foundStudent = _b.sent();
                        if (!foundStudent) {
                            throw { name: "NOT_FOUND_STUDENT" };
                        }
                        return [4 /*yield*/, Courses_1.default.findOne({ course: course })];
                    case 3:
                        foundCourse = _b.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        return [4 /*yield*/, Score_1.default.create({
                                course: foundCourse,
                            })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, Students_1.default.findByIdAndUpdate(foundStudent, {
                                $push: { score: result._id },
                            })];
                    case 5:
                        _b.sent();
                        res.status(201).json(result);
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
    scoreController.createTestScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scores, course, dailyScore, midtest, finaltest, score, foundScore, foundCourse, resultDaily, resultMidtest, resultFinalTest, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, scores = _a.scores, course = _a.course, dailyScore = _a.dailyScore, midtest = _a.midtest, finaltest = _a.finaltest, score = _a.score;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, Score_1.default.findById({ _id: scores })];
                    case 2:
                        foundScore = _b.sent();
                        return [4 /*yield*/, Courses_1.default.findById({ _id: course })];
                    case 3:
                        foundCourse = _b.sent();
                        if (!foundCourse) {
                            throw { name: "NOT_FOUND_COURSE" };
                        }
                        if (!(score === "Daily Tests")) return [3 /*break*/, 5];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(foundScore, {
                                dailyScore: dailyScore,
                            }, { new: true })];
                    case 4:
                        resultDaily = _b.sent();
                        res.status(200).json(resultDaily);
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(score === "Middterm tests")) return [3 /*break*/, 7];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(foundScore, {
                                midtest: midtest,
                            }, { new: true })];
                    case 6:
                        resultMidtest = _b.sent();
                        res.status(200).json(resultMidtest);
                        return [3 /*break*/, 9];
                    case 7:
                        if (!(score === "Final Tests")) return [3 /*break*/, 9];
                        return [4 /*yield*/, Score_1.default.findByIdAndUpdate(foundScore, {
                                finaltest: finaltest,
                            }, { new: true })];
                    case 8:
                        resultFinalTest = _b.sent();
                        res.status(200).json(resultFinalTest);
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_2 = _b.sent();
                        console.log(error_2.message);
                        next(error_2);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    scoreController.studentScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var className, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        className = req.body.className;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Class_1.default.find({ className: className }).populate({
                                path: "student",
                                select: "fullName status score",
                                populate: {
                                    path: "score",
                                    select: "course dailyScore midtest finaltest resultScore",
                                    populate: { path: "course" },
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
    scoreController.spesificScore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundStudent, result, error_4;
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
                                .select("fullName email score")
                                .populate({ path: "score", populate: { path: "course" } })];
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
    return scoreController;
}());
exports.default = scoreController;
