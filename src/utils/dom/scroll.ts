/** @format */
type ScrollElement = HTMLElement | Window

const REG_OVERFOLLOW_SCROLL = /scroll|auto/i

export function getScroller(el: HTMLElement, root: ScrollElement = window) {
    let node = el

    while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== root) {
        const {overflowY} = window.getComputedStyle(node)

        if (REG_OVERFOLLOW_SCROLL.test(overflowY)) {
            if (node.tagName !== 'BODY') {
                return node
            }

            const {overflowY: htmlOverflowY} = window.getComputedStyle(<Element>node.parentNode)

            if (REG_OVERFOLLOW_SCROLL.test(<string>htmlOverflowY)) {
                return node
            }
        }

        node = <HTMLElement>node.parentNode
    }
}
