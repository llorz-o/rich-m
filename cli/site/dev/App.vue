<template>
  <div>
    <div class="block">1</div>
    <tabs>
      <tab title="1">
        <div class="block">2</div>
      </tab>
      <tab title="2">
        <div class="block">3</div>
      </tab>
    </tabs>
    <div class="block">4</div>
    <div class="block">5</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import '../../../src/sty/index.less';
.block {
  height: 300px;
  border: 1px solid #555;
}
</style>
