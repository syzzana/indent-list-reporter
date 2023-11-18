import { TestStatus } from "@playwright/test/reporter";
import chalk from "chalk";
import { SuiteTestCases, TestCaseData, TestsPerSpecFile } from "./TestsPerSpecFile";
import {TestCaseError} from "./indent-list-reporter";

export interface StatusCounter {
  passed: number;
  failed: number;
  skipped: number;
  interrupted: number;
  timedOut: number;
}
export const lineBreak: string = chalk.magenta.dim("─────────────────────────────────────────────────────────────────────");

export const log = (text: string) => {
  console.log(text);
};

export const howToReadTestResults = () => {
  log(lineBreak);
  log(`${chalk.cyanBright("How to read test results:")}`);
  const passed = `${chalk.green("✓")}=passed`;
  const skipped = `${chalk.yellow("!")}️=skipped`;
  const failed = `${chalk.red("✘")}=failed`;
  const interrupted = `${chalk.yellow("!?")}=interrupted`;
  const timedOut = `⏰ =timedOut`;
  log(`${passed}, ${skipped}, ${failed}, ${interrupted}, ${timedOut}`);
  log(lineBreak);
};

export const logSpecFileName = (specFileName: string) => {
  log(`${chalk.cyan.bold(specFileName)}:`);
};

export const logSuiteDescription = (suiteName: string) => {
  log(`  ${chalk.underline.cyan(suiteName)}`);
};

export const logTestCaseData = (count: number, test: TestCaseData) => {
  const status = setIconAndColorPerTestStatus(test.status);
  const duration = chalk.gray.dim(`(${test.duration}ms)`);
  const counter = `${chalk.gray.dim(`${count}.`)}`;
  let title;
  if (test.status === "failed") {
    title = chalk.red(test.title);
  } else if (test.status === "skipped") {
    title = chalk.yellow(test.title);
  } else {
    title = chalk.whiteBright(test.title);
  }

  const rowAndCol = `${chalk.gray.dim(`[${test.line}:${test.column}]`)}`;
  log(`   ${counter} ${status} ${title} ${rowAndCol}${duration}`);
};

export const logSummary = (durationInMs: number, statusCounter: StatusCounter) => {
  log(chalk.bgBlack.italic.cyan("SUMMARY:"));

  if (statusCounter.passed != 0) {
    log(chalk.italic.greenBright(`  ${statusCounter.passed} passed`));
  }
  if (statusCounter.interrupted != 0) {
    log(chalk.italic.grey(`  ${statusCounter.interrupted} interrupted`));
  }
  if (statusCounter.skipped != 0) {
    log(chalk.italic.yellowBright(`  ${statusCounter.skipped} skipped`));
  }
  if (statusCounter.failed != 0) {
    log(chalk.italic.redBright(`  ${statusCounter.failed} failed`));
  }
  if (statusCounter.timedOut != 0) {
    log(chalk.italic.black(`  ${statusCounter.timedOut} timedOut`));
  }

  log("---------");
  logTestsDuration(Math.round(durationInMs));
};

export const logTestResults = (allTests: TestsPerSpecFile[]) => {
  let testCounter = 0;

  allTests.forEach((specFile) => {
    logSpecFileName(specFile.getSpecName());
    specFile.getSuiteTests().forEach((suite) => {
      logSuiteDescription(suite.getSuiteDescription());
      suite.getTests().forEach((test) => {
        testCounter++;
        logTestCaseData(testCounter, test);
      });
    });
  });

  log(lineBreak);
};

export const logTestsDuration = (durationInMS: number) => {
  log(chalk.italic.magentaBright.dim(`Duration: (${durationInMS}ms)`));
};

export const setIconAndColorPerTestStatus = (status: TestStatus) => {
  if (status === "skipped") {
    return `${chalk.bold.yellow(`!`)}`;
  }
  if (status === "failed") {
    return `${chalk.bold.red(`✘`)}`;
  }
  if (status === "timedOut") {
    return `⏰`;
  }
  if (status === "interrupted") {
    return `${chalk.bold.gray(`!?`)}`;
  }
  if (status === "passed") {
    return `${chalk.bold.green(`✓`)}`;
  }
};

export const getFileNameOrParentSuite = (titlePath: string[], parentSuite?: boolean, fileName?: boolean) => {
  if (parentSuite) {
    return titlePath[3];
  }
  if (fileName) {
    return titlePath[2];
  }
};

export const filterDuplicateSpecNames = (allTests: TestsPerSpecFile[]): TestsPerSpecFile[] => {
  const uniqueSpecs: TestsPerSpecFile[] = [];

  allTests.forEach((item) => {
    const specName: string = item.getSpecName();
    const suiteTests: SuiteTestCases[] = item.getSuiteTests();

    const existingSpec = uniqueSpecs.find((spec) => spec.getSpecName() === specName);

    if (existingSpec) {
      // If specName is already in uniqueSpecs, merge the suiteTests
      existingSpec.setTestCases(existingSpec.getSuiteTests().concat(suiteTests));
    } else {
      // If specName is not in uniqueSpecs, add it with its data
      const mySpec: TestsPerSpecFile = new TestsPerSpecFile(specName);
      mySpec.setTestCases(suiteTests);
      uniqueSpecs.push(mySpec);
    }
  });

  uniqueSpecs.forEach((spec) => {
    const mySuites = filterSuiteDescription(spec.getSuiteTests());
    spec.setTestCases(mySuites);
  });
  return uniqueSpecs;
};

export const filterSuiteDescription = (suites: SuiteTestCases[]) => {
  const uniqueSuites: SuiteTestCases[] = [];

  suites.forEach((suite) => {
    const suiteDescription = suite.getSuiteDescription();
    const testCases = suite.getTests();

    const existingSuiteDescription = uniqueSuites.find((suite) => suite.getSuiteDescription() === suiteDescription);

    if (existingSuiteDescription) {
      existingSuiteDescription.setTests(existingSuiteDescription.getTests().concat(testCases));
    } else {
      const mySuite: SuiteTestCases = new SuiteTestCases(suiteDescription);
      mySuite.setTests(testCases);
      uniqueSuites.push(mySuite);
    }
  });

  return uniqueSuites;
};

export const logFailedTests = (failedTests: TestCaseError[]) => {
  let counter = 0;
  failedTests.forEach((failedTest) => {
    log(lineBreak);
    const error = failedTest.error;
    const titlePath = failedTest.titlePath;
    const title = `${titlePath[2]} > ${titlePath[3]} > ${titlePath[4]} ───────────────`;
    log(chalk.red(`${++counter}) ${title}`));
    log(`${error.message}`);
    if (error.value !== undefined) {
      log(error.value);
    }
    log(chalk.italic.underline.blueBright(`Code snippet:\n`));
    log(removeAnsiChars(`${error.snippet}`));
    log(`\t${chalk.gray('at')} ${error.location.file}:${error.location.line}:${error.location.column}`);
  });
};

export const ansiRegex = new RegExp(
  "([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))",
  "g"
);
export const removeAnsiChars = (str: string): string => {
  return str.replace(ansiRegex, "");
};
