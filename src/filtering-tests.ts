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
        const testCases = currentSuite.getTestCases();

        const existingSuite = uniqueSuites.find(
            (uniqueSuite) => uniqueSuite.getSuiteDescription() === currentSuiteDescription
        );

        if (existingSuite) {
            existingSuite.setTestCases(existingSuite.getTestCases().concat(testCases));
        } else {
            const newUniqueSuite: SuiteTestCases = new SuiteTestCases(currentSuiteDescription);
            newUniqueSuite.setTestCases(testCases);
            uniqueSuites.push(newUniqueSuite);
        }
    });

    return uniqueSuites;
};

/**
 * Filter out duplicate test cases
 * We need to filter out duplicate test cases, because when a test is retried and fails again
 * It is logged twice or more times on the console, depending on how many times it is retried
 * @param failedTests
 */
export const filterOutDuplicateFailedTestsOnRetry = (failedTests: TestCaseError[]): TestCaseError[] => {
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
export const filterUniqueSpecsBySpecName = (allTests: TestsPerSpecFile[], areRetried: boolean): TestsPerSpecFile[] => {
    //TODO maybe rename uniqueSpecs to uniqueSpecFiles or something
    const uniqueSpecFiles: TestsPerSpecFile[] = [];

    allTests.forEach((currentTest) => {
        const currentSpecName: string = currentTest.getSpecName();
        const suiteTests: SuiteTestCases[] = currentTest.getSuiteTests();

        const existingSpec = uniqueSpecFiles.find((spec) => spec.getSpecName() === currentSpecName);

        if (existingSpec) {
            // If currentSpecName is already in uniqueSpecFiles, merge the suiteTests
            existingSpec.setSuiteTests(existingSpec.getSuiteTests().concat(suiteTests));
        } else {
            // If currentSpecName is not in uniqueSpecFiles, add it with its data
            const newUniqueSpec: TestsPerSpecFile = new TestsPerSpecFile(currentSpecName);
            newUniqueSpec.setSuiteTests(suiteTests);
            uniqueSpecFiles.push(newUniqueSpec);
        }
    });

    uniqueSpecFiles.forEach((spec) => {
        const uniqueSuites = filterUniqueSuitesByDescription(spec.getSuiteTests());
        spec.setSuiteTests(uniqueSuites);
    });

    if(areRetried) {
        const uniqueSuites = uniqueSpecFiles.map((suite) => {
            suite.getSuiteTests().map((suiteTestCases) => {
                const testCasesError : TestCaseError[] = suiteTestCases.getTestCases().map((testCase) => {
                    const testCaseError : TestCaseError = {
                        error: testCase.error,
                        testData: testCase,
                        titlePath: testCase.titlePath
                    }
                    return testCaseError;
                })

                const testCasesWithErrors = filterOutDuplicateFailedTestsOnRetry(testCasesError)
                const testCases = testCasesWithErrors.map((testCase) => {
                    return testCase.testData;
                });
                suiteTestCases.setTestCases(testCases);
            })
        })
    }

    return uniqueSpecFiles;
};

//TODO do I need to get the retry value from configuration file in here somehow?
// const filterOutDuplicateFailedTestCasesOnRetry = uniqueSpecs.forEach(spec => {
//     spec.getSuiteTests().map((suite) => {
//         const testCases = suite.getTestCases();
//         const filteredTestCases = filterOutDuplicateFailedTestsOnRetry(testCases);
//         suite.setTestCases(filteredTestCases);
//         return suite;
//     })
// });