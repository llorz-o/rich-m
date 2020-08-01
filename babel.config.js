module.exports = {
	"presets": [
		"@vue/babel-preset-jsx",
		"@babel/preset-typescript"
	],
	"plugins": [
		"@babel/proposal-class-properties",
		"@babel/proposal-object-rest-spread",
		"transform-vue-jsx",
		["transform-es2015-modules-commonjs", {
			"modules": false
		}]
	]
}
