import {doesModuleExist} from "../src/loggin-tests-data.js";
import {test, expect} from 'vitest';
test("check module exists", () => {
  const myModule = doesModuleExist("playwright.config.ts");  
  expect(myModule).toBe(true);
})

test("check module does not exist", () => {
    const myModule = doesModuleExist("playwright.config.js");  
    expect(myModule).toBe(false);
});

test("check we can import config data from playwright.config.ts", async () => {
    const userPlaywrightConfigFile = await import(`${process.cwd()}/playwright.config.ts`);  
    expect(userPlaywrightConfigFile).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1]).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1].baseColors.specFileNameColor).toBe("blue");
});


