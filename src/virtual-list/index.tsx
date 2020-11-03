import { debounce, getScroller, throttle } from '../utils'
import { MixinParent } from "../mixins";
import { createNamespace } from "../utils";

const [createComponent, b] = createNamespace("virtual-list")

const MAX_PADDBOTTOM = Number.MAX_VALUE

export default createComponent({
	mixins: [MixinParent('virtualList')],
	render(h) {

		const { slots, containerSty } = this

		return <div class={b()}>
			<div class={b('container')} style={containerSty}>
				{slots()}
			</div>
		</div>
	},
	data() {
		return {
			windowHeight: 0,
			prevIndex: 0,
			nextIndex: 0,
			oldScrollTop: 0,
			isBottom: true,
			isBottomOut: false,
		}
	},
	computed: {
		containerSty() {

			return {
				paddingBottom: `${this.isBottomOut ? 0 : MAX_PADDBOTTOM}px`
			}
		}
	},
	created() {
		const { height } = window.screen
		this.windowHeight = height
	},
	mounted() {
		const { parentElement, parentNode } = this.$el
		const parent = parentElement || parentNode
		const scroller = getScroller(parent)

		const throttleScroll = throttle(this.onScroll, 10)
		const debounceScroll = debounce(() => {
			// 节点校准
			// console.log(1);
			// this.disposeTop()
			// this.disposeBottom()
		}, 100)

		if (scroller) scroller.addEventListener('scroll', throttleScroll, { passive: true })
		this.$el.addEventListener('scroll', (e) => (debounceScroll(), throttleScroll(e)), { passive: true })
		this.disposeBottom()
	},
	methods: {
		onScroll(e) {
			this.isBottom = this.checkDirect(e)
			this.disposeTop()
			this.disposeBottom()
		},
		// 边界下标检测
		checkBoundary(index) {
			const { length } = this.children
			if (index < 0) return true
			if (index === length) return true
		},
		disposeTop() {
			//
			const { prevIndex, windowHeight } = this
			const child = this.children[prevIndex]
			const canRender = this.checkRect(child.$el, windowHeight)
			console.log('disposeTop', canRender, prevIndex);
			if (this.isBottom) {
				// 当前不可渲染
				if (!canRender) {
					const { isRender: childIsRending } = child
					if (!childIsRending) return
					child.isRender = false
					if (this.checkBoundary(prevIndex + 1)) return
					this.prevIndex += 1
					this.disposeTop()
				}
			} else {
				if (canRender) {
					child.isRender = true
					if (this.checkBoundary(prevIndex - 1)) return
					this.prevIndex -= 1
					this.disposeTop()
				}
			}
		},
		disposeBottom() {
			//
			const { nextIndex, windowHeight } = this
			const child = this.children[nextIndex]
			const canRender = this.checkRect(child.$el, windowHeight)
			if (this.isBottom) {

				if (canRender) {
					// 渲染下一个子节点
					child.isRender = true
					// 当前为边界
					if (this.checkBoundary(nextIndex + 1)) return this.isBottomOut = true
					this.nextIndex += 1
					this.$nextTick(() => this.disposeBottom())
				}
			} else {
				// 当前不可渲染
				if (!canRender) {
					child.isRender = false
					if (this.checkBoundary(nextIndex - 1)) return
					this.nextIndex -= 1
					this.disposeBottom()
				}
			}

		},
		checkRect(target, windowHeight) {
			const rect = target.getBoundingClientRect()
			const { top } = rect
			return top <= windowHeight + 500 && top > -500
		},
		checkDirect(e): boolean {
			const { target, srcElement } = e
			const el = target || srcElement
			const { scrollTop } = el
			const isBottom = scrollTop > this.oldScrollTop
			this.oldScrollTop = scrollTop
			return isBottom
		}
	},
})
