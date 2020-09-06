/** @format */

import {INode, Attributes} from './node'
import {IPoint, Point} from './point'
import {delay} from '../utils'
import {Operate} from './operate'

type editorConf = {
    placeholder?: string
}

export class Editor {
    $el: Element
    placeholder: string
    point: IPoint = Point

    private operateMap = {}

    constructor(el: string | Element, {placeholder}: editorConf = {}) {
        if (typeof el === 'string') this.$el = INode.query(el)[0]
        if (el instanceof HTMLElement) this.$el = el

        this.placeholder = placeholder

        if (this.$el) {
            INode.attr(this.$el, {
                spellcheck: false,
                contenteditable: true,
            })
            this.bind()
            this.init()
        } else {
            console.warn('未找到相关节点')
        }
    }

    attr(attrs: Attributes): string | void {
        return INode.attr(this.$el, attrs)
    }

    private init(): void {
        INode.insertInNode(this.$el, Operate.createNewLine())
    }

    private bind(): void {
        this.$el.addEventListener('input', e => this.onInput(e))
        this.$el.addEventListener('focus', e => this.onFocus(e))
        this.$el.addEventListener('blur', e => this.onBlur(e))
        this.$el.addEventListener('keydown', e => this.onKeydown(e))
        this.$el.addEventListener('keyup', e => this.onKeyup(e))
    }

    private onInput(e) {
        console.log('input', e)
        const {data} = e
        Point.getCursor(this.$el)
        Point.point()
        const {currentPointElement} = this.point
        currentPointElement && data !== null && Operate.changeEmptyNodeState(this.point.currentPointElement)
    }

    private onFocus(e) {
        console.log('focus')

        delay(() => {
            Point.getCursor(this.$el)
            Point.point()
        }, 0)
    }

    private onBlur(e) {
        console.log('blur')
    }

    private onKeydown(e) {
        console.log('keydown')
        console.log(this.point)
        Point.getCursor(this.$el)
        Point.point()
        Operate.disposeKeydown(e, this.$el)
    }

    private onKeyup(e) {
        console.log('keyup')
        Point.getCursor(this.$el)
        Point.point()
    }

    register(type: 'color' | 'style', map = {}): void {
        this.operateMap[type] = map
    }

    setColor(key) {
        Operate.setColor(key)
    }
}
