import { isIndentedListReporter, getReporterOptions } from '../src/testResults';

test('verify reporter is indent-list-reporter', () => {
    const reporter = isIndentedListReporter([["indent-list-reporter"]])
    expect(reporter).toStrictEqual([true, 0]);
});

test('verify we get repoter options for indent-list-reporter', () => {
   const reporter = isIndentedListReporter([["indent-list-reporter", {baseColors: {specFileNameColor: "red"}}]])
   const reporterOptions = getReporterOptions([["indent-list-reporter", {baseColors: {specFileNameColor: "red"}}]])
   expect(reporterOptions).toStrictEqual({baseColors: {specFileNameColor: "red"}});
});

test('verify we get do not repoter options indent-list-reporter', () => {
    const reporterOptions = getReporterOptions([["./src/indent-list-reporter", {baseColors: {specFileNameColor: "red"}}]])
    expect(reporterOptions).toBeUndefined();
});


test('verify reporter is indent-list-reporter with more then one reporter', () => {
    const reporter = isIndentedListReporter([["line"],["indent-list-reporter"], ["html"]])
    expect(reporter).toStrictEqual([true, 1]);
});

test('verify reporter is not indent-list-reporter', () => {
    const reporter = isIndentedListReporter([["list"]])
    expect(isIndentedListReporter([["list"]])).toStrictEqual(false);
});

test('verify reporter is not indent-list-reporter with more then 1 reporter', () => {
    const reporter = isIndentedListReporter([["list"], ["html"]])
    expect(reporter).toStrictEqual(false);
});