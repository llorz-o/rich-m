/** @format */

import Vue from 'vue'

export const MixinExtractSlot = Vue.extend({
    methods: {
        slots(name = 'default', props: any) {
            const {$slots, $scopedSlots} = this
            const scopedSlots = $scopedSlots[name]
            if (scopedSlots) {
                return scopedSlots(props)
            }
            return $slots[name]
        },
    },
})
