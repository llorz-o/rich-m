<template>
  <div class="page">
    <div class="view">
      <div class="box" ref="box" :style="style"></div>
    </div>
    <div style="height:1000px">
      h:1000px
    </div>
  </div>
</template>

<script>
/** @format */

export default {
    data() {
        return {
            variable: 10,
        }
    },
    computed: {
        style() {
            return {
                border: `1px solid red`,
                width: `${100}px`,
                height: `100px`,
                transitionDuration: `${this.variable * 300}ms`,
                transform: `translate3d(${this.variable * 10}px,${this.variable * 10}px,0)`,
                position: `absolute`,
            }
        },
    },
    created() {
        setInterval(() => {
            this.variable = Math.random() * 10
        }, 1000)
    },
    mounted() {
        const box = this.$refs.box
    },
}
</script>

<style lang="less">
/** @format */

.page {
    height: 101%;
    .my-swipe {
        height: 150px;
        .van-swipe-item {
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            background-color: #39a9ed;
        }
    }
    .van-swipe__track,
    .van-swipe-item {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transition-duration: 300ms !important;
        transform: translate(375px, 0px) translateZ(0px) !important;
    }

    .view {
        position: relative;
        height: 100vw;
        background-color: #6f9;
        overflow: hidden;
    }
}
</style>
