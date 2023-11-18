import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["./dist/src/indent-list-reporter.js"]],
  use: {
    ignoreHTTPSErrors: true,
    trace: "off",
  },
});
