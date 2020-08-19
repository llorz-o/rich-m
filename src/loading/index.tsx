import './index.less';
import { createNamespace, map, randomColor } from "../utils";

let [createComponent, bem] = createNamespace("loading")

export default createComponent({
	props: {
		color: String,
		size: {
			type: Number,
			default: 15
		},
		duration: {
			type: Number,
			default: 300
		},
		type: {
			type: String,
			default: "circle" // point
		},
		pointNumber: {
			type: [Number, String],
			default: 3
		}
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
		let { type, pointNumber } = this
		let Loading

		switch (type) {
			case "circle":
				Loading = <span class={bem("icon", [type])} style={this.iconStyle}></span>
				break;
			case "point":
				let points
				if (typeof pointNumber === 'string') points = [...pointNumber.split(""), , , ,]
				if (typeof pointNumber === 'number') points = new Array(pointNumber)

				points = map<any>(points, (item, index) => <i key={index} style={{
					width: item !== undefined ? "unset" : '',
					height: item !== undefined ? "unset" : '',
					animationDelay: `${index * 120 + 1000}ms`,
					color: item === undefined ? '' : randomColor(.4),
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
