import Webpack from "webpack";
import { merge } from "webpack-merge";
import BaseConf from "../config/webpack.config";
import DocConf from "../config/doc.config";
import { buildDocFile } from "../tasks/file";
import * as config from "../common/constant";
import { join } from "path";
import DemoConf from "../config/demo.config";

const DOC_CONFIG = merge(
	BaseConf as Webpack.Configuration,
	DocConf as Webpack.Configuration,
	{
		devtool: false,
		mode: "production",
		output: {
			filename: "bundle.js",
			path: join(config.ROOT, "docs")
		}
	}
);

const DEMO_CONFIG = merge(
	BaseConf as Webpack.Configuration,
	DemoConf as Webpack.Configuration,
	{
		devtool: false,
		mode: "production",
		output: {
			filename: "bundle.js",
			path: join(config.ROOT, "docs/demo")
		}
	}
);

export default function() {
	return new Promise((resolve, reject) => {
		buildDocFile()
			.then(() => {
				Webpack(DOC_CONFIG, (err, stats) => {
					if (err || stats.hasErrors()) {
						console.error(err);
						reject(err);
					}
					// 构建demo页面
					Webpack(DEMO_CONFIG, (err, stats) => {
						if (err || stats.hasErrors()) {
							console.error(err);
							reject(err);
						}
						resolve();
					});
				});
			})
			.catch(reject);
	});
}
