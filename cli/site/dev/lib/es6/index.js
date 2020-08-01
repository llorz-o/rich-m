import Editor from "./editor";

import Tab from "./tab";

import Tabs from "./tabs";

export * from "./utils";

const version = "1.0.0";

function install(vm){

		const components = [Editor,Tab,Tabs];

		components.forEach(component => {
			if( component && component.install ) vm.use(component);
		})

	};

export {install, Editor,Tab,Tabs}

export default  {
		install,
		version
	}
