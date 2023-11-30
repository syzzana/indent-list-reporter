import { TestCase, TestResult, Reporter, FullResult, Suite, FullConfig } from "@playwright/test/reporter";
import { SuiteTestCases, TestCaseData, TestCaseError, TestsPerSpecFile } from "./TestsPerSpecFile";
import {
  filterUniqueSpecsBySpecName,
  getFileNameOrParentSuite,
  howToReadTestResults,
  log,
  logTestError,
  logSummary,
  logTestResults,
  StatusCounter, filterOutDuplicateFailedTests, lineBreak, logFilteredFailedTests,
} from "./test-results";
import color from "colors";
import { TestStatus } from "@playwright/test";
import { TestError } from "playwright/types/testReporter";
import Color from "../color-text/Color";

const defaultListTestsWithColors: IndentListReporterOptions = {
 ignoreColors: false,
 baseColors: {
   specFileNameColor: "cyan",
   suiteDescriptionColor: "cyan",
 },
}

interface ListTestsWithColors {
  specFileNameColor: string;
  suiteDescriptionColor: string;
  isDimmed?: boolean;
}

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
  constructor(options: IndentListReporterOptions) {
    if(!options) {
      this.options = defaultListTestsWithColors
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
    const number = suite.allTests().length
    const numberOfTests = color.white(number.toString());
    const numberOfWorkers = color.white(config.workers.valueOf().toString());
    const testInfo = `Running ${numberOfTests} tests using ${numberOfWorkers} workers\n`;
    console.log(color.gray(testInfo));
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
      }
      this.failedTests.push(testCaseError);
    }
  }

 onError(error: TestError) {
   try {
     throw new Error(`ERROR: ${error.message}`);
   }
   catch(e) {
     console.log(e);
   }
 }

 async onExit(): Promise<void> {
   await Promise.resolve();
 }

 onStdErr(chunk: Buffer | string, test:void|TestCase, result: void|TestResult) {
   log(chunk.toString());
 }

 onStdOut(chunk: Buffer | string, test:void|TestCase, result: void|TestResult) {
    log(chunk.toString());
 }

  onEnd(result: FullResult) {
    const myTests = filterUniqueSpecsBySpecName(this.allTests);
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
      logTestError(this.failedTests);
    }
    logSummary(result.duration, statusCounter);
    log(lineBreak)
    logFilteredFailedTests(filterOutDuplicateFailedTests(this.failedTests), this.retries)
  }

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
