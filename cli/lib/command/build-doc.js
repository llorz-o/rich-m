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
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const doc_config_1 = __importDefault(require("../config/doc.config"));
const file_1 = require("../tasks/file");
const config = __importStar(require("../common/constant"));
const path_1 = require("path");
const demo_config_1 = __importDefault(require("../config/demo.config"));
const DOC_CONFIG = webpack_merge_1.merge(webpack_config_1.default, doc_config_1.default, {
    devtool: false,
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path_1.join(config.ROOT, "docs")
    }
});
const DEMO_CONFIG = webpack_merge_1.merge(webpack_config_1.default, demo_config_1.default, {
    devtool: false,
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path_1.join(config.ROOT, "docs/demo")
    }
});
function default_1() {
    return new Promise((resolve, reject) => {
        file_1.buildDocFile()
            .then(() => {
            webpack_1.default(DOC_CONFIG, (err, stats) => {
                if (err || stats.hasErrors()) {
                    console.error(err);
                    reject(err);
                }
                // 构建demo页面
                webpack_1.default(DEMO_CONFIG, (err, stats) => {
                    if (err || stats.hasErrors()) {
                        console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            });
        })
            .catch(reject);
    });
}
exports.default = default_1;
