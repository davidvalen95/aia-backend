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
exports.ConfigHelper = void 0;
var Singleton_1 = require("./Singleton");
var ConfigHelper = /** @class */ (function (_super) {
    __extends(ConfigHelper, _super);
    function ConfigHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigHelper.prototype.get = function (path) {
        //# path app.port
        var config = require('config');
        return config.get(path);
    };
    return ConfigHelper;
}((0, Singleton_1.Singleton)()));
exports.ConfigHelper = ConfigHelper;
