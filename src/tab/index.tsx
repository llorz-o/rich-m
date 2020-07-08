import './index.less'
import { createNamespace } from 'u@/create'
import { MixinChildren } from '../mixins/relation'

const [createComponent, bem] = createNamespace('tab')

export default createComponent({
    mixins: [MixinChildren('xTabs')],
    props: {
        title: {
            type: String,
            default: ''
        },
        disable: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        show() {
            if (this.parent.scroll) return true
            else this.parent.currentIndex === this.index
        }
    },
    render(h) {

        let { show, slots } = this

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