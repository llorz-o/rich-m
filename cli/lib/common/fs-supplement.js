"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate = exports.iterateArray = exports.asyncEach = exports.asyncIsDir = exports.asyncEachDir = exports.asyncReadDir = exports.asyncMatchReadDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
async function asyncMatchReadDir(path, match, isDep = false) {
    if (match instanceof Boolean)
        isDep = !!match;
    let [_eachDirError, filePaths] = await asyncEachDir(path, isDep);
    if (match instanceof RegExp)
        return [
            _eachDirError,
            filePaths.filter(path => match.test(path))
        ];
    return [_eachDirError, filePaths];
}
exports.asyncMatchReadDir = asyncMatchReadDir;
// 获取文件夹下的所有路径 [ 'mixins', 'sty', 'tab', 'tabs' ]
function asyncReadDir(path) {
    return new Promise(resolve => {
        fs_1.default.readdir(path, (err, files) => resolve([err, files]));
    });
}
exports.asyncReadDir = asyncReadDir;
// 遍历文件夹
async function asyncEachDir(path, isDep, beginPaths = []) {
    let [_readDirError, files] = await asyncReadDir(path);
    if (files) {
        if (isDep) {
            await asyncEach(files, async (filePath) => {
                filePath = path_1.join(path, `/${filePath}`);
                beginPaths.push(filePath);
                let [_isDirError, _isDir] = await asyncIsDir(filePath);
                if (_isDir) {
                    await asyncEachDir(filePath, isDep, beginPaths);
                }
                else {
                    _readDirError = _isDirError;
                }
            });
        }
        else {
            beginPaths = files.map(filePath => path_1.join(path, `/${filePath}`));
        }
    }
    return [_readDirError, beginPaths];
}
exports.asyncEachDir = asyncEachDir;
// 判断是不是文件夹
function asyncIsDir(path) {
    return new Promise(done => {
        fs_1.default.stat(path, (err, stats) => {
            return done([err, stats ? stats.isDirectory() : false]);
        });
    });
}
exports.asyncIsDir = asyncIsDir;
async function asyncEach(list, fn = () => { }) {
    for (let index = 0, len = list.length; index < len; index++) {
        await fn(list[index], index, list);
    }
}
exports.asyncEach = asyncEach;
/*

[
    [1,2,[4,7]],
    [2,3],
    4
]

 */
// 如何循环一个异步数组,适用于横向异步
function iterateArray(arr, dispose) {
    let index = 0;
    iterate(next => dispose(arr[index], index, (nextIndex) => {
        index = nextIndex !== undefined ? nextIndex : index + 1;
        next();
    }));
}
exports.iterateArray = iterateArray;
// 迭代
function iterate(dispose) {
    dispose(() => iterate(dispose));
}
exports.iterate = iterate;
