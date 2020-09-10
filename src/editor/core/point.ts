/** @format */

import {INode} from './node'
import {each} from '@/src/utils'

export interface IPoint {
    sel?: Selection
    range?: Range
    offset?: number // 光标所在节点的偏移量
    preCaretRange?: Range // 上一个Range
    pointParentElement?: Element // 光标所在元素父节点
    pointNode?: Node // 当前光标所在节点
    pointNodeIndex?: number // 当前光标所在节点下标
    pointElement?: Element // 当前光标所在的元素
    pointElementIndex?: number // 当前光标所在的元素下标
    pointLineElement?: Element // 当前光标所在行元素
    // pointLineElementIndex?: number //  当前光标所在行元素 下标
    commonAncestorContainer?: Node // 当前光标所在节点的共同父节点

    getCursor(this: IPoint, element: Element | Window): void
    point(this: IPoint, pos?: number, targetNode?: Node): void
    getPointElement(this: IPoint): void
}

export const Point: IPoint = {
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
            this.getPointElement()
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
    /**
     * @description 获取当前光标所在位置的元素
     */
    getPointElement(): void {
        if (this.range) {
            const {collapsed, commonAncestorContainer} = this.range
            if (collapsed) {
                this.commonAncestorContainer = commonAncestorContainer
                if (INode.isTextNode(commonAncestorContainer)) {
                    this.pointElement = commonAncestorContainer.parentElement
                    this.pointNode = commonAncestorContainer
                } else {
                    this.pointElement = commonAncestorContainer as Element
                    this.pointNode = null
                }
                this.pointParentElement = this.pointElement.parentNode as Element
                if (this.pointNode) {
                    each(this.pointElement.childNodes, (node, index) => {
                        if (node === this.pointNode) this.pointNodeIndex = index
                    })
                }
                each(this.pointParentElement.childNodes, (node, index) => {
                    if (node === this.pointElement) this.pointElementIndex = index
                })
                this.pointLineElement = INode.backTracking(this.pointElement, node => INode.attr(node as Element, 'data-node') === 'element') as Element
                return
            }
        }
        this.pointParentElement = null
        this.pointElement = null
    },
}
