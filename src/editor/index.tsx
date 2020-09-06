import './index.less'
import { createNamespace } from '../utils'
import { delay } from './utils';
import { Point } from './core/point';
import { Operate, Editor } from './core';
const [createComponent, bem] = createNamespace("editor")
/**
 * &#65279; 空占位符
 * const PL = /^\ufeff$/; 匹配空占位
 * const HAS_PL = /\ufeff/g;
 */
const HAS_PL = /\ufeff/g;
const PL = /^\ufeff$/; // 匹配空占位
const ALL_PL = /^(\ufeff)+$/ // 匹配全部
const ACTIVE_CLASS_NAME = "cursor_anchor"

export default createComponent({
	render(h) {
		return <div>
			<button onClick={() => this.setColor('black')}>black</button>
			<div id="editor"></div>
		</div>
	},
	data() {
		return {
			editor: null
		}
	},
	methods: {
		onInput(e) {
			// e.inputType = insertParagraph(回车) | insertText | deleteContentBackward(删除)
			console.log('input event', e);
			Point.getCursor(this.$el)
			Point.point()
			// this.getCursortPosition(({
			// 	isText,
			// 	parentNode,
			// }) => {
			// 	// tag inffective tag
			// 	if (isText) {
			// 		this.addClass(parentNode, 'text-tag')
			// 		this.removeClass(parentNode, 'insert-ph')
			// 	}
			// })
		},
		onFocus(e) {
			console.log('focus event', e);
			delay(() => {
				Point.getCursor(this.$el)
				Point.point()
			}, 0)

			// setTimeout(() => this.getCursortPosition(), 50);

		},
		onChange(e) {
			console.log("change event", e);

		},
		onBlur(e) {
			console.log("blur event", e);
		},
		onClick(e) {
			console.log('click event', e);
			// this.getCursortPosition(({
			// 	isText,
			// 	parentNode,
			// 	currentNode
			// }) => {
			// 	let _currentNode = isText ? parentNode : currentNode
			// 	let inser_ph_list = document.getElementsByClassName("insert-ph")
			// 	each<Node>(inser_ph_list, node => {
			// 		if (node !== _currentNode) node && node.parentNode.removeChild(node)
			// 	})
			// 	this.insertStyleBLock(this.currentActiveId)
			// })
		},
		onTouchstart(e) {
			console.log('touchstart event', e);

		},
		onKeydown(e) {
			Operate.disposeKeydown(e, this.$el)
			// this.getCursortPosition()
			// if ((this.$el as HTMLElement).innerText.indexOf(this.editorContent) < 0) {
			// 	let lastColumn = this.createBlock('span', {
			// 		className: "column cursor_anchor last-column",
			// 		style: this.registerColorMap[this.currentActiveId],
			// 		dataStyId: this.currentActiveId,
			// 	}, ["\ufeff"])

			// 		; (this.$el as HTMLElement).innerText = ''
			// 	this.$el.appendChild(this.createBlock('div', {
			// 		className: "row last-row",
			// 	}, [
			// 		lastColumn
			// 	]))
			// 	e.preventDefault()
			// }
		},
		onKeyup(e) {
			console.log("keyup event", e);
			delay(() => {
				Point.getCursor(this.$el)
				Point.point()
			}, 0)
			// 当前节点为span 节点且子节点只有 br
		},
		// // insertimage
		// insertImage(url, attrs = {}) {
		// 	// let imageBlock = this.createBlock('span', {
		// 	// 	className: "column insert-image",
		// 	// 	style: this.registerColorMap[this.currentActiveId],
		// 	// 	dataStyId: this.currentActiveId,
		// 	// }, [
		// 	// 	"\ufeff",
		// 	// 	this.createBlock('img', {
		// 	// 		src: url,
		// 	// 		className: "column img",
		// 	// 		...attrs
		// 	// 	}),
		// 	// 	"\ufeff"
		// 	// ])
		// 	// let carseNode = imageBlock.childNodes[2]
		// 	// this.insertBlock(imageBlock, 1, carseNode)

		// 	let imageBlock = this.createBlock("span", {
		// 		className: "column insert-image",
		// 		style: this.registerColorMap[this.currentActiveId],
		// 		dataStyId: this.currentActiveId,
		// 	}, [
		// 		this.createBlock('span', {
		// 			className: "image-block",
		// 			contenteditable: "false"
		// 		}, [
		// 			this.createBlock('img', {
		// 				src: url,
		// 				className: "image",
		// 				...attrs
		// 			})
		// 		]),
		// 		"\ufeff"
		// 	])
		// 	this.insertBlock(imageBlock)
		// 	this.setCurrentCaretPosition(imageBlock, 1, imageBlock.childNodes[1])
		// },
		// // 注册样式
		// registerColor(id, style = {}) {
		// 	this.currentActiveId = id
		// 	this.registerColorMap[id] = style
		// 	this.insertStyleBLock(id)
		// },
		// // 注册字体
		// registreFont(id, style = {}) {

		// },
		// // 插入样式块,为当前激活样式
		// insertStyleBLock(id) {
		// 	let insertTag = this.createBlock('span', {
		// 		className: "column insert-ph",
		// 		style: this.registerColorMap[id],
		// 		dataStyId: id,
		// 	}, ["\ufeff"])

		// 	this.insertBlock(insertTag)
		// 	this.setCurrentCaretPosition(insertTag, 1)
		// },
		// // 插入
		// insertBlock(insertTag) {
		// 	let { isBrBlock, isText, textNodeValue, parentNodeIsPlaceholder, anchor, currentNode, parentNode, targetDOM } = this.anchorInfo
		// 	// 当前节点是一个空br节点
		// 	if (isBrBlock && !parentNodeIsPlaceholder) {
		// 		parentNode.replaceChild(insertTag, parentNode.childNodes[0])
		// 	}
		// 	// 失去焦点前的最后一个dom节点是个占位节点
		// 	if (parentNodeIsPlaceholder) {
		// 		targetDOM.parentNode.replaceChild(insertTag, targetDOM)
		// 	}
		// 	// 当前为文字节点且父节点不是一个占位节点
		// 	if (isText && !parentNodeIsPlaceholder) {


		// 		// 为当前文本节点尾部
		// 		if (textNodeValue.length === anchor) {
		// 			// 当前节点是否存在下一个节点
		// 			if (currentNode.nextSibling) {
		// 				parentNode.insertBefore(insertTag, currentNode.nextSibling)
		// 			} else {
		// 				parentNode.appendChild(insertTag)
		// 			}
		// 		} else {
		// 			// 当前节点中间或是起始位
		// 			let beforeTextNode = document.createTextNode(textNodeValue.slice(0, anchor))
		// 			let afterTextNode = document.createTextNode(textNodeValue.slice(anchor))
		// 			try {
		// 				parentNode.replaceChild(afterTextNode, currentNode)
		// 				parentNode.insertBefore(insertTag, afterTextNode)
		// 				parentNode.insertBefore(beforeTextNode, insertTag)
		// 			} catch (e) {
		// 				console.error(`节点插入失败,当前节点[[${textNodeValue}]],父节点[[${parentNode}]]`);
		// 			}

		// 		}


		// 	}
		// },
		// // 创建块
		// createBlock(name: string, attrs = {}, children?: (string | Node)[]) {
		// 	let node = document.createElement(name)
		// 	Object.keys(attrs).forEach(k => {
		// 		// 类名
		// 		if (k === 'className') return node.setAttribute("class", attrs[k])
		// 		// 样式
		// 		if (k === 'style' && typeof attrs[k] === 'object') {
		// 			let style = ''
		// 			Object.keys(attrs[k]).forEach(styleKey => style += `${toKebabCase(styleKey)}:${attrs[k][styleKey]};`)
		// 			return node.setAttribute("style", style)
		// 		}
		// 		try {
		// 			node.setAttribute(toKebabCase(k), attrs[k])
		// 		} catch { }
		// 	})
		// 	if (children) each<string | Node>(children, (item) => {

		// 		if (typeof item === 'string') {
		// 			node.appendChild(document.createTextNode(item))
		// 		} else {
		// 			node.appendChild(item)
		// 		}

		// 	})
		// 	return node
		// },
		// // 设置当前光标锚点所在为的光标位置
		// setCurrentCaretPosition(cursor_anchor, pos = 0, carseNode) {
		// 	cursor_anchor = cursor_anchor || (document.getElementsByClassName('cursor_anchor') || [])[0]
		// 	if (cursor_anchor) {
		// 		setTimeout(() => {
		// 			(this.$el as HTMLElement).focus()
		// 			this.setCaretPosition(cursor_anchor, pos, carseNode)
		// 		}, 0);
		// 	}
		// 	this.getCursortPosition()
		// },
		// // 设置光标位置
		// setCaretPosition(element, pos, carseNode) {
		// 	var range, selection;
		// 	range = document.createRange(); //创建一个选中区域
		// 	range.selectNodeContents(element); //选中节点的内容
		// 	if (element.innerHTML.length > 0) {
		// 		range.setStart(carseNode || element.childNodes[0], pos); //设置光标起始为指定位置
		// 	}
		// 	range.collapse(true); //设置选中区域为一个点
		// 	selection = window.getSelection(); //获取当前选中区域
		// 	selection.removeAllRanges(); //移出所有的选中范围
		// 	selection.addRange(range); //添加新建的范围
		// },
		// // 获取光标位置
		// getCursortPosition(fn = () => { }) {
		// 	setTimeout(() => {
		// 		let caretOffset = 0;
		// 		let [sel, range, preCaretRange] = this.cursorAdaptor(this.$el)

		// 		if (sel) { //选中的区域
		// 			preCaretRange.selectNodeContents(range.endContainer); //设置选中区域的节点内容为当前节点
		// 			preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
		// 			caretOffset = preCaretRange.toString().length;
		// 		} else {
		// 			return console.warn("无法获取选中区");
		// 		}

		// 		let targetDOM = this.getTargetNode(range)
		// 		let isText = range.endContainer.nodeType === 3
		// 		let isDOM = range.endContainer.nodeType === 1
		// 		let isBrBlock = false
		// 		let parentNodeIsPlaceholder = false
		// 		let isOnlyOneChild = false
		// 		let childNodes = []
		// 		let parentNode = null
		// 		let textNodeValue = ''
		// 		let currentNode
		// 		let targetParentNode
		// 		let anchor = caretOffset

		// 		if (isDOM) {
		// 			targetParentNode = targetDOM.parentNode
		// 			currentNode = targetDOM
		// 			childNodes = targetDOM.childNodes
		// 			if (targetDOM.childNodes.length === 1) isOnlyOneChild = true
		// 			// 当前节点下只有一个换行标签
		// 			if (isOnlyOneChild && targetDOM.childNodes[0].nodeName === 'BR') {
		// 				isBrBlock = true
		// 			}
		// 		}

		// 		if (isText) {
		// 			currentNode = range.endContainer
		// 			textNodeValue = currentNode.nodeValue
		// 		}

		// 		parentNode = currentNode.parentNode

		// 		// 当前节点为 占位节点
		// 		if (this.hasClass(targetDOM, 'insert-ph')) {
		// 			parentNodeIsPlaceholder = true
		// 		}

		// 		let styId = targetDOM.getAttribute("data-sty-id")

		// 		if (styId) this.debounceSyncStyleId(styId)

		// 		let anchorInfo = {
		// 			anchor,
		// 			range,
		// 			currentNode,
		// 			targetDOM,
		// 			targetParentNode,
		// 			isText,
		// 			isDOM,
		// 			isBrBlock,
		// 			isOnlyOneChild,
		// 			childNodes,
		// 			parentNode,
		// 			textNodeValue,
		// 			parentNodeIsPlaceholder
		// 		}

		// 		this.anchor = anchor
		// 		this.range = range
		// 		this.targetDOM = targetDOM
		// 		this.anchorInfo = anchorInfo

		// 		// console.log(anchorInfo);

		// 		fn(anchorInfo)
		// 	}, 0);
		// },
		// // 光标适配
		// cursorAdaptor(element) {
		// 	var doc = element.ownerDocument || element.document;
		// 	var win = doc.defaultView || doc.parentWindow;
		// 	var sel;
		// 	var range;
		// 	var preCaretRange;
		// 	sel = win.getSelection();

		// 	if (sel.rangeCount > 0) {
		// 		range = win.getSelection().getRangeAt(0);
		// 		preCaretRange = range.cloneRange();
		// 		return [sel, range, preCaretRange]
		// 	}
		// 	return []
		// },
		// // 获取目标
		// getTargetNode(range) {
		// 	let targetDOM
		// 	if (!range) return // console.warn("range is invalid", range);
		// 	let { commonAncestorContainer, startContainer, endContainer, collapsed } = range

		// 	// 对比起始下标与结尾下标是否相同
		// 	if (startContainer.endOffset === endContainer.endOffset || collapsed) {
		// 		// 当前节点为文字节点
		// 		if (endContainer.nodeType === 3) {
		// 			targetDOM = endContainer.parentNode || endContainer.parentElement
		// 		}
		// 		if (endContainer.nodeType === 1) {
		// 			targetDOM = endContainer
		// 		}
		// 	}
		// 	// 最后节点与当前节点不相同
		// 	let cursor_anchor_list = document.getElementsByClassName('cursor_anchor')
		// 	each<Node>(cursor_anchor_list, element => {
		// 		if (element && element !== targetDOM) {
		// 			this.activeOrDeactiveCurrentNode(element, true)
		// 		}
		// 	})
		// 	this.lastActiveNode = targetDOM
		// 	if (targetDOM) this.activeOrDeactiveCurrentNode(targetDOM)
		// 	return targetDOM
		// },
		// // 激活,或是去除激化,当前节点
		// activeOrDeactiveCurrentNode(currentNode, isDeactive) {
		// 	let { classList } = currentNode
		// 	// 移除激活
		// 	if (isDeactive) {
		// 		this.removeClass(currentNode, ACTIVE_CLASS_NAME)
		// 	}
		// 	// 激活当前节点
		// 	else if (indexOf<string>(classList, ACTIVE_CLASS_NAME) < 0) {
		// 		this.addClass(currentNode, ACTIVE_CLASS_NAME)
		// 	}
		// },
		// // addClass
		// addClass(element, className) {
		// 	if (element && element.classList) {
		// 		if (this.hasClass(element, className)) return
		// 		element.className = [...element.classList, className].join(' ')
		// 	} else {
		// 		// console.warn("非法dom", element);
		// 	}
		// },
		// // addClass
		// removeClass(element, className) {
		// 	if (element && element.classList) {
		// 		let _classList = filter<string>(element.classList, (name) => name !== className)
		// 		element.className = _classList.join(' ')
		// 	} else {
		// 		// console.warn("非法dom", element);
		// 	}
		// },
		// // hasClass
		// hasClass(element, className) {
		// 	if (element && element.classList) {
		// 		let index = indexOf<string>(element.classList, className)
		// 		return index >= 0
		// 	} else {
		// 		// console.warn("非法dom", element);
		// 	}
		// },
		setColor(color) {
			this.editor && this.editor.setColor(color)
		},
	},
	mounted() {
		// this.debounceSyncStyleId = debounce((styId) => this.$emit("style", styId), 50)
		// this.setCurrentCaretPosition()
		// this.getCursortPosition()
		// this.editorContent = this.$el.innerText
		const editor = this.editor = new Editor("#editor")

		editor.attr({
			class: bem()
		});

		editor.register('color', {
			'black': true
		})

		console.log(editor);

	}
})
