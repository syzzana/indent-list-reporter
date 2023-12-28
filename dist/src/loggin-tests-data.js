"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFailedTestsOnlyOnceOnRetry = exports.logTestResults = exports.logTestCaseData = exports.logSuiteDescription = exports.logSpecFileName = exports.log = void 0;
const Color_1 = __importDefault(require("./color-text/Color"));
const reporter_configuration_1 = require("./reporter-configuration");
const styling_terminal_1 = require("./color-text/styling-terminal");
const filtering_tests_1 = require("./filtering-tests");
const loggin_error_message_1 = require("./loggin-error-message");
const path_1 = __importDefault(require("path"));
//TODO continue to add tyoe for myreporteroptions too 
const doesModuleExist = (moduleName) => {
    try {
        require.resolve((process.cwd(), moduleName));
        return true;
    }
    catch (e) {
        return false;
    }
};
const isPlaywrightConfigJSOrTS = doesModuleExist("playwright.config.ts") ? "playwright.config.ts" : "playwright.config.js";
/**
 * Get the config from playwright.config.ts
 */
const regExp = new RegExp(/^playwright\.config\.(ts|js)$/);
const defineConfig = require(path_1.default.resolve((process.cwd(), isPlaywrightConfigJSOrTS)));
/**
 * Log the results of the function
 * Resuses the console.log function
 * We just simplified the name of the method to log
 * @param data
 */
const log = (...data) => {
    console.log(...data);
};
exports.log = log;
/**
 * Log the name of the spec file only once
 * Example output:
 * `
 * login.spec.ts: - this here is the spec file name
 *  Login page
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * logout.spec.ts: - this here is the spec file name
 * Logout page
 *   1. ✓ Logout with valid credentials [1:1](100ms)
 *   2. ✓ Logout with invalid credentials [2:1](100ms)
 * `
 * @param specFileName
 */
const logSpecFileName = (specFileName) => {
    var _a;
    // @ts-ignore
    const reporterOptions = (0, reporter_configuration_1.getReporterOptions)(defineConfig.reporter);
    // @ts-ignore
    const specFileNameColor = ((_a = reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.baseColors) === null || _a === void 0 ? void 0 : _a.specFileNameColor)
        // @ts-ignore
        ? reporterOptions.baseColors.specFileNameColor
        : undefined;
    // @ts-ignore
    if (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.ignoreColors) {
        (0, exports.log)(`${specFileName}:`);
    }
    else if (specFileNameColor !== undefined) {
        (0, exports.log)(`${Color_1.default.text(specFileName)[specFileNameColor]().valueOf()}:`);
    }
    else {
        (0, exports.log)(`${Color_1.default.text(specFileName).cyan().valueOf()}:`);
    }
};
exports.logSpecFileName = logSpecFileName;
/**
 * Log the name of the suite only once
 * Example output:
 * `
 * login.spec.ts:
 *  Login page -  `This here is the suite description`
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * `
 * @param suiteName
 */
const logSuiteDescription = (suiteName) => {
    var _a;
    // @ts-ignore
    const reporterOptions = (0, reporter_configuration_1.getReporterOptions)(defineConfig.reporter);
    const suiteDescriptionColor = ((_a = reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.baseColors) === null || _a === void 0 ? void 0 : _a.suiteDescriptionColor)
        ? reporterOptions.baseColors.suiteDescriptionColor
        : undefined;
    if (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.ignoreColors) {
        (0, exports.log)(`  ${suiteName}`);
    }
    else if (suiteDescriptionColor !== undefined) {
        (0, exports.log)(`  ${Color_1.default.text(suiteName)[suiteDescriptionColor]().underscore().valueOf()}`);
    }
    else {
        (0, exports.log)(`  ${Color_1.default.text(suiteName).cyan().underscore().valueOf()}`);
    }
};
exports.logSuiteDescription = logSuiteDescription;
/**
 * Log the test case data
 * Example output:
 * `    1. ✓ Login with valid credentials [1:1](100ms)`
 * @param count
 * @param test
 */
const logTestCaseData = (count, test) => {
    var _a;
    const status = (0, styling_terminal_1.setIconAndColorPerTestStatus)(test.status);
    const duration = Color_1.default.text(`(${test.duration}ms)`).gray().dim().valueOf();
    const counter = `${Color_1.default.text(`${count}.`).gray().valueOf()}`;
    // @ts-ignore
    const reporterOptions = (0, reporter_configuration_1.getReporterOptions)(defineConfig.reporter);
    const testCaseTitleColor = ((_a = reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.baseColors) === null || _a === void 0 ? void 0 : _a.testCaseTitleColor)
        ? reporterOptions.baseColors.testCaseTitleColor
        : undefined;
    let title;
    if (test.status === "failed") {
        if (test.retries) {
            title = Color_1.default.text(test.title).red().valueOf() + Color_1.default.text(` (${test.retries} retries + 1 (by default))`).magenta().valueOf();
        }
        else {
            title = Color_1.default.text(test.title).red().valueOf();
        }
    }
    else if (test.status === "skipped") {
        title = Color_1.default.text(test.title).yellow().valueOf();
    }
    else {
        if (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.ignoreColors) {
            title = test.title;
        }
        else if (testCaseTitleColor !== undefined) {
            title = Color_1.default.text(test.title)[testCaseTitleColor]().valueOf();
        }
        else {
            title = Color_1.default.text(test.title).white().valueOf();
        }
    }
    const rowAndCol = `${Color_1.default.text(`[${test.line}:${test.column}]`).gray().valueOf()}`;
    (0, exports.log)(`   ${counter} ${status} ${title} ${rowAndCol}${duration}`);
};
exports.logTestCaseData = logTestCaseData;
/**
 * Log the test results of all the run tests
 * @param allTests
 */
const logTestResults = (allTests) => {
    let testCounter = 0;
    allTests.forEach((specFile) => {
        (0, exports.logSpecFileName)(specFile.getSpecName());
        specFile.getSuiteTests().forEach((suite) => {
            (0, exports.logSuiteDescription)(suite.getSuiteDescription());
            suite.getTestCases().forEach((test) => {
                //TODO: filter getTests() here failed tests that were retried and failed again
                testCounter++;
                (0, exports.logTestCaseData)(testCounter, test);
            });
        });
    });
    (0, exports.log)(styling_terminal_1.lineBreak);
};
exports.logTestResults = logTestResults;
/**
 * Log the failed tests only once when they were retried
 * @param failedTests
 * @param retries
 */
const logFailedTestsOnlyOnceOnRetry = (failedTests, retries) => {
    if (retries > 0) {
        const filteredFailedTests = (0, filtering_tests_1.filterOutDuplicateFailedTestsOnRetry)(failedTests);
        (0, loggin_error_message_1.logTestError)(filteredFailedTests, retries > 0);
    }
};
exports.logFailedTestsOnlyOnceOnRetry = logFailedTestsOnlyOnceOnRetry;
