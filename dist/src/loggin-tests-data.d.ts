import { TestCaseData, TestCaseError, TestsPerSpecFile } from "./TestsPerSpecFile.ts";
export declare const doesModuleExist: (moduleName: string) => boolean;
/**
 * Log the results of the function
 * Resuses the console.log function
 * We just simplified the name of the method to log
 * @param data
 */
export declare const log: (...data: any[]) => void;
/**
 * Log the name of the spec file only once
 * Example output:
 * `
 * login.spec.ts: - this here is the spec file name
 *  Login page
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * logout.spec.ts: - this here is the spec file name
 * Logout page
 *   1. ✓ Logout with valid credentials [1:1](100ms)
 *   2. ✓ Logout with invalid credentials [2:1](100ms)
 * `
 * @param specFileName
 */
export declare const logSpecFileName: (specFileName: string) => Promise<void>;
/**
 * Log the name of the suite only once
 * Example output:
 * `
 * login.spec.ts:
 *  Login page -  `This here is the suite description`
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * `
 * @param suiteName
 */
export declare const logSuiteDescription: (suiteName: string) => void;
/**
 * Log the test case data
 * Example output:
 * `    1. ✓ Login with valid credentials [1:1](100ms)`
 * @param count
 * @param test
 */
export declare const logTestCaseData: (count: number, test: TestCaseData) => void;
/**
 * Log the test results of all the run tests
 * @param allTests
 */
export declare const logTestResults: (allTests: TestsPerSpecFile[]) => void;
/**
 * Log the failed tests only once when they were retried
 * @param failedTests
 * @param retries
 */
export declare const logFailedTestsOnlyOnceOnRetry: (failedTests: TestCaseError[], retries: number) => void;
