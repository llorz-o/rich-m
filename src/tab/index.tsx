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
	computed: {
		show() {
			if (this.parent.scroll) return true
			else return this.parent.currentIndex === this.index
		}
	},
	render(h) {

		const { show, slots } = this

		if (this.parent.animated && !this.parent.scroll) {
			return (<div class={bem('panel-wrapper', { inactive: !this.show })}>
				<div class={bem('panel')}>
					{slots()}
				</div>
			</div>)
		}

		return (<div class={bem('panel')} vShow={show}>
			{slots()}
		</div>)
	}
})
