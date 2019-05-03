/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../pewter/src/Bucket.ts":
/*!*******************************!*\
  !*** ../pewter/src/Bucket.ts ***!
  \*******************************/
/*! exports provided: Bucket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bucket", function() { return Bucket; });
/* harmony import */ var _RGB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RGB */ "../pewter/src/RGB.ts");

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
            return new _RGB__WEBPACK_IMPORTED_MODULE_0__["default"](Math.round(r / size), Math.round(g / size), Math.round(b / size));
        };
        this.data = [];
        this.data = this.data.concat(colors);
    }
    return Bucket;
}());



/***/ }),

/***/ "../pewter/src/Canvas.ts":
/*!*******************************!*\
  !*** ../pewter/src/Canvas.ts ***!
  \*******************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _RGB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RGB */ "../pewter/src/RGB.ts");

var Canvas = /** @class */ (function () {
    function Canvas(image) {
        this.data = [];
        this.canvas = document.createElement('canvas');
        if (!image) {
            return;
        }
        /*
        if (image instanceof HTMLImageElement) {

        }
        else throw new Error("Image must be of type HTMLImageElement.")
        */
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var imageData = ctx.getImageData(0, 0, image.width, image.height).data;
        for (var i = 0; i < imageData.length; i += 4) {
            this.data.push(new _RGB__WEBPACK_IMPORTED_MODULE_0__["default"](imageData[i], imageData[i + 1], imageData[i + 2]));
        }
    }
    return Canvas;
}());



/***/ }),

/***/ "../pewter/src/Palette.ts":
/*!********************************!*\
  !*** ../pewter/src/Palette.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RGB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RGB */ "../pewter/src/RGB.ts");
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas */ "../pewter/src/Canvas.ts");
/* harmony import */ var _Bucket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bucket */ "../pewter/src/Bucket.ts");



var Palette = /** @class */ (function () {
    function Palette(image) {
        var _this = this;
        /**
         * @TODO Make a timer for gathering/calculating
         */
        this.getColors = function (n, filter) {
            if (n === void 0) { n = 1; }
            if (filter === void 0) { filter = []; }
            console.log('Palette.data.length: ', _this.canvas.data.length);
            if (_this.canvas.data.length === 0) {
                return [];
            }
            var tolerance = 5;
            var filterTolerance = 5;
            var threshold = 5;
            if (n === 0) {
                return [new _RGB__WEBPACK_IMPORTED_MODULE_0__["default"]()];
            }
            else if (n < 1) {
                throw new Error('Number of colors must be non-negative.');
            }
            else if (n > _this.canvas.data.length) {
                throw new Error('Not enough data to produce ' + n + ' color(s).');
            }
            var buckets = [];
            var pixels = _this.canvas.data;
            var output = [];
            for (var i = 0; i < pixels.length; i++) {
                for (var j = 0; j < buckets.length; j++) {
                    var distance = buckets[j].peek().distanceTo(pixels[i]);
                    if (distance <= tolerance) {
                        // console.log('distance: ', distance)
                        buckets[j].push(pixels[i]);
                        j = 0;
                        i++;
                    }
                }
                buckets.push(new _Bucket__WEBPACK_IMPORTED_MODULE_2__["Bucket"](pixels[i]));
            }
            console.log(`from ${pixels.length} pixels, there are ${buckets.length} buckets`);
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
                while (output[output.length - 1].distanceTo(buckets[buckets.length - 1].swirl()) < threshold) {
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
        this.setImage = function (image) {
            _this.canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"](image);
        };
        this.setImage(image);
    }
    return Palette;
}());
/* harmony default export */ __webpack_exports__["default"] = (Palette);


/***/ }),

/***/ "../pewter/src/RGB.ts":
/*!****************************!*\
  !*** ../pewter/src/RGB.ts ***!
  \****************************/
/*! exports provided: yuvConstants, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yuvConstants", function() { return yuvConstants; });
/* harmony import */ var _YUV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YUV */ "../pewter/src/YUV.ts");

var yuvConstants = {
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
        var WR = yuvConstants.WR, WG = yuvConstants.WG, WB = yuvConstants.WB, U_MAX = yuvConstants.U_MAX, V_MAX = yuvConstants.V_MAX, Y = WR * this.red + WB * this.blue + WG * this.green, U = U_MAX * (this.blue - Y) / (1 - WB), V = V_MAX * (this.red - Y) / (1 - WR);
        return new _YUV__WEBPACK_IMPORTED_MODULE_0__["YUV"](Y, U, V);
    };
    RGB.prototype.distanceTo = function (other) {
        return this.toYUV().distanceTo(other.toYUV());
    };
    return RGB;
}());
/* harmony default export */ __webpack_exports__["default"] = (RGB);


/***/ }),

/***/ "../pewter/src/YUV.ts":
/*!****************************!*\
  !*** ../pewter/src/YUV.ts ***!
  \****************************/
/*! exports provided: YUV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YUV", function() { return YUV; });
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



/***/ }),

/***/ "./src/components/Demo.tsx":
/*!*********************************!*\
  !*** ./src/components/Demo.tsx ***!
  \*********************************/
/*! exports provided: Demo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Demo", function() { return Demo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pewter_src_Palette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../pewter/src/Palette */ "../pewter/src/Palette.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Demo.prototype.render = function () {
        var src = 'src/assets/images/sample.jpg';
        var image = new Image(220, 220);
        image.src = src;
        var palette = new _pewter_src_Palette__WEBPACK_IMPORTED_MODULE_1__["default"]();
        console.log('colors:', palette.getColors());
        image.onload = function () {
            palette.setImage(image);
            console.log('colors:', palette.getColors());
        };
        var colors = palette.getColors();
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'demo-container' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Pewter"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Intelligent color palettes from images."),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: src }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h6", null, "Colors"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null, colors.map(function (color) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null, color.toCSS())); }))));
    };
    return Demo;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Demo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Demo */ "./src/components/Demo.tsx");



react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Demo__WEBPACK_IMPORTED_MODULE_2__["Demo"], null), document.getElementById('demo-root'));


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map