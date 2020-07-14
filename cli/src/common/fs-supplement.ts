import fs from "fs";
import { join } from "path";
// 筛选文件夹下的所有路径
export async function asyncMatchReadDir(
	path: string,
	match: RegExp,
	isDep: boolean
): NodeJs.AsyncPromise;
export async function asyncMatchReadDir(
	path: string,
	isDep: boolean
): NodeJs.AsyncPromise;
export async function asyncMatchReadDir(
	path: string,
	match: any,
	isDep = false
): Promise<any> {
	if (match instanceof Boolean) isDep = !!match;
	let [_eachDirError, filePaths] = await asyncEachDir(path, isDep);
	if (match instanceof RegExp)
		return [
			_eachDirError,
			(filePaths as string[]).filter(path => (match as RegExp).test(path))
		];
	return [_eachDirError, filePaths];
}

// 获取文件夹下的所有路径 [ 'mixins', 'sty', 'tab', 'tabs' ]
export function asyncReadDir(path: string): NodeJs.AsyncPromise {
	return new Promise(resolve => {
		fs.readdir(path, (err, files) => resolve([err, files]));
	});
}

// 遍历文件夹
export async function asyncEachDir(
	path: string,
	isDep: boolean,
	beginPaths: string[] = []
): NodeJs.AsyncPromise {
	let [_readDirError, files] = await asyncReadDir(path);
	if (files) {
		if (isDep) {
			await asyncEach<string>(files, async (filePath: string) => {
				filePath = join(path, `/${filePath}`);
				beginPaths.push(filePath);
				let [_isDirError, _isDir] = await asyncIsDir(filePath);
				if (_isDir) {
					await asyncEachDir(filePath, isDep, beginPaths);
				} else {
					_readDirError = _isDirError;
				}
			});
		} else {
			beginPaths = (files as string[]).map(filePath =>
				join(path, `/${filePath}`)
			);
		}
	}
	return [_readDirError, beginPaths];
}

// 判断是不是文件夹
export function asyncIsDir(path: string): NodeJs.AsyncPromise {
	return new Promise(done => {
		fs.stat(path, (err, stats) => {
			return done([err, stats ? stats.isDirectory() : false]);
		});
	});
}

// 异步 each
type asyncEachCB<T> = (item: T, index: number, self: T[]) => void;
export async function asyncEach<T>(list: T[], fn: asyncEachCB<T> = () => {}) {
	for (let index = 0, len = list.length; index < len; index++) {
		await fn(list[index], index, list);
	}
}

/*

[
	[1,2,[4,7]],
	[2,3],
	4
]

 */

// 如何循环一个异步数组,适用于横向异步
export function iterateArray<T>(
	arr: T[],
	dispose: (item: T, index: number, next: Function) => void
) {
	let index = 0;
	iterate(next =>
		dispose(arr[index], index, (nextIndex?: number) => {
			index = nextIndex !== undefined ? nextIndex : index + 1;
			next();
		})
	);
}

// 迭代
export function iterate(dispose: (next: () => void) => void) {
	dispose(() => iterate(dispose));
}
