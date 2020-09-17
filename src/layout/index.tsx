import { delay } from '../editor/utils'
import { createNamespace } from '../utils'
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
			isAnimationEnd: true
		}
	},
	render(h) {

		const { slots } = this

		return <div class={b()}>
			<div class={b("header")}>
				{slots("header")}
			</div>
			<div class={b("content")} data-height="10px">
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
		document.addEventListener('animationend', animationendHandle)
		this.$on("hook:beforeDestroy", () => {
			document.removeEventListener('animationend', animationendHandle)
		})
	}
})