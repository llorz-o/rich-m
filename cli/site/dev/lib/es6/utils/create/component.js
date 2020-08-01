import Vue from 'vue';
import { toPascalCase } from '../format';
import { MixinExtractSlot } from '../../mixins/slots';

// 对于this 我有约定明确的类型但是,仍然报错 对于 this 具有隐式的 any 类型,所以在 tsconfig 中关闭了
// --noImplicitThis 与 --noImplicitAny 检查项
function install(Vue) {
  var {
    name
  } = this;
  Vue.component(name, this);
  Vue.component(toPascalCase(name), this);
}

export var createComponent = name => {
  return function (sfc) {
    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(MixinExtractSlot);
    }

    sfc.name = name;
    sfc.install = install;
    return sfc;
  };
};