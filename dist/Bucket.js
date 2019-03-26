"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RGB_1 = require("./RGB");
var Bucket = /** @class */ (function () {
    function Bucket(colors) {
        var _this = this;
        this.push = function (color) {
            _this.data.push(color);
        };
        this.peek = function () {
            return _this.data[_this.data.length - 1];
        };
        this.pop = function () {
            return _this.data.pop();
        };
        this.isEmpty = function () {
            return _this.data.length > 0;
        };
        this.size = function () {
            return _this.data.length;
        };
        this.swirl = function () {
            var r = 0;
            var g = 0;
            var b = 0;
            var size = _this.size();
            for (var i = 0; i < size; i++) {
                r += _this.data[i].red;
                g += _this.data[i].green;
                b += _this.data[i].blue;
            }
            return new RGB_1.RGB(Math.round(r / size), Math.round(g / size), Math.round(b / size));
        };
        this.data = [];
        this.data = this.data.concat(colors);
    }
    return Bucket;
}());
exports.Bucket = Bucket;
