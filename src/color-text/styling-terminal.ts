import {TestStatus} from "playwright/test";
import Color from "./Color.js";

/**
 * Line break
 */
export const line = "─────────────────────────────────────────────────────────────────────";

/**
 * Line break with color
 */
export const lineBreak: any = Color.text(line).magenta().valueOf();

/**
 * Remove ANSI characters from a string
 * TODO recheck and add explination
 */
export const ansiRegex = new RegExp(
    "([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))",
    "g"
);

/**
 * Remove ANSI characters from a string
 * @param str
 */
export const removeAnsiChars = (str: string): string => {
    return str.replace(ansiRegex, "");
};

/**
 * Set the icon and the color of a test case based on the status
 * @param status
 */
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
