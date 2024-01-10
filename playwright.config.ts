import {defineConfig} from "@playwright/test";
//TODO fix: SyntaxError: Cannot use import statement outside a module if client's module is set to es2022
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
            testCaseTitleColor: "magenta",
        },
    }]],
    use: {
        ignoreHTTPSErrors: true,
        trace: "off",
        colorScheme: "dark",
    },
});
