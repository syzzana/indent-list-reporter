import { SuiteTestCases, TestCaseError, TestsPerSpecFile } from "./TestsPerSpecFile.ts";
/**
 * Filter out duplicate suites
 * Add reason later //TODO
 * @param inputSuites
 */
export declare const filterUniqueSuitesByDescription: (inputSuites: SuiteTestCases[]) => SuiteTestCases[];
/**
 * Filter out duplicate test cases
 * We need to filter out duplicate test cases, because when a test is retried and fails again
 * It is logged twice or more times on the console, depending on how many times it is retried
 * @param failedTests
 */
export declare const filterOutDuplicateFailedTestsOnRetry: (failedTests: TestCaseError[]) => TestCaseError[];
/**
 * Filter out duplicate specs
 * Add explination later //TODO
 * @param allTests
 */
export declare const filterUniqueSpecsBySpecName: (allTests: TestsPerSpecFile[], areRetried: boolean) => TestsPerSpecFile[];
