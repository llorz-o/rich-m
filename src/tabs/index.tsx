import './index.less'
import { createNamespace } from 'u@/create'
import { each } from 'u@/index'
import { scrollLeftTo } from './utils'

import { MixinParent } from '../mixins/relation'

const [createComponent, bem] = createNamespace('tabs')

import Title from './title'
import Content from './content'


export default createComponent({
    props: {
        animated: Boolean,
        swiper: Boolean,
        sticky: Boolean,
        scroll: Boolean,
        swipeThreshold: {
            type: Number,
            default: 4,
        },
    },
    mixins: [MixinParent('xTabs')],
    data() {
        return {
            test: "name",
            currentIndex: 0,
            indicatorStyle: null,
            maxTitleWidth: 0,
        }
    },
    watch: {
        children() {
            this.setIndicator()
            this.currentIndex = this.effectCurrentIndexs[0]
        },
        currentIndex() {
            this.setIndicator()
        },
    },
    computed: {
        effectCurrentIndexs() {
            let effectIndex = []
            each<any>(this.children, (vnode, index) => {
                if (!vnode.disable) {
                    effectIndex.push(index)
                }
            })
            return effectIndex
        },
        scrollable() {
            return this.children.length > this.swipeThreshold
        },
    },
    methods: {
        setIndicator() {
            this.$nextTick(() => {
                const { title } = this.$refs
                if (title && (title as Vue) && (title as Vue[]).length === undefined) {
                    const $title = (title as Vue).$el
                    const tabWidth: number = $title.clientWidth
                    const indicatorWidth: number = tabWidth / 2

                    this.indicatorStyle = {
                        transitionDuration: '0.3s',
                        transform: `translateX(${this.currentIndex * tabWidth + indicatorWidth / 2}px)`,
                        width: `${indicatorWidth}px`
                    }

                }
            })
        },
        onSwiper(offset) {
            let _currentIndex = this.currentIndex
            let effectCurrentIndexsLen = this.effectCurrentIndexs.length
            let effectIndex = this.effectCurrentIndexs.indexOf(_currentIndex)

            effectIndex += offset
            effectIndex = effectIndex < 0 ? 0 : effectIndex
            effectIndex = effectIndex >= effectCurrentIndexsLen ? effectCurrentIndexsLen <= 0 ? 0 : effectCurrentIndexsLen - 1 : effectIndex

            effectIndex = this.effectCurrentIndexs[effectIndex]

            if (effectIndex as Number) {
                this.currentIndex = effectIndex
            } else {
                this.currentIndex = 0
                // console.warn(`当前有效下标不是一个有效值:[[${effectIndex}]]`);
            }
            this.onClickTitle(this.currentIndex)
        },
        onClickTitle(index) {
            this.currentIndex = index
            if (this.scrollable) {
                index = index < 2 ? 2 : index
                const tabList = this.$refs.tabList
                const title = this.$refs.title
                scrollLeftTo(tabList as HTMLElement, (index - 2) * Number(((title as Vue).$el as Element).clientWidth || '0'), 0.3)
            }
        }
    },
    mounted() {
        this.setIndicator()
    },
    render(h) {

        const { indicatorStyle } = this

        const Nav = this.children.map((vnode, index) => {
            return (<Title
                ref="title"
                isActive={index === this.currentIndex}
                isDisable={vnode.disable}
                scrollable={this.scrollable}
                swipeThreshold={this.swipeThreshold}
                scopedSlots={{
                    ['tab-left']: () => vnode.$slots['tab-left'],
                    ['tab-right']: () => vnode.$slots['tab-right'],
                }}
                onClick={() => this.onClickTitle(index)}>
                {vnode.title}
            </Title>);
        })

        return (<div class={bem(['default'])}>
            <div class={[bem('wrap', {
                sticky: this.sticky
            }), 'x-hairline--bottom',]}>
                {this.slots("nav-left")}
                <div class={bem('nav')} ref="tabList">
                    {Nav}
                    <div class={bem('indicator')} style={indicatorStyle}></div>
                </div>
                {this.slots("nav-right")}
            </div>
            <Content isAnimated={this.animated} isSwiper={this.swiper} currentIndex={this.currentIndex} onSwiper={this.onSwiper}>
                {this.slots()}
            </Content>
        </div>)
    },
})
