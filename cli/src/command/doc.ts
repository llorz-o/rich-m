import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";
import BaseConf from "../config/webpack.config";
import DocConf from "../config/doc.config";
import { buildDocFile } from "../tasks/file";

const DOC_CONFIG = merge(
	BaseConf as Webpack.Configuration,
	DocConf as Webpack.Configuration
);

export default function() {
	return new Promise((resolve, reject) => {
		buildDocFile()
			.then(() => {
				const devServerOptions = {
					hot: true,
					host: "localhost",
					overlay: true,
					stats: "errors-only"
				};
				WebpackDevServer.addDevServerEntrypoints(
					DOC_CONFIG,
					devServerOptions as Webpack.Configuration
				);
				const compiler = Webpack(DOC_CONFIG);
				const server = new WebpackDevServer(compiler);
				server.listen(5002, "localhost", err => {
					if (err) {
						console.error(err);
						reject(err);
						return;
					}
					console.log("dev server run http://localhost:5002");
					resolve();
				});
			})
			.catch(reject);
	});
}
