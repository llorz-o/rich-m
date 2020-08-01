import Vue from 'vue';
export function MixinParent(parent) {
  return {
    provide() {
      return {
        [parent]: this
      };
    },

    data() {
      return {
        children: []
      };
    }

  };
}
export function MixinChildren(parent, options) {
  if (options === void 0) {
    options = {};
  }

  var indexKey = options.indexKey || 'index';
  return Vue.extend({
    inject: {
      [parent]: {
        default: null
      }
    },
    computed: {
      parent() {
        if (this.disableBindRelation) {
          return null;
        }

        return this[parent];
      },

      [indexKey]() {
        this.bindRelation();
        return this.parent.children.indexOf(this);
      }

    },

    mounted() {
      this.bindRelation();
    },

    methods: {
      bindRelation() {
        // 父组件的子组件中无法找到当前组件则存入子组件列表中
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }

        var children = [...this.parent.children, this];
        this.parent.children = children;
      }

    }
  });
}