import fsExtra from "fs-extra";
import { toPascalCase, ROOT_PACKAGE_ES6_IMPORT_INDEX } from "../common";

export async function importIndex(dirPath: string) {
	let files = fsExtra.readdirSync(dirPath);
	let indexContent = "";
	let components: string[] = [];

	files.forEach(path => {
		if (path.indexOf("sty") >= 0 || path.indexOf("mixins") >= 0) return;
		if (path.indexOf("utils") >= 0) {
			return (indexContent += `export * from "./${path}";\r\n\r\n`);
		}

		let componentName = toPascalCase(path);
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

	fsExtra.writeFile(ROOT_PACKAGE_ES6_IMPORT_INDEX, indexContent, err => {
		if (err) return console.error(err);
	});
}
