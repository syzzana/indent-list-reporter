import { SuiteTestCases, TestsPerSpecFile } from "./TestsPerSpecFile";
import { getFileNameOrParentSuite, howToReadTestResults, logSummary } from "./general-tests-info";
import { filterUniqueSpecsBySpecName } from "./filtering-tests";
import Color from "./color-text/Color";
import { log, logTestResults } from "./loggin-tests-data";
import { lineBreak } from "./color-text/styling-terminal";
import { logTestError } from "./loggin-error-message";
const defaultListTestsWithColors = {
    ignoreColors: false,
    baseColors: {
        specFileNameColor: "cyan",
        suiteDescriptionColor: "cyan",
        testCaseTitleColor: "white",
    },
    environment: "dev",
};
class IndentListReporter {
    options;
    allTests = [];
    passed = 0;
    failed = 0;
    skipped = 0;
    interrupted = 0;
    timedOut = 0;
    retries = 0;
    failedTests = [];
    /**
     * Constructor to pass on custom options for the reporter
     * @param options
     */
    constructor(options) {
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
        howToReadTestResults(this.options.environment);
        log(`${Color.text("TEST RESULTS:").cyan().bgBlack().valueOf()}`);
        const number = suite.allTests().length;
        const numberOfTests = Color.text(number.toString()).white().valueOf();
        const numberOfWorkers = Color.text(config.workers.valueOf().toString()).white().valueOf();
        const testInfo = `Running ${numberOfTests} tests using ${numberOfWorkers} workers\n`;
        console.log(Color.text(testInfo).gray().valueOf());
    }
    onTestEnd(test, result) {
        const currentFileName = getFileNameOrParentSuite(test.titlePath(), false, true);
        const currentParentSuite = getFileNameOrParentSuite(test.titlePath(), true, false);
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
        const testsPerSpecFile = new TestsPerSpecFile(currentFileName);
        const suiteTestCases = new SuiteTestCases(currentParentSuite);
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
    async onExit() {
        await Promise.resolve();
    }
    onStdErr(chunk, test, result) {
        log(chunk.toString());
    }
    onStdOut(chunk, test, result) {
        log(chunk.toString());
    }
    onEnd(result) {
        const myTests = filterUniqueSpecsBySpecName(this.allTests, this.retries > 0);
        //TODO filter out duplicate failed tests on retry here or maybe inside filterUniqueSpecsBySpecName
        logTestResults(myTests);
        const statusCounter = {
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
export default IndentListReporter;
