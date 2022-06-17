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
exports.ApiService = void 0;
var Singleton_1 = require("../class/Singleton");
var axios_1 = __importDefault(require("axios"));
var ApiService = /** @class */ (function (_super) {
    __extends(ApiService, _super);
    function ApiService() {
        // // // # LIVE URL  /   TEST URL
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInternet = null;
        _this.globalHeader = [];
        return _this;
    }
    ApiService.prototype.getToken = function (params, salt) {
        if (salt === void 0) { salt = 'garamDapur'; }
        if (typeof params == 'string') {
            params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        }
        //# sort
        params = Object.keys(params).sort().reduce(function (carry, currentKey) {
            carry[currentKey] = params[currentKey];
            return carry;
        }, {});
        var ignore = [
            'eToken',
            'paramString'
        ];
        var paramString = Object.keys(params).reduce(function (carry, currentKey) {
            var current = params[currentKey];
            // console.log('getToken', currentKey ,current,)
            if (ignore.indexOf(currentKey) > -1) {
                // console.log('getTokenIgnored', currentKey ,current,)
                return carry;
            }
            if (current == null || current == 'null' || current == 'NULL') {
                // console.log('getTokenUndefined', currentKey ,current, carry + "")
                return carry;
            }
            if (!(typeof current === "number") && !(typeof current === 'string') && !(typeof current === "boolean")) {
                return carry;
            }
            return carry + (current);
        }, '');
        // console.log('sorted',{fcmToken: Md5.hashStr(salt + paramString), paramString: paramString} )
        var md5 = require('md5');
        return { token: md5.hashStr(salt + paramString), paramString: paramString };
    };
    ApiService.prototype.submit = function (config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var httpHeaders;
            return __generator(this, function (_b) {
                httpHeaders = {
                    "Accept": 'application/json',
                };
                // config.data['version'] = "alwaysAllow";
                ApiService.headers.forEach(function (current) {
                    httpHeaders[current.key] = current.value;
                });
                return [2 /*return*/, axios_1.default.request({
                        method: (_a = config.method) !== null && _a !== void 0 ? _a : "POST",
                        url: config.url,
                        params: config.param,
                        data: config.data,
                        headers: httpHeaders,
                    })];
            });
        });
    };
    ApiService.queryParamsAddOn = {};
    ApiService.headers = [];
    ApiService.baseUrl = "";
    ApiService.apiUrl = "";
    return ApiService;
}((0, Singleton_1.Singleton)()));
exports.ApiService = ApiService;
