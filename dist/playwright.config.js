"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: "playwright-tests",
    testMatch: "playwright-tests/**/*",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 0 : 3,
    workers: process.env.CI ? 1 : undefined,
    reporter: [["./src/indent-list-reporter.ts", {
                ignoreColors: false,
                baseColors: {
                    specFileNameColor: "blue",
                    suiteDescriptionColor: "blue",
                    testCaseTitleColor: "white",
                },
            }], ['json', { outputFile: 'test-results.json' }]],
    use: {
        ignoreHTTPSErrors: true,
        trace: "off",
        colorScheme: "dark",
    },
});
