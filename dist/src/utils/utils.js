import os from "node:os";
export const isWindows = os.platform().startsWith("win");
export const adaptFilePathImportForWindows = (filePath) => {
    const windowsFilePath = filePath.replace("/", '\\');
    return `file:///${windowsFilePath}`;
};
