/** @format */

export const TIME_PL_MATCH = /\[([A-z]+)\]/gm
export type IDatePutTime = {
    putYear: string
    putMonth: string
    putDay: string
    putHours: string
    putMinute: string
    putSecond: string
    putMillisecond: string
    putWeek: string
}
export type IDate = {
    year: number
    month: number
    day: number
    hours: number
    minute: number
    second: number
    millisecond: number
    week: number
    time: Date
    putTime: IDatePutTime
    matchMap: {
        Y: 'putYear'
        M: 'putMonth'
        D: 'putDay'
        h: 'putHours'
        m: 'putMinute'
        s: 'putSecond'
        ms: 'putMillisecond'
        w: 'putWeek'
    }
    formatBy(this: IDate, formatter: string): string
}

export function fix0(num: number): string {
    if (num < 10) return String(`0${num}`)
    return String(num)
}

export function formatTime(year: number, month?: number, day?: number): IDate
export function formatTime(time: Date): IDate
export function formatTime(_year, _month = 0, _day = 0): IDate {
    let time: Date
    if (typeof _year === 'number') time = new Date(_year, _month, _day)
    if (_year instanceof Date) time = _year

    const year = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDate()
    const hours = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    const millisecond = time.getMilliseconds()
    const week = time.getDay()

    return {
        year,
        month,
        day,
        hours,
        minute,
        second,
        millisecond,
        week,
        time,
        putTime: {
            putYear: fix0(year),
            putMonth: fix0(month + 1),
            putDay: fix0(day),
            putHours: fix0(hours),
            putMinute: fix0(minute),
            putSecond: fix0(second),
            putMillisecond: fix0(millisecond),
            putWeek: (() => String(week === 0 ? '7' : week))(),
        },
        matchMap: {
            Y: 'putYear',
            M: 'putMonth',
            D: 'putDay',
            h: 'putHours',
            m: 'putMinute',
            s: 'putSecond',
            ms: 'putMillisecond',
            w: 'putWeek',
        },
        formatBy(formatter: string): string {
            return formatter.replace(TIME_PL_MATCH, (_, p1) => {
                const matchedKey = this.matchMap[p1]
                return matchedKey ? this.putTime[matchedKey] : p1
            })
        },
    }
}
