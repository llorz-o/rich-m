/** @format */

export function debounce(fn: (...args) => void, delay = 500): (...args) => void {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
    }
}

export function delay(fn: () => void, delay = 300): void {
    setTimeout(fn, delay)
}

export function throttle(fn: (...args) => void, delay = 300): (...args) => void {
    let old = null
    let timer = null
    return function(...args) {
        const now = Date.now()

        clearTimeout(timer)

        if (old === null || (old !== null && now - old > delay)) {
            old = now
            fn.apply(this, args)
        } else {
            timer = setTimeout(() => fn.apply(this, args), delay)
        }
    }
}
