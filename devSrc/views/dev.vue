<template>
  <div class="Dev">
    <div class="fill" style="height:300px;"></div>
    <div class="content" style="height:400px">
      <tabs sticky scroll animated swiper>
        <tab title="tab1">1</tab>
        <tab title="tab2">2</tab>
        <tab title="tab3">3</tab>
        <tab title="tab4">4</tab>
        <tab title="tab5">5</tab>
        <tab title="tab6">6</tab>
        <template #nav-right>
          <div class="navRight">12</div>
        </template>
      </tabs>
    </div>
    <div class="fill" style="height:600px;"></div>
  </div>
</template>

<style lang="less">
.Dev {
  margin-top: 100px;
  height: 100vh;
  overflow-y: scroll;
  .fill {
    background-color: #999;
  }
  .content {
    background-color: #e5e5e5;
    > * {
      background-color: #fff;
    }
  }
  .navRight {
    width: 40px;
    border-left: 1px solid #333;
    text-align: center;
    line-height: 40px;
  }
}
</style>
