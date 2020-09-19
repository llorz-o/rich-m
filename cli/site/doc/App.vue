<template>
  <div>
    <Nav></Nav>
    <Siderbar width="200"></Siderbar>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="simulationWrapper">
      <Simulation></Simulation>
    </div>
  </div>
</template>

<script>
/** @format */

import Nav from './components/nav.vue'
import Siderbar from './components/siderbar.vue'
import Simulation from './components/simulation.vue'
export default {
    components: {
        Nav,
        Siderbar,
        Simulation,
    },
    mounted() {
        const width = window.screen.width
        if (width <= 768) location.href = 'https://llorz-o.github.io/rich-m/demo' + '/#' + this.$route.fullPath
    },
}
</script>

<style lang="less">
/** @format */

@import '../../../src/sty/index.less';
.content {
    margin-left: 200px;
    margin-right: 400px;
    .doc {
        min-width: 900px;
    }
}
.simulationWrapper {
    position: fixed;
    width: 400px;
    top: 50px;
    right: 0;
}
</style>
