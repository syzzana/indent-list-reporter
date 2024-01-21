"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logTestsDuration = exports.logSummary = exports.howToReadTestResults = exports.getFileNameOrParentSuite = void 0;
var _Color = _interopRequireDefault(require("./color-text/Color"));
var _stylingTerminal = require("./color-text/styling-terminal.ts");
var _logginTestsData = require("./loggin-tests-data.ts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Log information to the reader
 * on how to read/understand the test results
 */
var howToReadTestResults = exports.howToReadTestResults = function howToReadTestResults() {
  (0, _logginTestsData.log)(_stylingTerminal.lineBreak);
  (0, _logginTestsData.log)("".concat(_Color["default"].text("How to read test results:").cyan().valueOf()));
  var passed = "".concat(_Color["default"].text("✓").bold().green().valueOf(), "=passed");
  var skipped = "".concat(_Color["default"].text("!").bold().yellow().valueOf(), "\uFE0F=skipped");
  var failed = "".concat(_Color["default"].text("✘").bold().red().valueOf(), "=failed");
  var interrupted = "".concat(_Color["default"].text("!?").bold().yellow().valueOf(), "=interrupted");
  var timedOut = "\u23F0 =timedOut";
  (0, _logginTestsData.log)("".concat(passed, ", ").concat(skipped, ", ").concat(failed, ", ").concat(interrupted, ", ").concat(timedOut));
  (0, _logginTestsData.log)(_stylingTerminal.lineBreak);
};

/**
 * Log the summary of the test results
 * @param durationInMs
 * @param statusCounter
 */
var logSummary = exports.logSummary = function logSummary(durationInMs, statusCounter) {
  (0, _logginTestsData.log)(_Color["default"].text("SUMMARY:").bgBlack().cyan().valueOf());
  if (statusCounter.passed != 0) {
    (0, _logginTestsData.log)(_Color["default"].text("  ".concat(statusCounter.passed, " passed")).green().valueOf());
  }
  if (statusCounter.interrupted != 0) {
    (0, _logginTestsData.log)(_Color["default"].text("  ".concat(statusCounter.interrupted, " interrupted")).gray().valueOf());
  }
  if (statusCounter.skipped != 0) {
    (0, _logginTestsData.log)(_Color["default"].text("  ".concat(statusCounter.skipped, " skipped")).yellow().valueOf());
  }
  if (statusCounter.failed != 0) {
    (0, _logginTestsData.log)(_Color["default"].text("  ".concat(statusCounter.failed, " failed")).red().valueOf());
  }
  if (statusCounter.timedOut != 0) {
    (0, _logginTestsData.log)(_Color["default"].text("  ".concat(statusCounter.timedOut, " timedOut")).red().valueOf());
  }
  (0, _logginTestsData.log)("---------");
  logTestsDuration(Math.round(durationInMs));
};

/**
 * Log overall the tests duration in ms
 * @param durationInMS
 */
var logTestsDuration = exports.logTestsDuration = function logTestsDuration(durationInMS) {
  (0, _logginTestsData.log)(_Color["default"].text("Duration: (".concat(durationInMS, "ms)")).magenta().valueOf());
};

/**
 * Get fileName or parentSuite of a test case
 * Example: fileName = "authentication/login.spec.ts", parentSuite = "Login"
 * @param titlePath
 * @param parentSuite
 * @param fileName
 */
var getFileNameOrParentSuite = exports.getFileNameOrParentSuite = function getFileNameOrParentSuite(titlePath, parentSuite, fileName) {
  if (parentSuite) {
    return titlePath[3];
  }
  if (fileName) {
    return titlePath[2];
  }
};