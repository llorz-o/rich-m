import './index.less';
import { createNamespace, map } from "../utils";
const [createComponent, bem] = createNamespace("calendar")

export default createComponent({
	props: {
		days: {
			type: Array,
			default: () => []
		},
		currentMonth: String
	},
	render(h) {
		return <div class={bem("panel-content")}>
			{map<{ year, month, day }, Vue>(this.days, day => {
				return this.slots("default", { ...day, currentMonth: this.currentMonth })
					||
					<div class={bem("day", { "to-month": day.month + 1 === Number(this.currentMonth) })}>
						{day.day}
					</div>
			})}
		</div>
	}
})
