import {PlaywrightTestConfig} from "@playwright/test";
import Color from "./color-text/Color.js";
import {getReporterOptions} from "./reporter-configuration.js";
import {TestCaseData, TestCaseError, TestsPerSpecFile} from "./TestsPerSpecFile.js";
import {lineBreak, setIconAndColorPerTestStatus} from "./color-text/styling-terminal.js";
import {filterOutDuplicateFailedTestsOnRetry} from "./filtering-tests.js";
import {logTestError} from "./loggin-error-message.js";
import {ColorsAvailable} from "./indent-list-reporter.js";
import { adaptFilePathImportForWindows, isWindows } from "./utils/utils.js";

// Dynamically determine the Playwright config file's extension (.ts or .js)
export const getPlaywrightConfigFile = async () => {
    const tsConfigPath = `${process.cwd()}/playwright.config.ts`;
    const jsConfigPath = `${process.cwd()}/playwright.config.js`;

    try {
        await import(tsConfigPath);
        return tsConfigPath;
    } catch {
        return jsConfigPath; // Fallback to .js if .ts import fails
    }
};

/**
 * Get the config from playwright.config.ts
 */
export const userPlaywrightConfigFile = await getPlaywrightConfigFile();
export const convertImportFilePathForWindows = adaptFilePathImportForWindows(userPlaywrightConfigFile);
export const whichPlatForm = isWindows ? convertImportFilePathForWindows : userPlaywrightConfigFile;
export const playwrightConfigDetails: PlaywrightTestConfig = await import(whichPlatForm)


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
// This function is now async due to dynamic import
export const logSpecFileName = async (specFileName: string, playwrightConfigDetails: PlaywrightTestConfig) => {
    // @ts-ignore
    const reporterOptions = getReporterOptions(playwrightConfigDetails.default.reporter);
    let specFileNameColor: ColorsAvailable;
    if (reporterOptions !== undefined) {
        specFileNameColor = reporterOptions?.baseColors?.specFileNameColor
            ? reporterOptions.baseColors.specFileNameColor
            : undefined;
    }
    if (reporterOptions?.ignoreColors === true) {
        log(`${specFileName}:`);
    } else if (specFileNameColor !== undefined) {
        log(`${Color.text(specFileName)[specFileNameColor]().valueOf()}:`);
    } else {
        log(`${Color.text(specFileName).cyan().valueOf()}:`);
    }
};

/**
 * Log the results of the function
 * Resuses the console.log function
 * We just simplified the name of the method to log
 * @param data
 */
export const log = (...data: any[]) => {
    console.log(...data);
};

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
export const logSuiteDescription = (suiteName: string, playwrightConfigDetails: PlaywrightTestConfig) => {
    // @ts-ignore
    const reporterOptions = getReporterOptions(playwrightConfigDetails.default.reporter);
    let suiteDescriptionColor: ColorsAvailable;
    if (reporterOptions !== undefined) {
        suiteDescriptionColor = reporterOptions?.baseColors?.suiteDescriptionColor
            ? reporterOptions.baseColors.suiteDescriptionColor
            : undefined;
    }
    if (reporterOptions?.ignoreColors) {
        log(`  ${suiteName}`);
    } else if (suiteDescriptionColor !== undefined) {
        log(`  ${Color.text(suiteName)[suiteDescriptionColor]().underscore().valueOf()}`);
    } else {
        log(`  ${Color.text(suiteName).cyan().underscore().valueOf()}`);
    }
};

/**
 * Log the test case data
 * Example output:
 * `    1. ✓ Login with valid credentials [1:1](100ms)`
 * @param count
 * @param test
 */
export const logTestCaseData = (count: number, test: TestCaseData, playwrightConfigDetails: PlaywrightTestConfig) => {
    const status = setIconAndColorPerTestStatus(test.status);
    const duration = Color.text(`(${test.duration}ms)`).gray().dim().valueOf();
    const counter = `${Color.text(`${count}.`).gray().valueOf()}`;
    // @ts-ignore
    const reporterOptions = getReporterOptions(playwrightConfigDetails.default.reporter);
    let testCaseTitleColor: ColorsAvailable;
    if (reporterOptions !== undefined) {
        testCaseTitleColor = reporterOptions?.baseColors?.testCaseTitleColor
            ? reporterOptions.baseColors.testCaseTitleColor
            : undefined;
    }
    let title: string;
    if (test.status === "failed") {
        if (test.retries) {
            title = Color.text(test.title).red().valueOf() + Color.text(` (${test.retries} retries + 1 (by default))`).magenta().valueOf();
        } else {
            title = Color.text(test.title).red().valueOf();
        }
    } else if (test.status === "skipped") {
        title = Color.text(test.title).yellow().valueOf();
    } else {
        if (reporterOptions?.ignoreColors) {
            title = test.title;
        } else if (testCaseTitleColor !== undefined) {
            title = Color.text(test.title)[testCaseTitleColor]().valueOf();
        } else {
            title = Color.text(test.title).white().valueOf();
        }
    }

    const rowAndCol = `${Color.text(`[${test.line}:${test.column}]`).gray().valueOf()}`;
    log(`   ${counter} ${status} ${title} ${rowAndCol}${duration}`);
};

/**
 * Log the test results of all the run tests
 * @param allTests
 */
export const logTestResults = (allTests: TestsPerSpecFile[]) => {
    let testCounter = 0;

    allTests.forEach((specFile) => {
        logSpecFileName(specFile.getSpecName(), playwrightConfigDetails);
        specFile.getSuiteTests().forEach((suite) => {
            logSuiteDescription(suite.getSuiteDescription(), playwrightConfigDetails);
            suite.getTestCases().forEach((test) => {
                //TODO: filter getTests() here failed tests that were retried and failed again
                testCounter++;
                logTestCaseData(testCounter, test, playwrightConfigDetails);
            });
        });
    });

    log(lineBreak);
};

/**
 * Log the failed tests only once when they were retried
 * @param failedTests
 * @param retries
 */
export const logFailedTestsOnlyOnceOnRetry = (failedTests: TestCaseError[], retries: number) => {
    if (retries > 0) {
        const filteredFailedTests = filterOutDuplicateFailedTestsOnRetry(failedTests);
        logTestError(filteredFailedTests, retries > 0);
    }
};
