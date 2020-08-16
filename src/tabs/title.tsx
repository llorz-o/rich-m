import { createNamespace } from "../utils";

const [createComponent, bem] = createNamespace('tab')

export default createComponent({
	props: {
		isActive: Boolean,
		isDisable: Boolean,
		scrollable: Boolean,
		swipeThreshold: Number,
		tabsWidth: {
			type: Number,
			default: 0,
		}
	},
	methods: {
		onClick() {
			if (this.isDisable) return
			this.$emit('click')
		}
	},
	render(h) {

		const style = {
			flex: 1,
			flexShrink: null,
			flexBasis: null,
		}

		if (this.scrollable) {
			style.flex = 0
			style.flexShrink = 0
			style.flexBasis = `${88 / this.swipeThreshold}%`
		} else {
			style.flexBasis = `${this.tabsWidth / this.swipeThreshold}%`
		}

		return (<div
			onClick={this.onClick}
			style={style}
			class={bem({
				active: this.isActive && !this.isDisable,
				disable: this.isDisable
			})}>
			{this.slots("title") || <div class={bem('text')}>{this.slots()}</div>}
		</div>)
	}
})
