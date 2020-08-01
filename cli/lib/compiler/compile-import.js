"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importIndex = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const common_1 = require("../common");
async function importIndex(dirPath) {
    let files = fs_extra_1.default.readdirSync(dirPath);
    let indexContent = "";
    let components = [];
    files.forEach(path => {
        if (path.indexOf("sty") >= 0 || path.indexOf("mixins") >= 0)
            return;
        if (path.indexOf("utils") >= 0) {
            return (indexContent += `export * from "./${path}";\r\n\r\n`);
        }
        let componentName = common_1.toPascalCase(path);
        components.push(componentName);
        indexContent += `import ${componentName} from "./${path}";\r\n\r\n`;
    });
    indexContent += `const version = "1.0.0";\r\n\r\n`;
    indexContent += `function install(vm){

		const components = [${components.join(",")}];

		components.forEach(component => {
			if( component && component.install ) vm.use(component);
		})

	};\r\n\r\n`;
    indexContent += `export {install, ${components.join(",")}}\r\n\r\n`;
    indexContent += `export default  {
		install,
		version
	}`;
    fs_extra_1.default.writeFile(common_1.ROOT_PACKAGE_ES6_IMPORT_INDEX, indexContent, err => {
        if (err)
            return console.error(err);
    });
}
exports.importIndex = importIndex;
