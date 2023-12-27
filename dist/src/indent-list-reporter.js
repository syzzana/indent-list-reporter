"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestsPerSpecFile_1 = require("./TestsPerSpecFile");
const general_tests_info_1 = require("./general-tests-info");
const filtering_tests_1 = require("./filtering-tests");
const Color_1 = __importDefault(require("./color-text/Color"));
const loggin_tests_data_1 = require("./loggin-tests-data");
const styling_terminal_1 = require("./color-text/styling-terminal");
const loggin_error_message_1 = require("./loggin-error-message");
const defaultListTestsWithColors = {
    ignoreColors: false,
    baseColors: {
        specFileNameColor: "cyan",
        suiteDescriptionColor: "cyan",
        testCaseTitleColor: "white",
    },
};
class IndentListReporter {
    /**
     * Constructor to pass on custom options for the reporter
     * @param options
     */
    constructor(options) {
        this.allTests = [];
        this.passed = 0;
        this.failed = 0;
        this.skipped = 0;
        this.interrupted = 0;
        this.timedOut = 0;
        this.retries = 0;
        this.failedTests = [];
        if (!options) {
            this.options = defaultListTestsWithColors;
        }
        else {
            this.options = options;
        }
    }
    printsToStdio() {
        return true;
    }
    onBegin(config, suite) {
        (0, general_tests_info_1.howToReadTestResults)();
        (0, loggin_tests_data_1.log)(`${Color_1.default.text("TEST RESULTS:").cyan().bgBlack().valueOf()}`);
        const number = suite.allTests().length;
        const numberOfTests = Color_1.default.text(number.toString()).white().valueOf();
        const numberOfWorkers = Color_1.default.text(config.workers.valueOf().toString()).white().valueOf();
        const testInfo = `Running ${numberOfTests} tests using ${numberOfWorkers} workers\n`;
        console.log(Color_1.default.text(testInfo).gray().valueOf());
    }
    onTestEnd(test, result) {
        const currentFileName = (0, general_tests_info_1.getFileNameOrParentSuite)(test.titlePath(), false, true);
        const currentParentSuite = (0, general_tests_info_1.getFileNameOrParentSuite)(test.titlePath(), true, false);
        const testCase = {
            id: test.id,
            title: test.title,
            line: test.location.line,
            column: test.location.column,
            status: result.status,
            duration: result.duration,
            retries: test.retries
        };
        this.retries = result.retry;
        const testsPerSpecFile = new TestsPerSpecFile_1.TestsPerSpecFile(currentFileName);
        const suiteTestCases = new TestsPerSpecFile_1.SuiteTestCases(currentParentSuite);
        suiteTestCases.addTestCase(testCase);
        testsPerSpecFile.addTestCases(suiteTestCases);
        this.allTests.push(testsPerSpecFile);
        this.increaseTestStatusCounter(result.status);
        if (result.status === "failed") {
            const testCaseError = {
                error: result.error,
                testData: testCase,
                titlePath: test.titlePath(),
            };
            this.failedTests.push(testCaseError);
        }
    }
    onError(error) {
        try {
            throw new Error(`ERROR: ${error.message}`);
        }
        catch (e) {
            console.log(e);
        }
    }
    onExit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.resolve();
        });
    }
    onStdErr(chunk, test, result) {
        (0, loggin_tests_data_1.log)(chunk.toString());
    }
    onStdOut(chunk, test, result) {
        (0, loggin_tests_data_1.log)(chunk.toString());
    }
    onEnd(result) {
        const myTests = (0, filtering_tests_1.filterUniqueSpecsBySpecName)(this.allTests, this.retries > 0);
        //TODO filter out duplicate failed tests on retry here or maybe inside filterUniqueSpecsBySpecName
        (0, loggin_tests_data_1.logTestResults)(myTests);
        const statusCounter = {
            passed: this.passed,
            failed: this.failed,
            skipped: this.skipped,
            interrupted: this.interrupted,
            timedOut: this.timedOut,
        };
        if (this.failedTests.length > 0) {
            (0, loggin_tests_data_1.log)(Color_1.default.text("FAILED TESTS:").red().bgBlack().valueOf());
            (0, loggin_error_message_1.logTestError)(this.failedTests, this.retries > 0);
        }
        (0, general_tests_info_1.logSummary)(result.duration, statusCounter);
        (0, loggin_tests_data_1.log)(styling_terminal_1.lineBreak);
    }
    //TODO: fix the counter for failed on retries
    increaseTestStatusCounter(test) {
        if (test === "passed") {
            this.passed++;
        }
        else if (test === "failed") {
            this.failed++;
        }
        else if (test === "timedOut") {
            this.timedOut++;
        }
        else if (test === "skipped") {
            this.skipped++;
        }
        else if (test === "interrupted") {
            this.interrupted++;
        }
    }
}
exports.default = IndentListReporter;
