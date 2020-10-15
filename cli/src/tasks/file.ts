/** @format */

import FsExtra from 'fs-extra'
import {join} from 'path'
import {toPascalCase} from '../common'
import {CLI_DIST, ROOT_SRC} from '../common/constant'
import {asyncMatchReadDir, iterateArray} from '../common/fs-supplement'

const COMPONENT_NAME: RegExp = /([a-z-]+)\\README\.MD$/

// 构建文档文件
export function buildDocFile() {
    return new Promise((resolve, reject) => {
        // 判断 cli 目录下的 dist 文件夹是否存在
        FsExtra.ensureDir(CLI_DIST)
            .then(async () => {
                // 匹配组件目录中的 readme.md 文件
                let [err, files] = await asyncMatchReadDir(ROOT_SRC, /README\.MD$/, true)
                if (err) return reject(err)
                // 读取所有md 文件的内容,写入 js 文件 export const componentName  = "md file content"
                let outputFilePath = join(CLI_DIST, '/component-descript.js')
                let isFirst = true
                iterateArray<string>(files, (path, index, next) => {
                    // 读 md 文件
                    FsExtra.readFile(path, (err, data) => {
                        if (err) return reject(err)
                        // 导出至 js文件 a 追加写入
                        // D:\PERSONAL_WORKSPACE\rich-m\src\tab\README.MD 获取组件名
                        let componentName = (path.match(COMPONENT_NAME) || [])[1]

                        let fileContent = data.toString()

                        fileContent = String(fileContent).replace(/\`/gm, '\\`')
                        // 拼接字符
                        let exportContent = `//${path}\r\n//${componentName}\r\nexport const ${toPascalCase(componentName)} = \`${fileContent}\`;\r\n`

                        if (!componentName) return next(++index)
                        // 写入内容
                        FsExtra.writeFile(
                            outputFilePath,
                            exportContent,
                            {
                                flag: isFirst ? 'w' : 'a',
                            },
                            err => {
                                isFirst = false
                                if (err) return reject(err)
                                if (++index < files.length) return next(index)
                                // 全部写入文件
                                resolve()
                            },
                        )
                    })
                })
            })
            .catch(reject)
    })
}
