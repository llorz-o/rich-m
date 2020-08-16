import { formatTime, IDate } from "../utils";

export function getMonthDays(time: Date, startWeek = 0) {
	let monthDays = [];
	let { year, month } = formatTime(time);
	let allDayByMonth: number = getDaysByMonth(year, month);
	let fristDate: IDate = formatTime(year, month, 1);
	let lastMonthDate: IDate = formatTime(year, month - 1, 1);
	let nextMonthDate: IDate = formatTime(year, month + 1, 1);
	let fristWeek = fristDate.putTime.putWeek;
	let beforeFillDays =
		Number(fristWeek) - startWeek === 0 ? 7 : Number(fristWeek) - startWeek;
	let lastMonthDays = getDaysByMonth(year, month - 1);
	let lastFillDate = fillTimeInterval(
		lastMonthDate.year,
		lastMonthDate.month,
		getDateIntervalRight(lastMonthDays - beforeFillDays, lastMonthDays)
	);
	let currentMonthFillDate = fillTimeInterval(year, month, allDayByMonth);
	monthDays.push(...lastFillDate, ...currentMonthFillDate);
	let nextFillDate = fillTimeInterval(
		nextMonthDate.year,
		nextMonthDate.month,
		getDateInterbalLeftAndRight(1, 42 - monthDays.length)
	);
	monthDays.push(...nextFillDate);
	return monthDays;
}

// 填充时间区间
export function fillTimeInterval(
	year,
	month,
	days: number | number[]
): object[] {
	let timeInterval = [];
	if (Array.isArray(days)) {
		days.forEach(day => {
			timeInterval.push({
				year,
				month,
				day
			});
		});
	} else {
		for (let day = 1; day <= days; day++) {
			timeInterval.push({
				year,
				month,
				day
			});
		}
	}
	return timeInterval;
}

// 获取目标月有多少天
export function getDaysByMonth(year: number, _month: number): number {
	let lastDay: Date = new Date(year, _month + 1, 0);
	return lastDay.getDate();
}
// [1,3) 左闭右开
export function getDateIntervalLeft(
	leftDay: number,
	rightDay: number
): number[] {
	let Interval = [];
	for (let index = leftDay; index < rightDay; index++) {
		Interval.push(index);
	}
	return Interval;
}
// (1,3] 右闭左开
export function getDateIntervalRight(
	leftDay: number,
	rightDay: number
): number[] {
	let Interval = [];
	for (let index = leftDay + 1; index <= rightDay; index++) {
		Interval.push(index);
	}
	return Interval;
}

// [1,3] 左右闭合
export function getDateInterbalLeftAndRight(
	leftDay: number,
	rightDay: number
): number[] {
	let Interval = [];
	for (let index = leftDay; index <= rightDay; index++) {
		Interval.push(index);
	}
	return Interval;
}
