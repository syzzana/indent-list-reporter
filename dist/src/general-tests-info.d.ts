export interface StatusCounter {
    passed: number;
    failed: number;
    skipped: number;
    interrupted: number;
    timedOut: number;
}
/**
 * Log information to the reader
 * on how to read/understand the test results
 */
export declare const howToReadTestResults: (environment: string) => void;
/**
 * Log the summary of the test results
 * @param durationInMs
 * @param statusCounter
 */
export declare const logSummary: (durationInMs: number, statusCounter: StatusCounter) => void;
/**
 * Log overall the tests duration in ms
 * @param durationInMS
 */
export declare const logTestsDuration: (durationInMS: number) => void;
/**
 * Get fileName or parentSuite of a test case
 * Example: fileName = "authentication/login.spec.ts", parentSuite = "Login"
 * @param titlePath
 * @param parentSuite
 * @param fileName
 */
export declare const getFileNameOrParentSuite: (titlePath: string[], parentSuite?: boolean, fileName?: boolean) => string;
