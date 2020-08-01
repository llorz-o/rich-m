export * from "./constant";
export * from "./fs-supplement";

const camelizeRE = /-(\w)/g;
const pascalRE = /^\w/;

export const DEMO_DIR_MATCH = /\\demo/;
export const TEST_DIR_MATCH = /\\test/;
export const JS_FILE_MATCH = /\.(js|ts|tsx|jsx)$/;
export const STYLE_FILE_MATCH = /\.(less|scss|sass)$/;
export const OTHER_FILE_MATCH = /\.(MD|md|vue)$/;

export function isDemo(filePath: string): boolean {
	return DEMO_DIR_MATCH.test(filePath);
}

export function isTest(filePath: string): boolean {
	return TEST_DIR_MATCH.test(filePath);
}

export function isJs(filePath: string) {
	return JS_FILE_MATCH.test(filePath);
}

export function isStyle(filePath: string) {
	return STYLE_FILE_MATCH.test(filePath);
}

export function isOther(filePath: string) {
	return OTHER_FILE_MATCH.test(filePath);
}

export const toPascalCase = (str: string): string => {
	return str
		.replace(camelizeRE, (_, s: string) => s.toUpperCase())
		.replace(pascalRE, s => s.toUpperCase());
};

export const toKebabCase = (str: string): string => {
	const UpperCaseReg = /[A-Z][a-z]+/gm;
	const LowerCaseReg = /^[A-Z]/gm;
	const trim = /^-/;
	return str
		.replace(
			UpperCaseReg,
			match1 =>
				"-" +
				match1.replace(LowerCaseReg, match2 => match2.toLowerCase())
		)
		.replace(trim, "");
};
