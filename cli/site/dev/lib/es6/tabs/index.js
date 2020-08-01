import './index.less';
import { each, createNamespace } from '../utils';
import { scrollLeftTo } from './utils';
import { MixinParent } from '../mixins/relation';
import Title from './title';
import Content from './content';
var [createComponent, bem] = createNamespace('tabs');
export default createComponent({
  props: {
    // v-model
    vModel: Number,
    // tab 切换左右滑动动画效果
    animated: Boolean,
    // 手势
    swiper: Boolean,
    // 粘性
    sticky: Boolean,
    // 上下滚动
    scroll: Boolean,
    // 正文高度
    contentHeight: String,
    // 一栏对多显示的 tab 标签
    swipeThreshold: {
      type: Number,
      default: 4
    },
    // tabs 样式风格
    type: {
      type: String,
      default: "default" // "card"

    }
  },
  mixins: [MixinParent('xTabs')],
  model: {
    event: "v",
    prop: "vModel"
  },

  data() {
    return {
      test: "name",
      currentIndex: 0,
      indicatorStyle: null,
      maxTitleWidth: 0,
      tabsWidth: 0,
      panelsHeight: null,
      scrollLock: false
    };
  },

  watch: {
    children() {
      this.setIndicator();
      this.currentIndex = this.effectCurrentIndexs[0];
    },

    currentIndex(news) {
      this.setIndicator();
      this.$emit("v", Number(news));
    },

    vModel(news) {
      if (this.effectCurrentIndexs.indexOf(news) < 0) {
        console.warn("当前下标不存在");
      } else {
        this.currentIndex = news;
        this.setIndicator();
      }
    }

  },
  computed: {
    effectCurrentIndexs() {
      var effectIndex = [];
      each(this.children, (vnode, index) => {
        if (!vnode.disable) {
          effectIndex.push(index);
        }
      });
      return effectIndex;
    },

    scrollable() {
      return this.children.length > this.swipeThreshold;
    }

  },
  methods: {
    setIndicator() {
      this.$nextTick(() => {
        var {
          title
        } = this.$refs;

        if (title && title && title.length === undefined) {
          var $title = title.$el;
          var tabWidth = $title.clientWidth;
          var indicatorWidth = tabWidth / 2;
          this.indicatorStyle = {
            transitionDuration: '0.3s',
            transform: "translateX(" + (this.currentIndex * tabWidth + indicatorWidth / 2) + "px)",
            width: indicatorWidth + "px"
          };
        }
      });
    },

    // 手势滑动
    onSwiper(offset) {
      var _currentIndex = this.currentIndex;
      var effectCurrentIndexsLen = this.effectCurrentIndexs.length;
      var effectIndex = this.effectCurrentIndexs.indexOf(_currentIndex);
      effectIndex += offset;
      effectIndex = effectIndex < 0 ? 0 : effectIndex;
      effectIndex = effectIndex >= effectCurrentIndexsLen ? effectCurrentIndexsLen <= 0 ? 0 : effectCurrentIndexsLen - 1 : effectIndex;
      effectIndex = this.effectCurrentIndexs[effectIndex];

      if (effectIndex) {
        this.currentIndex = effectIndex;
      } else {
        this.currentIndex = 0;
        console.warn("\u5F53\u524D\u6709\u6548\u4E0B\u6807\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u503C:[[" + effectIndex + "]]");
      }

      this.onClickTitle(this.currentIndex);
    },

    // 点击标题栏
    onClickTitle(index) {
      this.scrollLock = true;
      this.scrollTitleTo(index);
      if (this.scroll) this.$refs.content.scrollToIndexPosition(this.currentIndex);
    },

    // 滚动标题栏
    scrollTitleTo(index) {
      this.currentIndex = index;

      if (this.scrollable) {
        index = index < 2 ? 2 : index;
        var tabList = this.$refs.tabList;
        var title = this.$refs.title;
        scrollLeftTo(tabList, (index - 2) * Number(title.$el.clientWidth || '0'), 0.3);
      }
    },

    // 获取所有面板高度
    getPanelsHeight(scrollTop) {
      if (scrollTop === void 0) {
        scrollTop = 0;
      }

      var panelsHeight = [];
      var scrollHeight = 0;
      var _currentIndex = null;
      each(this.children, (tab, index) => {
        var tabClientHeight = tab.$el.clientHeight;
        scrollHeight += tabClientHeight;
        panelsHeight.push(tabClientHeight);
        if (scrollHeight > scrollTop && _currentIndex == null) _currentIndex = index;
      });
      this.panelsHeight = panelsHeight;
      return _currentIndex;
    },

    // 内容滚动事件处理
    onDebounceScroll(scrollTop) {
      var _currentIndex = this.getPanelsHeight(scrollTop);

      if (this.scrollLock) return this.scrollLock = false;
      this.scrollTitleTo(Number(_currentIndex || '0'));
    }

  },

  mounted() {
    this.setIndicator();
    this.tabsWidth = this.$el.innerWidth;
    this.getPanelsHeight();
  },

  render(h) {
    var {
      indicatorStyle
    } = this;
    var Indicator = h("div", {
      "class": bem('indicator'),
      "style": indicatorStyle
    });
    var Nav = this.children.map((vnode, index) => {
      return h(Title, {
        "ref": "title",
        "style": vnode.titleStyle,
        "attrs": {
          "isActive": index === this.currentIndex,
          "isDisable": vnode.disable,
          "scrollable": this.scrollable,
          "swipeThreshold": this.swipeThreshold,
          "tabsWidth": this.tabsWidth
        },
        "scopedSlots": {
          ['tab-left']: () => vnode.$slots['tab-left'],
          ['tab-right']: () => vnode.$slots['tab-right']
        },
        "on": {
          "click": () => this.onClickTitle(index)
        }
      }, [vnode.$slots['title'] || vnode.title]);
    });
    return h("div", {
      "class": bem([this.type])
    }, [h("div", {
      "class": [bem('wrap', {
        sticky: this.sticky
      }), 'x-hairline--bottom']
    }, [this.slots("nav-left"), h("div", {
      "class": bem('nav', [this.type]),
      "ref": "tabList"
    }, [Nav, this.type === 'default' ? Indicator : ""]), this.slots("nav-right")]), h(Content, {
      "ref": "content",
      "attrs": {
        "isScroll": this.scroll,
        "isAnimated": this.animated,
        "isSwiper": this.swiper,
        "contentHeight": this.contentHeight,
        "panelsHeight": this.panelsHeight,
        "currentIndex": this.currentIndex
      },
      "on": {
        "swiper": this.onSwiper,
        "debounceScroll": this.onDebounceScroll
      }
    }, [this.slots()])]);
  }

});