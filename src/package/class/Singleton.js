"use strict";
exports.__esModule = true;
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
