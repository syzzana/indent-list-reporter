"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Color = exports["default"] = /*#__PURE__*/function () {
  function Color(text) {
    _classCallCheck(this, Color);
    _defineProperty(this, "colors", []);
    this.text = text;
  }
  _createClass(Color, [{
    key: "addColor",
    value: function addColor(color) {
      this.colors.push(color);
      return this;
    }
  }, {
    key: "red",
    value: function red() {
      return this.addColor(Color.Red);
    }
  }, {
    key: "green",
    value: function green() {
      return this.addColor(Color.Green);
    }
  }, {
    key: "gray",
    value: function gray() {
      return this.addColor(Color.Gray);
    }
  }, {
    key: "yellow",
    value: function yellow() {
      return this.addColor(Color.Yellow);
    }
  }, {
    key: "blue",
    value: function blue() {
      return this.addColor(Color.Blue);
    }
  }, {
    key: "magenta",
    value: function magenta() {
      return this.addColor(Color.Magenta);
    }
  }, {
    key: "cyan",
    value: function cyan() {
      return this.addColor(Color.Cyan);
    }
  }, {
    key: "white",
    value: function white() {
      return this.addColor(Color.White);
    }
  }, {
    key: "black",
    value: function black() {
      return this.addColor(Color.Black);
    }
  }, {
    key: "bgWhite",
    value: function bgWhite() {
      return this.addColor(Color.BgWhite);
    }
  }, {
    key: "bgRed",
    value: function bgRed() {
      return this.addColor(Color.BgRed);
    }
  }, {
    key: "bgGreen",
    value: function bgGreen() {
      return this.addColor(Color.BgGreen);
    }
  }, {
    key: "bgYellow",
    value: function bgYellow() {
      return this.addColor(Color.BgYellow);
    }
  }, {
    key: "bgBlue",
    value: function bgBlue() {
      return this.addColor(Color.BgBlue);
    }
  }, {
    key: "bgMagenta",
    value: function bgMagenta() {
      return this.addColor(Color.BgMagenta);
    }
  }, {
    key: "bgCyan",
    value: function bgCyan() {
      return this.addColor(Color.BgCyan);
    }
  }, {
    key: "bgBlack",
    value: function bgBlack() {
      return this.addColor(Color.BgBlack);
    }
  }, {
    key: "dim",
    value: function dim() {
      return this.addColor(Color.Dim);
    }
  }, {
    key: "underscore",
    value: function underscore() {
      return this.addColor(Color.Underscore);
    }
  }, {
    key: "bold",
    value: function bold() {
      return this.addColor(Color.Bold);
    }
  }, {
    key: "blink",
    value: function blink() {
      return this.addColor(Color.Blink);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return this.addColor(Color.Reverse);
    }
  }, {
    key: "hidden",
    value: function hidden() {
      return this.addColor(Color.Hidden);
    }

    //TODO implement rgb custom colors
  }, {
    key: "valueOf",
    value: function valueOf() {
      var reset = "\x1b[0m";
      return this.colors.reduce(function (text, color) {
        return "".concat(color).concat(text);
      }, this.text) + reset;
    }
  }], [{
    key: "text",
    value: function text(_text) {
      return new Color(_text);
    }
  }]);
  return Color;
}();
/*
 *  Foreground Colors
 */
_defineProperty(Color, "Black", "\x1b[30m");
_defineProperty(Color, "Red", "\x1b[31m");
_defineProperty(Color, "Green", "\x1b[32m");
_defineProperty(Color, "Yellow", "\x1b[33m");
_defineProperty(Color, "Blue", "\x1b[34m");
_defineProperty(Color, "Magenta", "\x1b[35m");
_defineProperty(Color, "Cyan", "\x1b[36m");
_defineProperty(Color, "White", "\x1b[37m");
_defineProperty(Color, "Gray", "\x1b[90m");
/*
 *  Background Colors
 */
_defineProperty(Color, "BgBlack", "\x1b[40m");
_defineProperty(Color, "BgRed", "\x1b[41m");
_defineProperty(Color, "BgGreen", "\x1b[42m");
_defineProperty(Color, "BgYellow", "\x1b[43m");
_defineProperty(Color, "BgBlue", "\x1b[44m");
_defineProperty(Color, "BgMagenta", "\x1b[45m");
_defineProperty(Color, "BgCyan", "\x1b[46m");
_defineProperty(Color, "BgWhite", "\x1b[47m");
/*
 * Text Effects
 */
_defineProperty(Color, "Bright", "\x1b[1m");
_defineProperty(Color, "Dim", "\x1b[2m");
_defineProperty(Color, "Underscore", "\x1b[4m");
_defineProperty(Color, "Blink", "\x1b[5m");
_defineProperty(Color, "Reverse", "\x1b[7m");
_defineProperty(Color, "Hidden", "\x1b[8m");
_defineProperty(Color, "Bold", "\x1b[1m");