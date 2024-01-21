import {isIndentedListReporter, getReporterOptions} from "../src/reporter-configuration.js";
import { expect, test } from 'vitest'

test("verify reporter is indent-list-reporter", () => {
    const reporter = isIndentedListReporter([["indent-list-reporter"]]);
    expect(reporter).toStrictEqual([true, 0]);
});

test("verify reporter is indent-list-reporter locally", () => {
    const reporter = isIndentedListReporter([["./src/indent-list-reporter.ts"]]);
    expect(reporter).toStrictEqual([true, 0]);
});

test("verify we get reporter options for indent-list-reporter locally", () => {
    const reporterOptions = getReporterOptions([
        ["./src/indent-list-reporter.ts", {baseColors: {specFileNameColor: "red"}}],
    ]);
    expect(reporterOptions).toStrictEqual({baseColors: {specFileNameColor: "red"}});
});
test("verify we get reporter options for indent-list-reporter", () => {
    const reporterOptions = getReporterOptions([["indent-list-reporter", {baseColors: {specFileNameColor: "red"}}]]);
    expect(reporterOptions).toStrictEqual({baseColors: {specFileNameColor: "red"}});
});

test("verify we get undefined reporter options, when we do not have any", () => {
    const reporterOptions = getReporterOptions([["indent-list-reporter"]]);
    expect(reporterOptions).toBeUndefined();
});

test("verify we do not get reporter options for reporter who is not indent-list-reporter", () => {
    const reporterOptions = getReporterOptions([["i-am-not-your-reporter", {randomObj: {attributes: "red"}}]]);
    expect(reporterOptions).toBeUndefined();
});

test("verify reporter is indent-list-reporter with more then one reporter", () => {
    const reporter = isIndentedListReporter([["line"], ["indent-list-reporter"], ["html"]]);
    expect(reporter).toStrictEqual([true, 1]);
});

test("verify reporter is not indent-list-reporter", () => {
    const reporter = isIndentedListReporter([["list"]]);
    expect(reporter).toStrictEqual(false);
});

test("verify reporter is not indent-list-reporter with more then 1 reporter", () => {
    const reporter = isIndentedListReporter([["list"], ["html"]]);
    expect(reporter).toStrictEqual(false);
});
