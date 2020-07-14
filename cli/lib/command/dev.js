"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const dev_config_1 = __importDefault(require("../config/dev.config"));
const DEV_CONFIG = webpack_merge_1.merge(webpack_config_1.default, dev_config_1.default);
function default_1() {
    // 运行dev开发页面
    return new Promise((resolve, reject) => {
        const devServerOptions = {
            hot: true,
            host: "localhost",
            overlay: true,
            stats: "errors-only"
        };
        webpack_dev_server_1.default.addDevServerEntrypoints(DEV_CONFIG, devServerOptions);
        const compiler = webpack_1.default(DEV_CONFIG);
        const server = new webpack_dev_server_1.default(compiler);
        server.listen(5000, "localhost", err => {
            if (err)
                return reject(err);
            console.log("dev server run http://localhost:5000");
            resolve();
        });
    });
}
exports.default = default_1;
