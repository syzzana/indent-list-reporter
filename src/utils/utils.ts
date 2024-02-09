import os from "node:os"

export const isWindows = os.platform().startsWith("win")

export const adaptFilePathImportForWindows = (filePath: string) => {
    let newFilePath = ''
    if(isWindows) {
        newFilePath = filePath.replace("/", '\\')

    }
    return `file:///${newFilePath}`
}