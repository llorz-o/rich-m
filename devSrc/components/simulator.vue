<template>
  <div class="simulator">
    <iframe src="./static/demo/index.html" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Simulator'
}
</script>

<style lang="less">
.simulator {
  width: 375px;
  height: 667px;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.14);
  position: relative;
  > iframe {
    width: 375px;
    height: 667px;
  }
}
</style>
