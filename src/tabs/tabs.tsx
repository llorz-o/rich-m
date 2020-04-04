import './index.less'
import { createNamespace } from 'u@/create'
import { MixinParent } from '../mixins/relation'
import Vue from 'vue';

const [createComponent, bem] = createNamespace('tabs')

import Title from './title'
import Content from './content'


export default createComponent({
    props: {
        animated: Boolean,
    },
    mixins: [MixinParent('xTabs')],
    data() {
        return {
            test: "name",
            currentIndex: 0,
            indicatorStyle: {
            }
        }
    },
    watch: {
        children() {
            this.setIndicator()
        },
        currentIndex() {
            this.setIndicator()
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
                onClick={() => {
                    this.currentIndex = index
                }}>
                {vnode.title}
            </Title>);
        })

        return (<div class={bem(['default'])}>
            <div class={[bem('wrap'), 'x-hairline--bottom',]}>
                <div class={bem('nav')}>
                    {Nav}
                    <div class={bem('indicator')} style={indicatorStyle}></div>
                </div>
            </div>
            <Content animated={this.animated} currentIndex={this.currentIndex}>
                {this.slots()}
            </Content>
        </div>)
    }
})
