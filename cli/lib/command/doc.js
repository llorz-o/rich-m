"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const doc_config_1 = __importDefault(require("../config/doc.config"));
const file_1 = require("../tasks/file");
const DOC_CONFIG = webpack_merge_1.merge(webpack_config_1.default, doc_config_1.default);
function default_1() {
    return new Promise((resolve, reject) => {
        file_1.buildDocFile()
            .then(() => {
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
        })
            .catch(reject);
    });
}
exports.default = default_1;
