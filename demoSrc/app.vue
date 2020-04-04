<template>
  <div id="app"><router-view></router-view></div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body,
html {
  height: 100%;
  width: 100%;
}
body {
  display: flex;
  flex: 1;
}
#app {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>
