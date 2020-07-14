interface baseConfig {
	[key: string]: any;
}
const baseConfig: baseConfig = {
	mode: "doc",
	dev: {},
	demo: {},
	doc: {
		port: 5002
	}
};

export const setMode = (mode: string) => (baseConfig.mode = mode);

export default baseConfig;
