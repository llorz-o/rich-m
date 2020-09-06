/** @format */

import {formatTime, IDate} from '../utils'

export function getMonthDays(
    time: Date,
    startWeek = 0,
): {
    year: number
    month: number
    day: number
}[] {
    const monthDays = []
    const {year, month} = formatTime(time)
    const allDayByMonth: number = getDaysByMonth(year, month)
    const fristDate: IDate = formatTime(year, month, 1)
    const lastMonthDate: IDate = formatTime(year, month - 1, 1)
    const nextMonthDate: IDate = formatTime(year, month + 1, 1)
    const fristWeek = fristDate.putTime.putWeek
    const beforeFillDays = Number(fristWeek) - startWeek === 0 ? 7 : Number(fristWeek) - startWeek
    const lastMonthDays = getDaysByMonth(year, month - 1)
    const lastFillDate = fillTimeInterval(lastMonthDate.year, lastMonthDate.month, getDateIntervalRight(lastMonthDays - beforeFillDays, lastMonthDays))
    const currentMonthFillDate = fillTimeInterval(year, month, allDayByMonth)
    monthDays.push(...lastFillDate, ...currentMonthFillDate)
    const nextFillDate = fillTimeInterval(nextMonthDate.year, nextMonthDate.month, getDateInterbalLeftAndRight(1, 42 - monthDays.length))
    monthDays.push(...nextFillDate)
    return monthDays
}

// 填充时间区间
export function fillTimeInterval(
    year: number,
    month: number,
    days: number | number[],
): {
    year: number
    month: number
    day: number
}[] {
    const timeInterval = []
    if (Array.isArray(days)) {
        days.forEach(day => {
            timeInterval.push({
                year,
                month,
                day,
            })
        })
    } else {
        for (let day = 1; day <= days; day++) {
            timeInterval.push({
                year,
                month,
                day,
            })
        }
    }
    return timeInterval
}

// 获取目标月有多少天
export function getDaysByMonth(year: number, _month: number): number {
    const lastDay: Date = new Date(year, _month + 1, 0)
    return lastDay.getDate()
}
// [1,3) 左闭右开
export function getDateIntervalLeft(leftDay: number, rightDay: number): number[] {
    const Interval = []
    for (let index = leftDay; index < rightDay; index++) {
        Interval.push(index)
    }
    return Interval
}
// (1,3] 右闭左开
export function getDateIntervalRight(leftDay: number, rightDay: number): number[] {
    const Interval = []
    for (let index = leftDay + 1; index <= rightDay; index++) {
        Interval.push(index)
    }
    return Interval
}

// [1,3] 左右闭合
export function getDateInterbalLeftAndRight(leftDay: number, rightDay: number): number[] {
    const Interval = []
    for (let index = leftDay; index <= rightDay; index++) {
        Interval.push(index)
    }
    return Interval
}
