"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YUV_1 = require("./YUV");
exports.yuvConstants = {
    WR: 0.299,
    WG: 0.587,
    WB: 0.114,
    U_MAX: 0.436,
    V_MAX: 0.615
};
var RGB = /** @class */ (function () {
    function RGB(r, g, b) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        this.red = r;
        this.green = g;
        this.blue = b;
    }
    RGB.prototype.toHex = function (number, maxLength) {
        if (maxLength === void 0) { maxLength = 2; }
        var hex = number.toString(16);
        while (maxLength > hex.length)
            hex = '0' + hex;
        return hex;
    };
    RGB.prototype.toCSS = function () {
        return String('#' + this.toHex(this.red) + this.toHex(this.green) + this.toHex(this.blue)).toUpperCase();
    };
    RGB.prototype.toYUV = function () {
        var WR = exports.yuvConstants.WR, WG = exports.yuvConstants.WG, WB = exports.yuvConstants.WB, U_MAX = exports.yuvConstants.U_MAX, V_MAX = exports.yuvConstants.V_MAX, Y = WR * this.red + WB * this.blue + WG * this.green, U = U_MAX * (this.blue - Y) / (1 - WB), V = V_MAX * (this.red - Y) / (1 - WR);
        return new YUV_1.YUV(Y, U, V);
    };
    RGB.prototype.distanceTo = function (other) {
        return this.toYUV().distanceTo(other.toYUV());
    };
    return RGB;
}());
exports.RGB = RGB;
