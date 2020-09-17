<template>
  <div class="root">
    <transition enter-active-class="animated enter" leave-active-class="animated leave">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
/** @format */

export default {}
</script>

<style lang="less">
/** @format */

@import '../../../src/sty/index.less';
html,
body,
.root {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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
            left: 100%;
        }
        to {
            left: 0;
        }
    }
}
.leave {
    animation-name: leave;
    @keyframes leave {
        0% {
            left: 0;
        }
        to {
            left: -100%;
        }
    }
}
.rich-layout__content::before {
    height: 40px;
}
.rich-layout__content::after {
}
</style>
