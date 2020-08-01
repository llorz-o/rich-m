import { ROOT_SRC, ROOT_PACKAGE, ROOT_PACKAGE_ES6 } from "../common/constant";
import fsExtra from "fs-extra";
import { join } from "path";
import { isDemo, isTest, isJs, isStyle, isOther } from "../common";
import { compilerJs } from "../compiler/compile-js";
import { importIndex } from "../compiler/compile-import";

async function compiler(dirPath: string) {
	let files = fsExtra.readdirSync(dirPath);
	await Promise.all(
		files.map(filename => {
			let filePath = join(dirPath, filename);

			if (isDemo(filePath) || isTest(filePath) || isOther(filePath)) {
				return fsExtra.remove(filePath);
			}

			if (isJs(filePath)) {
				return compilerJs(filePath);
			}

			if (isStyle(filePath)) {
				return;
			}

			compiler(filePath);
		})
	);
}

async function buildEs() {
	await fsExtra.copy(ROOT_SRC, ROOT_PACKAGE_ES6);
	await compiler(ROOT_PACKAGE_ES6);
	await importIndex(ROOT_PACKAGE_ES6);
}

export default function() {
	// 先删除之前的
	fsExtra.remove(ROOT_PACKAGE).then(() => {
		// 判断导出路径是否存在
		fsExtra
			.ensureDir(ROOT_PACKAGE)
			.then(() => {
				// 查看es6的文件夹是否存在
				fsExtra.ensureDir(ROOT_PACKAGE_ES6).then(() => buildEs());
			})
			.catch(err => {
				console.error(err);
			});
	});
}
