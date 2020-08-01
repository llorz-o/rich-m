import './index.less';
import { MixinChildren } from '../mixins/relation';
import { createNamespace } from '../utils';
var [createComponent, bem] = createNamespace('tab');
export default createComponent({
  mixins: [MixinChildren('xTabs')],
  props: {
    titleStyle: null,
    title: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show() {
      if (this.parent.scroll) return true;else return this.parent.currentIndex === this.index;
    }

  },

  render(h) {
    var {
      show,
      slots
    } = this;

    if (this.parent.animated && !this.parent.scroll) {
      return h("div", {
        "class": bem('panel-wrapper', {
          inactive: !this.show
        })
      }, [h("div", {
        "class": bem('panel')
      }, [slots()])]);
    }

    return h("div", {
      "class": bem('panel'),
      "directives": [{
        name: "show",
        value: show
      }]
    }, [slots()]);
  }

});