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
import chalk from "chalk";
import { TestStatus } from "@playwright/test";
import { TestError } from "playwright/types/testReporter";

interface TerminalColors {
  specFileName: string;
  suiteDescription: string;
}

interface IndentListReporterOptions {
  isDimmed: boolean;
  baseColors: TerminalColors;
  isJenkins: boolean; //TODO implement colors for jenkins terminal
  isGithubActions: boolean; //TODO implement colors for github actions terminal
}

class IndentListReporter implements Reporter {
  private _options: IndentListReporterOptions;
  allTests: TestsPerSpecFile[] = [];
  passed = 0;
  failed = 0;
  skipped = 0;
  interrupted = 0;
  timedOut = 0;
  failedTests: TestError[] = [];
  constructor(options: IndentListReporterOptions) {
    this._options = options;
  }

  printsToStdio() {
    return true;
  }

  onBegin(config: FullConfig, suite: Suite) {
    howToReadTestResults();
    log(`${chalk.cyanBright.bgBlack("TEST RESULTS\n")}`);
    const numberOfTests = chalk.whiteBright(suite.allTests().length);
    const numberOfWorkers = chalk.whiteBright(config.workers.valueOf());
    const testInfo = `Running ${numberOfTests} tests using ${numberOfWorkers} workers\n`;
    console.log(chalk.gray(testInfo));
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
      this.failedTests.push(result.error);
    }
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
      log(chalk.bgBlack.italic.red("FAILED TESTS:"));
      logFailedTests(this.failedTests);
    }
    log(lineBreak);
    logSummary(result.duration, statusCounter);
  }

  onStdOut = (chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void => {
    if (result instanceof Object) {
      if (result.status === "failed") {
        const error = result.error;
        process.stdout.write(error.message);
        process.stdout.write(error.stack);
        process.stdout.write(error.value);
        process.stdout.write(error.snippet);
      }
    }
  };

  onStdErr(chunk, test: TestCase, result: TestResult) {
    if (test !== undefined && test.results[0].status === "failed") {
      const error = result.error;
      process.stdout.write(error.message);
      process.stdout.write(error.stack);
      process.stdout.write(error.value);
      process.stdout.write(error.snippet);
      this.printsToStdio();
    }
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
