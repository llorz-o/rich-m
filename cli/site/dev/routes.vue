<template>
  <div class="routes">
    <router-link :to="item.path" v-for="(item, index) in $root.localRoutes" :key="index">
      <div class="button">
        {{ item.meta && item.meta.title }}
      </div>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
/** @format */

.routes {
    a {
        display: block;
    }
}
</style>
