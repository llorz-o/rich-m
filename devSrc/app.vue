<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: '12',
    }
  },
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
body > .App {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
.App {
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
