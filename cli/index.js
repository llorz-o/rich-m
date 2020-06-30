#! /usr/bin/env node

const program = require("commander") // 定制化命令行

const shelljs = require("shelljs") // 编辑自动化脚本,执行shell命令

const dev = require("./command/dev")
const build = require("./command/build")

program.version("0.0.1", "-v", "--version")

program.command("dev").description("本地开发服务").action(dev)
program.command("build").description("打包构建").action(build)

program.parse(process.argv)