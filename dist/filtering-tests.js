"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUniqueSuitesByDescription = exports.filterUniqueSpecsBySpecName = exports.filterOutDuplicateFailedTestsOnRetry = void 0;
var _TestsPerSpecFile = require("./TestsPerSpecFile.ts");
/**
 * Filter out duplicate suites
 * Add reason later //TODO
 * @param inputSuites
 */
var filterUniqueSuitesByDescription = exports.filterUniqueSuitesByDescription = function filterUniqueSuitesByDescription(inputSuites) {
  var uniqueSuites = [];
  inputSuites.forEach(function (currentSuite) {
    var currentSuiteDescription = currentSuite.getSuiteDescription();
    var testCases = currentSuite.getTestCases();
    var existingSuite = uniqueSuites.find(function (uniqueSuite) {
      return uniqueSuite.getSuiteDescription() === currentSuiteDescription;
    });
    if (existingSuite) {
      existingSuite.setTestCases(existingSuite.getTestCases().concat(testCases));
    } else {
      var newUniqueSuite = new _TestsPerSpecFile.SuiteTestCases(currentSuiteDescription);
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
var filterOutDuplicateFailedTestsOnRetry = exports.filterOutDuplicateFailedTestsOnRetry = function filterOutDuplicateFailedTestsOnRetry(failedTests) {
  var removeDuplicateFailedTests = [];
  failedTests.forEach(function (failedTest) {
    var existingTestsCase = removeDuplicateFailedTests.find(function (myTest) {
      return failedTest.testData.id === myTest.testData.id;
    });
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
var filterUniqueSpecsBySpecName = exports.filterUniqueSpecsBySpecName = function filterUniqueSpecsBySpecName(allTests, areRetried) {
  var uniqueSpecFiles = [];
  allTests.forEach(function (currentTest) {
    var currentSpecName = currentTest.getSpecName();
    var suiteTests = currentTest.getSuiteTests();
    var existingSpec = uniqueSpecFiles.find(function (spec) {
      return spec.getSpecName() === currentSpecName;
    });
    if (existingSpec) {
      // If currentSpecName is already in uniqueSpecFiles, merge the suiteTests
      existingSpec.setSuiteTests(existingSpec.getSuiteTests().concat(suiteTests));
    } else {
      // If currentSpecName is not in uniqueSpecFiles, add it with its data
      var newUniqueSpec = new _TestsPerSpecFile.TestsPerSpecFile(currentSpecName);
      newUniqueSpec.setSuiteTests(suiteTests);
      uniqueSpecFiles.push(newUniqueSpec);
    }
  });
  uniqueSpecFiles.forEach(function (spec) {
    var uniqueSuites = filterUniqueSuitesByDescription(spec.getSuiteTests());
    spec.setSuiteTests(uniqueSuites);
  });

  //TODO analyse and test what this code block does in more detail, and document it
  if (areRetried || process.env.CI) {
    var specFilteredOutFailedTestCases = uniqueSpecFiles.map(function (suite) {
      suite.getSuiteTests().map(function (suiteTestCases) {
        var testCasesError = suiteTestCases.getTestCases().map(function (testCase) {
          var testCaseError = {
            error: testCase.error,
            testData: testCase,
            titlePath: testCase.titlePath
          };
          return testCaseError;
        });
        var testCasesWithErrors = filterOutDuplicateFailedTestsOnRetry(testCasesError);
        var testCases = testCasesWithErrors.map(function (testCase) {
          return testCase.testData;
        });
        suiteTestCases.setTestCases(testCases);
      });
      return suite;
    });
    return specFilteredOutFailedTestCases;
  }
  return uniqueSpecFiles;
};