"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RGB_1 = require("./RGB");
var Canvas = /** @class */ (function () {
    function Canvas(image) {
        var _this = this;
        this.size = function () {
            return _this.data.length;
        };
        if (image instanceof HTMLImageElement) {
        }
        else
            throw new Error("Image must be of type HTMLImageElement.");
        this.canvas = document.createElement('canvas');
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var imageData = ctx.getImageData(0, 0, image.width, image.height).data;
        this.data = [];
        for (var i = 0; i < imageData.length; i += 4) {
            this.data.push(new RGB_1.RGB(imageData[i], imageData[i + 1], imageData[i + 2]));
        }
    }
    return Canvas;
}());
exports.Canvas = Canvas;
