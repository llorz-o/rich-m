<template>
  <div class="Dev">
    <div class="fill" style="height:300px;"></div>
    <div class="content" style="height:400px">
      <tabs sticky animated scroll swiper>
        <tab title="tab1">
          <div class="box">1</div>
        </tab>
        <tab title="tab2">
          <div class="box">2</div>
        </tab>
        <tab title="tab3">
          <div class="box">3</div>
        </tab>
        <tab title="tab4">
          <div class="box">4</div>
        </tab>
        <tab title="tab5">
          <div class="box">5</div>
        </tab>
        <tab title="tab6">
          <div class="box">6</div>
        </tab>
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
  .box {
    height: 200px;
  }
  .x-tabs__content {
    height: 400px;
  }
}
</style>
