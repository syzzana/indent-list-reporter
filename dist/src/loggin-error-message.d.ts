import { Location } from "playwright/types/testReporter";
import { TestCaseError } from "./TestsPerSpecFile.ts";
/**
 * Style the error file location
 * @param errorLocation
 */
export declare const styleErrorFileLocation: (errorLocation: Location) => any;
/**
 * Highlight the error indicator in the code snippet
 * @param codeSnippet
 */
export declare const highlightErrorIndicator: (codeSnippet: string) => string;
/**
 * Log the test error message,
 * with a code snippet and a file location link
 * @param codeSnippet
 */
export declare const logTestError: (failedTests: TestCaseError[], isRetried: boolean) => void;
