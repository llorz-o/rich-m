#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander"); // 定制化命令行
const shelljs = require("shelljs"); // 编辑自动化脚本,执行shell命令
const dev_1 = __importDefault(require("./command/dev"));
const build_1 = __importDefault(require("./command/build"));
const demo_1 = __importDefault(require("./command/demo"));
const doc_1 = __importDefault(require("./command/doc"));
const build_dev_1 = __importDefault(require("./command/build-dev"));
program.version("0.0.1");
program
    .command("dev")
    .description("本地开发服务")
    .action(dev_1.default);
program
    .command("build")
    .description("打包构建")
    .action(build_1.default);
program
    .command("demo")
    .description("运行demo")
    .action(demo_1.default);
program
    .command("doc")
    .description("构建项目文档页")
    .action(doc_1.default);
program
    .command("build:dev")
    .description("打包开发页面")
    .action(build_dev_1.default);
program.parse(process.argv);
