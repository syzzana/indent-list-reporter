import {getPlaywrightConfigFile, userPlaywrightConfigFile} from "../src/loggin-tests-data";

import {test, expect} from 'vitest';
test("check module exists", async () => {
  const myModule = await getPlaywrightConfigFile();
  expect(myModule).toContain("playwright.config.ts");
})

test("check module does not exist", async () => {
    const myModule = await getPlaywrightConfigFile();
    expect(myModule).not.toContain("playwright.config.js");
});

test("check we can import config data from playwright.config.ts on repo file", async () => {
    expect(userPlaywrightConfigFile).toContain("indent-list-reporter/playwright.config.ts");
    let playwrightConfigDetails = await import(`${process.cwd()}/playwright.config.ts`);
    let playwrightConfigDetailsJS = await import(`${process.cwd()}/playwright.config.js`);
    expect(playwrightConfigDetails).toBeDefined()
})

test("check we can import config data from playwright.config.ts", async () => {
    const userPlaywrightConfigFile = await import(`${process.cwd()}/playwright.config.ts`);  
    expect(userPlaywrightConfigFile).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1]).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1].baseColors.specFileNameColor).toBe("blue");
});


