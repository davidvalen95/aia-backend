"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
function Singleton() {
    var Singleton = /** @class */ (function () {
        function Singleton() {
        }
        Singleton.getInstance = function () {
            if (!this.instance) {
                this.instance = new this;
            }
            return this.instance;
        };
        return Singleton;
    }());
    return Singleton;
}
exports.Singleton = Singleton;
