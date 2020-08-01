// console.log(bem()); button
// console.log(bem(['1', '2'])); button button--1 button--2
// console.log(bem({ name: 'name'})); button button--name
// console.log(bem('default')); button__default
// console.log(bem('default', ['1', '2'])); button__default--1
// console.log(bem('default', ['1',  { name: 'name',}])); button__default--1 button__default--name
// console.log(bem('default', { name: 'name'})); button__default--name
export function gen(name, mods) {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return name + "--" + mods + " ";
  }

  if (Array.isArray(mods)) {
    return mods.reduce((pre, cur) => pre + gen(name, cur), ' ');
  }

  return Object.keys(mods).reduce((pre, cur) => {
    return pre + (mods[cur] ? gen(name, cur) : '');
  }, ' ');
}
export var createBEM = name => {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
};