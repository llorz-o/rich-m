#! /usr/bin/env node

const program = require("commander"); // 定制化命令行

const shelljs = require("shelljs"); // 编辑自动化脚本,执行shell命令

import dev from "./command/dev";
import build from "./command/build";
import demo from "./command/demo";
import doc from "./command/doc";
import build_dev from "./command/build-dev";

program.version("0.0.1");

program
	.command("dev")
	.description("本地开发服务")
	.action(dev);
program
	.command("build")
	.description("打包构建")
	.action(build);
program
	.command("demo")
	.description("运行demo")
	.action(demo);

program
	.command("doc")
	.description("构建项目文档页")
	.action(doc);

program
	.command("build:dev")
	.description("打包开发页面")
	.action(build_dev);

program.parse(process.argv);
