"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerJs = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const core_1 = require("@babel/core");
const index_1 = require("../common/index");
function compilerJs(filePath) {
    core_1.transformFile(filePath, {
        configFile: false,
        babelrc: false,
        babelrcRoots: false,
        presets: [
            [
                require("@babel/preset-env"),
                {
                    loose: true,
                    modules: false,
                    targets: {
                        esmodules: true
                    }
                }
            ],
            [
                require("@vue/babel-preset-jsx"),
                {
                    functional: false
                }
            ],
            require("@babel/preset-typescript")
        ],
        plugins: [
            [
                require("@babel/plugin-transform-runtime"),
                {
                    corejs: false,
                    useESModules: true
                }
            ]
        ]
    }, (err, result) => {
        if (err)
            return console.error(err);
        let { code } = result || {};
        fs_extra_1.default.writeFile(filePath.replace(index_1.JS_FILE_MATCH, ".js"), code, err => {
            fs_extra_1.default.remove(filePath);
        });
    });
}
exports.compilerJs = compilerJs;
