import { TestCase, TestResult, Reporter, FullResult, Suite, FullConfig } from "@playwright/test/reporter";
import { SuiteTestCases, TestCaseData, TestsPerSpecFile } from "./TestsPerSpecFile";
import {
  filterDuplicateSpecNames,
  getFileNameOrParentSuite,
  howToReadTestResults,
  lineBreak,
  log,
  logFailedTests,
  logSummary,
  logTestResults,
  StatusCounter,
} from "./testResults";
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

export type TestCaseError = {
  error: TestError;
  titlePath: string[];
}

export type RetriedTestCase = {
    testCase: TestCase;
    result: TestResult;
    retries: number;
}

class IndentListReporter implements Reporter {
  private options: IndentListReporterOptions;
  allTests: TestsPerSpecFile[] = [];
  passed = 0;
  failed = 0;
  skipped = 0;
  interrupted = 0;
  timedOut = 0;
  failedTests: TestCaseError[] = [];
  retries = 0;
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
    this.retries = result.retry;
    const currentFileName = getFileNameOrParentSuite(test.titlePath(), false, true);
    const currentParentSuite = getFileNameOrParentSuite(test.titlePath(), true, false);
    const testCase: TestCaseData = {
      id: test.id,
      title: test.title,
      line: test.location.line,
      column: test.location.column,
      status: result.status,
      duration: result.duration,
      retries: test.retries,
    };
    const testsPerSpecFile = new TestsPerSpecFile(currentFileName);
    const suiteTestCases = new SuiteTestCases(currentParentSuite);
    suiteTestCases.addTestCase(testCase);
    testsPerSpecFile.addTestCases(suiteTestCases);
    this.allTests.push(testsPerSpecFile);
    this.increaseTestStatusCounter(result.status, this.retries);
    if (result.status === "failed") {
      const testCaseError: TestCaseError = {
        error: result.error,
        titlePath: test.titlePath(),
      }
      if(this.retries === 0) {
        this.failedTests.push(testCaseError);
      } else {

      }
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
    const myTests = filterDuplicateSpecNames(this.allTests);
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
      logFailedTests(this.failedTests);
    }
    logSummary(result.duration, statusCounter);
    log(lineBreak);
  }

  increaseTestStatusCounter(test: TestStatus, retries: number) {
    if (test === "passed") {
      this.passed++;
    } else if (test === "failed") {
      if(retries === 0) {
        this.failed++;
      }
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
