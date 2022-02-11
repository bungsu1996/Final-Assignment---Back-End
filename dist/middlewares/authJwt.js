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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var HeadMasters_1 = __importDefault(require("../models/HeadMasters"));
var Parents_1 = __importDefault(require("../models/Parents"));
var Students_1 = __importDefault(require("../models/Students"));
var Teachers_1 = __importDefault(require("../models/Teachers"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var auth = /** @class */ (function () {
    function auth() {
    }
    auth.authentication = function (req, res, next) {
        try {
            // const token = req.headers.authorization?.split(" ")[1];
            var token = req.header("Authorization").replace("Bearer ", "");
            // console.log(token)
            if (!token) {
                throw { name: "MISSING_TOKEN" };
            }
            var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JW_SECRET_KEY);
            req.userId = { email: decodedToken.email, id: decodedToken.id };
            next();
        }
        catch (error) {
            res.status(401).json({ Message: "You Are Not Authenticated!" });
        }
    };
    auth.isHeadmaster = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, HeadMasters_1.default.findById(userId === null || userId === void 0 ? void 0 : userId.id)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            res.status(401).json({ message: "Require HeadMaster Role!" });
                            return [2 /*return*/];
                        }
                        next();
                        return [2 /*return*/];
                    case 3:
                        error_1 = _a.sent();
                        res.status(401).json({ Message: "You Are Not Authorized!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    auth.isTeacher = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Teachers_1.default.findById(userId === null || userId === void 0 ? void 0 : userId.id)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            res.status(401).json({ message: "Require Teacher Role!" });
                            return [2 /*return*/];
                        }
                        next();
                        return [2 /*return*/];
                    case 3:
                        error_2 = _a.sent();
                        res.status(401).json({ Message: "You Are Not Authorized!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    auth.isStudent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Students_1.default.findById(userId === null || userId === void 0 ? void 0 : userId.id)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            res.status(401).json({ message: "Require Student Role!" });
                            return [2 /*return*/];
                        }
                        next();
                        return [2 /*return*/];
                    case 3:
                        error_3 = _a.sent();
                        res.status(401).json({ Message: "You Are Not Authorized!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    auth.isParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Parents_1.default.findById(userId === null || userId === void 0 ? void 0 : userId.id)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            res.status(401).json({ message: "Require Student Role!" });
                            return [2 /*return*/];
                        }
                        next();
                        return [2 /*return*/];
                    case 3:
                        error_4 = _a.sent();
                        res.status(401).json({ Message: "You Are Not Authorized!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return auth;
}());
exports.default = auth;
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   // const token = req.headers.authorization?.split(" ")[1];
//   const token = req.header('Authorization')!.replace('Bearer','').split(" ")[1];
//   console.log(req.header)
//   console.log(token)
//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }
//   jwt.verify(
//     token.toString(),
//     "this is a secret key token",
//     (err: VerifyErrors | null, decoded: object | undefined) => {
//       if (err) {
//         console.log(err);
//         return res.status(401).send({ message: "Unauthorized!" });
//       }
//       req.userId = decoded;
//       console.log(decoded)
//       next();
//     }
//   );
// };
// const isHeadMaster = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = req;
//   console.log(userId);
//   const result = await HeadMaster.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Require HeadMaster Role!" });
//     return;
//   }
//   next();
//   return;
// };
// const isTeacher = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Teacher.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Teacher Not Found!" });
//     return;
//   }
//   next();
//   return;
// };
// const isStudent = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Student.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Student Not Found!" });
//     return;
//   }
//   next();
//   return;
// };
// const isParent = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Parent.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Parent Not Found!" });
//     return;
//   }
//   next();
//   return;
// };
// const authJwt = {
//   verifyToken,
//   isHeadMaster,
//   isTeacher,
//   isStudent,
//   isParent,
// };
// export default authJwt;