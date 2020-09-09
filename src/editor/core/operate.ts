/** @format */

import {PL_MATCH, BR_PL_MATCH, EMPTY_PL_HTML, HAS_PL_MATCH, HAS_BR_PL_MATCH, BR_AND_PL} from './constant'
import {Point} from './point'
import {INode} from './node'
import {each} from '@/src/utils'
import {delay} from '../utils'

export interface Operate {
    setLastTextNodeEffectEndPos(target: Node): void
    isDeleteKey(this: Operate, key: string, keyCode: number, which: number): boolean
    isEnterKey(this: Operate, key: string, keyCode: number, which: number, charCode: number): boolean
    disposeKeydown(this: Operate, e: KeyboardEvent, $editor: Element): boolean
    isEditorLast(this: Operate): boolean | 'reset' | 'merge'
    isLastNode(this: Operate, target: Element): boolean
    isPLNode(this: Operate, node: Element): boolean
    isTextPLNode(this: Operate, node: Element): boolean
    isBrPLNode(this: Operate, node: Element): boolean
    isTextAndBrPLNode(this: Operate, node: Element): boolean
    changeEmptyNodeState(this: Operate, node: Element)
    changeNodeStateToEmpty(this: Operate, node: Element): void
    createNewLine(): {
        element: Node
        text: Node
        string: Node
        pl: Node
        br: Node
    }
    setColor(color: string): void
    insertImage(url: string, $editor: Element): void
    getActiveColor(this: Operate): string | void
}

