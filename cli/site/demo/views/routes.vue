<template>
  <layout class="pageRoutes">
    <Header slot="header" left-text="返回" title="首页" @click-left="$router.go(-1)" />
    <router-link :to="item.path" v-for="(item, index) in $root.pageRoutes" :key="index">
      {{ item.meta.title }} {{ item.meta.pageName }}
    </router-link>
  </layout>
</template>

<script>
/** @format */

export default {}
</script>

<style lang="less">
/** @format */

.pageRoutes {
    a {
        margin: 10px;
        display: block;
        line-height: 30px;
        border-radius: 15px;
        padding: 0 10px;
        text-decoration: none;
        color: #555;
        font-size: 13px;
        background-color: #f9f9f9;
        box-shadow: 0px 2px 15px rgba(50, 50, 50, 0.1), inset -2px 2px 5px rgba(255, 255, 255);
        &:hover {
            box-shadow: 0px 2px 2px rgba(50, 50, 50, 0.15), inset -2px 2px 5px rgba(255, 255, 255);
        }
    }
}
</style>
