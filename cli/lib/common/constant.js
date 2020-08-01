"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOT_PACKAGE_LIB = exports.ROOT_PACKAGE_ES6_IMPORT_INDEX = exports.ROOT_PACKAGE_ES6 = exports.ROOT_PACKAGE = exports.ROOT_SRC = exports.CLI_DIST = exports.CLI_SITE = exports.CLI_SRC = exports.CLI_ROOT = exports.ROOT = exports.CWD = void 0;
const path_1 = require("path");
function getRootDir(dir) {
    return dir;
}
exports.CWD = process.cwd();
exports.ROOT = getRootDir(exports.CWD);
exports.CLI_ROOT = path_1.join(__dirname, "../../");
exports.CLI_SRC = path_1.join(exports.CLI_ROOT, "src");
exports.CLI_SITE = path_1.join(exports.CLI_ROOT, "site");
exports.CLI_DIST = path_1.join(exports.CLI_ROOT, "dist");
exports.ROOT_SRC = path_1.join(exports.ROOT, "src");
exports.ROOT_PACKAGE = path_1.join(exports.ROOT, "package");
exports.ROOT_PACKAGE_ES6 = path_1.join(exports.ROOT_PACKAGE, "es6");
exports.ROOT_PACKAGE_ES6_IMPORT_INDEX = path_1.join(exports.ROOT_PACKAGE_ES6, "index.js");
exports.ROOT_PACKAGE_LIB = path_1.join(exports.ROOT_PACKAGE, "lib");
