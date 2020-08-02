import { INode } from "./node";

interface Point {
	range?: Range;
	sel?: Selection;
	preCaretRange?: Range;
	offset?: number;

	getCursor(this: Point, element: Element | Window): void;
	point(this: Point, pos?: number): void;
}

export const Point: Point = {
	// 获取当前 selection range 和cloneRange
	getCursor(element: Element | Window) {
		let doc =
			(element as Element).ownerDocument || (element as Window).document;

		let win = doc.defaultView;

		let sel, range, preCaretRange;

		sel = win.getSelection();

		if (sel.rangeCount > 0) {
			range = sel.getRangeAt(0);

			preCaretRange = range.cloneRange();

			this.range = range;
			this.sel = sel;
			this.preCaretRange = preCaretRange;
		} else {
			console.warn("当前无法获取选中区");
		}
	},
	// 获取当前光标点,或设置当前光标点
	point(pos?: number) {
		let { range, preCaretRange } = this;

		if (pos === undefined) {
			if (!range || (range && !range.endContainer))
				return console.warn("当前range无法获取结束点", range);

			if (INode.isTextNode(range.endContainer)) {
				// 选取结束点的节点内容为当前选择的节点内容
				preCaretRange.selectNodeContents(range.endContainer);
				// 起点默认为 0
				// 设置结束点为当前结束点
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				// 起点到结束点之间的文字长度为当前偏移量
				this.offset = preCaretRange.toString().length;
			}

			if (INode.isElement(range.endContainer)) {
				this.offset = range.endOffset;
			}
		} else {
		}
	}
};
