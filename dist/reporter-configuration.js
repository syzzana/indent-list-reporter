"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIndentedListReporter = exports.getReporterOptions = void 0;
/**
 * Checks if the reporter is indent-list-reporter
 * @param configuredReporters
 */
var isIndentedListReporter = exports.isIndentedListReporter = function isIndentedListReporter(configuredReporters) {
  var isIndentedListReporter = false;
  configuredReporters === null || configuredReporters === void 0 || configuredReporters.forEach(function (reporter, index) {
    // or ./src/.. is for local testing before publishing the plugin in npm
    if (reporter[0] === "indent-list-reporter" || reporter[0] === "./src/indent-list-reporter.ts") {
      isIndentedListReporter = [true, index];
    }
  });
  return isIndentedListReporter;
};
/**
 * Returns the reporter options
 * @param reporters
 */
var getReporterOptions = exports.getReporterOptions = function getReporterOptions(reporters) {
  var reporterIndex = isIndentedListReporter(reporters);
  if (isIndentedListReporter(reporters)) {
    return reporters[reporterIndex[1]][1];
  }
};