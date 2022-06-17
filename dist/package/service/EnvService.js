"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvService = void 0;
var Singleton_1 = require("../class/Singleton");
var EnvService = /** @class */ (function (_super) {
    __extends(EnvService, _super);
    function EnvService() {
        var _this = _super.call(this) || this;
        _this.env = require('dotenv').config().parsed;
        ;
        return _this;
    }
    EnvService.prototype.get = function (envVariable) {
        if (!this.env) {
            return null;
        }
        var result = this.env[envVariable];
        //# pipe become array
        result = (result === null || result === void 0 ? void 0 : result.indexOf('|')) >= 0 ? result.split('|') : result;
        return result;
    };
    return EnvService;
}((0, Singleton_1.Singleton)()));
exports.EnvService = EnvService;
