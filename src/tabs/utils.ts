import { raf, cancelRaf } from 'u@/index'

let scrollLeftRafId: number
export function scrollLeftTo(scroller: HTMLElement, to: number, duration: number) {
  let count = 0
  let diff = 0
  const from = scroller.scrollLeft
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)
  diff = from
  cancelRaf(scrollLeftRafId)

  function animate() {
    diff += (to - from) / frames
    scroller.scrollLeft = diff

    if (++count < frames) {
      scrollLeftRafId = raf(animate)
    } else {
      scrollLeftRafId = raf(() => (scroller.scrollLeft = to))
    }
  }

  animate()
}
