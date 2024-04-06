import os from "node:os"

export const isWindows = os.platform().startsWith("win")

export const adaptFilePathImportForWindows = (filePath: string) => {
  
    const windowsFilePath = filePath.replace("/", '\\')
   
    return `file:///${windowsFilePath}`
}