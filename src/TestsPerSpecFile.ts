import {TestStatus} from "@playwright/test";
import {TestError} from "playwright/types/testReporter";

export interface TestCaseData {
    id: string;
    title: string;
    status: TestStatus;
    line: number;
    column: number;
    duration: number;
}

export type TestCaseError = {
    error: TestError;
    testData: TestCaseData;
};

export class SuiteTestCases {
    private suiteDescription: string;
    tests: TestCaseData[];

    constructor(suiteDescription: string) {
        this.suiteDescription = suiteDescription;
        this.tests = [];
    }

    getSuiteDescription() {
        return this.suiteDescription;
    }

    setSuiteDescription(suiteDescription: string) {
        this.suiteDescription = suiteDescription;
    }

    getTests() {
        return this.tests;
    }

    setTests(tests: TestCaseData[]) {
        this.tests = tests;
    }

    addTestCase(test: TestCaseData) {
        this.tests.push(test);
    }
}

export class TestsPerSpecFile {
    private specName: string;
    private suiteTests: SuiteTestCases[];

    constructor(specName: string) {
        this.specName = specName;
        this.suiteTests = [];
    }

    setTestCases(testCases: SuiteTestCases[]) {
        this.suiteTests = testCases;
    }

    setSpecName(specName: string) {
        this.specName = specName;
    }

    getSpecName() {
        return this.specName;
    }

    getSuiteTests() {
        return this.suiteTests;
    }

    addTestCases(testCase: SuiteTestCases) {
        this.suiteTests.push(testCase);
    }
}
