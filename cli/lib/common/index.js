"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKebabCase = exports.toPascalCase = exports.isOther = exports.isStyle = exports.isJs = exports.isTest = exports.isDemo = exports.OTHER_FILE_MATCH = exports.STYLE_FILE_MATCH = exports.JS_FILE_MATCH = exports.TEST_DIR_MATCH = exports.DEMO_DIR_MATCH = void 0;
__exportStar(require("./constant"), exports);
__exportStar(require("./fs-supplement"), exports);
const camelizeRE = /-(\w)/g;
const pascalRE = /^\w/;
exports.DEMO_DIR_MATCH = /\\demo/;
exports.TEST_DIR_MATCH = /\\test/;
exports.JS_FILE_MATCH = /\.(js|ts|tsx|jsx)$/;
exports.STYLE_FILE_MATCH = /\.(less|scss|sass)$/;
exports.OTHER_FILE_MATCH = /\.(MD|md|vue)$/;
function isDemo(filePath) {
    return exports.DEMO_DIR_MATCH.test(filePath);
}
exports.isDemo = isDemo;
function isTest(filePath) {
    return exports.TEST_DIR_MATCH.test(filePath);
}
exports.isTest = isTest;
function isJs(filePath) {
    return exports.JS_FILE_MATCH.test(filePath);
}
exports.isJs = isJs;
function isStyle(filePath) {
    return exports.STYLE_FILE_MATCH.test(filePath);
}
exports.isStyle = isStyle;
function isOther(filePath) {
    return exports.OTHER_FILE_MATCH.test(filePath);
}
exports.isOther = isOther;
exports.toPascalCase = (str) => {
    return str
        .replace(camelizeRE, (_, s) => s.toUpperCase())
        .replace(pascalRE, s => s.toUpperCase());
};
exports.toKebabCase = (str) => {
    const UpperCaseReg = /[A-Z][a-z]+/gm;
    const LowerCaseReg = /^[A-Z]/gm;
    const trim = /^-/;
    return str
        .replace(UpperCaseReg, match1 => "-" +
        match1.replace(LowerCaseReg, match2 => match2.toLowerCase()))
        .replace(trim, "");
};
