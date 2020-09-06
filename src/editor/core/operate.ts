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
    // isCurrentLineLastBlock(this: Operate, target: Element): Node | boolean;
    isPLNode(this: Operate, node: Element): boolean
    isTextPLNode(this: Operate, node: Element): boolean
    isBrPLNode(this: Operate, node: Element): boolean
    isTextAndBrPLNode(this: Operate, node: Element): boolean
    changeEmptyNodeState(this: Operate, node: Element)
    changeNodeStateToEmpty(this: Operate, node: Element): void
    createNewLine(): Node
    setColor(color: string): void
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
        const {key, keyCode, which, charCode} = e
        const {currentPointElement, currentPointTextElement, currentPointLineElement, currentPointTextElementIndex, offset} = Point
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
                    const lastTextNode = INode.depLast(previousSibling, node => {
                        return INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0'
                    })
                    each(allPointTextElement, node => previousSibling.appendChild(node))
                    INode.remove(currentPointLineElement)
                    if (lastTextNode) this.setLastTextNodeEffectEndPos(lastTextNode as Node)
                }
                console.log('merge')
            }
            // 当前已经是个空占位元素了,删除当前行
            if (isLast === true) {
                if (previousSibling !== null) {
                    // 前面还有一行
                    INode.remove(currentPointLineElement)
                    const lastTextNode = INode.depLast(previousSibling, node => {
                        return INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0'
                    })
                    if (lastTextNode) this.setLastTextNodeEffectEndPos(lastTextNode as Node)
                }
                console.log('a--')
            }
            e.preventDefault()
            return false
        }

        if (this.isEnterKey(key, keyCode, which, charCode)) {
            if (currentPointTextElementIndex === 0 && currentPointLineElement) {
                if (currentPointLineElement.childNodes.length === 1) {
                    delay(() => {
                        const previousSibling = INode.prev(currentPointLineElement)
                        const oldPointTextElement = previousSibling && previousSibling.childNodes[currentPointTextElementIndex]
                        const oldPointElement = INode.depTracking(oldPointTextElement, node => INode.attr(node as Element, 'data-string') === 'true' || INode.attr(node as Element, 'data-length') === '0')
                        if (oldPointElement) {
                            if (this.isBrPLNode(oldPointElement as Element) || this.isTextAndBrPLNode(oldPointElement as Element)) this.changeNodeStateToEmpty(oldPointElement as Element)
                        }
                        Point.getCursor($editor)
                        Point.point()
                        const {currentPointElement} = Point
                        if (this.isBrPLNode(currentPointElement) || this.isTextAndBrPLNode(currentPointElement)) {
                            this.changeNodeStateToEmpty(currentPointElement)
                            Point.point(1, currentPointElement.childNodes[0])
                        }
                    }, 0)
                }
            }
        }
        return true
    },
    /**
     * 判断当前编辑器是否最后一行
     */
    isEditorLast(): boolean | 'reset' | 'merge' {
        const {currentPointElement, currentPointTextElement, currentPointLineElement, currentPointTextElementIndex, offset} = Point
        if (!currentPointElement) return
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
     * 当前是否为这一行的最后一个节点
     * @param target
     */
    // isCurrentLineLastBlock(this: Operate, target: Element): Node | boolean {
    // 	let currentLine = INode.backTracking(
    // 		target as Node,
    // 		node => node.nodeName === "P"
    // 	);
    // 	// 当前的行节点为哪一个
    // 	if (currentLine) {
    // 		let lastBlock = INode.depTracking(currentLine as Node, node => {
    // 			return (
    // 				node.nodeType === 1 &&
    // 				node.nodeName === "SPAN" &&
    // 				node.childNodes &&
    // 				node.childNodes[0].nodeType !== 1
    // 			);
    // 		});

    // 		return lastBlock;
    // 	}
    // 	return false;
    // },

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

            Point.point(1, onlyoneTextNode)
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
            })
            currentNode.innerHTML = '&#65279;<br>'
        }
    },
    /**
     * 创建新的空行
     */
    createNewLine(): Node {
        return INode.c('p', {dataNode: 'element'}, [INode.c('span', {dataNode: 'text'}, [INode.c('span', {dataLength: 0}, [EMPTY_PL_HTML, INode.c('br')])])])
    },

    setColor(color: string) {
        const {currentPointElement, currentPointTextElement} = Point
        if (INode.attr(currentPointElement, 'data-string') === 'true') {
            // 当前text块已经有值
            INode.insertAfter(currentPointTextElement, INode.c('span', {dataNode: 'text'}, [INode.c('span', {dataLength: 0, [`data-color`]: color}, [EMPTY_PL_HTML, INode.c('br')])]))
        } else {
            INode.attr(currentPointElement, {
                [`data-color`]: color,
            })
        }
    },
}
