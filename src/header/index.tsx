import { createNamespace } from "../utils";
import "./index.less";

const [createComponent, b] = createNamespace("header")

export default createComponent({
	props: {
		title: String,
		leftText: String,
		clickLeft: Function,
		clickRight: Function
	},
	render(h) {

		const { slots, title, leftText, rightText } = this

		const slotLeft = slots("left")
		const slotCenter = slots("center")
		const slotRight = slots("right")

		return <div class={[b(), "rich-hairline--bottom"]}>
			<div class={b("left")} onClick={this.onClickLeft}>
				{leftText || slotLeft}
			</div>
			<div class={b("center")}>
				{title || slotCenter}
			</div>
			<div class={b("right")} onClick={this.onClickRight}>
				{rightText || slotRight}
			</div>
		</div>
	},
	methods: {
		onClickLeft() {
			const { clickLeft } = this
			clickLeft ? clickLeft() : this.$emit("click-left")
		},
		onClickRight() {
			const { clickRight } = this
			clickRight ? clickRight() : this.$emit("click-right")
		}
	}
})
