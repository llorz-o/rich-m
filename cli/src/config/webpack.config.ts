const path = require("path");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");

import * as constant from "../common/constant";

export default {
	devServer: {
		compress: true,
		clientLogLevel: "none",
		inline: false,
		info: false,
		// 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
		quiet: true,
		noInfo: true,
		overlay: true,
		cached: false,
		cachedAssets: false,
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		modules: false,
		colors: true,
		hash: false,
		version: false,
		timings: false,
		assets: false,
		reasons: false,
		children: false,
		source: false,
		errors: false,
		errorDetails: false,
		warnings: false,
		stats: undefined
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
						ts: "ts-loader",
						tsx: "babel-loader!ts-loader"
					}
				}
			},
			{
				test: /\.tsx?$/,
				use: [
					"babel-loader",
					{
						loader: "ts-loader",
						options: {
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: "css-loader"
			},
			{
				test: /\.less$/,
				use: ["vue-style-loader", "css-loader", "less-loader"]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", "vue", "json"],
		alias: {
			"@": path.resolve(constant.ROOT, "./"),
			"u@": path.resolve(constant.ROOT, "utils/")
		}
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(constant.ROOT, "./dist")
	},
	plugins: [
		new vueLoaderPlugin(),
		new FriendlyErrorWebpackPlugin({
			clearConsole: true
		})
	]
};
