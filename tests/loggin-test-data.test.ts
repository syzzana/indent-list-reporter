import {getPlaywrightConfigFile, userPlaywrightConfigFile} from "../src/get-playwright-config-file.js";

import {test, expect} from 'vitest';
test("check ts config exists", async () => {
  const myModule = await getPlaywrightConfigFile();
  expect(myModule).toContain("myconfig.config.ts");
})

test("check module does not exist", async () => {
    const myModule = await getPlaywrightConfigFile();
    expect(myModule).not.toContain("playwright.config.js");
});

test("check we can import config data from myconfig.config.ts on repo file", async () => {
    expect(userPlaywrightConfigFile).toContain("indent-list-reporter/myconfig.config.ts");
    const playwrightConfigDetails = await import(`${process.cwd()}/myconfig.config.ts`);
    const playwrightConfigDetailsJS = await import(`${process.cwd()}/myconfig.config.js`);
    expect(playwrightConfigDetails).toBeDefined()
    expect(playwrightConfigDetailsJS).toBeDefined()
})

test("check we can import config data from myconfig.config.ts", async () => {
    const userPlaywrightConfigFile = await import(`${process.cwd()}/myconfig.config.ts`);
    expect(userPlaywrightConfigFile).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1]).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1].baseColors.specFileNameColor).toBe("blue");
});

test("check we can import config data from myconfig.config.js", async () => {
    const userPlaywrightConfigFile = await import(`${process.cwd()}/myconfig.config.js`);
    expect(userPlaywrightConfigFile).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1]).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1].baseColors.specFileNameColor).toBe("blue");
});

