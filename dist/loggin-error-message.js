"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleErrorFileLocation = exports.logTestError = exports.highlightErrorIndicator = void 0;
var _Color = _interopRequireDefault(require("./color-text/Color.ts"));
var _stylingTerminal = require("./color-text/styling-terminal.ts");
var _logginTestsData = require("./loggin-tests-data.ts");
var _filteringTests = require("./filtering-tests.ts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Style the error file location
 * @param errorLocation
 */
var styleErrorFileLocation = exports.styleErrorFileLocation = function styleErrorFileLocation(errorLocation) {
  var file = errorLocation.file;
  var line = errorLocation.line;
  var column = errorLocation.column;
  return _Color["default"].text("".concat(file, ":").concat(line, ":").concat(column)).blue().underscore().valueOf();
};

/**
 * Highlight the error indicator in the code snippet
 * @param codeSnippet
 */
var highlightErrorIndicator = exports.highlightErrorIndicator = function highlightErrorIndicator(codeSnippet) {
  var lines = codeSnippet.split("\n");
  var styledLines = lines.map(function (line) {
    if (line.includes("^")) {
      return _Color["default"].text(line).red().valueOf();
    } else {
      return line;
    }
  });
  return styledLines.join("\n");
};

/**
 * Log the test error message,
 * with a code snippet and a file location link
 * @param codeSnippet
 */
var logTestError = exports.logTestError = function logTestError(failedTests, isRetried) {
  var counter = 0;
  if (isRetried || process.env.CI) {
    failedTests = (0, _filteringTests.filterOutDuplicateFailedTestsOnRetry)(failedTests);
  }
  failedTests.forEach(function (failedTest) {
    var error = failedTest.error;
    var titlePath = failedTest.titlePath;
    var title = "".concat(titlePath[2], " > ").concat(titlePath[3], " > ").concat(titlePath[4], " \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ").concat(failedTest.testData.retries, " retries + 1");
    (0, _logginTestsData.log)(_Color["default"].text("".concat(++counter, ") ").concat(title)).red().valueOf());
    (0, _logginTestsData.log)("".concat(error.message));
    if (error.value !== undefined) {
      (0, _logginTestsData.log)(error.value);
    }
    if (error.snippet !== undefined) {
      var highlightedError = highlightErrorIndicator(error.snippet);
      (0, _logginTestsData.log)(highlightedError);
    }
    var fileLocationStyle = styleErrorFileLocation(error.location);
    (0, _logginTestsData.log)("\t".concat(_Color["default"].text("at").gray().valueOf(), " ").concat(fileLocationStyle));
    (0, _logginTestsData.log)(_stylingTerminal.lineBreak);
  });
};