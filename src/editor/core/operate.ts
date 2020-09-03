/** @format */

import {PL_MATCH, BR_PL_MATCH, EPMTY_PLACEHOLDER, EMPTY_PL_HTML, HAS_PL_MATCH, HAS_BR_PL_MATCH} from './constant'
import {delay} from '../utils'
import {Point} from './point'
import {INode} from './node'
import {each} from '@/src/utils'

export interface Operate {
    isDeleteKey(this: Operate, key: string, keyCode: number, which: number): boolean
    isEnterKey(this: Operate, key: string, keyCode: number, which: number, charCode: number): boolean
    disposeKeydown(this: Operate, e: KeyboardEvent, $editor: Element): void
    isEditorLast(this: Operate, $editor: Element): boolean
    isLastNode(this: Operate, target: Element): boolean
    // isCurrentLineLastBlock(this: Operate, target: Element): Node | boolean;
    isPLNode(this: Operate, node: Element): boolean
    isTextPLNode(this: Operate, node: Element): boolean
    isBrPLNode(this: Operate, node: Element): boolean
    isTextAndBrPLNode(this: Operate, node: Element): boolean
    changeEmptyNodeState(this: Operate, node: Element)
    changeNodeStateToEmpty(this: Operate, node: Element): void
}

export const Operate: Operate = {
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
    disposeKeydown(e: KeyboardEvent, $editor: Element): void {
        const {charCode, key, keyCode, which} = e
        Point.getCursor($editor)
        Point.point()
        if (this.isDeleteKey(key, keyCode, which)) {
            if (this.isEditorLast($editor)) {
                e.preventDefault()
                e.stopPropagation()
            }
            return
        }
        if (this.isEnterKey(key, keyCode, which, charCode)) {
            delay(() => {
                INode.query('span[data-length]').forEach(node => {
                    if (this.isBrPLNode(node as Element)) {
                        INode.insertInNode(node, document.createTextNode(EMPTY_PL_HTML), 0)
                    }
                })
                INode.query("span[data-string='true']").forEach(node => {
                    if (this.isBrPLNode(node as Element)) {
                        INode.insertInNode(node, document.createTextNode(EMPTY_PL_HTML), 0)
                        ;(node as Element).removeAttribute('data-string')
                        ;(node as Element).setAttribute('data-length', '0')
                    }
                })
            }, 0)
            return
        }

        // 当前为编辑
        INode.backTracking(Point.range.endContainer, node => {
            // todo end point
            // return node.nodeName === 'SPAN' && (node as Element).getAttribute()
            return false
        })
    },
    /**
     * 判断当前编辑器是否最后一行
     */
    isEditorLast($editor: Element): boolean {
        if (this.isLastNode($editor)) {
            const lastLine = $editor.childNodes[0]
            if (this.isLastNode(lastLine as Element)) {
                const lastBlock = lastLine.childNodes[0]
                if (this.isLastNode(lastBlock as Element)) {
                    const lastSpan = lastBlock.childNodes[0]
                    return (lastSpan as Element).getAttribute('data-length') === '0'
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
        return HAS_PL_MATCH.test(node.innerHTML) && HAS_BR_PL_MATCH.test(node.innerHTML)
    },
    /**
     * 改变空节点状态为非空
     * @param node
     */
    changeEmptyNodeState(this: Operate, node: Element) {
        let currentNode: Node = node

        if (INode.isTextNode(node)) currentNode = node.parentNode
        if (!currentNode || !currentNode.childNodes) return
        each<Node>(currentNode.childNodes, node => {
            if (INode.isTextNode(node)) {
                const nodeValue = node.nodeValue

                currentNode.replaceChild(document.createTextNode(nodeValue.replace(HAS_PL_MATCH, '')), node)
            }
            if (INode.isElement(node)) {
                if (node.nodeName === 'BR') {
                    // 移除子元素 br
                    currentNode.removeChild(node)
                }
            }
        })
        ;(currentNode as Element).removeAttribute('data-length')
        ;(currentNode as Element).setAttribute('data-string', 'true')
    },
    /**
     * 当前节点改为空占位
     * @param node
     */
    changeNodeStateToEmpty(this: Operate, node: Element): void {
        let currentNode: Node = node
        if (INode.isTextNode(node)) currentNode = node.parentNode
        if (!currentNode || !currentNode.childNodes) return
        // 当前节点清空置为占位节点
        const firstNode = currentNode.childNodes[0]
        if (firstNode) currentNode.removeChild(firstNode)
        currentNode.appendChild(document.createTextNode(EMPTY_PL_HTML))
        currentNode.appendChild(document.createElement('br'))
        ;(currentNode as Element).removeAttribute('data-string')
        ;(currentNode as Element).setAttribute('data-length', '0')
    },
}
