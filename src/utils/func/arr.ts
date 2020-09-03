/** @format */

type CommonArray<T> = {
    [key: number]: T
    length: number
}

export function each<T>(arr: CommonArray<T>, cb: (item: T, index: number, self: CommonArray<T>) => void): CommonArray<T> {
    const len: number = arr.length
    let i = 0
    for (i; i < len; i++) {
        cb(arr[i], i, arr)
    }
    return arr
}

export function filter<T>(arr: CommonArray<T>, cb: (item: T, index: number, self: CommonArray<T>) => boolean): T[] {
    const result: T[] = []
    each(arr, (item, index, self) => {
        if (cb(item, index, self)) result.push(item)
    })
    return result
}

export function indexOf<T>(arr: CommonArray<T>, value: T): number {
    let _index = -1
    each(arr, (item, index) => {
        if (item === value) _index = index
    })
    return _index
}

export function map<T, U>(arr: CommonArray<T>, cb: (item: T, index: number, self: CommonArray<T>) => U): U[] {
    const result: U[] = []
    each<T>(arr, (item, index, self) => {
        const newElement: U = cb(item, index, self)
        if (newElement !== undefined) result.push(newElement)
    })
    return result
}
