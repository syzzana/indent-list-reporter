import {Location, TestStatus} from "@playwright/test/reporter";
import {SuiteTestCases, TestCaseData, TestsPerSpecFile} from "./TestsPerSpecFile";
import {TestCaseError} from "./indent-list-reporter";
import Color from "../color-text/Color";
import defineConfig from "../playwright.config";


export interface StatusCounter {
  passed: number;
  failed: number;
  skipped: number;
  interrupted: number;
  timedOut: number;
}
export const line = "─────────────────────────────────────────────────────────────────────"
export const lineBreak: any = Color.text(line).magenta().valueOf();

export const log = (...data: any[]) => {
  console.log(...data);
};

export const howToReadTestResults = () => {
  log(lineBreak);
  log(`${Color.text("How to read test results:").cyan().valueOf()}`);
  const passed = `${Color.text("✓").bold().green().valueOf()}=passed`;
  const skipped = `${Color.text("!").bold().yellow().valueOf()}️=skipped`;
  const failed = `${Color.text("✘").bold().red().valueOf()}=failed`;
  const interrupted = `${Color.text("!?").bold().yellow().valueOf()}=interrupted`;
  const timedOut = `⏰ =timedOut`;
  log(`${passed}, ${skipped}, ${failed}, ${interrupted}, ${timedOut}`);
  log(lineBreak);
};

export const isIndentedListReporter = (configuredReporters:  any[] | any): [boolean, number] | boolean => {
  let isIndentedListReporter: [boolean, number] | boolean = false;
  configuredReporters.forEach((reporter, index) => {
    // or ./src/.. is for local testing before publishing the plugin in npm
    if(reporter[0] === "indent-list-reporter" || reporter[0] === "./src/indent-list-reporter.ts") {
      isIndentedListReporter = [true, index];
    }
  });
  return isIndentedListReporter
}

export const getReporterOptions = (reporters: any[] | any): any => {
  const reporterIndex = isIndentedListReporter(reporters);
    if(isIndentedListReporter(reporters)) {
      return reporters[reporterIndex[1]][1];
    }
}
export const logSpecFileName = (specFileName: string) => {
  const reporterOptions = getReporterOptions(defineConfig.reporter);
  const specFileNameColor = reporterOptions?.baseColors?.specFileNameColor ? reporterOptions.baseColors.specFileNameColor : undefined;
  if(reporterOptions?.ignoreColors) {
    log(`${specFileName}:`);
  } else if(specFileNameColor !== undefined) {
    log(`${Color.text(specFileName)[specFileNameColor]().valueOf()}:`);
  }
  else {
    log(`${Color.text(specFileName).cyan().valueOf()}:`);
  }
};

export const logSuiteDescription = (suiteName: string) => {
  const reporterOptions = getReporterOptions(defineConfig.reporter);
    const suiteDescriptionColor = reporterOptions?.baseColors?.suiteDescriptionColor ? reporterOptions.baseColors.suiteDescriptionColor : undefined;
    if(reporterOptions?.ignoreColors) {
        log(`  ${suiteName}`);
    } else if (suiteDescriptionColor !== undefined) {
        log(`  ${Color.text(suiteName)[suiteDescriptionColor]().valueOf()}`);
    }
    else {
      log(`  ${Color.text(suiteName).cyan().underscore().valueOf()}`);
    }
};

export const logTestCaseData = (count: number, test: TestCaseData) => {
  const status = setIconAndColorPerTestStatus(test.status);
  const duration = Color.text(`(${test.duration}ms)`).gray().dim().valueOf();
  const counter = `${Color.text(`${count}.`).gray().valueOf()}`;
  let title: string;
  if (test.status === "failed") {
    if(test.retries > 0) {
        title = Color.text(test.title).red().dim().valueOf();
    }
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
        //TODO: filter getTests() here failes tests that were retried and failed again
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

/**
 * Filter out duplicate test cases
 * We need to filter out duplicate test cases, because when a test is retried and fails again
 * It is logged twice or more times depending on how many times it is retried
 * @param tests
 */
export const filterDuplicateTestCases = (tests: TestCaseData[]): TestCaseData[] => {
  const removeDuplicateFailedTests: TestCaseData[] = [];

  tests.forEach((test) => {

    const existingTestsCase = removeDuplicateFailedTests.find((myTest) => test.id === myTest.id);
  });

  return  removeDuplicateFailedTests;
}

export const logFailedTests = (failedTests: TestCaseError[]) => {
  let counter = 0;
  failedTests.forEach((failedTest) => {
    const error = failedTest.error;
    const titlePath = failedTest.titlePath;
    const title = `${titlePath[2]} > ${titlePath[3]} > ${titlePath[4]} ───────────────`;
    log(Color.text(`${++counter}) ${title}`).red().valueOf());
    log(`${error.message}`);
    if (error.value !== undefined) {
      log(error.value);
    }
    if(error.snippet !== undefined) {
      const highlightedError = highlightErrorIndicator(error.snippet);
      log(highlightedError);
    }
    const fileLocationStyle = styleFileLocation(error.location);
    log(`\t${Color.text('at').gray().valueOf()} ${fileLocationStyle}`);
    log(lineBreak);
  });
};

export const highlightErrorIndicator = (codeSnippet: string): string => {
  const lines = codeSnippet.split("\n");
  const styledLines = lines.map((line) => {
    if (line.includes("^")) {
      return Color.text(line).red().valueOf();
    } else {
      return line;
    }
  });

  return styledLines.join("\n");
};

export const ansiRegex = new RegExp(
  "([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))",
  "g"
);
export const removeAnsiChars = (str: string): string => {
  return str.replace(ansiRegex, "");
};

export const styleFileLocation = (errorLocation: Location): any => {
  const file = errorLocation.file
  const line = errorLocation.line
  const column = errorLocation.column
  return Color.text(`${file}:${line}:${column}`).blue().underscore().valueOf();
}