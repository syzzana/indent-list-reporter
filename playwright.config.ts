import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["./src/indent-list-reporter.ts", {
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
