<template>
  <div class="loadingDemo">
    <Block title="基本使用">
      <Fill>
        <loading text="加载中" />
      </Fill>
    </Block>
    <Block title="point 类型">
      <Fill>
        <loading text="加载中" type="point" />
      </Fill>
    </Block>
  </div>
</template>

<script>
export const name = "加载";
export default {};
</script>

<style lang="less">
.loadingDemo {
  .fill {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
