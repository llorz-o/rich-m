import Webpack from "webpack";
import BaseConf from "../config/webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as config from "../common/constant";
import { join } from "path";
import { merge } from "webpack-merge";

export default function() {
	// 运行dev开发页面
	return new Promise((resolve, reject) => {
		Webpack(
			merge(BaseConf as Webpack.Configuration, {
				mode: "production",
				entry: join(config.CLI_SITE, "dev/index.js"),
				output: {
					filename: "bundle.js",
					path: join(config.ROOT, "docs/dev")
				},
				plugins: [
					new HtmlWebpackPlugin({
						template: join(config.CLI_SITE, "dev/index.html")
					})
				]
			}) as Webpack.Configuration,
			(err, stats) => {
				if (err || stats.hasErrors()) {
					console.error(err);
				}
			}
		);
	});
}
