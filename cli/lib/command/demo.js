"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const demo_config_1 = __importDefault(require("../config/demo.config"));
const file_1 = require("../tasks/file");
const DEMO_CONFIG = webpack_merge_1.merge(webpack_config_1.default, demo_config_1.default);
function default_1() {
    // demo 运行在dev页面
    // doc 命令时demo为打包逻辑
    // 所有的组件demo页面按组件文件夹名注入路由
    return new Promise((resolve, reject) => {
        const devServerOptions = {
            hot: true,
            host: "localhost",
            overlay: true,
            stats: "errors-only"
        };
        webpack_dev_server_1.default.addDevServerEntrypoints(DEMO_CONFIG, devServerOptions);
        const compiler = webpack_1.default(DEMO_CONFIG);
        compiler.watch({}, (err, stats) => {
            console.log("change !!!!!!!!!!!!");
            if (err)
                return console.error(err);
            file_1.buildDocFile();
        });
        const server = new webpack_dev_server_1.default(compiler);
        server.listen(5001, "localhost", err => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log("dev server run http://localhost:5001");
            resolve();
        });
    });
}
exports.default = default_1;
