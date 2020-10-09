/** @format */

import {PL_MATCH, BR_PL_MATCH, EMPTY_PL_HTML, BR_AND_PL, HAS_PL_MATCH} from './constant'
import {Point} from './point'
import {INode} from './node'
import {each, GET_TYPE} from '@/src/utils'
import {delay} from '../../utils'

export interface Operate {
    isFocus: boolean
    activeColor?: string
    emptyNode?: Node
    emptyWeakMap: WeakMap<Node | Element | HTMLElement, any>

    isDeleteKey(this: Operate, key: string, keyCode: number, which: number): boolean
    isEnterKey(this: Operate, key: string, keyCode: number, which: number, charCode: number): boolean
    disposeKeydown(this: Operate, e: KeyboardEvent, $editor: Element): boolean
    disposeDelete(this: Operate, $editor: Element): boolean
    isLastNode(this: Operate, target: Element): boolean
    isPLNode(this: Operate, node: Element): boolean
    isTextPLNode(this: Operate, node: Element): boolean
    isBrPLNode(this: Operate, node: Element): boolean
    isTextAndBrPLNode(this: Operate, node: Element): boolean
    changeEmptyNodeState(this: Operate, node: Element)
    changeNodeStateToEmpty(this: Operate, node: Element): void
    createNewLine(): {
        element: Node
        br: Node
    }
    setColor(this: Operate, color: string): void
    insertImage(this: Operate, url: string, $editor: Element): void
    getActiveColor(this: Operate): string | void
    checkEmptyNode(this: Operate): void
}

