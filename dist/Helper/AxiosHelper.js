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
exports.ApiService = void 0;
var util_1 = require("util");
var ApiService = /** @class */ (function () {
    function ApiService() {
        this.isInternet = null;
        this.globalHeader = [];
    }
    ApiService.prototype.apiExecuteCheckInternetConnection = function () {
        var _this = this;
        var config = {
            url: ApiService.apiUrl + ApiService.filosofiwebPrefixUrl + 'check-connection',
            param: {},
            isSilentAllResponse: true,
            isSilentLoader: true,
            method: 'GET',
            onCatch: function (err) {
                _this.helperService.log('getInternetconectioncatch', err);
                _this.isInternet = false;
                _this.helperService.manageThrotleAction({ id: 'internetConnection' }, function () {
                    _this.interactiveService.interactiveFramework.presentToast('No internet connection');
                });
            }
        };
        this.submit(config, function () {
            _this.helperService.log('getinternetconnection');
            _this.isInternet = true;
        });
    };
    ApiService.setInstance = function (instance) {
    };
    ApiService.getSafeInstance = function (callback) {
        // if (this.instance) {
        //     callback(this.instance);
        // }
    };
    //
    //
    // public retrySubmit(onInternet: () => void) {
    //     this.platform.ready().then(() => {
    //         var onConnectSubscriber = this.network.onConnect().subscribe(() => {
    //
    //             onInternet();
    //             onConnectSubscriber.unsubscribe();
    //
    //         })
    //     })
    // }
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
            if (!(0, util_1.isNumber)(current) && !(0, util_1.isString)(current) && !(0, util_1.isBoolean)(current)) {
                return carry;
            }
            return carry + (current);
        }, '');
        // console.log('sorted',{fcmToken: Md5.hashStr(salt + paramString), paramString: paramString} )
        return { token: Md5.hashStr(salt + paramString), paramString: paramString };
    };
    ApiService.prototype.getPreProcess = function (param) {
        //# deviceUuid from DeviceService.setDeviceUuid
        param['version'] = this.appService.version;
        param['platform'] = this.appService.getPlatformResourceString();
        var tokenize = this.getToken(param);
        param['eToken'] = tokenize.token;
        if (AppService.instance.bearsStarterKitEnv.isLive) {
            param['paramString'] = tokenize.paramString;
        }
        return param;
    };
    ApiService.prototype.submit = function (config, onFinished) {
        return __awaiter(this, void 0, void 0, function () {
            var httpHeaders, idLoader, httpParams, key, value, extraHttpParams, keyExtra, valueExtra, httpObservable, param, isCanceled, subscription, loaderConfig;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appService.onReadyListener];
                    case 1:
                        _a.sent();
                        httpHeaders = new HttpHeaders();
                        httpHeaders = httpHeaders.append('Accept', 'application/json');
                        httpHeaders = httpHeaders.append('Filosofiweb-Security-Code', AppService.instance.bearsStarterKitEnv.filosofiwebSecurityCode);
                        // if (UserProvider.instance && UserProvider.instance.userData && !config.isNoAuthorization) {
                        //     if (UserProvider.instance.userData.fcmToken) {
                        //         httpHeaders = httpHeaders.append("Authorization", `Bearer ${UserProvider.instance.userData.fcmToken}`)
                        //RegisterRuleApiResponse
                        //     }
                        // }
                        ApiService.headers.forEach(function (current) {
                            httpHeaders = httpHeaders.append(current.key, current.value);
                        });
                        idLoader = null;
                        config.param = this.helperService.mergeObject(config.param, ApiService.queryParamsAddOn);
                        config.param = this.getPreProcess(config.param);
                        if (config.isWithoutToken) {
                            config.param['eToken'] = null;
                            config.param['paramString'] = null;
                        }
                        httpParams = new HttpParams();
                        for (key in config.param) {
                            value = config.param[key];
                            if (value == null || (typeof (value) == 'object' && !Array.isArray(value))) {
                                continue;
                            }
                            if (typeof (value) == 'string') {
                                // console.log('sortedPlus',key,file,config.param[key]);
                            }
                            try {
                                // file = encodeURIComponent(file);
                            }
                            catch (e) {
                            }
                            if (Array.isArray(value)) {
                                value.forEach(function (currentValue, index) {
                                    if (typeof currentValue == 'string') {
                                    }
                                    httpParams = httpParams.set(key + "[".concat(index, "]"), currentValue);
                                    // formData.set(key + `[${index}]`, currentValue);
                                });
                            }
                            else {
                                httpParams = httpParams.set(key, value);
                                // formData.set(key, file)
                            }
                        }
                        extraHttpParams = new HttpParams();
                        for (keyExtra in ApiService.queryParamsAddOn) {
                            valueExtra = ApiService.queryParamsAddOn[keyExtra];
                            if (typeof (value) == 'string') {
                                valueExtra.replace('+', '%2B');
                            }
                            try {
                                // valueExtra = encodeURIComponent(valueExtra);
                            }
                            catch (e) {
                            }
                            if (isArray(valueExtra)) {
                                valueExtra.forEach(function (currentValue, index) {
                                    if (typeof currentValue == 'string') {
                                    }
                                    extraHttpParams = extraHttpParams.set(keyExtra + "[".concat(index, "]"), currentValue);
                                    httpParams = httpParams.set(keyExtra + "[".concat(index, "]"), currentValue);
                                });
                            }
                            else {
                                httpParams = httpParams.set(keyExtra, valueExtra);
                                extraHttpParams = extraHttpParams.set(keyExtra, valueExtra);
                            }
                        }
                        httpObservable = null;
                        // console.log('apiSubmit', config);
                        if (!config.method || config.method == 'POST') {
                            param = config.isParamJson ? config.param : httpParams.toString();
                            if (!config.isParamJson) {
                                httpHeaders = httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
                                param = ('' + param).replace(/\+/g, '%2B');
                            }
                            httpObservable = this.httpClient.post(config.url, param, {
                                headers: httpHeaders,
                                params: extraHttpParams,
                            });
                        }
                        else {
                            httpObservable = this.httpClient.get(config.url, {
                                headers: httpHeaders,
                                params: httpParams
                            });
                        }
                        isCanceled = true;
                        subscription = httpObservable.pipe(finalize(function () {
                            console.log('finalizeSubmitRequest', idLoader);
                            if (idLoader) {
                                _this.interactiveService.interactiveFramework.dismissLoading(idLoader);
                            }
                            if (isCanceled) {
                                if (config.onCatch) {
                                    config.onCatch('canceled');
                                }
                                if (_this.interactiveService.interactiveFramework && config.cancelMessage) {
                                    _this.interactiveService.interactiveFramework.presentToast(config.cancelMessage);
                                }
                            }
                        })).subscribe(function (response) {
                            console.log('apiSubmitResponse', config, response);
                            isCanceled = false;
                            if (!response.isSuccess && response.data.isNewUpdate) {
                                _this.appService.checkVersionAction(response, _this.interactiveService);
                                return;
                            }
                            if (!response.isSuccess && response.data.isFilosofiwebSecurityCodeNotAuthorized) {
                                _this.interactiveService.interactiveFramework.presentAlert(response.message);
                                return;
                            }
                            if (!config.isSilentAllResponse && !config.isSilentSuccessResponse && response.isSuccess) {
                                if (response.message) {
                                    _this.interactiveService.interactiveFramework.presentAlert(response.message);
                                }
                            }
                            if (!config.isSilentAllResponse && !config.isSilentErrorResponse && !response.isSuccess) {
                                if (response.message) {
                                    _this.interactiveService.interactiveFramework.presentAlert(response.message);
                                }
                            }
                            setTimeout(function () {
                                onFinished(response);
                                if (config.onFinish) {
                                    config.onFinish(response);
                                }
                            }, 150);
                        }, (function (rejected) {
                            isCanceled = false;
                            if (config.onCatch) {
                                config.onCatch(rejected);
                            }
                            if (!config.isSilentAllResponse && !config.isSilentErrorResponse) {
                                _this.helperService.log('rejected', rejected, rejected.error);
                                var message = '<p>Error on request</p>';
                                var title = 'Oops';
                                //region laravelValidation
                                var rejected = rejected.error;
                                if (rejected) {
                                    //# if error because of validation
                                    try {
                                        message = '';
                                        for (var key in rejected.errors) {
                                            var currentError = rejected.errors[key];
                                            if (currentError) {
                                                currentError.forEach(function (currentMessage) {
                                                    message += "<p>".concat(currentMessage, "</p>");
                                                });
                                            }
                                        }
                                        _this.interactiveService.interactiveFramework.presentAlert(message, title);
                                    }
                                    catch (e) {
                                        _this.helperService.log('rejected catch', e, rejected, rejected.error);
                                    }
                                }
                                //endregion
                                _this.apiExecuteCheckInternetConnection();
                            }
                            // Pro.monitoring.exception(rejected);
                        }), function () {
                        });
                        if (this.interactiveService.interactiveFramework && !config.isSilentLoader) {
                            loaderConfig = {
                                showBackdrop: true,
                                enableBackdropDismiss: config.isCancelable != null ? config.isCancelable : true,
                                onCancel: function () {
                                    subscription.unsubscribe();
                                }
                            };
                            idLoader = this.interactiveService.interactiveFramework.presentLoading(config.loaderMessage || 'Loading', loaderConfig);
                            this.helperService.log('presenter', config, idLoader);
                        }
                        return [2 /*return*/, subscription];
                }
            });
        });
    };
    // // // # LIVE URL  /   TEST URL
    ApiService.queryParamsAddOn = {};
    ApiService.headers = [];
    ApiService.baseUrl = "";
    ApiService.apiUrl = "";
    ApiService.filosofiwebPrefixUrl = "filosofiweb/";
    return ApiService;
}()); //class
exports.ApiService = ApiService;
