import { createNamespace } from '@/utils/create'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    animated: Boolean,
    currentIndex: Number
  },
  data() {
    return {
    }
  },
  computed: {
    style() {
      if (this.animated) {
        return {
          transitionDuration: '0.3s',
          transform: `translateX(-${this.currentIndex * 100}%)`
        }
      }
      return {}
    }
  },
  render(h) {

    const { slots } = this

    const getContent = () => {
      if (this.animated) {
        return (<div class={bem('track')} style={this.style}>
          {slots()}
        </div>)
      }
      return slots()
    }


    return (<div class={bem('content', { animated: this.animated })} >
      {getContent()}
    </div>)
  }
})
