"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTestError = exports.highlightErrorIndicator = exports.styleErrorFileLocation = void 0;
const Color_1 = __importDefault(require("./color-text/Color"));
const styling_terminal_1 = require("./color-text/styling-terminal");
const loggin_tests_data_1 = require("./loggin-tests-data");
const filtering_tests_1 = require("./filtering-tests");
/**
 * Style the error file location
 * @param errorLocation
 */
const styleErrorFileLocation = (errorLocation) => {
    const file = errorLocation.file;
    const line = errorLocation.line;
    const column = errorLocation.column;
    return Color_1.default.text(`${file}:${line}:${column}`).blue().underscore().valueOf();
};
exports.styleErrorFileLocation = styleErrorFileLocation;
/**
 * Highlight the error indicator in the code snippet
 * @param codeSnippet
 */
const highlightErrorIndicator = (codeSnippet) => {
    const lines = codeSnippet.split("\n");
    const styledLines = lines.map((line) => {
        if (line.includes("^")) {
            return Color_1.default.text(line).red().valueOf();
        }
        else {
            return line;
        }
    });
    return styledLines.join("\n");
};
exports.highlightErrorIndicator = highlightErrorIndicator;
/**
 * Log the test error message,
 * with a code snippet and a file location link
 * @param codeSnippet
 */
const logTestError = (failedTests, isRetried) => {
    let counter = 0;
    if (isRetried || process.env.CI) {
        failedTests = (0, filtering_tests_1.filterOutDuplicateFailedTestsOnRetry)(failedTests);
    }
    failedTests.forEach((failedTest) => {
        const error = failedTest.error;
        const titlePath = failedTest.titlePath;
        const title = `${titlePath[2]} > ${titlePath[3]} > ${titlePath[4]} ─────────────── ${failedTest.testData.retries} retries + 1`;
        (0, loggin_tests_data_1.log)(Color_1.default.text(`${++counter}) ${title}`).red().valueOf());
        (0, loggin_tests_data_1.log)(`${error.message}`);
        if (error.value !== undefined) {
            (0, loggin_tests_data_1.log)(error.value);
        }
        if (error.snippet !== undefined) {
            const highlightedError = (0, exports.highlightErrorIndicator)(error.snippet);
            (0, loggin_tests_data_1.log)(highlightedError);
        }
        const fileLocationStyle = (0, exports.styleErrorFileLocation)(error.location);
        (0, loggin_tests_data_1.log)(`\t${Color_1.default.text("at").gray().valueOf()} ${fileLocationStyle}`);
        (0, loggin_tests_data_1.log)(styling_terminal_1.lineBreak);
    });
};
exports.logTestError = logTestError;
