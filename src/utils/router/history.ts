/** @format */
import {delay} from '../func'

let histtoryLength = 0

window.addEventListener('popstate', e => {
    delay(() => {
        histtoryLength = history.length
        console.log(histtoryLength)
    }, 0)
})

export function onBackState(fn: (inject: {event: PopStateEvent; done: (allow: boolean) => unknown}) => never, one = false): number {
    const key = Math.random()
    console.log(key)

    // 注入当前路由 1
    history.pushState({key}, null, document.URL)

    //
    const allowBack = () => {
        one && window.removeEventListener('popstate', back)
        history.back()
    }

    function back(e) {
        console.log('back')
        fn({
            event: e,
            done(allow) {
                // 允许回退
                if (allow) {
                    allowBack()
                }
                // 不允许回退
                else {
                    // 路由1 已经被消耗,注入路由2
                    history.pushState({key}, null, document.URL)
                }
            },
        })
    }
    window.addEventListener('popstate', back)
    return key
}
