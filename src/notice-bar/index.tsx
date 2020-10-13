import { createNamespace } from "../utils";
import "./index.less"

const [createComponent, b] = createNamespace("notice-bar")


export default createComponent({
	props: {
		text: String
	},
	data() {
		return {
			contentWidth: 0,
			componentWidth: 0,
		}
	},
	watch: {
		text(news, old) {
			if (news !== old) this.refresh()
		}
	},
	computed: {
		contentSty() {
			const { componentWidth, contentWidth } = this
			if (contentWidth > componentWidth) return {
				animationDuration: `${contentWidth / componentWidth * 10}s`
			}
		}
	},
	render(h) {

		const { text, slots, contentSty } = this

		const IconSlot = slots("icon")

		return <div class={b()}>
			{IconSlot}
			<div class={b("wrapper")}>
				<div class={b("content")} style={contentSty} ref="content">
					{text}
				</div>
			</div>
		</div>
	},
	methods: {
		refresh() {
			const { content } = this.$refs
			if (content) this.contentWidth = (content as Element).clientWidth
			if (this.$el) this.componentWidth = this.$el.clientWidth
		}
	},
	mounted() {
		this.refresh()
	}
})
