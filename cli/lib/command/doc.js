"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const doc_config_1 = __importDefault(require("../config/doc.config"));
const constant_1 = require("../common/constant");
const fs_supplement_1 = require("../common/fs-supplement");
const COMPONENT_NAME = /([a-z]+)\\README\.MD$/;
const DOC_CONFIG = webpack_merge_1.merge(webpack_config_1.default, doc_config_1.default);
function default_1() {
    // demo 运行在dev页面
    // doc 命令时demo为打包逻辑
    // 所有的组件demo页面按组件文件夹名注入路由
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
                    // 拼接字符
                    let exportContent = `export const ${componentName} = \`${data.toString()}\`;\r\n`;
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
                        const devServerOptions = {
                            hot: true,
                            host: "localhost",
                            overlay: true,
                            stats: "errors-only"
                        };
                        webpack_dev_server_1.default.addDevServerEntrypoints(DOC_CONFIG, devServerOptions);
                        const compiler = webpack_1.default(DOC_CONFIG);
                        const server = new webpack_dev_server_1.default(compiler);
                        server.listen(5002, "localhost", err => {
                            if (err) {
                                console.error(err);
                                reject(err);
                                return;
                            }
                            console.log("dev server run http://localhost:5002");
                            resolve();
                        });
                    });
                });
            });
        })
            .catch(reject);
    });
}
exports.default = default_1;
