import Hammer from 'hammerjs'

import { createNamespace } from 'u@/create'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    isAnimated: Boolean,
    isSwiper: Boolean,
    currentIndex: Number
  },
  data() {
    return {
      isPan: false,
      deltaX: 0,
      contentWidth: 0,
    }
  },
  computed: {
    style() {
      if (this.isAnimated && this.isSwiper && this.isPan) return {
        transitionDuration: '0s',
        transform: `translateX(${Number(Number(this.deltaX) - this.currentIndex * this.contentWidth)}px)`
      }

      if (this.isAnimated) return {
        transitionDuration: '0.3s',
        transform: `translateX(-${this.currentIndex * 100}%)`
      }

      return {}
    }
  },
  render(h) {

    const { slots } = this

    let Content

    if (this.isAnimated || this.isSwiper) {

      Content = (<div class={bem('track')} style={this.style}>
        {slots()}
      </div>)

    } else {
      Content = slots()

    }

    return (<div class={bem('content', { animated: this.isAnimated })} >
      {Content}
    </div>)

  },
  mounted() {
    // 滑动切换
    if (this.isSwiper) {
      let contentContrl = new Hammer(this.$el)

      this.contentWidth = this.$el.clientWidth

      contentContrl.on("pan", e => {
        this.isPan = true
        let { deltaX } = e
        this.deltaX = deltaX
      })

      contentContrl.on("panend", e => {
        this.isPan = false
        if (Math.abs(this.deltaX) > 80) {
          this.$emit("swiper", this.deltaX < 0 ? 1 : -1)
        }
      })
    }

  }
})
