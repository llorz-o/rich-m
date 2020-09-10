module.exports = {
	parser: '@typescript-eslint/parser', //定义ESLint的解析器
	extends: [
		//定义文件继承的子规范
		'plugin:vue/vue3-recommended',
		"plugin:vue/base",
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
	env: { //指定代码的运行环境
		browser: true,
		node: true,
	},
	ignorePatterns: [
		"package/**",
		"node_modules/**",
		"cli/**/*",
		"**/*.vue",
		"**/test/*",
	]
}