export const Operate: Operate = {
    setLastTextNodeEffectEndPos(target: Node): void {
        const lastNode = INode.depLast(target, () => true) as Node
        if (lastNode) {
            if (INode.isTextNode(lastNode as Element)) {
                Point.point(lastNode.nodeValue.length, lastNode)
            } else {
                Point.point(target.childNodes.length, target)
            }
        }
    },
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
        Point.getCursor($editor)
        const {key, keyCode, which, charCode} = e
        const {currentPointElement, currentPointLineElement} = Point
        const is_data_emoji = INode.attr(currentPointElement, 'data-emoji') === 'true'

        if (this.isDeleteKey(key, keyCode, which)) {
            const isLast = this.isEditorLast()
            if (!isLast) return true
            // 重写当前元素
            if (isLast === 'reset') this.changeNodeStateToEmpty(Point.currentPointElement)
            const previousSibling = INode.prev(currentPointLineElement)
            // 当前行的头部,与上一行合并,没有上一行则保持不变
            if (isLast === 'merge') {
                if (previousSibling !== null) {
                    // 前面还有一行
                    const allPointTextElement = currentPointLineElement.childNodes
                    const lastTextNode = INode.depLast(previousSibling, node => INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0')
                    each(allPointTextElement, node => previousSibling.appendChild(node))
                    delay(() => {
                        if (lastTextNode) this.setLastTextNodeEffectEndPos(lastTextNode as Node)
                        INode.remove(currentPointLineElement)
                    }, 0)
                }
                console.log('merge')
            }
            // 当前已经是个空占位元素了,删除当前行
            if (isLast === true) {
                if (previousSibling !== null) {
                    // 前面还有一行
                    const lastTextNode = INode.depLast(previousSibling, node => INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0')
                    delay(() => {
                        if (lastTextNode) this.setLastTextNodeEffectEndPos(lastTextNode as Node)
                        INode.remove(currentPointLineElement)
                    }, 0)
                }
                console.log('a--')
            }
            e.preventDefault()
            return false
        }
        if (is_data_emoji) {
            const {currentPointElement} = Point
            const emptySpan = INode.c('span', {dataLength: 0}, [EMPTY_PL_HTML])
            INode.insertAfter(currentPointElement, emptySpan)
            delay(() => {
                Point.point(1, emptySpan)
            }, 0)
        }

        if (this.isEnterKey(key, keyCode, which, charCode)) {
            const {currentPointElement, currentPointTextElement, currentPointLineElement} = Point
            if (currentPointLineElement) {
                delay(() => {
                    // const previousSibling = INode.prev(currentPointLineElement)
                    // const previousSiblingChildNodes = previousSibling.childNodes
                    // const oldPointTextElement = previousSibling && previousSiblingChildNodes[currentPointTextElementIndex]
                    // const oldPointElement = INode.depLast(oldPointTextElement, node => INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0')
                    // if (oldPointElement) {
                    //     if (this.isBrPLNode(oldPointElement as Element) || this.isTextAndBrPLNode(oldPointElement as Element)) {
                    //         if (previousSiblingChildNodes.length === 1) {
                    //             this.changeNodeStateToEmpty(oldPointElement as Element)
                    //         } else {
                    //             INode.remove(oldPointTextElement)
                    //         }
                    //     }
                    // }
                    const data_length = INode.attr(currentPointElement, 'data-length')
                    if (data_length === '0') {
                        if (currentPointTextElement.childNodes.length === 1) {
                            this.changeNodeStateToEmpty(currentPointElement as Element)
                        } else {
                            INode.remove(currentPointElement)
                        }
                    }

                    Point.getCursor($editor)
                    Point.point()
                    const {currentPointElement: newCurrentPointElement} = Point
                    if (this.isBrPLNode(newCurrentPointElement) || this.isTextAndBrPLNode(newCurrentPointElement)) {
                        this.changeNodeStateToEmpty(newCurrentPointElement)
                        Point.point(1, newCurrentPointElement.childNodes[0])
                    }
                }, 0)
            }
        }
        return true
    },
    /**
     * 判断当前编辑器是否最后一行
     */
    isEditorLast(): boolean | 'reset' | 'merge' {
        const {currentPointElement, pointParentElement, currentPointLineElement, currentPointTextElementIndex, offset} = Point
        if (!currentPointElement) return
        if (pointParentElement.childNodes.length === 1) {
            if (INode.attr(currentPointElement, 'data-emoji') === 'true') {
                return 'reset'
            }
            if (INode.attr(currentPointElement, 'data-length') === '0') {
                return true
            } else if (currentPointTextElementIndex === 0 && offset === 0) {
                return 'merge'
            }
            if (INode.attr(currentPointElement, 'data-string') === 'true') {
                if (currentPointLineElement && currentPointLineElement.childNodes.length === 1) {
                    const currentPointElementChildNodes = currentPointElement.childNodes
                    if (currentPointElementChildNodes.length === 1) {
                        const lastNode = currentPointElementChildNodes[0]
                        if (!INode.isTextNode(lastNode)) return 'reset'
                        if (lastNode.nodeValue.length === 1) return 'reset'
                    }
                }
            }
        }
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

        if (node && INode.attr(node, 'data-length') === '0') {
            each(currentNode.childNodes, node => {
                if (!INode.isTextNode(node as Element)) currentNode.removeChild(node)
            })
            const innerText = currentNode.innerText
            currentNode.innerText = innerText.replace(HAS_PL_MATCH, '')
            const onlyoneTextNode = currentNode.childNodes[0]

            Point.point(currentNode.innerText.length, onlyoneTextNode)
            INode.attr(currentNode as Element, {
                'data-length': null,
                'data-string': true,
            })
        }
    },
    /**
     * 当前节点改为空占位
     * @param node
     */
    changeNodeStateToEmpty(this: Operate, node: Element): void {
        const currentNode: HTMLElement = node as HTMLElement
        if (currentNode) {
            INode.attr(currentNode, {
                'data-length': 0,
                'data-string': null,
                'data-emoji': null,
            })
            currentNode.innerHTML = '&#65279;<br>'
        }
    },
    /**
     * 创建新的空行
     */
    createNewLine(): {
        element: Node
        text: Node
        string: Node
        pl: Node
        br: Node
    } {
        const br = INode.c('br')
        const pl = INode.cText(EMPTY_PL_HTML)
        const string = INode.c('span', {dataLength: 0}, [pl, br])
        const text = INode.c('span', {dataNode: 'text'}, [string])
        const element = INode.c('p', {dataNode: 'element'}, [text])

        return {
            element,
            text,
            string,
            br,
            pl,
        }
    },
    /**
     * 创建新的色块
     * @param color
     */
    setColor(color: string) {
        const {currentPointElement, commonAncestorContainer, offset} = Point
        const data_string = INode.attr(currentPointElement, 'data-string')
        const data_color = INode.attr(currentPointElement, 'data-color') as string
        if (data_string === 'true' && data_color !== color) {
            // 当前text块已经有值
            if (INode.isTextNode(commonAncestorContainer)) {
                // 当前为文本节点
                const nodeValue = commonAncestorContainer.nodeValue
                const stringSpan = INode.c('span', {dataLength: 0, [`data-color`]: color}, [EMPTY_PL_HTML])
                if (nodeValue.length === offset) {
                    // 在结尾位置
                    INode.insertAfter(currentPointElement, stringSpan)
                }
                if (offset === 0) {
                    // 当前在节点头
                    INode.insertBefore(currentPointElement, stringSpan)
                }
                if (nodeValue.length > offset && offset > 0) {
                    // 将当前节点分割
                    const before_text = nodeValue.slice(0, offset)
                    const after_text = nodeValue.slice(offset)

                    const beforePointElement = INode.c('span', {dataString: true, [`data-color`]: data_color}, [before_text])
                    const afterPointElement = INode.c('span', {dataString: true, [`data-color`]: data_color}, [after_text])

                    INode.replace(currentPointElement, afterPointElement)
                    INode.insertBefore(afterPointElement, stringSpan)
                    INode.insertBefore(stringSpan, beforePointElement)
                }
                Point.point(1, stringSpan)
            } else {
                // 当前不是一个文本节点
            }
        } else {
            INode.attr(currentPointElement, {
                [`data-color`]: color,
            })
            Point.point(offset, commonAncestorContainer)
        }
    },
    /**
     * 获取当前激活的颜色
     */
    getActiveColor(): string | void {
        const {currentPointElement} = Point
        return currentPointElement && INode.attr(currentPointElement, 'data-color')
    },
    insertImage(url: string, $editor: Element): void {
        const {currentPointElement, commonAncestorContainer, offset} = Point
        const data_string = INode.attr(currentPointElement, 'data-string')
        const is_data_emoji = INode.attr(currentPointElement, 'data-emoji') === 'true'
        const data_color = INode.attr(currentPointElement, 'data-color') as string
        const image = INode.c('img', {src: url})
        const imageSpan = INode.c('span', {dataEmoji: true}, [image])
        const stringSpan = INode.c('span', {dataLength: 0}, [EMPTY_PL_HTML])
        if (data_string === 'true' || is_data_emoji) {
            if (is_data_emoji) {
                // 当前为表情
                INode.insertAfter(currentPointElement, imageSpan)
                INode.insertAfter(imageSpan, stringSpan)
                Point.point(1, stringSpan)
            }
            // 当前text块已经有值
            else if (INode.isTextNode(commonAncestorContainer)) {
                // 当前为文本节点
                const nodeValue = commonAncestorContainer.nodeValue
                if (nodeValue.length > offset && offset > 0) {
                    // 将当前节点分割
                    const before_text = nodeValue.slice(0, offset)
                    const after_text = nodeValue.slice(offset)
                    const beforePointElement = INode.c('span', {dataString: true, dataColor: data_color}, [before_text])
                    const afterPointElement = INode.c('span', {dataString: true, dataColor: data_color}, [after_text])
                    INode.replace(currentPointElement, afterPointElement)
                    INode.insertBefore(afterPointElement, imageSpan)
                    INode.insertBefore(imageSpan, beforePointElement)
                    INode.insertAfter(imageSpan, stringSpan)
                    Point.point(1, stringSpan)
                } else {
                    INode.insertAfter(currentPointElement, imageSpan)
                    INode.insertAfter(imageSpan, stringSpan)
                    Point.point(1, stringSpan)
                }
            }
        } else {
            INode.attr(currentPointElement, {
                dataString: null,
                dataEmoji: true,
            })
            currentPointElement.innerHTML = ''
            INode.push(currentPointElement, image)
            INode.insertAfter(currentPointElement, stringSpan)
            Point.point(1, stringSpan)
        }
        Point.getCursor($editor)
        Point.point()
    },
}
