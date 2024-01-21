"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIconAndColorPerTestStatus = exports.removeAnsiChars = exports.lineBreak = exports.line = exports.ansiRegex = void 0;
var _Color = _interopRequireDefault(require("./Color.ts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Line break
 */
var line = exports.line = "─────────────────────────────────────────────────────────────────────";

/**
 * Line break with color
 */
var lineBreak = exports.lineBreak = _Color["default"].text(line).magenta().valueOf();

/**
 * Remove ANSI characters from a string
 * TODO recheck and add explination
 */
var ansiRegex = exports.ansiRegex = new RegExp("([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))", "g");

/**
 * Remove ANSI characters from a string
 * @param str
 */
var removeAnsiChars = exports.removeAnsiChars = function removeAnsiChars(str) {
  return str.replace(ansiRegex, "");
};

/**
 * Set the icon and the color of a test case based on the status
 * @param status
 */
var setIconAndColorPerTestStatus = exports.setIconAndColorPerTestStatus = function setIconAndColorPerTestStatus(status) {
  if (status === "skipped") {
    return "".concat(_Color["default"].text("!").yellow().valueOf());
  }
  if (status === "failed") {
    return "".concat(_Color["default"].text("\u2718").red().valueOf());
  }
  if (status === "timedOut") {
    return "\u23F0";
  }
  if (status === "interrupted") {
    return "".concat(_Color["default"].text("!?").gray());
  }
  if (status === "passed") {
    return "".concat(_Color["default"].text("\u2713").green().valueOf());
  }
};