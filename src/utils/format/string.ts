const camelizeRE = /-(\w)/g;
const pascalRE = /^\w/;

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
