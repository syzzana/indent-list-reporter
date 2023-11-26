import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["./dist/indent-list-reporter.js", {
    ignoreColors: false,
    baseColors: {
      specFileNameColor: "blue",
      suiteDescriptionColor: "blue",
    }
  }]],
  use: {
    ignoreHTTPSErrors: true,
    trace: "off",
    colorScheme: 'dark',
  },
});
