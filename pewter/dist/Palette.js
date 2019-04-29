"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RGB_1 = require("./RGB");
var Canvas_1 = require("./Canvas");
var Bucket_1 = require("./Bucket");
var Palette = /** @class */ (function () {
    function Palette(image) {
        var _this = this;
        /**
         * @TODO Make a timer for gathering/calculating
         */
        this.getColors = function (n, filter) {
            if (n === void 0) { n = 1; }
            if (filter === void 0) { filter = []; }
            var tolerance = 0.1;
            var filterTolerance = 0.1;
            var numThreshold = 0.1;
            if (n === 0) {
                return [new RGB_1.RGB()];
            }
            else if (n < 1) {
                throw new Error('Number of colors must be non-negative.');
            }
            else if (n > _this.canvas.size()) {
                throw new Error('Not enough data to produce ' + n + ' colors.');
            }
            var buckets = [];
            var pixels = _this.canvas.data;
            var output = [];
            for (var i = 0; i < _this.canvas.size(); i++) {
                for (var j = 0; j < buckets.length; j++) {
                    if (buckets[j].peek().distanceTo(pixels[i]) <= tolerance) {
                        buckets[j].push(pixels[i]);
                        j = 0;
                        i++;
                    }
                }
                buckets.push(new Bucket_1.Bucket(pixels[i]));
            }
            buckets.sort(function (a, b) {
                return a.size() - b.size();
            });
            if (filter.length) {
                buckets = buckets.reduce(function (arr, bucket) {
                    for (var i = 0; i < filter.length; i++) {
                        if (bucket.peek().distanceTo(filter[i]) >= filterTolerance) {
                            return arr;
                        }
                    }
                    arr.push(bucket);
                    return arr;
                }, []);
            }
            output.push(buckets[buckets.length - 1].swirl());
            buckets.pop();
            while (n - 1 > 0 && buckets.length) {
                while (output[output.length - 1].distanceTo(buckets[buckets.length - 1].swirl()) < numThreshold) {
                    if (buckets.length) {
                        buckets.pop();
                    }
                    else {
                        return output;
                    }
                }
                output.push(buckets[buckets.length - 1].swirl());
                buckets.pop();
                n--;
            }
            return output;
        };
        this.canvas = new Canvas_1.Canvas(image);
        this.colors = this.getColors();
    }
    return Palette;
}());
exports.default = Palette;
