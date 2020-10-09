/** @format */

import {INode, Attributes} from './node'
import {IPoint, Point} from './point'
import {delay} from '../../utils'
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
        const {element} = Operate.createNewLine()
        INode.insertInNode(this.$el, element)
        ;(this.$el as HTMLElement).focus()
        Point.point(0, element)
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
        Point.getCursor(this.$el)
        Point.point()
    }

    private onClick(e) {
        console.log('click', e)
        Point.getCursor(this.$el)
        Point.point()
        Operate.checkEmptyNode()
    }

    private onFocus(e) {
        Operate.isFocus = true
        delay(() => {
            console.log('focus')
            Point.getCursor(this.$el)
            Point.point()
        }, 0)
    }

    private onBlur(e) {
        Operate.isFocus = false
        console.log('blur')
    }

    private onKeydown(e) {
        console.log('keydown')
        Operate.disposeKeydown(e, this.$el)
        this.change()
    }

    private onKeyup(e) {
        delay(() => {
            Point.getCursor(this.$el)
            Point.point()
            console.log('keyup', Point)
        }, 0)
    }

    private change(): void {
        //
    }

    register(type: 'color' | 'style', map = {}): void {
        // this.operateMap[type] = map
    }

    setColor(key: string): void {
        //
        Operate.setColor(key)
    }

    insertImage(url): void {
        Point.getCursor(this.$el)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onstyleUpdate(style): void {}
}
