import {SuiteTestCases, TestCaseError, TestsPerSpecFile} from "./TestsPerSpecFile";

/**
 * Filter out duplicate suites
 * Add reason later //TODO
 * @param inputSuites
 */
export const filterUniqueSuitesByDescription = (inputSuites: SuiteTestCases[]) => {
    const uniqueSuites: SuiteTestCases[] = [];

    inputSuites.forEach((currentSuite) => {
        const currentSuiteDescription = currentSuite.getSuiteDescription();
        const testCases = currentSuite.getTests();

        const existingSuite = uniqueSuites.find(
            (uniqueSuite) => uniqueSuite.getSuiteDescription() === currentSuiteDescription
        );

        if (existingSuite) {
            existingSuite.setTests(existingSuite.getTests().concat(testCases));
        } else {
            const newUniqueSuite: SuiteTestCases = new SuiteTestCases(currentSuiteDescription);
            newUniqueSuite.setTests(testCases);
            uniqueSuites.push(newUniqueSuite);
        }
    });

    return uniqueSuites;
};

/**
 * Filter out duplicate test cases
 * We need to filter out duplicate test cases, because when a test is retried and fails again
 * It is logged twice or more times depending on how many times it is retried
 * @param failedTests
 */
export const filterOutDuplicateFailedTests = (failedTests: TestCaseError[]): TestCaseError[] => {
    const removeDuplicateFailedTests: TestCaseError[] = [];

    failedTests.forEach((failedTest) => {
        const existingTestsCase = removeDuplicateFailedTests.find(
            (myTest) => failedTest.testData.id === myTest.testData.id
        );
        if (existingTestsCase === undefined) {
            removeDuplicateFailedTests.push(failedTest);
        }
    });

    return removeDuplicateFailedTests;
};

/**
 * Filter out duplicate specs
 * Add explination later //TODO
 * @param allTests
 */
export const filterUniqueSpecsBySpecName = (allTests: TestsPerSpecFile[]): TestsPerSpecFile[] => {
    const uniqueSpecs: TestsPerSpecFile[] = [];

    allTests.forEach((currentTest) => {
        const currentSpecName: string = currentTest.getSpecName();
        const suiteTests: SuiteTestCases[] = currentTest.getSuiteTests();

        const existingSpec = uniqueSpecs.find((spec) => spec.getSpecName() === currentSpecName);

        if (existingSpec) {
            // If currentSpecName is already in uniqueSpecs, merge the suiteTests
            existingSpec.setTestCases(existingSpec.getSuiteTests().concat(suiteTests));
        } else {
            // If currentSpecName is not in uniqueSpecs, add it with its data
            const newUniqueSpec: TestsPerSpecFile = new TestsPerSpecFile(currentSpecName);
            newUniqueSpec.setTestCases(suiteTests);
            uniqueSpecs.push(newUniqueSpec);
        }
    });

    uniqueSpecs.forEach((spec) => {
        const uniqueSuites = filterUniqueSuitesByDescription(spec.getSuiteTests());
        spec.setTestCases(uniqueSuites);
    });

    return uniqueSpecs;
};
