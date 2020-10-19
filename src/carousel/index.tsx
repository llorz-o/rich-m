import { MixinParent } from "../mixins";
import { createNamespace, delay, map } from "../utils";
import "./index.less";

import Hammer from 'hammerjs'

const [createComponent, b] = createNamespace("carousel")

export default createComponent({
	mixins: [MixinParent("carousel")],
	props: {
		delay: {
			type: Number,
			default: 2000
		},
		duration: {
			type: Number,
			default: 1500
		},
		autoplay: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			index: 0,
			fillIndex: null,
			clientWidth: 0,
			isPan: false,
			isStaticDuration: false,
			isDeActived: false,
			isAnimated: false,

			deltaX: 0,
		}
	},
	computed: {
		wrapperStyle() {

			if (this.isPan) this.isStaticDuration = true

			const { clientWidth = 0 } = this.$el || {}
			const { duration, isStaticDuration, index } = this
			let translateX = 0

			this.clientWidth = clientWidth

			if (this.isPan) {
				translateX = - clientWidth * index + (this.deltaX)
			} else {
				translateX = - clientWidth * index
			}

			return {
				transitionDuration: `${isStaticDuration ? 0 : duration}ms`,
				transform: `translate3d(${translateX}px,0px,0px)`
			}
		},
		childrenLength() {
			return this.children.length
		},
	},
	render(h) {

		const { slots, index, fillIndex, childrenLength } = this

		const indicatorList = map(this.children, (_, _index) => {
			return <div class={b('indicator-item', {
				active: (index < 0 && _index + 1 === childrenLength) || (index >= childrenLength && _index === 0) || _index === index
			})} />
		})



		return <div class={b()}>
			<div class={b("wrapper")} style={this.wrapperStyle}>
				{slots()}
			</div>
			<div class={b("indicator")}>
				{indicatorList}
			</div>
		</div>
	},
	methods: {
		toIndex(index) {
			const { fillIndex, duration } = this
			if (fillIndex !== null) {
				this.index += index
				delay(() => {
					this.index = fillIndex
					this.fillIndex = null
					this.isStaticDuration = true
					this.$nextTick(() => this.isStaticDuration = false)
				}, duration)
			} else {
				this.index += index
			}
			this.isStaticDuration = false
			this.isAnimated = true
			delay(() => this.isAnimated = false, duration)
		},
		changeFill(index) {

			if (this.index === 0) {
				if (index < 0) {
					this.fillIndex = this.childrenLength - 1
				} else {
					this.fillIndex = null
				}
			}

			if (this.index + 1 === this.childrenLength) {
				if (index > 0) {
					this.fillIndex = 0
				} else {
					this.fillIndex = null
				}
			}
		},
		playAutoCarousel() {
			const handle = setInterval(() => {
				if (this.isDeActived) return
				const { index, childrenLength } = this
				if (childrenLength > 1) {
					if (index + 1 === childrenLength) {
						this.fillIndex = 0
					} else {
						this.fillIndex = null
					}
					this.toIndex(1)
				}
			}, this.delay + this.duration)
			this.$once("hook:beforeDestroy", () => clearInterval(handle))
		}
	},
	created() {
		if (this.autoplay) this.playAutoCarousel()
	},
	mounted() {
		const hammer = new Hammer(this.$el)
		const { clientWidth = 0 } = this.$el

		this.clientWidth = clientWidth

		hammer.get("pan").set({
			direction: Hammer.DIRECTION_HORIZONTAL
		})

		hammer.on('panmove', e => {
			if (this.isAnimated) return
			this.deltaX = e.deltaX
			this.isPan = true
			this.changeFill(this.deltaX > 0 ? -1 : 1)
		})

		hammer.on("panend", e => {
			if (Math.abs(this.deltaX) > 100) this.toIndex(this.deltaX > 0 ? -1 : 1)
			this.deltaX = 0
			this.isPan = false
			this.isStaticDuration = false

		})

		hammer.on("pancancel", e => {
			if (Math.abs(this.deltaX) > 100) this.toIndex(this.deltaX > 0 ? -1 : 1)
			this.deltaX = 0
			this.isPan = false
			this.isStaticDuration = false

		})
	},
	activated() {
		this.isDeActived = false
	},
	deactivated() {
		this.isDeActived = true
	}
})
