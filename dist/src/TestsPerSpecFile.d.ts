import { TestStatus } from "@playwright/test";
import { TestError } from "playwright/types/testReporter";
export interface TestCaseData {
    id: string;
    title: string;
    status: TestStatus;
    line: number;
    column: number;
    duration: number;
    retries?: number;
    error?: TestError;
    titlePath?: string[];
}
export type TestCaseError = {
    error: TestError;
    testData: TestCaseData;
    titlePath?: string[];
};
export declare class SuiteTestCases {
    private suiteDescription;
    tests: TestCaseData[];
    constructor(suiteDescription: string);
    getSuiteDescription(): string;
    setSuiteDescription(suiteDescription: string): void;
    getTestCases(): TestCaseData[];
    setTestCases(tests: TestCaseData[]): void;
    addTestCase(test: TestCaseData): void;
}
export declare class TestsPerSpecFile {
    private specName;
    private suiteTests;
    constructor(specName: string);
    setSuiteTests(testCases: SuiteTestCases[]): void;
    setSpecName(specName: string): void;
    getSpecName(): string;
    getSuiteTests(): SuiteTestCases[];
    addTestCases(testCase: SuiteTestCases): void;
}
