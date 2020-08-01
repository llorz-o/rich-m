"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const config = __importStar(require("../common/constant"));
const path_1 = require("path");
const webpack_merge_1 = require("webpack-merge");
function default_1() {
    // 运行dev开发页面
    return new Promise((resolve, reject) => {
        webpack_1.default(webpack_merge_1.merge(webpack_config_1.default, {
            mode: "production",
            entry: path_1.join(config.CLI_SITE, "dev/index.js"),
            plugins: [
                new html_webpack_plugin_1.default({
                    template: path_1.join(config.CLI_SITE, "dev/index.html")
                })
            ]
        }), (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err);
            }
        });
    });
}
exports.default = default_1;
