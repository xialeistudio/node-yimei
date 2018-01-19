"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var soap = require("soap");
var Client = /** @class */ (function () {
    function Client(opts) {
        this.gatewayUrl = 'http://sdk4report.eucp.b2m.cn:8080/sdk/SDKService?wsdl';
        this.timeout = 5000;
        this.serialNumber = opts.serialNumber;
        this.password = opts.password;
        this.sessionKey = opts.sessionKey;
        this.gatewayUrl = opts.gatewayUrl || this.gatewayUrl;
        this.timeout = opts.timeout || this.timeout;
    }
    Client.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.soapClient) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, soap.createClientAsync(this.gatewayUrl)];
                    case 1:
                        _a.soapClient = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.soapClient];
                }
            });
        });
    };
    /**
     * 登录
     * @param {string} sessionKey
     * @returns {Promise<any>}
     */
    Client.prototype.login = function (sessionKey) {
        return __awaiter(this, void 0, void 0, function () {
            var params, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sessionKey) {
                            this.sessionKey = sessionKey;
                        }
                        params = { arg0: this.serialNumber, arg1: this.sessionKey, arg2: this.password };
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client.registExAsync(params, { timeout: this.timeout })];
                }
            });
        });
    };
    /**
     * 发送语音
     * @param {string | string[]} phone
     * @param {string} message
     * @param {string} sendTime
     * @param {string} addSerial
     * @param {string} charset
     * @param {number} priority
     * @param {number} smsId
     * @returns {Promise<any>}
     */
    Client.prototype.sendSMS = function (phone, message, sendTime, addSerial, charset, priority, smsId) {
        if (sendTime === void 0) { sendTime = ''; }
        if (addSerial === void 0) { addSerial = ''; }
        if (charset === void 0) { charset = 'UTF-8'; }
        if (priority === void 0) { priority = 5; }
        if (smsId === void 0) { smsId = 8888; }
        return __awaiter(this, void 0, void 0, function () {
            var params, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof phone === 'string') {
                            phone = [phone];
                        }
                        params = {
                            arg0: this.serialNumber,
                            arg1: this.sessionKey,
                            arg2: sendTime,
                            arg3: phone,
                            arg4: message,
                            arg5: addSerial,
                            arg6: charset,
                            arg7: priority,
                            arg8: smsId,
                        };
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client.sendSMSAsync(params, { timeout: this.timeout })];
                }
            });
        });
    };
    /**
     * 发送语音
     * @param {string | string[]} phone
     * @param {number} code
     * @param {string} sendTime
     * @param {string} addSerial
     * @param {string} charset
     * @param {number} priority
     * @param {number} smsId
     * @returns {Promise<any>}
     */
    Client.prototype.sendVoice = function (phone, code, sendTime, addSerial, charset, priority, smsId) {
        if (sendTime === void 0) { sendTime = ''; }
        if (addSerial === void 0) { addSerial = ''; }
        if (charset === void 0) { charset = 'UTF-8'; }
        if (priority === void 0) { priority = 5; }
        if (smsId === void 0) { smsId = 8888; }
        return __awaiter(this, void 0, void 0, function () {
            var params, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof phone === 'string') {
                            phone = [phone];
                        }
                        params = {
                            arg0: this.serialNumber,
                            arg1: this.sessionKey,
                            arg2: sendTime,
                            arg3: phone,
                            arg4: code,
                            arg5: addSerial,
                            arg6: charset,
                            arg7: priority,
                            arg8: smsId,
                        };
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client.sendVoiceAsync(params, { timeout: this.timeout })];
                }
            });
        });
    };
    /**
     * 查询余额
     * @returns {Promise<void>}
     */
    Client.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        params = {
                            arg0: this.serialNumber,
                            arg1: this.sessionKey,
                        };
                        return [2 /*return*/, client.getBalanceAsync(params, { timeout: this.timeout })];
                }
            });
        });
    };
    /**
     * 查询每条短信价格
     * @returns {Promise<void>}
     */
    Client.prototype.getEachFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        params = {
                            arg0: this.serialNumber,
                            arg1: this.sessionKey,
                        };
                        return [2 /*return*/, client.getEachFeeAsync(params, { timeout: this.timeout })];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=index.js.map