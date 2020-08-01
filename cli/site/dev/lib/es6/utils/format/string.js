var camelizeRE = /-(\w)/g;
var pascalRE = /^\w/;
export var toPascalCase = str => {
  return str.replace(camelizeRE, (_, s) => s.toUpperCase()).replace(pascalRE, s => s.toUpperCase());
};
export var toKebabCase = str => {
  var UpperCaseReg = /[A-Z][a-z]+/gm;
  var LowerCaseReg = /^[A-Z]/gm;
  var trim = /^-/;
  return str.replace(UpperCaseReg, match1 => "-" + match1.replace(LowerCaseReg, match2 => match2.toLowerCase())).replace(trim, "");
};