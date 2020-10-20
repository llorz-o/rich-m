<template>
  <div class="page">
    <RichTabs>
      <RichTab title="t1">
        <virtual-list class="list">
          <pullup-loading>
            <virtual class="row" v-for="(item1, index) in 100" :key="index">
              <div class="row">
                <span class="item" v-for="(item, index) in 30" :key="index">
                  {{item1}}-{{item}}
                </span>
              </div>
            </virtual>
          </pullup-loading>
        </virtual-list>
      </RichTab>
      <RichTab title="t2">
        <virtual-list class="list">
          <pullup-loading>
            <virtual class="row" v-for="(item1, index) in 100" :key="index">
              <div class="row">
                <span class="item" v-for="(item, index) in 30" :key="index">
                  {{item1}}-{{item}}
                </span>
              </div>
            </virtual>
          </pullup-loading>
        </virtual-list>
      </RichTab>
    </RichTabs>

  </div>
</template>

<script>
/** @format */
export const title = '虚拟节点'
export default {}
</script>

<style lang="less" scoped>
/** @format */
.page {
    overflow-y: auto;
}
.list {
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid red;
    .row {
        max-width: 100vw;
        overflow: hidden;
        .item {
            white-space: nowrap;
            border: 1px solid #555;
            line-height: 80px;
        }
    }
}
</style>
