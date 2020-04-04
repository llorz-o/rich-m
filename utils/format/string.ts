const camelizeRE = /-(\w)/g
const pascalRE = /^\w/

export const toPascalCase = (str: string): string => {
  return str.replace(camelizeRE, (_, s: string) => s.toUpperCase()).replace(pascalRE, s => s.toUpperCase())
}
