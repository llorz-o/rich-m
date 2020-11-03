/** @format */

import {Arabic} from '../constant'
import {LatinMixin} from '../constant/string'

const Letters = [...Arabic, ...LatinMixin]
const LettersLen = Letters.length

/** @format */
export function hash(len = 4): string {
    let str = ''
    for (let index = 0; index < len; index++) str += Letters[Math.floor(Math.random() * LettersLen)]
    return str
}

export function hashCode(s: string): number {
    return s.split('').reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)
}
