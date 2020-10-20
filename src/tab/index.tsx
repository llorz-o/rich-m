import './index.less'
import { MixinChildren } from '../mixins/relation'
import { createNamespace } from '../utils'

const [createComponent, bem] = createNamespace('tab')

export default createComponent({
	mixins: [MixinChildren('xTabs')],
	props: {
		titleStyle: null,
		title: {
			type: String,
			default: ''
		},
		disable: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isRendered: false,
		}
	},
	computed: {
		show() {
			if (this.parent.scroll) return true
			else return this.parent.currentIndex === this.index
		},
		canRender() {
			if (this.xTabs.lazy) {
				if (this.show) {
					this.isRendered = true
					return true
				}
			} else {
				return true
			}
		},
	},
	render(h) {

		const { show, slots, canRender, isRendered } = this

		const defSlot = isRendered || canRender ? slots() : ''

		if (this.parent.animated && !this.parent.scroll) {
			return (<div class={bem('panel-wrapper', { inactive: !this.show })}>
				<div class={bem('panel')}>
					{defSlot}
				</div>
			</div>)
		}

		return (<div class={bem('panel')} vShow={show}>
			{defSlot}
		</div>)
	}
})
