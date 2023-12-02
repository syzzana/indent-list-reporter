/**
 * Checks if the reporter is indent-list-reporter
 * @param configuredReporters
 */
export const isIndentedListReporter = (configuredReporters:  any[] | any): [boolean, number] | boolean => {
    let isIndentedListReporter: [boolean, number] | boolean = false;
    configuredReporters.forEach((reporter, index) => {
        // or ./src/.. is for local testing before publishing the plugin in npm
        if(reporter[0] === "indent-list-reporter" || reporter[0] === "./src/indent-list-reporter.ts") {
            isIndentedListReporter = [true, index];
        }
    });
    return isIndentedListReporter
}

/**
 * Returns the reporter options
 * @param reporters
 */
export const getReporterOptions = (reporters: any[] | any): any => {
    const reporterIndex = isIndentedListReporter(reporters);
    if(isIndentedListReporter(reporters)) {
        return reporters[reporterIndex[1]][1];
    }
}
