/** @format */

import {ID_SELECTOR_MATCH, CLASS_SELECTOR_MATCH} from './constant'
import {each, type, toKebabCase} from '@/src/utils'

export type Attributes = Record<string, string | null | number | boolean> | Record<'style', Record<string, unknown>>
export interface INode {
    push(parent: Node, child: Node): void
    prev(this: INode, target: Node): Node | null
    next(this: INode, target: Node): Node | null
    remove(this: INode, target: Node): void
    removeAll(this: INode, target: Node): void
    replace(this: INode, oldChild: Node, newChild: Node): Node | null
    insertBefore(this: INode, target: Node, newNode: Node): void
    insertAfter(this: INode, target: Node, newNode: Node): void
    isTextNode(this: INode, node: Node): boolean
    isElement(this: INode, node: Node): boolean
    insertInTextNode(this: INode, target: Node, insertNode: Node, pos: number): void
    insertInNode(this: INode, target: Node, insertNode: Node, pos?: number): void
    isBefore(this: INode, target: Node): boolean
    isAfter(this: INode, target: Node): boolean
    backTracking(this: INode, target: Node, fn: (node: Node) => boolean): Node | boolean
    depTracking(this: INode, target: Node, fn: (node: Node) => boolean): Node | false
    depLast(this: INode, target: Node, fn: (node: Node, index?: number) => boolean): Node | boolean
    query(this: INode, selector: string): Element[]
    attr(this: INode, target: Element, attributes: Attributes | string): string | void

    c(name: string, attrs?: Attributes, children?: (string | Node)[]): Node
    cText(text: string): Node
}

