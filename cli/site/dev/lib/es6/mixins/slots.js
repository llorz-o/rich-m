import Vue from 'vue';
export var MixinExtractSlot = Vue.extend({
  methods: {
    slots(name, props) {
      if (name === void 0) {
        name = 'default';
      }

      var {
        $slots,
        $scopedSlots
      } = this;
      var scopedSlots = $scopedSlots[name];

      if (scopedSlots) {
        return scopedSlots(props);
      }

      return $slots[name];
    }

  }
});