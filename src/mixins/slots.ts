import Vue from 'vue'

export const MixinExtractSlot = Vue.extend({
  methods: {
    slots(name: string = 'default', props: any) {
      let { $slots, $scopedSlots } = this
      const scopedSlots = $scopedSlots[name]
      if (scopedSlots) {
        return scopedSlots(props)
      }
      return $slots[name]
    }
  }
})
