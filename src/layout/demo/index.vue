<template>
  <layout :promise="promiseList">
    <Header slot="header" left-text="返回" title="布局" @click-left="uninstall" />
    <div v-for="(item, index) in list" :key="index">
      {{item}}
    </div>
  </layout>
</template>

<script>
/** @format */
export const name = '布局'
export default {
    data() {
        return {
            list: 5,
            promiseList: [],
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.promiseList.push(() => {
                    this.list = 10000
                })
            }, 2000)
        },
        uninstall() {
			// 先清空数据再回退即可达到高帧率退场动画
            this.list = 0
            this.$nextTick(() => this.$router.go(-1))
        },
    },
    created() {
        this.getData()
    },
    beforeDestroy() {},
}
</script>
