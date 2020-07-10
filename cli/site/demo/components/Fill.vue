<template>
  <div class="fill" :style="{ backgroundColor, height: `${h}px` }" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Fill',
  props: {
    alpha: {
      type: Number,
      default: 0.2,
    },
    h: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      backgroundColor: '',
    }
  },
  computed: {},
  methods: {
    getRandomColor() {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      return `rgba(${r},${g},${b},${this.alpha})`
    },
  },
  created() {
    this.backgroundColor = this.getRandomColor()
  },
}
</script>

<style lang="less">
.fill {
  min-height: 200px;
}
</style>
