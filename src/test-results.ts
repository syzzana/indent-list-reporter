import {Location} from "@playwright/test/reporter";
import Color from "../color-text/Color";
import { lineBreak } from "../color-text/styling-terminal";
import { log } from "./loggin-results";

export interface StatusCounter {
  passed: number;
  failed: number;
  skipped: number;
  interrupted: number;
  timedOut: number;
}

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

export const logTestsDuration = (durationInMS: number) => {
  log(Color.text(`Duration: (${durationInMS}ms)`).magenta().valueOf());
};

export const getFileNameOrParentSuite = (titlePath: string[], parentSuite?: boolean, fileName?: boolean) => {
  if (parentSuite) {
    return titlePath[3];
  }
  if (fileName) {
    return titlePath[2];
  }
};

export const styleFileLocation = (errorLocation: Location): any => {
  const file = errorLocation.file
  const line = errorLocation.line
  const column = errorLocation.column
  return Color.text(`${file}:${line}:${column}`).blue().underscore().valueOf();
}