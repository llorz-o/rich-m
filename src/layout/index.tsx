import { createNamespace, delay } from '../utils'
import './index.less'

const [createComponent, b] = createNamespace("layout")

export default createComponent({
	props: {
		promise: {
			type: Array,
			default: () => [],
			validator: promiseList => promiseList.every(promise => promise instanceof Function)
		}
	},
	watch: {
		promise(news) {
			if (news.length) this.run(news)
		},
		$route() {
			this.isAnimationEnd = false
		}
	},
	data() {
		return {
			isAnimationEnd: true,
			isRefresh: true,
		}
	},
	render(h) {

		const { slots } = this

		return <div class={b()}>
			<div class={b("header")}>
				{slots("header")}
			</div>
			<div class={b("content")}>
				{slots()}
			</div>
			<div class={b("footer")}>
				{slots("footer")}
			</div>
		</div>
	},
	methods: {
		onAnimationEnd(e) {
			const { target } = e
			if (target === this.$el) {
				delay(() => {
					this.$emit("animation-end")
					this.isAnimationEnd = true
					this.run(this.promise)
				}, 100)
			}
		},
		onAnimationStart(e) {
			const { target } = e
			if (target === this.$el) {
				this.isRefresh = false
			}
		},
		run(promiseList) {
			if (this.isAnimationEnd) {
				promiseList.forEach(fn => {
					try {
						fn()
					} catch (error) {
						console.error(error);
					}
				})
			}
			this.$emit("update:promise", [])
		},
	},
	created() {
		const animationendHandle = e => this.onAnimationEnd(e)
		const animationStartHandle = e => this.onAnimationStart(e)
		document.addEventListener("animationstart", animationStartHandle)
		document.addEventListener('animationend', animationendHandle)
		delay(() => {
			if (this.isRefresh) {
				this.$emit("animation-end")
				this.isAnimationEnd = true
				this.run(this.promise)
			}
		}, 200)
		this.$on("hook:beforeDestroy", () => {
			document.removeEventListener('animationend', animationendHandle)
			document.removeEventListener('animationstart', animationStartHandle)
		})
	},
})
