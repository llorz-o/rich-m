import './index.less';
import { createNamespace } from "../utils";

let [createComponent, bem] = createNamespace("loading")

export default createComponent({
	props: {
		color: String,
		size: Number,
		duration: Number,
	},
	computed: {
		iconStyle() {
			return {
				borderTopColor: this.color,
				borderRightColor: this.color,
				borderBottomColor: this.color,
				width: `${this.size}px`,
				height: `${this.size}px`,
				animationDuration: `${this.duration}ms`
			}
		}
	},
	render(h) {
		return <div class={bem()}>
			<span class={bem("icon")} style={this.iconStyle}></span>
		</div>
	}
})
