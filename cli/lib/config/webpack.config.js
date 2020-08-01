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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");
const constant = __importStar(require("../common/constant"));
exports.default = {
    devServer: {
        compress: true,
        clientLogLevel: "none",
        inline: false,
        info: false,
        // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        quiet: true,
        stats: undefined
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        ts: "ts-loader",
                        tsx: "babel-loader!ts-loader"
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "css-loader"
            },
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", "vue", "json"],
        alias: {
            "@": path.resolve(constant.ROOT, "./"),
            "u@": path.resolve(constant.ROOT, "utils/")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(constant.ROOT, "./dist")
    },
    plugins: [
        new vueLoaderPlugin(),
        new FriendlyErrorWebpackPlugin({
            clearConsole: true
        })
    ]
};
