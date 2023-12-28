"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReporterOptions = exports.isIndentedListReporter = void 0;
/**
 * Checks if the reporter is indent-list-reporter
 * @param configuredReporters
 */
const isIndentedListReporter = (configuredReporters) => {
    let isIndentedListReporter = false;
    configuredReporters === null || configuredReporters === void 0 ? void 0 : configuredReporters.forEach((reporter, index) => {
        // or ./src/.. is for local testing before publishing the plugin in npm
        if (reporter[0] === "indent-list-reporter" || reporter[0] === "./src/indent-list-reporter.ts") {
            isIndentedListReporter = [true, index];
        }
    });
    return isIndentedListReporter;
};
exports.isIndentedListReporter = isIndentedListReporter;
/**
 * Returns the reporter options
 * @param reporters
 */
const getReporterOptions = (reporters) => {
    const reporterIndex = (0, exports.isIndentedListReporter)(reporters);
    if ((0, exports.isIndentedListReporter)(reporters)) {
        return reporters[reporterIndex[1]][1];
    }
};
exports.getReporterOptions = getReporterOptions;
