"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../common/constant");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const common_1 = require("../common");
const compile_js_1 = require("../compiler/compile-js");
const compile_import_1 = require("../compiler/compile-import");
async function compiler(dirPath) {
    let files = fs_extra_1.default.readdirSync(dirPath);
    await Promise.all(files.map(filename => {
        let filePath = path_1.join(dirPath, filename);
        if (common_1.isDemo(filePath) || common_1.isTest(filePath) || common_1.isOther(filePath)) {
            return fs_extra_1.default.remove(filePath);
        }
        if (common_1.isJs(filePath)) {
            return compile_js_1.compilerJs(filePath);
        }
        if (common_1.isStyle(filePath)) {
            return;
        }
        compiler(filePath);
    }));
}
async function buildEs() {
    await fs_extra_1.default.copy(constant_1.ROOT_SRC, constant_1.ROOT_PACKAGE_ES6);
    await compiler(constant_1.ROOT_PACKAGE_ES6);
    await compile_import_1.importIndex(constant_1.ROOT_PACKAGE_ES6);
}
function default_1() {
    // 先删除之前的
    fs_extra_1.default.remove(constant_1.ROOT_PACKAGE).then(() => {
        // 判断导出路径是否存在
        fs_extra_1.default
            .ensureDir(constant_1.ROOT_PACKAGE)
            .then(() => {
            // 查看es6的文件夹是否存在
            fs_extra_1.default.ensureDir(constant_1.ROOT_PACKAGE_ES6).then(() => buildEs());
        })
            .catch(err => {
            console.error(err);
        });
    });
}
exports.default = default_1;
