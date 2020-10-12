import { createNamespace, throttle, delay } from "../utils";
import './index.less'

const [createComponent, b] = createNamespace("pullup-loading")

enum LOADING_STATE {
	nil,
	loading,
	finished,
	error
}

const TRIGGER_DISTANCE = 100

export default createComponent({
	props: {
		reqMethod: {
			type: Function,
			default: () => Promise.resolve({ finished: true })
		},
		disable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			contentEl: null,
			isBottomOut: false,

			isPan: false,

			startY: 0,
			deltaY: 0,

			isTrigger: false,
			state: LOADING_STATE.nil
		}
	},
	computed: {
		wrapperOffsetSty() {

			let distance = 0
			let duration = 300
			const { isPan, state, deltaY } = this

			if (isPan && deltaY < 0) {

				if (Math.abs(deltaY) > TRIGGER_DISTANCE) {
					// 当前达到触发加载的距离
					this.isTrigger = true
					distance = -((Math.abs(deltaY) - TRIGGER_DISTANCE) * 0.25 + TRIGGER_DISTANCE)
				} else {
					this.isTrigger = false
					distance = deltaY
				}
				duration = 0
			}

			if (state === LOADING_STATE.loading || state === LOADING_STATE.finished || state === LOADING_STATE.error) {
				const { state } = this.$refs
				if (state) distance = -(state.clientHeight)
				else distance = -100
			}

			return {
				transform: `translate3d(0,${distance}px,0)`,
				transitionDuration: `${duration}ms`
			}
		},
	},
	render(h) {

		const { slots, isTrigger, state } = this

		const LoadingSlot = slots("loading")
		const FinishedSlot = slots("finished")
		const ErrorSlot = slots("error")

		let LoadingState

		if (LOADING_STATE.nil === state) {
			LoadingState = <div class={b("state", ["default"])}>
				{isTrigger ? "松开即可刷新" : "上拉即可刷新"}
			</div>
		}

		if (LOADING_STATE.loading === state) {
			LoadingState = <div class={b("state", ["loading"])}>
				{LoadingSlot || '加载中...'}
			</div>
		}

		if (LOADING_STATE.finished === state) {
			LoadingState = <div class={b("state", ["finished"])}>
				{FinishedSlot || "加载完毕"}
			</div>
		}

		if (LOADING_STATE.error === state) {
			LoadingState = <div class={b("state", ["error"])}>
				{ErrorSlot || "加载失败,点击重新加载!"}
			</div>
		}

		return <div class={b()}>
			<div class={b("wrapper")} style={this.wrapperOffsetSty}>
				<div class={b("content")} onScroll={this.throttleOnScroll} onTouchstart={this.onTouchstart}
					onTouchmove={this.onTouchmove} onTouchend={this.onTouchend}>
					{slots()}
				</div>
				<div class={b("loading")} ref="state" onClick={this.onClickError}>
					{LoadingState}
				</div>
			</div>
		</div>
	},
	methods: {
		onContentScroll(e) {
			if (this.disable) return
			if (this.state !== LOADING_STATE.nil) return this.isBottomOut = false

			const { target, srcElement } = e
			const el = target || srcElement
			const { clientHeight, scrollTop, scrollHeight } = el

			if (scrollHeight - scrollTop - clientHeight <= 0) {
				this.isBottomOut = true
			} else {
				this.isBottomOut = false
			}

		},
		onTouchstart(e) {
			if (this.disable) return
			if (this.state !== LOADING_STATE.nil) return this.isBottomOut = false
			this.isPan = true
			if (this.isBottomOut) {
				const { touches, changedTouches } = e
				const [touch] = touches || changedTouches
				const { pageY, clientY } = touch || {}

				this.startY = pageY || clientY
			}
		},
		onTouchmove(e) {
			if (this.disable) return
			this.isPan = true
			if (this.isBottomOut) {
				const { touches, changedTouches } = e
				const [touch] = touches || changedTouches
				const { pageY, clientY } = touch || {}

				this.deltaY = (pageY || clientY) - this.startY

				if (this.deltaY < 0 && e.cancelable) {
					e.stopPropagation()
					e.preventDefault()
				}
			}
		},
		onTouchend(e) {
			if (this.disable) return
			this.startY = 0
			this.deltaY = 0
			this.isPan = false

			// 松开时为触发状态则请求api
			if (this.isTrigger) this.request()

		},
		onClickError() {
			if (this.disable) return
			if (this.state === LOADING_STATE.error) this.request()
		},
		request() {
			if (this.disable) return
			this.state = LOADING_STATE.loading
			this.reqMethod().then(({ error, finished }) => {
				this.isTrigger = false
				if (finished) {
					this.state = LOADING_STATE.finished
					delay(() => this.state = LOADING_STATE.nil, 800)
				}
				if (error) this.state = LOADING_STATE.error
			}).catch(() => {
				this.isTrigger = false
				this.state = LOADING_STATE.error
			})
		},
	},
	created() {
		this.throttleOnScroll = throttle(this.onContentScroll, 100)
	},
})
