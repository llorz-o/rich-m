/** @format */

import Vue from 'vue'

type MixinChildrenOptions = {
    indexKey?: any
}

export function MixinParent(
    parent: string,
): {
    provide(): Record<string, unknown>
    data(): Record<string, unknown>
} {
    return {
        provide() {
            return {
                [parent]: this,
            }
        },
        data() {
            return {
                children: [],
            }
        },
    }
}

export function MixinChildren(parent: string, options: MixinChildrenOptions = {}): unknown {
    const indexKey = options.indexKey || 'index'

    return Vue.extend({
        inject: {
            [parent]: {
                default: null,
            },
        },
        computed: {
            parent() {
                if (this.disableBindRelation) {
                    return null
                }
                return this[parent]
            },
            [indexKey]() {
                this.bindRelation()
                return this.parent.children.indexOf(this)
            },
        },
        mounted() {
            this.bindRelation()
        },
        methods: {
            bindRelation() {
                // 父组件的子组件中无法找到当前组件则存入子组件列表中
                if (!this.parent || this.parent.children.indexOf(this) !== -1) {
                    return
                }
                const children = [...this.parent.children, this]
                this.parent.children = children
            },
        },
    })
}
