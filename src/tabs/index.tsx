import './index.less'
import { each, createNamespace } from '../utils';
import { scrollLeftTo } from './utils'
import { MixinParent } from '../mixins/relation'
import Title from './title'
import Content, { IContent } from './content'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
	props: {
		// v-model
		vModel: Number,
		// tab 切换左右滑动动画效果
		animated: Boolean,
		// 手势
		swiper: Boolean,
		// 粘性
		sticky: Boolean,
		// 上下滚动
		scroll: Boolean,
		// 正文高度
		contentHeight: String,
		// 一栏对多显示的 tab 标签
		swipeThreshold: {
			type: Number,
			default: 4,
		},
		// tabs 样式风格
		type: {
			type: String,
			default: "default" // "card"
		},
	},
	mixins: [MixinParent('xTabs')],
	model: {
		event: "v",
		prop: "vModel"
	},
	data() {
		return {
			test: "name",
			currentIndex: 0,
			indicatorStyle: null,
			maxTitleWidth: 0,
			tabsWidth: 0,
			panelsHeight: null,
			scrollLock: false
		}
	},
	watch: {
		children() {
			this.setIndicator()
			this.currentIndex = this.effectCurrentIndexs[0]
		},
		currentIndex(news) {
			this.setIndicator()
			this.$emit("v", Number(news))
		},
		vModel(news) {
			if (this.effectCurrentIndexs.indexOf(news) < 0) {
				console.warn("当前下标不存在");
			} else {
				this.currentIndex = news
				this.setIndicator()
			}
		}
	},
	computed: {
		effectCurrentIndexs() {
			const effectIndex = []
			each<any>(this.children, (vnode, index) => {
				if (!vnode.disable) {
					effectIndex.push(index)
				}
			})
			return effectIndex
		},
		scrollable() {
			return this.children.length > this.swipeThreshold
		},
	},
	methods: {
		setIndicator() {
			this.$nextTick(() => {
				const { title } = this.$refs
				if (title && (title as Vue) && (title as Vue[]).length === undefined) {
					const $title = (title as Vue).$el
					const tabWidth: number = $title.clientWidth
					const indicatorWidth: number = tabWidth / 2
					this.indicatorStyle = {
						transitionDuration: '0.3s',
						transform: `translateX(${this.currentIndex * tabWidth + indicatorWidth / 2}px)`,
						width: `${indicatorWidth}px`
					}

				}
			})
		},
		// 手势滑动
		onSwiper(offset) {
			const _currentIndex = this.currentIndex
			const effectCurrentIndexsLen = this.effectCurrentIndexs.length
			let effectIndex = this.effectCurrentIndexs.indexOf(_currentIndex)

			effectIndex += offset
			effectIndex = effectIndex < 0 ? 0 : effectIndex
			effectIndex = effectIndex >= effectCurrentIndexsLen ? effectCurrentIndexsLen <= 0 ? 0 : effectCurrentIndexsLen - 1 : effectIndex

			effectIndex = this.effectCurrentIndexs[effectIndex]

			if (effectIndex as number) {
				this.currentIndex = effectIndex
			} else {
				this.currentIndex = 0
				console.warn(`当前有效下标不是一个有效值:[[${effectIndex}]]`);
			}
			this.onClickTitle(this.currentIndex)
		},
		// 点击标题栏
		onClickTitle(index: number) {
			this.scrollLock = true
			this.scrollTitleTo(index)
			if (this.scroll) (this.$refs.content as IContent).scrollToIndexPosition(this.currentIndex)
		},
		// 滚动标题栏
		scrollTitleTo(index) {
			this.currentIndex = index
			if (this.scrollable) {
				index = index < 2 ? 2 : index
				const tabList = this.$refs.tabList
				const title = this.$refs.title
				scrollLeftTo(tabList as HTMLElement, (index - 2) * Number(((title as Vue).$el as Element).clientWidth || '0'), 0.3)
			}
		},
		// 获取所有面板高度
		getPanelsHeight(scrollTop = 0) {
			const panelsHeight = []
			let scrollHeight = 0
			let _currentIndex = null
			each<Vue>(this.children, (tab, index) => {
				const tabClientHeight = tab.$el.clientHeight
				scrollHeight += tabClientHeight
				panelsHeight.push(tabClientHeight)
				if (scrollHeight > scrollTop && _currentIndex == null) _currentIndex = index
			})
			this.panelsHeight = panelsHeight
			return _currentIndex
		},
		// 内容滚动事件处理
		onDebounceScroll(scrollTop) {
			const _currentIndex = this.getPanelsHeight(scrollTop)
			if (this.scrollLock) return this.scrollLock = false
			this.scrollTitleTo(Number(_currentIndex || '0'))
		},
	},
	mounted() {
		this.setIndicator()
		this.tabsWidth = this.$el.innerWidth
		this.getPanelsHeight()
	},
	render(h) {

		const { indicatorStyle } = this

		const Indicator = <div class={bem('indicator')} style={indicatorStyle}></div>

		const Nav = this.children.map((vnode, index) => {
			return (<Title
				ref="title"
				style={vnode.titleStyle}
				isActive={index === this.currentIndex}
				isDisable={vnode.disable}
				scrollable={this.scrollable}
				swipeThreshold={this.swipeThreshold}
				tabsWidth={this.tabsWidth}
				scopedSlots={{
					['title']: () => vnode.$slots['title']
				}}
				onClick={() => this.onClickTitle(index)}>
				{vnode.title}
			</Title>);
		})

		return (<div class={bem([this.type])}>
			<div class={[bem('wrap', {
				sticky: this.sticky
			}), 'x-hairline--bottom',]}>
				{this.slots("nav-left")}
				<div class={bem('nav', [this.type])} ref="tabList">
					{Nav}
					{this.type === 'default' ? Indicator : ""}
				</div>
				{this.slots("nav-right")}
			</div>
			<Content
				ref="content"
				isScroll={this.scroll}
				isAnimated={this.animated}
				isSwiper={this.swiper}
				contentHeight={this.contentHeight}
				panelsHeight={this.panelsHeight}
				currentIndex={this.currentIndex}
				onSwiper={this.onSwiper}
				onDebounceScroll={this.onDebounceScroll}>
				{this.slots()}
			</Content>
		</div>)
	},
})
