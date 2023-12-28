import { ReporterDescription } from "playwright/test";
import { MyReporterOptions } from "./indent-list-reporter";

/**
 * Checks if the reporter is indent-list-reporter
 * @param configuredReporters
 */
export const isIndentedListReporter = (configuredReporters: ([string] | [string, any])[]): [boolean, number] | boolean => {
    let isIndentedListReporter: [boolean, number] | boolean = false;
    type ReporterType =  ReporterDescription | MyReporterOptions;
    configuredReporters?.forEach((reporter: ReporterType, index) => {
        // or ./src/.. is for local testing before publishing the plugin in npm
        if (reporter[0] === "indent-list-reporter" || reporter[0] === "./src/indent-list-reporter.ts") {
            isIndentedListReporter = [true, index];
        }
    });


    return isIndentedListReporter;
};


type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });
export type ReporterConfigurationOptions =  LiteralUnion<'list'|'dot'|'line'|'github'|'json'|'junit'|'null'|'html', string> | ReporterDescription[]
/**
 * Returns the reporter options
 * @param reporters
 */
export const getReporterOptions = (reporters: ([string] | [string, any])[] ): any => {
    const reporterIndex = isIndentedListReporter(reporters);
    if (isIndentedListReporter(reporters)) {
        return reporters[reporterIndex[1]][1];
    }
};
