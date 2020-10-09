import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import lowerFirst from 'lodash/lowerFirst'

const requireComponent = require.context(
	// 其组件目录的相对路径
	'../../src',
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/index\.tsx$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)
	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			fileName
			.split('/')[1]
			.replace(/\.\w+$/, '')
		)
	)

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)

	// 全局注册组件
	Vue.component(
		'Rich' + componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})

const demoPages = []

const requireDemoComponent = require.context(
	// 其组件目录的相对路径
	'../../src',
	// 是否查询其子目录
	true,
	// 匹配 demo 下面的 vue 文件
	/\/demo\/index\.vue$/
)

requireDemoComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireDemoComponent(fileName)
	// 获取组件的 PascalCase 命名
	const componentName = lowerFirst(
		kebabCase(
			// 获取和目录深度无关的文件名
			fileName
			.split('/')[1]
		)
	)
	demoPages.push({
		path: `/${componentName}`,
		component: componentConfig.default || componentConfig,
		meta: {
			title: componentName,
			pageName: componentConfig.name
		}
	})
})

export const getDemoPages = () => demoPages
