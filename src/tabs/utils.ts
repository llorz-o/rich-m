/** @format */

import {raf, cancelRaf} from '../utils'

let scrollLeftRafId: number
export function scrollLeftTo(scroller: HTMLElement, to: number, duration: number): void {
    let count = 0,
        diff = 0

    const from = scroller.scrollLeft,
        frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)

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

let scrollTopRafId: number
export function scrollTopTo(scroller: HTMLElement, to: number, duration: number): void {
    let count = 0,
        diff = 0

    const from = scroller.scrollTop,
        frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)

    diff = from

    cancelRaf(scrollTopRafId)

    function animate() {
        diff += (to - from) / frames
        scroller.scrollTop = diff

        if (++count < frames) {
            scrollTopRafId = raf(animate)
        } else {
            scrollTopRafId = raf(() => (scroller.scrollTop = to))
        }
    }

    animate()
}