export const Operate: Operate = {
    isFocus: false,
    activeColor: null,
    emptyNode: null,
    emptyWeakMap: new WeakMap(),
    /**
     * 当前是否删除键
     */
    isDeleteKey(key: string, keyCode: number, which: number): boolean {
        return key === 'Backspace' || keyCode === 8 || which === 8
    },
    /**
     * 当前是否回车键
     */
    isEnterKey(key: string, keyCode: number, which: number, charCode: number): boolean {
        return charCode === 13 || key === 'Enter' || keyCode === 13 || which === 13
    },
    /**
     * 处理键盘特殊键入
     */
    disposeKeydown(e: KeyboardEvent, $editor: Element): boolean {
        const {pointElement} = Point
        if (this.emptyWeakMap.has(pointElement)) this.changeEmptyNodeState(pointElement as Element)
        return true
    },
    /**
     * 处理删除按钮
     */
    disposeDelete(): boolean {
        return false
    },
    /**
     * 目标节点是否只有唯一子节点
     * @param this
     * @param target
     */
    isLastNode(this: Operate, target: Element): boolean {
        return target.childNodes && target.childNodes.length === 1
    },
    /**
     * 判断当前节点是否为空占位节点
     * @param node
     */
    isPLNode(node: Element): boolean {
        return this.isTextPLNode(node) || this.isBrPLNode(node)
    },
    /**
     * 当前是否为文字占位节点
     * @param node
     */
    isTextPLNode(node: Element): boolean {
        return PL_MATCH.test(node.innerHTML)
    },
    /**
     * 当前是否为br换行节点
     * @param node
     */
    isBrPLNode(node: Element): boolean {
        return BR_PL_MATCH.test(node.innerHTML)
    },
    /**
     * 当前为 空字符 且 br 换行的占位节点
     * @param node
     */
    isTextAndBrPLNode(this: Operate, node: Element): boolean {
        return BR_AND_PL.test(node.innerHTML)
    },
    /**
     * 改变空节点状态为非空
     * @param node
     */
    changeEmptyNodeState(this: Operate, node: Element) {
        const currentNode: HTMLElement = node as HTMLElement
        each(node.childNodes, childNode => {
            if (INode.isTextNode(childNode)) {
                delay(() => {
                    if (!PL_MATCH.test(childNode.nodeValue)) {
                        const innerText = currentNode.innerText
                        currentNode.innerText = innerText.replace(HAS_PL_MATCH, '')
                        const onlyoneTextNode = currentNode.childNodes[0]
                        Point.point(currentNode.innerText.length, onlyoneTextNode)
                        this.emptyWeakMap.delete(node)
                        this.emptyNode = null
                    }
                }, 0)
            }
        })
    },
    /**
     * 当前节点改为空占位
     * @param node
     */
    changeNodeStateToEmpty(this: Operate, node: Element): void {
        //
    },
    /**
     * 创建新的空行
     */
    createNewLine(): {
        element: Node
        br: Node
    } {
        const br = INode.c('br')
        const element = INode.c('p', {dataNode: 'element'}, [br])

        return {
            element,
            br,
        }
    },
    /**
     * 创建新的色块
     * @param color
     */
    setColor(color: string) {
        const {pointElement, pointNode, offset} = Point
        const textNode = INode.cText(EMPTY_PL_HTML)
        const colorSpan = INode.c(
            'span',
            {
                color: '',
                style: {
                    color,
                },
            },
            [textNode],
        )
        const is_not_color = INode.attr(pointElement, 'color') === null
        if (this.isBrPLNode(pointElement)) {
            if (is_not_color) {
                const colorSpan = INode.c(
                    'span',
                    {
                        color: '',
                        style: {
                            color,
                        },
                    },
                    [INode.c('br')],
                )

                INode.removeAll(pointElement)
                INode.push(pointElement, colorSpan)

                this.emptyWeakMap.set(colorSpan, true)
                this.emptyNode = colorSpan
                this.activeColor = color
                Point.point(0, colorSpan)
            } else {
                INode.attr(pointElement, {
                    style: {
                        color,
                    },
                })
                Point.point(1, pointElement)
            }
        } else {
            if (pointNode && INode.isTextNode(pointNode)) {
                if (this.isTextPLNode(pointElement)) {
                    INode.replace(pointElement, colorSpan)
                } else if (pointNode.nodeValue.length === offset) {
                    // 尾部
                    INode.insertAfter(is_not_color ? pointNode : pointElement, colorSpan)
                } else if (offset === 0) {
                    // 头插
                    INode.insertBefore(is_not_color ? pointNode : pointElement, colorSpan)
                } else {
                    // 中插
                    const old_text = pointNode.nodeValue
                    const before_text = old_text.slice(0, offset)
                    const after_text = old_text.slice(offset)
                    let beforeNode = pointElement.cloneNode(true) as Element
                    let afterNode = pointElement.cloneNode(true) as Element
                    INode.removeAll(beforeNode)
                    INode.removeAll(afterNode)
                    if (is_not_color) {
                        beforeNode = INode.cText(before_text) as Element
                        afterNode = INode.cText(after_text) as Element
                        INode.replace(pointNode, afterNode)
                        INode.insertBefore(afterNode, colorSpan)
                        INode.insertBefore(colorSpan, beforeNode)
                    } else {
                        INode.push(beforeNode, INode.cText(before_text))
                        INode.push(afterNode, INode.cText(after_text))
                        INode.replace(pointElement, afterNode)
                        INode.insertBefore(afterNode, colorSpan)
                        INode.insertBefore(colorSpan, beforeNode)
                    }
                }
                this.emptyWeakMap.set(colorSpan, true)
                this.emptyNode = colorSpan
                this.activeColor = color
                Point.point(1, textNode)
            } else {
                console.warn(`pointNode:[${pointNode}]不是一个文本节点`)
            }
        }
    },
    /**
     * 获取当前激活的颜色
     */
    getActiveColor(): string | void {
        //
    },
    insertImage(url: string, $editor: Element): void {
        //
    },
    /**
     * 检查失去焦点前的空节点
     */
    checkEmptyNode(): void {
        const {pointElement} = Point
        if (this.emptyNode && pointElement !== this.emptyNode) {
            // const elementNode = INode.backTracking(this.emptyNode, node => INode.attr(node as Element, 'data-node') === 'element')
            const preventNode = INode.prev(this.emptyNode)
            const nextNode = INode.next(this.emptyNode)
            if (!preventNode && !nextNode) return
            INode.remove(this.emptyNode)
            this.emptyNode = null
        }
    },
}