export const INode: INode = {
    push(parent: Node, child: Node): void {
        parent.appendChild(child)
    },
    prev(target: Node): Node | null {
        return target.previousSibling
    },
    next(target: Node): Node | null {
        return target.nextSibling
    },
    remove(target: Node): void {
        target.parentNode && target.parentNode.removeChild(target)
    },
    removeAll(target: Node): void {
        while (target.firstChild) {
            this.remove(target)
        }
    },
    replace(oldChild: Node, newChild: Node): Node | null {
        return oldChild.parentNode && oldChild.parentNode.replaceChild(newChild, oldChild)
    },
    insertBefore(target: Node, newNode: Node): void {
        target.parentNode.insertBefore(newNode, target)
    },
    insertAfter(target: Node, newNode: Node): void {
        const next = this.next(target)
        if (next) {
            target.parentNode.insertBefore(newNode, next)
        } else {
            target.parentNode.appendChild(newNode)
        }
    },
    /**
     * @description 是否为文本节点
     * @param node
     */
    isTextNode(node: Node): boolean {
        return node && node.nodeType === 3
    },
    /**
     * @description 是否为元素节点
     * @param node
     */
    isElement(node: Node): boolean {
        return node && node.nodeType === 1
    },
    /**
     * 在元素节点中插入
     * @param this
     * @param target
     * @param insertNode
     * @param pos
     */
    insertInNode(target: Node, insertNode: Node, pos = 0): void {
        const childNodes = target.childNodes
        if (pos === childNodes.length || childNodes[pos] === undefined) {
            target.appendChild(insertNode)
        } else {
            target.insertBefore(insertNode, childNodes[pos])
        }
    },
    /**
     * 在文本节点中插入
     * @param this
     * @param text
     * @param pos
     */
    insertInTextNode(target: Node, insertNode: Node, pos: number): void {
        const nodeValue = target.nodeValue
        const parentNode = target.parentNode
        const beforeTextNode = document.createTextNode(nodeValue.slice(0, pos))
        const afterTextNode = document.createTextNode(nodeValue.slice(pos))
        parentNode.replaceChild(afterTextNode, target)
        parentNode.insertBefore(insertNode, afterTextNode)
        parentNode.insertBefore(beforeTextNode, insertNode)
    },
    /**
     * 当前节点是否为第一节点
     * @param this
     * @param target
     */
    isBefore(this: INode, target: Node): boolean {
        const parentNode = target.parentNode
        const parentNodeChildNodes = parentNode && parentNode.childNodes
        return parentNodeChildNodes && parentNodeChildNodes[0] === target
    },
    /**
     * 当前节点是否为最后节点
     * @param this
     * @param target
     */
    isAfter(this: INode, target: Node): boolean {
        const parentNode = target.parentNode
        const parentNodeChildNodes = parentNode && parentNode.childNodes
        return parentNodeChildNodes && parentNodeChildNodes[parentNodeChildNodes.length - 1] === target
    },
    /**
     * 回溯父节点
     * @param this
     * @param fn
     */
    backTracking(target: Node, fn: (node: Node) => boolean): Node | boolean {
        if (!target) return false
        const parentNode = target.parentNode
        if (parentNode) {
            if (fn(parentNode)) {
                return parentNode
            } else {
                return this.backTracking(parentNode, fn)
            }
        } else {
            return false
        }
    },
    /**
     * 深度遍历
     * @param target
     * @param fn
     */
    depTracking(target: Node, fn: (node: Node) => boolean): Node | false {
        if (!target || !target.childNodes) return false
        const childNodes = target.childNodes
        const firstNode = childNodes[0]
        if (firstNode) {
            if (fn(firstNode)) {
                return firstNode
            } else {
                return this.depTracking(firstNode, fn)
            }
        } else {
            return false
        }
    },
    /**
     * @description 获取最后一个节点,深度
     * @param this
     * @param target
     * @param fn
     */
    depLast(target: Node, fn: (node: Node, index?: number) => boolean): Node | boolean {
        const childNodes = target && target.childNodes
        if (childNodes) {
            const len = childNodes.length
            const lastIndex = len - 1
            const lastNode = childNodes[lastIndex]
            if (fn(lastNode, lastIndex)) {
                return lastNode
            } else {
                return this.depLast(lastNode, fn)
            }
        } else {
            return false
        }
    },
    /**
     * 查询节点
     * @param selector
     */
    query(selector: string): Element[] {
        const reuslt = []
        if (ID_SELECTOR_MATCH.test(selector)) {
            return [document.getElementById(selector.replace('#', ''))]
        }
        if (CLASS_SELECTOR_MATCH.test(selector)) {
            each<Element>(document.getElementsByClassName(selector.replace('.', '')), node => reuslt.push(node))
            return reuslt
        }
        each<Element>(document.querySelectorAll(selector), node => reuslt.push(node))
        return reuslt
    },
    /**
     * @description 设置属性
     * @param target
     * @param attributes
     */
    attr(target, attributes) {
        if (!target || !target.getAttribute) return
        if (type(attributes) === 'String') {
            return target.getAttribute(attributes as string)
        } else {
            Object.entries(attributes).forEach(([key, value]) => {
                key = toKebabCase(key)
                if (value === null) {
                    target.removeAttribute(key)
                } else {
                    if (key === 'style') {
                        let style = ''
                        Object.entries(value).forEach(([styleKey, styleValue]) => (style += `${toKebabCase(styleKey)}:${styleValue};`))
                        target.setAttribute(key, style)
                    } else {
                        target.setAttribute(key, String(value))
                    }
                }
            })
        }
    },
    /**
     * @description 创建元素
     * @param name
     * @param attrs
     * @param children
     */

    c(name: string, attrs?: Attributes | (string | Node)[], children?: (string | Node)[]): Node {
        const node = document.createElement(name)
        if (type(attrs) === 'Object') {
            Object.keys(attrs).forEach(k => {
                // 类名
                if (k === 'className') return INode.attr(node, {class: attrs[k]})
                // 样式
                if (k === 'style' && typeof attrs[k] === 'object') {
                    let style = ''
                    Object.keys(attrs[k]).forEach(styleKey => (style += `${toKebabCase(styleKey)}:${attrs[k][styleKey]};`))
                    return INode.attr(node, {style})
                }
                try {
                    INode.attr(node, {[toKebabCase(k)]: attrs[k]})
                } catch {}
            })
        }

        if (type(attrs) === 'Array') children = attrs as (string | Node)[]

        if (children)
            each<string | Node>(children, item => {
                if (typeof item === 'string') {
                    node.appendChild(document.createTextNode(item))
                } else {
                    node.appendChild(item)
                }
            })
        return node
    },

    cText(text: string): Node {
        return document.createTextNode(text)
    },
}
