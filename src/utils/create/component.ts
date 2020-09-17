/** @format */

import Vue, {ComponentOptions, VueConstructor} from 'vue'
import {toPascalCase} from '../format'
import {VNode} from 'vue/types/umd'
import {MixinExtractSlot} from '../../mixins/slots'
import {DefaultMethods} from 'vue/types/options'

interface VD<V> extends Vue, DefaultMethods<V> {
    [key: string]: any
}

type VueData = {[key: string]: any} | ((this: Vue) => VD<Vue>)

interface VueMethods<V extends Vue> extends DefaultMethods<V> {
    [key: string]: (this: VD<V>, ...args: any[]) => any
}

export interface XComponentOption<V extends Vue> extends ComponentOptions<Vue> {
    functional?: boolean
    install?: (Vue: VueConstructor) => void
    data?: VueData
    methods?: VueMethods<V>
}

export type TsxBaseProps<Slots> = {
    key: string | number
    props: any
    class: any
    style: string | Record<string, string>[] | Record<string, string>
    scopedSlots: Slots
}

export type TsxComponent<Props, Events, Slots> = (props: Partial<Props & Events & TsxBaseProps<Slots>>) => VNode

// 对于this 我有约定明确的类型但是,仍然报错 对于 this 具有隐式的 any 类型,所以在 tsconfig 中关闭了
// --noImplicitThis 与 --noImplicitAny 检查项
function install(this: ComponentOptions<Vue>, Vue: VueConstructor) {
    const {name} = this
    Vue.component(name as string, this)
    Vue.component(toPascalCase(name as string), this)
}

export const createComponent = (name: string) => {
    return function<Props = Record<string, any>, Events = Record<string, any>, Slots = Record<string, any>>(sfc: XComponentOption<Vue>): TsxComponent<Props, Events, Slots> {
        if (!sfc.functional) {
            sfc.mixins = sfc.mixins || []
            sfc.mixins.push(MixinExtractSlot)
        }
        sfc.name = name
        sfc.install = install
        return sfc as TsxComponent<Props, Events, Slots>
    }
}
