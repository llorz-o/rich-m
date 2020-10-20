import { MixinChildren } from "../mixins";
import { createNamespace } from "../utils";

const [createComponent, b] = createNamespace("virtual")

export default createComponent({
	mixins: [MixinChildren("virtualList")],
	data() {
		return {
			isRender: false,
			clientWidth: 0,
			clientHeight: 0
		}
	},
	watch: {
		isRender(news, old) {
			if (news === old) return
			if (news) {
				this.$nextTick(() => {
					const { clientWidth, clientHeight } = this.$el
					this.clientWidth = clientWidth
					this.clientHeight = clientHeight
				})
			}
		}
	},
	computed: {
		sty() {
			if (this.clientHeight) {
				const { clientWidth, clientHeight } = this
				return {
					width: `${clientWidth}px`,
					height: `${clientHeight}px`,
				}
			} else {
				return {
					width: "",
					height: "",
				}
			}
		}
	},
	render(h) {
		const { slots, isRender, sty } = this
		return <div class={b()} style={sty} >
			{isRender ? slots() : ''}
		</div>
	},
})
