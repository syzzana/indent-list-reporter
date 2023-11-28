import { isIndentedListReporter } from '../src/testResults';

test('verify reporter is indent-list-reporter', () => {
    const reporter = isIndentedListReporter([["indent-list-reporter"]])
    expect(reporter).toStrictEqual([true, 0]);
});

test('verify reporter is indent-list-reporter with more then one reporter', () => {
    const reporter = isIndentedListReporter([["line"],["indent-list-reporter"], ["html"]])
    expect(reporter).toStrictEqual([true, 1]);
});

test('verify reporter is not indent-list-reporter', () => {
    const reporter = isIndentedListReporter([["list"]])
    expect(isIndentedListReporter([["list"]])).toStrictEqual([false, -1]);
});

test('verify reporter is not indent-list-reporter with more then 1 reporter', () => {
    const reporter = isIndentedListReporter([["list"], ["html"]])
    expect(reporter).toStrictEqual([false, -1]);
});