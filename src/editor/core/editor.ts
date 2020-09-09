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
                style: {
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    userSelect: 'text',
                    outline: 'none',
                },
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
        const {element, pl} = Operate.createNewLine()
        INode.insertInNode(this.$el, element)
        ;(this.$el as HTMLElement).focus()
        Point.point(1, pl)
    }

    private bind(): void {
        this.$el.addEventListener('input', e => this.onInput(e))
        this.$el.addEventListener('click', e => this.onClick(e))
        this.$el.addEventListener('focus', e => this.onFocus(e))
        this.$el.addEventListener('blur', e => this.onBlur(e))

        document.addEventListener('keydown', e => this.onKeydown(e))
        document.addEventListener('keyup', e => this.onKeyup(e))
    }

    private onInput(e) {
        console.log('input', e)
        const {data} = e
        Point.getCursor(this.$el)
        Point.point()
        const {currentPointElement} = this.point
        const is_no_string = INode.attr(currentPointElement, 'data-length') === '0'
        is_no_string && currentPointElement && data !== null && Operate.changeEmptyNodeState(this.point.currentPointElement)
        this.change()
    }

    private onClick(e) {
        console.log('click', e)
        console.log(Point)
        Point.getCursor(this.$el)
        Point.point()
        this.change()
    }

    private onFocus(e) {
        delay(() => {
            console.log('focus')
            Point.getCursor(this.$el)
            Point.point()

            this.change()
        }, 0)
    }

    private onBlur(e) {
        console.log('blur')
    }

    private onKeydown(e) {
        console.log('keydown')
        Operate.disposeKeydown(e, this.$el)

        this.change()
    }

    private onKeyup(e) {
        console.log('keyup')
        Point.getCursor(this.$el)
        Point.point()

        this.change()
    }

    private change(): void {
        this.onstyleUpdate(Operate.getActiveColor())
    }

    register(type: 'color' | 'style', map = {}): void {
        this.operateMap[type] = map
    }

    setColor(key: string): void {
        Operate.setColor(key)
    }

    insertImage(url): void {
        Operate.insertImage(url)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onstyleUpdate(style): void {}
}
