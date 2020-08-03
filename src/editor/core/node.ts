export interface INode {
	isTextNode(node: Node): boolean;
	isElement(node: Node): boolean;
}

export const INode: INode = {
	isTextNode(node: Node): boolean {
		return node && node.nodeType === 3;
	},
	isElement(node: Node): boolean {
		return node && node.nodeType === 1;
	}
};
