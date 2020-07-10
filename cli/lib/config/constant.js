"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
exports.join = path_1.join;
function getRootDir(dir) {
    console.log(dir);
}
exports.CWD = process.cwd();
exports.ROOT = getRootDir(exports.CWD);
