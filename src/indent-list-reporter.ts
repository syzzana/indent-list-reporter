import {TestCase, TestResult, Reporter, FullResult, Suite, FullConfig} from "@playwright/test/reporter";
import {SuiteTestCases, TestCaseData, TestCaseError, TestsPerSpecFile} from "./TestsPerSpecFile";
import {getFileNameOrParentSuite, howToReadTestResults, logSummary, StatusCounter} from "./general-tests-info";
import {filterUniqueSpecsBySpecName} from "./filtering-tests.js";
import {TestStatus} from "@playwright/test";
import {TestError} from "playwright/types/testReporter";
import Color from "./color-text/Color.js";
import {log, logTestResults} from "./loggin-tests-data.js";
import {lineBreak} from "./color-text/styling-terminal.js";
import {logTestError} from "./loggin-error-message.js";

const defaultListTestsWithColors: IndentListReporterOptions = {
    ignoreColors: false,
    baseColors: {
        specFileNameColor: "cyan",
        suiteDescriptionColor: "cyan",
        testCaseTitleColor: "white",
    },
};
export type ColorsAvailable = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray";

interface ListTestsWithColors {
    specFileNameColor: ColorsAvailable;
    suiteDescriptionColor: ColorsAvailable;
    testCaseTitleColor?: ColorsAvailable;
    isDimmed?: boolean;
}

export type MyReporterOptions = ['indent-list-reporter' | './src/indent-list-reporter.ts'] | ['indent-list-reporter' | './src/indent-list-reporter.ts', IndentListReporterOptions];
interface IndentListReporterOptions {
    ignoreColors: boolean;
    baseColors: ListTestsWithColors;
}

class IndentListReporter implements Reporter {
    private options: IndentListReporterOptions;
    allTests: TestsPerSpecFile[] = [];
    passed = 0;
    failed = 0;
    skipped = 0;
    interrupted = 0;
    timedOut = 0;
    retries = 0;
    failedTests: TestCaseError[] = [];

    /**
     * Constructor to pass on custom options for the reporter
     * @param options
     */
    constructor(options: IndentListReporterOptions) {
        if (!options) {
            this.options = defaultListTestsWithColors;
        } else {
            this.options = options;
        }
    }

    printsToStdio() {
        return true;
    }

    onBegin(config: FullConfig, suite: Suite) {
        howToReadTestResults();
        log(`${Color.text("TEST RESULTS:").cyan().bgBlack().valueOf()}`);
        const number = suite.allTests().length;
        const numberOfTests = Color.text(number.toString()).white().valueOf();
        const numberOfWorkers = Color.text(config.workers.valueOf().toString()).white().valueOf();
        const testInfo = `Running ${numberOfTests} tests using ${numberOfWorkers} workers\n`;
        console.log(Color.text(testInfo).gray().valueOf());
    }


    onTestEnd(test: TestCase, result: TestResult) {
        const currentFileName = getFileNameOrParentSuite(test.titlePath(), false, true);
        const currentParentSuite = getFileNameOrParentSuite(test.titlePath(), true, false);
        const testCase: TestCaseData = {
            id: test.id,
            title: test.title,
            line: test.location.line,
            column: test.location.column,
            status: result.status,
            duration: result.duration,
            retries: test.retries
        };
        this.retries = result.retry;
        const testsPerSpecFile = new TestsPerSpecFile(currentFileName);
        const suiteTestCases = new SuiteTestCases(currentParentSuite);
        suiteTestCases.addTestCase(testCase);
        testsPerSpecFile.addTestCases(suiteTestCases);
        this.allTests.push(testsPerSpecFile);
        this.increaseTestStatusCounter(result.status);
        if (result.status === "failed") {
            const testCaseError: TestCaseError = {
                error: result.error,
                testData: testCase,
                titlePath: test.titlePath(),
            };
            this.failedTests.push(testCaseError);
        }
    }

    onError(error: TestError) {
        try {
            throw new Error(`ERROR: ${error.message}`);
        } catch (e) {
            console.log(e);
        }
    }

    async onExit(): Promise<void> {
        await Promise.resolve();
    }

    onStdErr(chunk: Buffer | string, test: void | TestCase, result: void | TestResult) {
        log(chunk.toString());
    }

    onStdOut(chunk: Buffer | string, test: void | TestCase, result: void | TestResult) {
        log(chunk.toString());
    }

    onEnd(result: FullResult) {
        const myTests = filterUniqueSpecsBySpecName(this.allTests, this.retries > 0);
        //TODO filter out duplicate failed tests on retry here or maybe inside filterUniqueSpecsBySpecName
        logTestResults(myTests);
        const statusCounter: StatusCounter = {
            passed: this.passed,
            failed: this.failed,
            skipped: this.skipped,
            interrupted: this.interrupted,
            timedOut: this.timedOut,
        };
        if (this.failedTests.length > 0) {
            log(Color.text("FAILED TESTS:").red().bgBlack().valueOf());
            logTestError(this.failedTests, this.retries > 0);
        }
        logSummary(result.duration, statusCounter);
        log(lineBreak);
    }

    //TODO: fix the counter for failed on retries
    increaseTestStatusCounter(test: TestStatus) {
        if (test === "passed") {
            this.passed++;
        } else if (test === "failed") {
            this.failed++;
        } else if (test === "timedOut") {
            this.timedOut++;
        } else if (test === "skipped") {
            this.skipped++;
        } else if (test === "interrupted") {
            this.interrupted++;
        }
    }
}

export default IndentListReporter;
