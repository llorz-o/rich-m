import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";
import BaseConf from "../config/webpack.config";
import DemoConf from "../config/demo.config";
import { buildDocFile } from "../tasks/file";

const DEMO_CONFIG = merge(
	BaseConf as Webpack.Configuration,
	DemoConf as Webpack.Configuration
);

export default function() {
	// demo 运行在dev页面
	// doc 命令时demo为打包逻辑
	// 所有的组件demo页面按组件文件夹名注入路由
	return new Promise((resolve, reject) => {
		const devServerOptions = {
			hot: true,
			host: "localhost",
			overlay: true,
			stats: "errors-only"
		};

		WebpackDevServer.addDevServerEntrypoints(
			DEMO_CONFIG,
			devServerOptions as Webpack.Configuration
		);

		const compiler = Webpack(DEMO_CONFIG);

		compiler.watch({}, (err, stats) => {
			console.log("change !!!!!!!!!!!!");
			if (err) return console.error(err);
			buildDocFile();
		});

		const server = new WebpackDevServer(compiler as Webpack.Compiler);

		server.listen(5001, "localhost", err => {
			if (err) {
				console.error(err);
				reject(err);
				return;
			}
			console.log("dev server run http://localhost:5001");
			resolve();
		});
	});
}
