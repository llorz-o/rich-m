import fsExtra from "fs-extra";
import { transformFile } from "@babel/core";
import { JS_FILE_MATCH } from "../common/index";

export function compilerJs(filePath: string) {
	transformFile(
		filePath,
		{
			configFile: false, // 使用配置文件?
			babelrc: false, // 使用 babelrc 文件?
			babelrcRoots: false,
			presets: [
				[
					require("@babel/preset-env"),
					{
						loose: true,
						modules: false,
						targets: {
							esmodules: true
						}
					}
				],
				[
					require("@vue/babel-preset-jsx"),
					{
						functional: false
					}
				],
				require("@babel/preset-typescript")
			],
			plugins: [
				[
					require("@babel/plugin-transform-runtime"),
					{
						corejs: false,
						useESModules: true
					}
				]
			]
		},
		(err, result) => {
			if (err) return console.error(err);
			let { code } = result || {};
			fsExtra.writeFile(
				filePath.replace(JS_FILE_MATCH, ".js"),
				code,
				err => {
					fsExtra.remove(filePath);
				}
			);
		}
	);
}
