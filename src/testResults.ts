import {TestStatus} from "@playwright/test/reporter";
import {SuiteTestCases, TestCaseData, TestsPerSpecFile} from "./TestsPerSpecFile";
import {TestCaseError} from "./indent-list-reporter";
import color from "colors";
import Color from "../color-text/Color";

export interface StatusCounter {
  passed: number;
  failed: number;
  skipped: number;
  interrupted: number;
  timedOut: number;
}
export const line = "─────────────────────────────────────────────────────────────────────"
export const lineBreak: any = Color.text(line).magenta().dim().valueOf();

export const log = (text: string) => {
  console.log(text);
};

export const howToReadTestResults = () => {
  log(lineBreak);
  log(`${Color.text("How to read test results:").cyan().valueOf()}`);
  const passed = `${Color.text("✓").green().valueOf()}=passed`;
  const skipped = `${Color.text("!").yellow().valueOf()}️=skipped`;
  const failed = `${Color.text("✘").red().valueOf()}=failed`;
  const interrupted = `${Color.text("!?").yellow().valueOf()}=interrupted`;
  const timedOut = `⏰ =timedOut`;
  log(`${passed}, ${skipped}, ${failed}, ${interrupted}, ${timedOut}`);
  log(lineBreak);
};

export const logSpecFileName = (specFileName: string) => {
  log(`${Color.text(specFileName).cyan().dim().valueOf()}:`);
};

export const logSuiteDescription = (suiteName: string) => {
  log(`  ${Color.text(suiteName).cyan().underscore().dim().valueOf()}`);
};

export const logTestCaseData = (count: number, test: TestCaseData) => {
  const status = setIconAndColorPerTestStatus(test.status);
  const duration = Color.text(`(${test.duration}ms)`).gray().dim().valueOf();
  const counter = `${Color.text(`${count}.`).gray().valueOf()}`;
  let title;
  if (test.status === "failed") {
    title = Color.text(test.title).red().valueOf();
  } else if (test.status === "skipped") {
    title = Color.text(test.title).yellow().valueOf();
  } else {
    title = Color.text(test.title).white().valueOf();
  }

  const rowAndCol = `${Color.text(`[${test.line}:${test.column}]`).gray().valueOf()}`;
  log(`   ${counter} ${status} ${title} ${rowAndCol}${duration}`);
};

export const logSummary = (durationInMs: number, statusCounter: StatusCounter) => {
  log(Color.text("SUMMARY:").bgBlack().cyan().valueOf());

  if (statusCounter.passed != 0) {
    log(Color.text(`  ${statusCounter.passed} passed`).green().valueOf());
  }
  if (statusCounter.interrupted != 0) {
    log(Color.text(`  ${statusCounter.interrupted} interrupted`).gray().valueOf());
  }
  if (statusCounter.skipped != 0) {
    log(Color.text(`  ${statusCounter.skipped} skipped`).yellow().valueOf());
  }
  if (statusCounter.failed != 0) {
    log(Color.text(`  ${statusCounter.failed} failed`).red().valueOf());
  }
  if (statusCounter.timedOut != 0) {
    log(Color.text(`  ${statusCounter.timedOut} timedOut`).red().valueOf());
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
  log(Color.text(`Duration: (${durationInMS}ms)`).magenta().valueOf());
};

export const setIconAndColorPerTestStatus = (status: TestStatus) => {
  if (status === "skipped") {
    return `${Color.text(`!`).yellow().valueOf()}`;
  }
  if (status === "failed") {
    return `${Color.text(`✘`).red().valueOf()}`;
  }
  if (status === "timedOut") {
    return `⏰`;
  }
  if (status === "interrupted") {
    return `${Color.text(`!?`).gray()}`;
  }
  if (status === "passed") {
    return `${Color.text(`✓`).green().valueOf()}`;
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
    log(color.red(`${++counter}) ${title}`));
    log(`${error.message}`);
    if (error.value !== undefined) {
      log(error.value);
    }
    if(error.snippet !== undefined) {
      const highlightedError = highlightErrorInCode(error.value);
      log(highlightedError);
    }
    log(`\t${Color.text('at').gray().valueOf()} ${error.location.file}:${error.location.line}:${error.location.column}`);
  });
};

export const highlightErrorInCode = (codeSnippet: string): string => {
  const lines = codeSnippet.split("\n");
    const lineWithError = lines.find((line) => line.includes(">"));
    const errorIndicator = lines.find((line) => line.includes("^"));
    const indexOfLineWithError = lines.indexOf(lineWithError);
    const indexOfErrorIndicator = lines.indexOf(errorIndicator);
    lines[indexOfLineWithError] = Color.text(lineWithError).red().valueOf();
    lines[indexOfErrorIndicator] = Color.text(lineWithError).red().valueOf();

  return lines.join("\n");
}

export const setColorRed = (char: string): string => {
    if (char === "^" || char === "<") {
        return Color.text(char).blue().valueOf();
    }
    return char;
}

export const ansiRegex = new RegExp(
  "([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))",
  "g"
);
export const removeAnsiChars = (str: string): string => {
  return str.replace(ansiRegex, "");
};
