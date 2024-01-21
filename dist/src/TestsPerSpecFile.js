export class SuiteTestCases {
    constructor(suiteDescription) {
        this.suiteDescription = suiteDescription;
        this.tests = [];
    }
    getSuiteDescription() {
        return this.suiteDescription;
    }
    setSuiteDescription(suiteDescription) {
        this.suiteDescription = suiteDescription;
    }
    getTestCases() {
        return this.tests;
    }
    setTestCases(tests) {
        this.tests = tests;
    }
    addTestCase(test) {
        this.tests.push(test);
    }
}
export class TestsPerSpecFile {
    constructor(specName) {
        this.specName = specName;
        this.suiteTests = [];
    }
    setSuiteTests(testCases) {
        this.suiteTests = testCases;
    }
    setSpecName(specName) {
        this.specName = specName;
    }
    getSpecName() {
        return this.specName;
    }
    getSuiteTests() {
        return this.suiteTests;
    }
    addTestCases(testCase) {
        this.suiteTests.push(testCase);
    }
}
