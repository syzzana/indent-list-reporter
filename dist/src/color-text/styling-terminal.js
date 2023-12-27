"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIconAndColorPerTestStatus = exports.removeAnsiChars = exports.ansiRegex = exports.lineBreak = exports.line = void 0;
const Color_1 = __importDefault(require("./Color"));
/**
 * Line break
 */
exports.line = "─────────────────────────────────────────────────────────────────────";
/**
 * Line break with color
 */
exports.lineBreak = Color_1.default.text(exports.line).magenta().valueOf();
/**
 * Remove ANSI characters from a string
 * TODO recheck and add explination
 */
exports.ansiRegex = new RegExp("([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))", "g");
/**
 * Remove ANSI characters from a string
 * @param str
 */
const removeAnsiChars = (str) => {
    return str.replace(exports.ansiRegex, "");
};
exports.removeAnsiChars = removeAnsiChars;
/**
 * Set the icon and the color of a test case based on the status
 * @param status
 */
const setIconAndColorPerTestStatus = (status) => {
    if (status === "skipped") {
        return `${Color_1.default.text(`!`).yellow().valueOf()}`;
    }
    if (status === "failed") {
        return `${Color_1.default.text(`✘`).red().valueOf()}`;
    }
    if (status === "timedOut") {
        return `⏰`;
    }
    if (status === "interrupted") {
        return `${Color_1.default.text(`!?`).gray()}`;
    }
    if (status === "passed") {
        return `${Color_1.default.text(`✓`).green().valueOf()}`;
    }
};
exports.setIconAndColorPerTestStatus = setIconAndColorPerTestStatus;
