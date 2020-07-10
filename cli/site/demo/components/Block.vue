<template>
  <div class="block">
    <div class="block-title">{{ title }}</div>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: {
    title: String,
  },
}
</script>

<style lang="less" scope>
.block {
  background-color: #f7f8fa;
  padding: 30px 10px 10px;
  &-title {
    color: #8c99a0;
    padding-bottom: 10px;
  }
}
</style>
