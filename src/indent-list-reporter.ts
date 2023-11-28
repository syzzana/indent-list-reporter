import { TestCase, TestResult, Reporter, FullResult, Suite, FullConfig } from "@playwright/test/reporter";
import { SuiteTestCases, TestCaseData, TestsPerSpecFile } from "./TestsPerSpecFile";
import {
  filterDuplicateSpecNames,
  getFileNameOrParentSuite,
  howToReadTestResults,
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

export class IndentListReporter implements Reporter {
  private options: IndentListReporterOptions;
  allTests: TestsPerSpecFile[] = [];
  passed = 0;
  failed = 0;
  skipped = 0;
  interrupted = 0;
  timedOut = 0;
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
    const testsPerSpecFile = new TestsPerSpecFile(currentFileName);
    const suiteTestCases = new SuiteTestCases(currentParentSuite);
    suiteTestCases.addTestCase(testCase);
    testsPerSpecFile.addTestCases(suiteTestCases);
    this.allTests.push(testsPerSpecFile);
    this.increaseTestStatusCounter(result.status);
    if (result.status === "failed") {
      const testCaseError: TestCaseError = {
        error: result.error,
        titlePath: test.titlePath(),
      }
      this.failedTests.push(testCaseError);
    }
  }

 onError(error: TestError) {
    log(color.bgBlack("ERROR:").red);
    log(color.red(error.message));
 }

 async onExit(): Promise<void> {
   await Promise.resolve();
   process.exit(0);
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
