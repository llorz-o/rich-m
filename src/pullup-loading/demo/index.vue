<template>
  <layout>
    <Header slot="header" left-text="返回" title="上拉加载" @click-left="$router.go(-1)" />

    <Block title="基本使用">
      <div style="height:120px;overflow-y:auto;">
        <PullupLoading :req-method="getData" :disable="disable">
          <div v-for="(item, index) in 30" :key="index">
            {{item}}
          </div>
        </PullupLoading>
      </div>
    </Block>
  </layout>
</template>

<script>
/** @format */

export const name = '上拉加载'
export default {
    data() {
        return {
            disable: false,
        }
    },
    methods: {
        getData() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.disable = true
                    resolve({
                        finished: false,
                        error: true,
                    })
                    // maybe reject()
                }, 3000)
            })
        },
    },
}
</script>
