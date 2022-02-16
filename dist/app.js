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
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var cors_1 = __importDefault(require("cors"));
var db_1 = __importDefault(require("./configs/db"));
var routes_1 = __importDefault(require("./routes/routes"));
var errorHandler_1 = require("./middlewares/errorHandler");
var HeadMasters_1 = __importDefault(require("./models/HeadMasters"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.plugin = function () {
            db_1.default.connect();
            _this.app.use((0, cors_1.default)());
            _this.app.use(express_1.default.json());
            _this.app.use(express_1.default.urlencoded({ extended: false }));
            _this.app.use(function (req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
                next();
            });
        };
        this.route = function () {
            _this.app.use("/api", routes_1.default);
            _this.app.post("/headmaster/create", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, email, fullName, birthDate, word, num, password, hashPass, hashedPass, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = req.body, email = _a.email, fullName = _a.fullName, birthDate = _a.birthDate;
                            word = fullName.split(" ");
                            num = birthDate.replace(/-/g, "");
                            password = word[0].toLowerCase() + num;
                            hashPass = bcryptjs_1.default.genSaltSync(10);
                            hashedPass = bcryptjs_1.default.hashSync(password, hashPass);
                            return [4 /*yield*/, HeadMasters_1.default.create({
                                    email: email.toLowerCase(),
                                    password: hashedPass,
                                    fullName: fullName,
                                    birthDate: birthDate,
                                })];
                        case 1:
                            result = _b.sent();
                            res.status(200).json(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.errorHandler = function () {
            _this.app.use(errorHandler_1.errorHandler.errHandle);
        };
        this.app = (0, express_1.default)();
        this.plugin();
        this.route();
        this.errorHandler();
    }
    return App;
}());
var app = new App().app;
exports.default = app;
