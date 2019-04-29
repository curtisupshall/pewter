"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YUV = /** @class */ (function () {
    function YUV(Y, U, V) {
        if (Y === void 0) { Y = 0; }
        if (U === void 0) { U = 0; }
        if (V === void 0) { V = 0; }
        this.Y = Y;
        this.U = U;
        this.V = V;
    }
    /**
    * Computes the Euclidean distance between two YUV
    * colors.
    * @param color Another YUV color
    * @return The distance between the two colors
    */
    YUV.prototype.distanceTo = function (other) {
        return Math.sqrt(Math.pow(this.Y - other.Y, 2) +
            Math.pow(this.U - other.U, 2) +
            Math.pow(this.V - other.V, 2));
    };
    return YUV;
}());
exports.YUV = YUV;
