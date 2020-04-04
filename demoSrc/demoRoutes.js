import Vue from 'vue'
import lowerFirst from 'lodash/lowerFirst'
import kebabCase from 'lodash/kebabCase'

const routes = []

const requireComponent = require.context(
    // 其组件目录的相对路径
    '../src/',
    // 是否查询其子目录
    true,
    // 匹配 demo 下面的 vue 文件
    /\/demo\/index\.vue$/
)

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    const componentName = lowerFirst(
        kebabCase(
            // 获取和目录深度无关的文件名
            fileName
            .split('/')[1]
        )
    )
    routes.push({
        path: `/${componentName}`,
        component: componentConfig.default || componentConfig
    })
})

export default routes