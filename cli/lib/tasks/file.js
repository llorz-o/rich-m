"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const constant_1 = require("../common/constant");
const fs_supplement_1 = require("../common/fs-supplement");
const COMPONENT_NAME = /([a-z]+)\\README\.MD$/;
// 构建文档文件
function buildDocFile() {
    return new Promise((resolve, reject) => {
        // 判断 cli 目录下的 dist 文件夹是否存在
        fs_extra_1.default.ensureDir(constant_1.CLI_DIST)
            .then(async () => {
            // 匹配组件目录中的 readme.md 文件
            let [err, files] = await fs_supplement_1.asyncMatchReadDir(constant_1.ROOT_SRC, /README\.MD$/, true);
            if (err)
                return reject(err);
            // 读取所有md 文件的内容,写入 js 文件 export const componentName  = "md file content"
            let outputFilePath = path_1.join(constant_1.CLI_DIST, "/component-descript.js");
            let isFirst = true;
            fs_supplement_1.iterateArray(files, (path, index, next) => {
                // 读 md 文件
                fs_extra_1.default.readFile(path, (err, data) => {
                    if (err)
                        return reject(err);
                    // 导出至 js文件 a 追加写入
                    // D:\PERSONAL_WORKSPACE\rich-m\src\tab\README.MD 获取组件名
                    let componentName = (path.match(COMPONENT_NAME) ||
                        [])[1];
                    let fileContent = data.toString();
                    fileContent = String(fileContent).replace(/\`/gm, "\\`");
                    // 拼接字符
                    let exportContent = `export const ${componentName} = \`${fileContent}\`;\r\n`;
                    if (!componentName)
                        return next(++index);
                    // 写入内容
                    fs_extra_1.default.writeFile(outputFilePath, exportContent, {
                        flag: isFirst ? "w" : "a"
                    }, err => {
                        isFirst = false;
                        if (err)
                            return reject(err);
                        if (++index < files.length)
                            return next(index);
                        // 全部写入文件
                        resolve();
                    });
                });
            });
        })
            .catch(reject);
    });
}
exports.buildDocFile = buildDocFile;
