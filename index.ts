import * as fs from 'fs';
import * as path from 'path';

const projectRoot = process.cwd();
const tsConfigPath = path.join(projectRoot, 'tsconfig.json');

const isUsingTypeScript = fs.existsSync(tsConfigPath);
let module;
if (isUsingTypeScript) {
    // module = await import('./src/indent-list-reporter.ts');
} else {
    // module.exports = require('./dist/src/indent-list-reporter.js');
}