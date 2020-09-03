/** @format */

import {INode} from './node'

interface Point {
    range?: Range
    sel?: Selection
    preCaretRange?: Range
    offset?: number

    getCursor(this: Point, element: Element | Window): void
    point(this: Point, pos?: number, targetNode?: Node): void
}

export const Point: Point = {
    // 获取当前 selection range 和cloneRange
    getCursor(element: Element | Window) {
        const doc = (element as Element).ownerDocument || (element as Window).document

        const win = doc.defaultView

        let range, preCaretRange

        const sel = win.getSelection()

        if (sel.rangeCount > 0) {
            range = sel.getRangeAt(0)

            preCaretRange = range.cloneRange()

            this.range = range
            this.sel = sel
            this.preCaretRange = preCaretRange
        } else {
            console.warn('当前无法获取选中区')
        }
    },
    // 获取当前光标点,或设置当前光标点
    point(pos?: number, targetNode?: Node) {
        const {range, preCaretRange} = this

        if (pos === undefined) {
            if (!range || (range && !range.endContainer)) return console.warn('当前range无法获取结束点', range)

            if (INode.isTextNode(range.endContainer)) {
                // 选取结束点的节点内容为当前选择的节点内容
                preCaretRange.selectNodeContents(range.endContainer)
                // 起点默认为 0
                // 设置结束点为当前结束点
                preCaretRange.setEnd(range.endContainer, range.endOffset)
                // 起点到结束点之间的文字长度为当前偏移量
                this.offset = preCaretRange.toString().length
            }

            if (INode.isElement(range.endContainer)) {
                this.offset = range.endOffset
            }
        } else {
            // 设置当前光标位置为目标位置
            const range = document.createRange() //创建一个选中区域
            range.selectNodeContents(targetNode.parentNode) //选中节点的内容
            //设置光标起始为指定位置
            if ((targetNode.parentNode as Element).innerHTML.length > 0) range.setStart(targetNode, pos)

            range.collapse(true) //设置选中区域为一个点
            const selection = window.getSelection() //获取当前选中区域
            selection.removeAllRanges() //移出所有的选中范围
            selection.addRange(range) //添加新建的范围
        }
    },
}
