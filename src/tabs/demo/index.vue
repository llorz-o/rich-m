<template>
  <layout class="tabsDemo">
    <Header slot="header" left-text="返回" title="标签页" @click-left="$router.go(-1)" />
    <Block title="基础用法">
      <tabs animated>
        <tab title="标签1">
          <Fill>1</Fill>
        </tab>
        <tab title="标签2" disable>
          <Fill>2</Fill>
        </tab>
        <tab title="标签3">
          <Fill>3</Fill>
        </tab>
      </tabs>
    </Block>
    <Block title="滑动切换与粘性布局">
      <tabs animated swiper sticky offset-top="40px">
        <tab title="标签1">
          <Fill>1</Fill>
        </tab>
        <tab title="标签2">
          <Fill>2</Fill>
        </tab>
        <tab title="标签3">
          <Fill>3</Fill>
        </tab>
      </tabs>
    </Block>
    <Block title="卡片样式">
      <tabs type="card">
        <tab title="标签1">
          <Fill>1</Fill>
        </tab>
        <tab title="标签2">
          <Fill>2</Fill>
        </tab>
        <tab title="标签3">
          <Fill>3</Fill>
        </tab>
      </tabs>
    </Block>
    <Block title="滚动导航">
      <tabs scroll content-height="300px">
        <tab title="标签1">
          <Fill>1</Fill>
        </tab>
        <tab title="标签2">
          <Fill>2</Fill>
        </tab>
        <tab title="标签3">
          <Fill>3</Fill>
        </tab>
        <tab title="标签4">
          <Fill>4</Fill>
        </tab>
        <tab title="标签5">
          <Fill>5</Fill>
        </tab>
        <tab title="标签6">
          <Fill>6</Fill>
        </tab>
      </tabs>
    </Block>
    <Block title="插槽">
      <tabs content-height="300px">
        <template #nav-left>
          <div style="line-height: 40px; padding: 0 5px;">nav-left</div>
        </template>
        <tab title="标签1">
          <Fill>1</Fill>
        </tab>
        <tab title="标签2">
          <Fill>2</Fill>
        </tab>
        <tab title="标签3">
          <template #title>
            title 插槽
          </template>
          <Fill>3</Fill>
        </tab>
      </tabs>
    </Block>
  </layout>
</template>

<script>
/** @format */

export const name = '标签页'
export default {}
</script>

<style lang="less">
/** @format */

.tabsDemo {
    height: 100vh;
    .rich-tabs {
        height: 100%;
    }
}
</style>
