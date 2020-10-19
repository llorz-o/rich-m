<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/** @format */

export default {}
</script>

<style lang="less">
/** @format */
@import '../../../src/sty/index.less';
.block {
    height: 300px;
    border: 1px solid #555;
    margin: 5px;
}
a {
    display: inline-block;
    padding: 10px;
    margin: 2px 4px;
    border: 1px solid red;
}
html,
body,
#app {
    height: 100%;
    width: 100%;
    width: 100vw;
    overflow: hidden;
    position: relative;
}
.animated {
    position: absolute;
    top: 0;
    left: 0;
    animation-timing-function: linear;
    animation-duration: 300ms;
}
.enter {
    animation-name: enter;
    @keyframes enter {
        0% {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
.leave {
    animation-name: leave;
    @keyframes leave {
        0% {
            left: 0;
            opacity: 1;
        }
        to {
            left: 0;
            opacity: 0;
        }
    }
}
</style>
