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
exports.ConfigService = void 0;
var Singleton_1 = require("../class/Singleton");
var ConfigService = /** @class */ (function (_super) {
    __extends(ConfigService, _super);
    function ConfigService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigService.prototype.get = function (path) {
        //# path app.port
        var config = require('config');
        return config.get(path);
    };
    return ConfigService;
}((0, Singleton_1.Singleton)()));
exports.ConfigService = ConfigService;
