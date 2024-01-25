import { ReporterDescription } from "playwright/test";
/**
 * Checks if the reporter is indent-list-reporter
 * @param configuredReporters
 */
export declare const isIndentedListReporter: (configuredReporters: ([string] | [string, any])[]) => [boolean, number] | boolean;
type LiteralUnion<T extends U, U = string> = T | (U & {
    zz_IGNORE_ME?: never;
});
export type ReporterConfigurationOptions = LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription[];
/**
 * Returns the reporter options
 * @param reporters
 */
export declare const getReporterOptions: (reporters: ([string] | [string, any])[]) => any;
export {};
