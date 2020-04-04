import { createNamespace } from "@/utils/create";

const [createComponent, bem] = createNamespace('tab')

export default createComponent({
    props: {
        isActive: Boolean,
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    },
    render(h) {
        return (<div class={bem({
            active: this.isActive
        })} onClick={this.onClick}>
            <div class={bem('text')}>
                {this.slots()}
            </div>
        </div>)
    }
})