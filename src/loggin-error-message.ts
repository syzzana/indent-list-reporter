import {Location} from "playwright/types/testReporter";
import Color from "../color-text/Color";
import {lineBreak} from "../color-text/styling-terminal";
import {TestCaseError} from "./TestsPerSpecFile";
import {log} from "./loggin-tests-data";

/**
 * Style the error file location
 * @param errorLocation
 */
export const styleErrorFileLocation = (errorLocation: Location): any => {
    const file = errorLocation.file;
    const line = errorLocation.line;
    const column = errorLocation.column;
    return Color.text(`${file}:${line}:${column}`).blue().underscore().valueOf();
};

/**
 * Highlight the error indicator in the code snippet
 * @param codeSnippet
 */
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

/**
 * Log the test error message,
 * with a code snippet and a file location link
 * @param codeSnippet
 */
export const logTestError = (failedTests: TestCaseError[]) => {
    let counter = 0;
    failedTests.forEach((failedTest) => {
        const error = failedTest.error;
        //TODO fix me - issue on the log of the file location - it is not correct
        const titlePath = failedTest.testData.title;
        const title = `${titlePath[2]} > ${titlePath[3]} > ${titlePath[4]} ───────────────`;
        log(Color.text(`${++counter}) ${title}`).red().valueOf());
        log(`${error.message}`);
        if (error.value !== undefined) {
            log(error.value);
        }
        if (error.snippet !== undefined) {
            const highlightedError = highlightErrorIndicator(error.snippet);
            log(highlightedError);
        }
        const fileLocationStyle = styleErrorFileLocation(error.location);
        log(`\t${Color.text("at").gray().valueOf()} ${fileLocationStyle}`);
        log(lineBreak);
    });
};
