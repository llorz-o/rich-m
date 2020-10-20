/** @format */
import Vue from 'vue'
import {getScroller, throttle} from '../utils'

type Virtual = {isRender: boolean; $el: HTMLElement}

const MAX_PADDBOTTOM = Number.MAX_VALUE

export function MixinVirtualList(): unknown {
    return Vue.extend({
        data() {
            return {
                windowHeight: 0,
                curIndex: 0,
            }
        },
        created() {
            const {height} = window.screen
            this.windowHeight = height
        },
        mounted() {
            const {parentElement, parentNode} = this.$el
            const parent = parentElement || parentNode
            const scroller = getScroller(parent)

            const throttleScroll = throttle(this.onScroll, 100)

            if (scroller) scroller.addEventListener('scroll', throttleScroll, {passive: true})
            this.$el.addEventListener('scroll', throttleScroll, {passive: true})

            this.$el.setAttribute('style', `padding-bottom:${MAX_PADDBOTTOM}px`)
        },
        methods: {
            onScroll() {
                const {children, windowHeight, checkRect} = this
                const {length: childrenLength} = children

                const check = () => {
                    if (!childrenLength) return
                    const {curIndex} = this
                    const curItem = children[curIndex]
                    const isRender = checkRect(curItem.$el, windowHeight)
                    if (isRender) {
                        curItem.isRender = true
                        if (this.curIndex + 1 >= childrenLength) {
                            this.curIndex = childrenLength - 1
                        } else {
                            this.curIndex += 1
                            this.$nextTick(() => check())
                        }
                    } else {
                        curItem.isRender = false
                    }
                }

                check()
            },
            checkRect(target, windowHeight) {
                const rect = target.getBoundingClientRect()
                const {top} = rect
                return top <= windowHeight + 200
            },
        },
    })
}
