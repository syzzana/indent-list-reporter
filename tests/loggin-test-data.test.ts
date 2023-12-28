import {doesModuleExist} from "../src/loggin-tests-data";

test("check module exists", () => {
  const myModule = doesModuleExist("playwright.config.ts");  
  expect(myModule).toBe(true);
})

test("check module does not exist", () => {
    const myModule = doesModuleExist("playwright.config.js");  
    expect(myModule).toBe(false);
});

test("check we can import config data from playwright.config.ts", async () => {
    const userPlaywrightConfigFile = require((`${process.cwd()}/playwright.config.ts`));  
    expect(userPlaywrightConfigFile).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1]).toBeDefined();
    expect(userPlaywrightConfigFile.default.reporter[0][1].baseColors.specFileNameColor).toBe("blue");
});


