"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = app_1.default;
    }
    return Server;
}());
var server = new Server().app;
var host = "http://localhost";
var port = process.env.PORT || 3535;
var status = "Server listening on " + host + ":" + port;
server.listen(port, function () {
    console.log("" + status);
});
