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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappClient = void 0;
var whatsapp_web_js_1 = require("whatsapp-web.js");
var rxjs_1 = require("rxjs");
var express_validator_1 = require("express-validator");
var ApiService_1 = require("../package/service/ApiService");
var ExpressService_1 = require("../package/service/ExpressService");
var EnvService_1 = require("../package/service/EnvService");
var WhatsappClient = /** @class */ (function () {
    function WhatsappClient(account, express) {
        this.account = account;
        this.express = express;
        this.onMessage = new rxjs_1.ReplaySubject(0);
        this.validateAccount();
        this.setClient();
        this.listenSendRequest();
        this.listenComingMessage();
        this.setMenu();
    }
    WhatsappClient.prototype.validateAccount = function () {
        var _this = this;
        ["identifier", "numberWithoutPlus", "starterkitBaseUrl"].forEach(function (current) {
            if (!_this.account[current]) {
                throw new Error("".concat(current, " is not set up in whatsapp.json"));
            }
        });
    };
    WhatsappClient.prototype.setClient = function () {
        var _this = this;
        var argsEnv = EnvService_1.EnvService.getInstance().get('PUPETEER_ARGS');
        var executablePathEnv = EnvService_1.EnvService.getInstance().get('PUPETEER_EXECUTABLE_PATH');
        // console.log('pupeteer argsEnv ',argsEnv)
        // console.log('pupeteer executablePathEnv ',executablePathEnv)
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth({
                clientId: "".concat(this.account.identifier, "-").concat(this.account.numberWithoutPlus)
            }),
        });
        console.log("Setting up ".concat(this.account.identifier));
        this.client.on('qr', function (qr) {
            console.log(_this.account.identifier + ' require QR CODE');
            var qrcode = require('qrcode-terminal');
            qrcode.generate(qr, { small: true });
        });
        this.client.on('ready', function () {
            console.log(_this.account.identifier + ' is ready!');
        });
        this.client.initialize();
    };
    WhatsappClient.prototype.listenSendRequest = function () {
        var _this = this;
        this.express.post("/whatsapp/send/".concat(this.account.identifier, "/").concat(this.account.numberWithoutPlus), ExpressService_1.ExpressService.getInstance().getValidationChain([
            (0, express_validator_1.body)('message').notEmpty(),
            (0, express_validator_1.body)('recipients').notEmpty().isArray(),
        ]), function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var message, recipients, result, _a, _b, _i, i, recipient;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        message = request.body.message;
                        recipients = request.body.recipients;
                        _a = [];
                        for (_b in recipients)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        recipient = recipients[i];
                        return [4 /*yield*/, this.client.sendMessage(recipient + "@c.us", message).catch()
                            // console.log(result);
                        ];
                    case 2:
                        result = _c.sent();
                        // console.log(result);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 3:
                        // console.log(result);
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, response.json(result !== null && result !== void 0 ? result : null)];
                }
            });
        }); });
    };
    WhatsappClient.prototype.setMenu = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_c) {
                url = (_a = this.account.overrideWebHookUrl) !== null && _a !== void 0 ? _a : "".concat(this.account.starterkitBaseUrl).concat((_b = this.account.filosofiwebPrefix) !== null && _b !== void 0 ? _b : 'filosofiweb');
                url += "/whatsapp/menu";
                return [2 /*return*/];
            });
        });
    };
    WhatsappClient.prototype.listenComingMessage = function () {
        var _this = this;
        this.client.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
            var test, url, data, chatRoom, response;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, message.getChat()];
                    case 1:
                        test = _c.sent();
                        test.sendSeen();
                        this.onMessage.next(message);
                        if (!message.body) {
                            return [2 /*return*/];
                        }
                        url = (_a = this.account.overrideWebHookUrl) !== null && _a !== void 0 ? _a : "".concat(this.account.starterkitBaseUrl, "api/").concat((_b = this.account.filosofiwebPrefix) !== null && _b !== void 0 ? _b : 'filosofiweb', "/whatsapp/bot");
                        console.log('url', url);
                        data = {
                            phone: message.from,
                            message: message.body,
                            identifier: this.account.identifier,
                            identifierPhone: this.account.numberWithoutPlus,
                        };
                        return [4 /*yield*/, message.getChat()];
                    case 2:
                        chatRoom = _c.sent();
                        try {
                            // console.log('participants',chatRoom['participants']);
                        }
                        catch (e) {
                            // console.log('only in group');
                        }
                        return [4 /*yield*/, ApiService_1.ApiService.getInstance().submit({
                                url: url,
                                data: data,
                            })];
                    case 3:
                        response = _c.sent();
                        if (response.isSuccess && response.message) {
                            message.reply(response.message);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return WhatsappClient;
}());
exports.WhatsappClient = WhatsappClient;
