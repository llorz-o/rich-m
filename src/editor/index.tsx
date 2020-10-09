import './index.less'
import { createNamespace, delay } from '../utils'
import { Point } from './core/point';
import { Operate, Editor } from './core';
const [createComponent, bem] = createNamespace("editor")

export default createComponent({
	render(h) {
		return <div>
			<button onClick={() => this.setColor('red')}>red</button>
			<button onClick={() => this.setColor('green')}>green</button>
			<button onClick={() => this.setColor('black')}>black</button>
			<button onClick={() => this.insertEmoji()}>emoji</button>
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
		insertEmoji() {
			this.editor && this.editor.insertImage("data:image/jpeg;base64,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")
		}
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

		editor.onstyleUpdate = function style(_sty) {
			console.log(_sty);
		}

		console.log(editor);

	}
})
