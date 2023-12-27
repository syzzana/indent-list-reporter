"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNameOrParentSuite = exports.logTestsDuration = exports.logSummary = exports.howToReadTestResults = void 0;
const Color_1 = __importDefault(require("./color-text/Color"));
const styling_terminal_1 = require("./color-text/styling-terminal");
const loggin_tests_data_1 = require("./loggin-tests-data");
/**
 * Log information to the reader
 * on how to read/understand the test results
 */
const howToReadTestResults = () => {
    (0, loggin_tests_data_1.log)(styling_terminal_1.lineBreak);
    (0, loggin_tests_data_1.log)(`${Color_1.default.text("How to read test results:").cyan().valueOf()}`);
    const passed = `${Color_1.default.text("✓").bold().green().valueOf()}=passed`;
    const skipped = `${Color_1.default.text("!").bold().yellow().valueOf()}️=skipped`;
    const failed = `${Color_1.default.text("✘").bold().red().valueOf()}=failed`;
    const interrupted = `${Color_1.default.text("!?").bold().yellow().valueOf()}=interrupted`;
    const timedOut = `⏰ =timedOut`;
    (0, loggin_tests_data_1.log)(`${passed}, ${skipped}, ${failed}, ${interrupted}, ${timedOut}`);
    (0, loggin_tests_data_1.log)(styling_terminal_1.lineBreak);
};
exports.howToReadTestResults = howToReadTestResults;
/**
 * Log the summary of the test results
 * @param durationInMs
 * @param statusCounter
 */
const logSummary = (durationInMs, statusCounter) => {
    (0, loggin_tests_data_1.log)(Color_1.default.text("SUMMARY:").bgBlack().cyan().valueOf());
    if (statusCounter.passed != 0) {
        (0, loggin_tests_data_1.log)(Color_1.default.text(`  ${statusCounter.passed} passed`).green().valueOf());
    }
    if (statusCounter.interrupted != 0) {
        (0, loggin_tests_data_1.log)(Color_1.default.text(`  ${statusCounter.interrupted} interrupted`).gray().valueOf());
    }
    if (statusCounter.skipped != 0) {
        (0, loggin_tests_data_1.log)(Color_1.default.text(`  ${statusCounter.skipped} skipped`).yellow().valueOf());
    }
    if (statusCounter.failed != 0) {
        (0, loggin_tests_data_1.log)(Color_1.default.text(`  ${statusCounter.failed} failed`).red().valueOf());
    }
    if (statusCounter.timedOut != 0) {
        (0, loggin_tests_data_1.log)(Color_1.default.text(`  ${statusCounter.timedOut} timedOut`).red().valueOf());
    }
    (0, loggin_tests_data_1.log)("---------");
    (0, exports.logTestsDuration)(Math.round(durationInMs));
};
exports.logSummary = logSummary;
/**
 * Log overall the tests duration in ms
 * @param durationInMS
 */
const logTestsDuration = (durationInMS) => {
    (0, loggin_tests_data_1.log)(Color_1.default.text(`Duration: (${durationInMS}ms)`).magenta().valueOf());
};
exports.logTestsDuration = logTestsDuration;
/**
 * Get fileName or parentSuite of a test case
 * Example: fileName = "authentication/login.spec.ts", parentSuite = "Login"
 * @param titlePath
 * @param parentSuite
 * @param fileName
 */
const getFileNameOrParentSuite = (titlePath, parentSuite, fileName) => {
    if (parentSuite) {
        return titlePath[3];
    }
    if (fileName) {
        return titlePath[2];
    }
};
exports.getFileNameOrParentSuite = getFileNameOrParentSuite;
