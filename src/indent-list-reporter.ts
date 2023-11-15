import { TestCase, TestResult, Reporter, FullResult, Suite, FullConfig } from "@playwright/test/reporter";
import { SuiteTestCases, TestCaseData, TestsPerSpecFile } from "./TestsPerSpecFile";
import {
  filterDuplicateSpecNames,
  getFileNameOrParentSuite,
  howToReadTestResults,
  log,
  logSummary,
  logTestResults,
  StatusCounter,
} from "./testResults";
import chalk from "chalk";
import { TestStatus } from "@playwright/test";
import { TestError } from "playwright/types/testReporter";

type TerminalColors = {
  specFileName: string;
  suiteDescription: string;
}

type IndentListReporterOptions = {
  isDimmed: boolean;
  baseColors: TerminalColors
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
    logSummary(result.duration, statusCounter);
  }
    onError(error: TestError) {
        const message = error.message;
        const stack = error.stack;
        const { file, line, column } = error.location;
        const location = `${file}:${line}:${column}`;
        const header = `${chalk.red('Error:')} ${message} (${location})`;
        const stackTrace = stack ? `\n${stack}` : '';
        const text = `${header}${stackTrace}\n`;
        console.log(text)
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