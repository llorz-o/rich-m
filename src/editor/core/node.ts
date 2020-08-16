import { ID_SELECTOR_MATCH, CLASS_SELECTOR_MATCH } from "./constant";
import { each } from "@/src/utils";

export interface INode {
	isTextNode(node: Node): boolean;
	isElement(node: Node): boolean;
	insertInTextNode(
		this: INode,
		target: Node,
		insertNode: Node,
		pos: number
	): void;
	insertInNode(
		this: INode,
		target: Node,
		insertNode: Node,
		pos: number
	): void;
	isBefore(this: INode, target: Node): boolean;
	isAfter(this: INode, target: Node): boolean;
	backTracking(
		this: INode,
		target: Node,
		fn: (node: Node) => boolean
	): Node | boolean;
	depTracking(
		this: INode,
		target: Node,
		fn: (node: Node) => boolean
	): Node | boolean;
	query(selector: string): Node[];
}

export const INode: INode = {
	isTextNode(node: Node): boolean {
		return node && node.nodeType === 3;
	},
	isElement(node: Node): boolean {
		return node && node.nodeType === 1;
	},
	/**
	 * 在元素节点中插入
	 * @param this
	 * @param target
	 * @param insertNode
	 * @param pos
	 */
	insertInNode(target: Node, insertNode: Node, pos: number): void {
		let childNodes = target.childNodes;

		if (!childNodes[pos])
			return console.error("当前元素不存在下标:", pos, target);

		if (pos === childNodes.length) {
			target.appendChild(insertNode);
		} else {
			target.insertBefore(insertNode, childNodes[pos]);
		}
	},
	/**
	 * 在文本节点中插入
	 * @param this
	 * @param text
	 * @param pos
	 */
	insertInTextNode(target: Node, insertNode: Node, pos: number): void {
		let nodeValue = target.nodeValue;
		let parentNode = target.parentNode;
		let beforeTextNode = document.createTextNode(nodeValue.slice(0, pos));
		let afterTextNode = document.createTextNode(nodeValue.slice(pos));
		parentNode.replaceChild(afterTextNode, target);
		parentNode.insertBefore(insertNode, afterTextNode);
		parentNode.insertBefore(beforeTextNode, insertNode);
	},
	/**
	 * 当前节点是否为第一节点
	 * @param this
	 * @param target
	 */
	isBefore(this: INode, target: Node): boolean {
		let parentNode = target.parentNode;
		let parentNodeChildNodes = parentNode.childNodes;
		return parentNodeChildNodes[0] === target;
	},
	/**
	 * 当前节点是否为最后节点
	 * @param this
	 * @param target
	 */
	isAfter(this: INode, target: Node): boolean {
		let parentNode = target.parentNode;
		let parentNodeChildNodes = parentNode.childNodes;
		return parentNodeChildNodes[parentNodeChildNodes.length - 1] === target;
	},
	/**
	 * 回溯父节点
	 * @param this
	 * @param fn
	 */
	backTracking(target: Node, fn: (node: Node) => boolean): Node | boolean {
		if (!target) return false;
		let parentNode = target.parentNode;
		if (parentNode) {
			if (fn(parentNode)) {
				return parentNode;
			} else {
				return this.backTracking(parentNode, fn);
			}
		} else {
			return false;
		}
	},
	/**
	 * 深度遍历
	 * @param target
	 * @param fn
	 */
	depTracking(target: Node, fn: (node: Node) => boolean): Node | boolean {
		if (!target || !target.childNodes) return false;
		let childNodes = target.childNodes;
		let firstNode = childNodes[0];
		if (firstNode) {
			if (fn(firstNode)) {
				return firstNode;
			} else {
				return this.depTracking(firstNode, fn);
			}
		} else {
			return false;
		}
	},
	/**
	 * 查询节点
	 * @param selector
	 */
	query(selector: string): Node[] {
		let reuslt = [];
		if (ID_SELECTOR_MATCH.test(selector)) {
			return [document.getElementById(selector.replace("#", ""))];
		}
		if (CLASS_SELECTOR_MATCH.test(selector)) {
			each<Element>(
				document.getElementsByClassName(selector.replace(".", "")),
				node => reuslt.push(node)
			);
			return reuslt;
		}
		each<Element>(document.querySelectorAll(selector), node =>
			reuslt.push(node)
		);
		return reuslt;
	}
};
