import { TestStatus } from "playwright/test";
/**
 * Line break
 */
export declare const line = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
/**
 * Line break with color
 */
export declare const lineBreak: any;
/**
 * Remove ANSI characters from a string
 * TODO recheck and add explination
 */
export declare const ansiRegex: RegExp;
/**
 * Remove ANSI characters from a string
 * @param str
 */
export declare const removeAnsiChars: (str: string) => string;
/**
 * Set the icon and the color of a test case based on the status
 * @param status
 */
export declare const setIconAndColorPerTestStatus: (status: TestStatus) => string;
