<template>
  <layout class="l1" @animation-end="animationEnd">
    <template #header>
      <div class="header">
        layout2
      </div>
    </template>
    <div class="block">
      <router-link to="/layout" replace>
        layout
      </router-link>
    </div>
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
        }
    },
    methods: {
        animationEnd() {
            this.$nextTick(() => (this.list = 10000))
            console.log('end')
        },
    },
}
</script>

<style lang="less">
/** @format */

.block {
    height: 200px;
}
</style>
