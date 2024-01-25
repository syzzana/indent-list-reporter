/// <reference types="node" />
import { TestCase, TestResult, Reporter, FullResult, Suite, FullConfig } from "@playwright/test/reporter";
import { TestCaseError, TestsPerSpecFile } from "./TestsPerSpecFile.ts";
import { TestStatus } from "@playwright/test";
import { TestError } from "playwright/types/testReporter";
export type ColorsAvailable = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray";
interface ListTestsWithColors {
    specFileNameColor: ColorsAvailable;
    suiteDescriptionColor: ColorsAvailable;
    testCaseTitleColor?: ColorsAvailable;
    isDimmed?: boolean;
}
export type MyReporterOptions = ['indent-list-reporter' | './src/indent-list-reporter.ts'] | ['indent-list-reporter' | './src/indent-list-reporter.ts', IndentListReporterOptions];
interface IndentListReporterOptions {
    ignoreColors: boolean;
    baseColors: ListTestsWithColors;
    environment?: string;
}
declare class IndentListReporter implements Reporter {
    private options;
    allTests: TestsPerSpecFile[];
    passed: number;
    failed: number;
    skipped: number;
    interrupted: number;
    timedOut: number;
    retries: number;
    failedTests: TestCaseError[];
    /**
     * Constructor to pass on custom options for the reporter
     * @param options
     */
    constructor(options: IndentListReporterOptions);
    printsToStdio(): boolean;
    onBegin(config: FullConfig, suite: Suite): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onError(error: TestError): void;
    onExit(): Promise<void>;
    onStdErr(chunk: Buffer | string, test: void | TestCase, result: void | TestResult): void;
    onStdOut(chunk: Buffer | string, test: void | TestCase, result: void | TestResult): void;
    onEnd(result: FullResult): void;
    increaseTestStatusCounter(test: TestStatus): void;
}
export default IndentListReporter;
