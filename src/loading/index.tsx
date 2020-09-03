import './index.less';
import { createNamespace, map, randomColor } from "../utils";

const [createComponent, bem] = createNamespace("loading")

export default createComponent({
	props: {
		color: String,
		text: String,
		size: {
			type: Number,
			default: 16
		},
		type: {
			type: String,
			default: "circle" // point
		},
	},
	computed: {
		iconStyle() {
			return {
				borderTopColor: this.color,
				borderRightColor: this.color,
				borderBottomColor: this.color,
				width: `${this.size}px`,
				height: `${this.size}px`,
			}
		}
	},
	render(h) {
		const { type, text } = this
		let Loading

		switch (type) {
			case "circle":
				Loading = [
					text ? <span class={bem("text")}>{text}</span> : "",
					<span class={bem("icon", [type])} style={this.iconStyle}></span>
				]
				break;
			case "point":
				let points = []
				if (text) points = [...text.split("")]
				points.push(...[, , ,])
				points = map(points, (item, index) => <i key={index} style={{
					width: item !== undefined ? "unset" : '',
					height: item !== undefined ? "unset" : '',
					animationDelay: `${index * 120 + 1000}ms`,
					color: item === undefined ? '' : randomColor(1),
					backgroundColor: item !== undefined ? '' : randomColor(.8),
				}} >
					{item !== undefined ? item : ''}
				</i>)

				Loading = <span class={bem("icon", [type])} style={{
					width: `${points.length * 15}px`
				}}>
					{points}
				</span>
				break;
			default:
				break;
		}

		return <div class={bem()}>
			{Loading}
		</div>
	}
})
