import './index.less';
import Hammer from 'hammerjs'
import { createNamespace, formatTime } from "../utils";
import { getMonthDays } from "./utils";

const [createComponent, bem] = createNamespace("calendar")

import Content from './content'
import Loading from '../loading/index'
// 提供当前时间或是默认当前时间

export default createComponent({
	props: {
		height: {
			type: String,
			default: "80vh"
		},
		getData: {
			type: Function,
			default: () => Promise.resolve(true)
		},
		// 日历第一天为星期几? 0 为星期天 其他为1~6
		firstDayOfWeek: {
			type: Number,
			default: 0,
			validator(val) {
				return val >= 0 && val <= 6
			}
		},
		failTip: {
			type: String,
			default: "日历请求失败,点击重新请求!"
		},
		isBackground: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			monthOffset: 0,
			currentTime: null,
			indexList: [-1, 0, 1],
			Days: {},
			clientHeight: 0,
			isPan: false,
			deltaY: 0,
			isMask: false,
			isFaild: false,
		}
	},
	watch: {
		monthOffset(news) {
			this.setMonth(news)
			this.getCalendarData()
		}
	},
	computed: {
		wrapperSty() {
			return {
				transform: `translateY(${(-this.monthOffset) * this.clientHeight + this.deltaY}px)`,
				transitionDuration: `${this.isPan ? 0 : 300}ms`,
				height: this.height
			}
		},
		currentPutmonth() {
			return this.Days[this.monthOffset] && this.Days[this.monthOffset].putMonth
		},
		currentYear() {
			return this.Days[this.monthOffset] && this.Days[this.monthOffset].year
		},
		currentMonth() {
			return this.Days[this.monthOffset] && this.Days[this.monthOffset].month
		}
	},
	render(h) {

		const PanelList = []
		this.indexList.forEach(key => {
			const monthInfo = this.Days[key]
			const { year, month } = monthInfo
			const days = monthInfo ? monthInfo.days : []

			const Title = this.slots("title", {
				year,
				month: Number(monthInfo.putMonth)
			})

			PanelList.push(
				<div class={bem("panel", {
					background: this.isBackground
				})} key={`${year}-${month}`} data-month={Number(monthInfo.putMonth)} style={{
					height: this.height,
					top: this.clientHeight * key + 'px'
				}}>
					{Title ? <div class={bem("title")}>{Title}</div> : ''}
					<Content days={days} currentMonth={this.currentPutmonth} scopedSlots={{
						default: (prop) => this.slots("default", prop)
					}} />
				</div>
			)
		})

		let Mask
		const LoadingTpl = this.isFaild ?
			<div class={bem("fail-win")} onClick={this.getCalendarData}>
				<div class={bem("fail-icon")}></div>
				<div class={bem("fail-tip")}>{this.failTip}</div>
			</div> :
			<Loading size={20} />
		const ReqstateSlot = this.slots("reqstate", {
			isFaild: this.isFaild
		})

		if (this.isMask) {
			Mask = <div class={bem("mask")}>
				{ReqstateSlot || LoadingTpl}
			</div>
		}

		return <div class={bem()} style={{ height: this.height }}>
			<div class={bem('wrapper')} style={this.wrapperSty} >
				{PanelList}
			</div>
			{Mask}
		</div>
	},
	methods: {
		setMonthDaysByMonthOffset(offset) {
			if (this.currentTime) {
				const { year, month, day } = this.currentTime
				const { year: _year, month: _month, day: _day, putTime } = formatTime(year, month + offset, day)
				return {
					days: getMonthDays(new Date(_year, _month, _day), this.firstDayOfWeek),
					month: _month,
					putMonth: putTime.putMonth,
					year: _year
				}
			}
		},
		setMonth(monthOffset) {
			const lastIndex = monthOffset - 1
			const nextIndex = monthOffset + 1
			if (this.Days[lastIndex] === undefined) {
				this.Days[lastIndex] = this.setMonthDaysByMonthOffset(lastIndex)
				this.indexList.unshift(lastIndex)
			}
			if (this.Days[nextIndex] === undefined) {
				this.Days[nextIndex] = this.setMonthDaysByMonthOffset(nextIndex)
				this.indexList.push(nextIndex)
			}
		},
		async getCalendarData() {
			this.isFaild = false
			this.isMask = true
			const flag = await this.getData(this.currentYear, this.currentMonth)
			this.isMask = !flag
			// 数据请求失败
			this.isFaild = !flag
		}
	},
	created() {
		this.currentTime = formatTime(new Date())
		const lastMonthDays = this.setMonthDaysByMonthOffset(-1)
		const currentMonthDays = this.setMonthDaysByMonthOffset(0)
		const nextMonthDasy = this.setMonthDaysByMonthOffset(1)
		this.Days[-1] = lastMonthDays
		this.Days[0] = currentMonthDays
		this.Days[1] = nextMonthDasy
		this.getCalendarData()
	},
	mounted() {
		this.clientHeight = this.$el.clientHeight
		const calendarContrl = new Hammer(this.$el)

		calendarContrl.get("pan").set({
			direction: Hammer.DIRECTION_VERTICAL
		})

		calendarContrl.on("panmove", e => {
			if (this.isMask) return
			this.isPan = true
			this.deltaY = e.deltaY
		})

		calendarContrl.on("panend", () => {
			if (this.isMask) return
			this.isPan = false
			if (Math.abs(this.deltaY) > 80) this.monthOffset += this.deltaY < 0 ? 1 : -1
			this.deltaY = 0
		})
	}
})
