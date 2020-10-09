<template>
  <div>
    <carousel :index.sync="index">
      <carousel-item v-for="(item, index) in 2" :key="index">
        {{item}}
      </carousel-item>
    </carousel>
    <div style="height:1000px;"></div>
  </div>
</template>

<script>
/** @format */

export default {
    data() {
        return {
            index: 0,
        }
    },
}
</script>

<style lang="less" scoped>
/** @format */
.rich-carousel-item {
    text-align: center;
    line-height: 150px;
    font-weight: 600;
    font-size: 40px;
}
</style>
