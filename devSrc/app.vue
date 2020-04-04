<template>
  <div class="main">
    <div class="topNav">12</div>
    <div class="bottomContent">
      <div class="leftNav">
        <router-link to="/home">home</router-link>
        <router-link to="/tabs">tabs</router-link>
      </div>
      <div class="context">
        <router-view></router-view>
      </div>
      <Simulator />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: '12'
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body,
html {
  width: 100%;
  height: 100%;
}
body,
body > .main {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
}
.main {
  flex-direction: column;
  border: 1px solid black;

  .bottomContent {
    flex: 1;
    display: flex;
    > .context {
      flex: 1;
    }
  }
}
</style>
