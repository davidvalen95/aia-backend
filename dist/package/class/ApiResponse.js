"use strict";
var ApiResponse = /** @class */ (function () {
    function ApiResponse() {
        this.message = "";
        this.isSuccess = true;
        this.data = {};
    }
    ApiResponse.prototype.addData = function (data) {
        this.data = Object.assign(data, this.data);
        return this;
    };
    return ApiResponse;
}());
