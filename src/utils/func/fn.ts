/** @format */

export function debounce<T extends any[]>(fn: (...args: T) => void, delay = 500): (...args: T) => void {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
    }
}

export function delay(fn: () => any, delay = 300): void {
    setTimeout(fn, delay)
}
