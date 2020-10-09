<template>
  <layout class="l1" :promise.sync="promiseList">
    <rich-header slot="header" left-text="返回" title="layout2" @click-left="$router.go(-1)" />
    <div class="block">
      <router-link to="/layout" replace>
        layout
      </router-link>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe>
    {{log}}
    {{list}}
    <div v-for="(item, index) in list" :key="index">{{item}}+2</div>
    <template #footer>
      <div class="footer">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </template>
  </layout>
</template>

<script>
/** @format */

export default {
    data() {
        return {
            list: [],
            log: '',
            promiseList: [],
        }
    },
    methods: {
        animationEnd() {
            this.promiseList.push(() => (this.list = 10000))
        },
    },
    created() {
        this.animationEnd()
    },
}
</script>

<style lang="less">
/** @format */

.block {
    height: 200px;
}
</style>
