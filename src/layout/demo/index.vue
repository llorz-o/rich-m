<template>
  <layout :promise="promiseList">
    <Header slot="header" left-text="返回" title="布局" @click-left="$router.go(-1)" />
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
            }, 1000)
        },
    },
    created() {
        this.getData()
    },
}
</script>
