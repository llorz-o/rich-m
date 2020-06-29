import {
    program
} from 'commander' // 定制化命令行

import shelljs from "shelljs" // 编辑自动化脚本,执行shell命令

import dev from './command/dev'

program.version("0.0.1")

program.command("dev").description("本地开发服务").action(dev)