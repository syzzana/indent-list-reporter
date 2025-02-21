import os from "node:os";
import fs from "fs";
import { adaptFilePathImportForWindows, isWindows } from "./utils.js";
// Dynamically determine the Playwright config file's extension (.ts or .js)
export const loadPlaywrightConfig = () => {
    const isTsOrJsExtenstion = isPlaywrightConfigFileTsOrJs();
    const userPlaywrightConfigFile = `${process.cwd()}/playwright.config.${isTsOrJsExtenstion}`;
    const convertImportFilePathForWindows = adaptFilePathImportForWindows(userPlaywrightConfigFile);
    let importPath = isWindows ? convertImportFilePathForWindows : userPlaywrightConfigFile;
    if (os.platform().startsWith("win")) {
        importPath = convertImportFilePathForWindows;
    }
    else {
        importPath = userPlaywrightConfigFile;
    }
    // Since 'whichPlatform' may already start with 'file://', check to avoid duplicating the prefix.
    // const importPath = whichPlatform.startsWith('file://') ? whichPlatform : `file://${whichPlatform}`;
    try {
        // @ts-ignore
        const playwrightConfigDetails = import(importPath);
        return playwrightConfigDetails;
    }
    catch (error) {
        // @ts-ignore
        console.error('Trying to load the Playwright config:', error.message);
        // Handle the error appropriately.
        // It might be returning a default configuration, throwing an error, etc.
        throw error.message; // Example: re-throwing the error.
    }
};
export const isPlaywrightConfigFileTsOrJs = () => {
    const tsConfigPath = `${process.cwd()}/playwright.config.ts`;
    const jsConfigPath = `${process.cwd()}/playwright.config.js`;
    let isTsOrJs;
    if (fs.existsSync(tsConfigPath)) {
        isTsOrJs = "ts";
    }
    if (fs.existsSync(jsConfigPath)) {
        isTsOrJs = "js";
    }
    return isTsOrJs;
};
// Call the async function and handle the loaded configuration.
// This could be inside an async context if you have one,
// like an async main function or an IIFE (Immediately Invoked Function Expression).
// (async () => {
//     try {
//         const config = await loadPlaywrightConfig();
//         console.log("Loaded Playwright Config:", config);
//         // Do something with the loaded config.
//         return config;
//     } catch (error) {
//         console.error("Error loading the Playwright configuration:", error);
//         // Handle initialization failure, possibly exit the process if fatal.
//     }
// })();
