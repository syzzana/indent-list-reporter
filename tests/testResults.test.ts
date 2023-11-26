import { isIndentedListReporter } from '../src/testResults';

//TODO verify reporter is indent-list-reporter when we have more then one reporter in the array of reporters
test('verify reporter is indent-list-reporter', () => {
    expect(isIndentedListReporter(["indent-list-reporter"])).toBe([true, 0]);
});

test('verify reporter is not indent-list-reporter', () => {
    expect(isIndentedListReporter(["list"])).toBe([false, 0]);
});

test('verify reporter is not indent-list-reporter', () => {
    expect(isIndentedListReporter(["list", "indent-list-reporter"])).toBe([false, 0]);
});