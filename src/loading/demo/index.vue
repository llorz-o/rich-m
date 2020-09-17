<template>
  <layout class="loadingDemo">
    <Header slot="header" left-text="返回" title="加载" @click-left="$router.go(-1)" />
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
  </layout>
</template>

<script>
/** @format */

export const name = '加载'
export default {}
</script>

<style lang="less">
/** @format */

.loadingDemo {
    .fill {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
