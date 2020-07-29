import './index.less'
import { createNamespace } from 'u@/create'
import { indexOf, filter, each, toPascalCase } from '@/utils'
import { toKebabCase } from '@/utils/format/string';
const [createComponent, bem] = createNamespace("editor")
/**
 * &#65279; 空占位符
 * const PL = /^\ufeff$/; 匹配空占位
 * const HAS_PL = /\ufeff/g;
 */
const HAS_PL = /\ufeff/g;
const PL = /^\ufeff$/; // 匹配空占位
const ALL_PL = /^(\ufeff)+$/ // 匹配全部
const ACTIVE_CLASS_NAME: string = "cursor_anchor"

export default createComponent({
	render(h) {

		return <div
			spellcheck="false"
			contenteditable="true"
			class={bem()}
			onInput={this.onInput}
			onFocus={this.onFocus}
			onChange={this.onChange}
			onBlur={this.onBlur}
			onClick={this.onClick}
			onTouchstart={this.onTouchstart}
			onKeydown={this.onKeydown}
			onKeyup={this.onKeyup}
		>
			<div class={['row', 'last-row']}>
				<span class={["column", 'cursor_anchor']} style="color:black;">
					<br />
					{/* <img class={["img"]} src="http://www.divcss5.com/uploads/allimg/130204/1_130204153950_1.png" alt="" /> */}
				</span>
			</div>
		</div>
	},
	data() {
		return {
			lastActiveNode: null,
			anchor: null,
			range: null,
			targetDOM: null,
			anchorInfo: {},
			currentActiveId: "__black",
			registerStyles: {
				__black: {
					color: "black"
				}
			},
			relyList: []
		}
	},
	methods: {
		onInput(e) {
			console.log('input event', e);
			this.getCursortPosition()
			// 剔除占位符或是添加占位
		},
		onFocus(e) {
			console.log('focus event', e);
			setTimeout(() => this.getCursortPosition(), 50);

		},
		onChange(e) {
			console.log("change event", e);

		},
		onBlur(e) {
			console.log("blur event", e);
		},
		onClick(e) {
			console.log('click event', e);
			this.getCursortPosition()
		},
		onTouchstart(e) {
			console.log('touchstart event', e);

		},
		onKeydown(e) {
			console.log("keydown event", e);
			this.getCursortPosition()
		},
		onKeyup(e) {
			console.log("keyup event", e);
			// 当前节点为span 节点且子节点只有 br
		},
		insertStyleBLock() {
			this.insertBlock(this.createBlock('span', {
				className: "column insert-ph",
				style: {
					color: "red",
					fontWeight: "600",
				}
			}, ["\ufeff"]))
		},
		// 插入
		insertBlock(insertTag) {
			let { isBrBlock, isText, textNodeValue, anchor, currentNode, childNodes, targetDOM, parentNode } = this.anchorInfo
			if (isBrBlock) {
				parentNode.replaceChild(insertTag, targetDOM)
			}
			if (isText) {
				let beforeTextNode = document.createTextNode(textNodeValue.slice(0, anchor))
				let afterTextNode = document.createTextNode(textNodeValue.slice(anchor))

				// 为当前文本节点尾部
				if (textNodeValue.length === anchor) {
					// 当前节点是否存在下一个节点
					if (currentNode.nextSibling) {
						parentNode.insertBefore(insertTag, currentNode.nextSibling)
					} else {
						parentNode.appendChild(insertTag)
					}
				} else {
					parentNode.replaceChild(afterTextNode, currentNode)
					parentNode.insertBefore(insertTag, afterTextNode)
					parentNode.insertBefore(beforeTextNode, insertTag)
				}


			}
			this.setCurrentCaretPosition(insertTag, 1)
		},
		// 创建块
		createBlock(name: string, attrs = {}, children?: (string | Node)[]) {
			let node = document.createElement(name)
			Object.keys(attrs).forEach(k => {
				// 类名
				if (k === 'className') return node.setAttribute("class", attrs[k])
				// 样式
				if (k === 'style' && typeof attrs[k] === 'object') {
					let style = ''
					Object.keys(attrs[k]).forEach(styleKey => style += `${toKebabCase(styleKey)}:${attrs[k][styleKey]};`)
					return node.setAttribute("style", style)
				}
				try {
					node.setAttribute(k, attrs[k])
				} catch { }
			})
			if (children) each<string | Node>(children, (item) => {

				if (typeof item === 'string') {
					node.appendChild(document.createTextNode(item))
				} else {
					node.appendChild(item)
				}

			})
			return node
		},
		// 设置当前光标锚点所在为的光标位置
		setCurrentCaretPosition(cursor_anchor, pos = 0) {
			cursor_anchor = cursor_anchor || (document.getElementsByClassName('cursor_anchor') || [])[0]
			if (cursor_anchor) {
				// 保存占位
				this.relyList.push(cursor_anchor)
				// 多余占位剔除
				this.lastActiveNode = cursor_anchor
				setTimeout(() => {
					(this.$el as HTMLElement).focus()
					this.setCaretPosition(cursor_anchor, pos)
				}, 0);
			}
		},
		// 设置光标位置
		setCaretPosition(element, pos) {
			var range, selection;
			range = document.createRange(); //创建一个选中区域
			range.selectNodeContents(element); //选中节点的内容
			if (element.innerHTML.length > 0) {
				range.setStart(element.childNodes[0], pos); //设置光标起始为指定位置
			}
			range.collapse(true); //设置选中区域为一个点
			selection = window.getSelection(); //获取当前选中区域
			selection.removeAllRanges(); //移出所有的选中范围
			selection.addRange(range); //添加新建的范围
		},
		// 获取光标位置
		getCursortPosition(fn = () => { }) {
			setTimeout(() => {
				let caretOffset = 0;
				let [sel, range, preCaretRange] = this.cursorAdaptor(this.$el)

				if (sel) { //选中的区域
					preCaretRange.selectNodeContents(range.endContainer); //设置选中区域的节点内容为当前节点
					preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
					caretOffset = preCaretRange.toString().length;
				}

				let targetDOM = this.getTargetNode(range)
				let isText = range.endContainer.nodeType === 3
				let isDOM = range.endContainer.nodeType === 1
				let isBrBlock = false
				let isOnlyOneChild = false
				let childNodes = []
				let parentNode = null
				let textNodeValue = ''
				let currentNode
				let targetParentNode
				let anchor = caretOffset

				if (isDOM) {
					targetParentNode = targetDOM.parentNode
					currentNode = targetDOM
					childNodes = targetDOM.childNodes
					if (targetDOM.childNodes.length === 1) isOnlyOneChild = true
					// 当前节点下只有一个换行标签
					if (isOnlyOneChild && targetDOM.childNodes[0].nodeName === 'BR') {
						isBrBlock = true
					}
				}

				if (isText) {
					currentNode = range.endContainer
					textNodeValue = currentNode.nodeValue
				}

				parentNode = currentNode.parentNode

				let anchorInfo = {
					anchor,
					range,
					currentNode,
					targetDOM,
					isText,
					isDOM,
					isBrBlock,
					isOnlyOneChild,
					childNodes,
					parentNode,
					textNodeValue,
					targetParentNode
				}

				this.anchor = anchor
				this.range = range
				this.targetDOM = targetDOM
				this.anchorInfo = anchorInfo

				console.log(anchorInfo);

				fn(anchorInfo)
			}, 0);
		},
		// 光标适配
		cursorAdaptor(element) {
			var doc = element.ownerDocument || element.document;
			var win = doc.defaultView || doc.parentWindow;
			var sel;
			var range;
			var preCaretRange;
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				range = win.getSelection().getRangeAt(0);
				preCaretRange = range.cloneRange();
				return [sel, range, preCaretRange]
			}
			return []
		},
		// 获取目标
		getTargetNode(range) {
			let targetDOM
			if (!range) return console.warn("range is invalid", range);
			let { commonAncestorContainer, startContainer, endContainer, collapsed } = range

			// 对比起始下标与结尾下标是否相同
			if (startContainer.endOffset === endContainer.endOffset || collapsed) {
				// 当前节点为文字节点
				if (endContainer.nodeType === 3) {
					targetDOM = endContainer.parentNode || endContainer.parentElement
				}
				if (endContainer.nodeType === 1) {
					targetDOM = endContainer
				}
			}
			// 最后节点与当前节点不相同
			let cursor_anchor_list = document.getElementsByClassName('cursor_anchor')
			each<Node>(cursor_anchor_list, element => {
				if (element && element !== targetDOM) {
					this.activeOrDeactiveCurrentNode(element, true)
				}
			})
			this.lastActiveNode = targetDOM
			if (targetDOM) this.activeOrDeactiveCurrentNode(targetDOM)
			return targetDOM
		},
		// 激活,或是去除激化,当前节点
		activeOrDeactiveCurrentNode(currentNode, isDeactive) {
			let { classList } = currentNode
			// 移除激活
			if (isDeactive) {
				let _classList = filter<string>(classList, (name) => name !== ACTIVE_CLASS_NAME)
				currentNode.className = _classList.join(' ')
			}
			// 激活当前节点
			else if (indexOf<string>(classList, ACTIVE_CLASS_NAME) < 0) {
				currentNode.className = [...classList, ACTIVE_CLASS_NAME].join(" ")
			}
		}
	}
})
