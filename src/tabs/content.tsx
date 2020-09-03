import Hammer from 'hammerjs'

import { scrollTopTo } from './utils'
import { createNamespace, debounce } from '../utils'

const [createComponent, bem] = createNamespace('tabs')

export interface IContent extends Vue {
	scrollToIndexPosition(index: number)
}

export default createComponent({
	props: {
		isAnimated: Boolean,
		isSwiper: Boolean,
		isScroll: Boolean,
		currentIndex: Number,
		panelsHeight: Array,
		contentHeight: String
	},
	data() {
		return {
			isPan: false,
			deltaX: 0,
			contentWidth: 0,
			contentClientHeight: 0,
			contentScrollHeight: 0,
		}
	},
	computed: {
		style() {
			if (this.isAnimated && this.isSwiper && this.isPan) return {
				transitionDuration: '0s',
				transform: `translateX(${Number(Number(this.deltaX) - this.currentIndex * this.contentWidth)}px)`
			}

			if (this.isAnimated) return {
				transitionDuration: '0.3s',
				transform: `translateX(-${this.currentIndex * 100}%)`
			}

			return {}
		},
		maxScrollDistance() {
			return this.contentScrollHeight - this.contentClientHeight
		}
	},
	render(h) {

		const { slots } = this

		let Content

		if ((this.isAnimated || this.isSwiper) && !this.isScroll) {

			Content = (<div class={bem('track')} style={this.style}>
				{slots()}
			</div>)

		} else {
			Content = slots()
		}

		return (<div class={bem('content', { animated: this.isAnimated, scroll: this.isScroll })} style={{ height: this.contentHeight }} >
			{Content}
		</div >)

	},
	methods: {
		// 左右滑动
		horizontalSwiper() {
			const contentContrl = new Hammer(this.$el)

			this.contentWidth = this.$el.clientWidth

			contentContrl.get("pan").set({
				direction: Hammer.DIRECTION_HORIZONTAL
			})

			contentContrl.on("panmove", e => {
				this.isPan = true
				this.deltaX = e.deltaX
			})

			contentContrl.on("panend", () => {
				this.isPan = false
				if (Math.abs(this.deltaX) > 80) this.$emit("swiper", this.deltaX < 0 ? 1 : -1)
			})
		},
		// 上下滑动
		verticalSwiper() {
			// scrollHeight
			// scrollTop
			// clientHeight
			this.contentClientHeight = this.$el.clientHeight
			this.contentScrollHeight = this.$el.scrollHeight
			const debounceEmitScrollEvent = debounce(() => this.$emit("debounceScroll", this.$el.scrollTop), 300)
			this.$el.addEventListener("scroll", () => debounceEmitScrollEvent())
		},
		// 上下滚动至下标所在位置
		scrollToIndexPosition(index: number) {
			if (!Array.isArray(this.panelsHeight)) return
			let _scrollTopDistance = 0
			for (let i = 0; i < index; i++) {
				_scrollTopDistance += Number(this.panelsHeight[i] || '0')
			}
			if (_scrollTopDistance > this.maxScrollDistance) _scrollTopDistance = this.maxScrollDistance
			scrollTopTo(this.$el as HTMLElement, _scrollTopDistance, .3)
		}
	},
	mounted() {
		// 滑动切换
		if (this.isSwiper && !this.isScroll) this.horizontalSwiper()
		if (this.isScroll) this.verticalSwiper()
	}
})
