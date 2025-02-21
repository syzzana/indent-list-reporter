import { adaptFilePathImportForWindows, isWindows } from "./utils/utils.js";
import fs from 'fs';
import path from 'path';
/**
 * Dynamically determine the Playwright config file's extension (.ts or .js)
 * @returns {string} The path to the Playwright config file
 */
export const getPlaywrightConfigFile = async () => {
    const cwd = process.cwd();
    const files = await fs.promises.readdir(cwd);
    try {
        const tsConfigFile = files.find((file) => /\.config\.ts$/.test(file));
        if (tsConfigFile) {
            return path.join(cwd, tsConfigFile);
        }
        const jsConfigFile = files.find((file) => /\.config\.js$/.test(file));
        if (jsConfigFile) {
            return path.join(cwd, jsConfigFile);
        }
        throw new Error('Neither *.config.ts nor *.config.js found');
    }
    catch (error) {
        throw new Error(`Error determining Playwright config file: ${error.message}`);
    }
};
/**
 * Get the config from playwright.config.ts
 */
export const userPlaywrightConfigFile = await getPlaywrightConfigFile().then((configFile) => {
    console.log(`Playwright config file: ${configFile}`);
    return configFile;
}).catch((error) => {
    console.error(error.message);
    process.exit(1);
});
export const convertImportFilePathForWindows = adaptFilePathImportForWindows(userPlaywrightConfigFile);
export const whichPlatForm = isWindows ? convertImportFilePathForWindows : userPlaywrightConfigFile;
