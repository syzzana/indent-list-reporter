import {defineConfig} from "@playwright/test";
export default defineConfig({
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
            suiteDescriptionColor: "magenta",
            testCaseTitleColor: "white",
        },
    }]],
    use: {
        ignoreHTTPSErrors: true,
        trace: "off",
        colorScheme: "dark",
    },
});
