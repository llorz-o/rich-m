import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";
import BaseConf from "../config/webpack.config";
import DevConf from "../config/dev.config";

const DEV_CONFIG = merge(
	BaseConf as Webpack.Configuration,
	DevConf as Webpack.Configuration
);

export default function() {
	// 运行dev开发页面
	return new Promise((resolve, reject) => {
		const devServerOptions = {
			hot: true,
			host: "localhost",
			overlay: true,
			stats: "errors-only"
		};

		WebpackDevServer.addDevServerEntrypoints(
			DEV_CONFIG,
			devServerOptions as Webpack.Configuration
		);

		const compiler = Webpack(DEV_CONFIG);
		const server = new WebpackDevServer(compiler);
		server.listen(5000, "localhost", err => {
			if (err) return reject(err);
			console.log("dev server run http://localhost:5000");
			resolve();
		});
	});
}
