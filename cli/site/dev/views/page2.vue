<template>
  <layout>
    <template #header>
      <Header title="Anything" @click-left="$router.go(-1)">
        <template #left>
          返回
        </template>
      </Header>
    </template>

    <notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />

    <pullup-loading :reqMethod="request">
      <div v-for="(item, index) in 100" :key="index">
        {{item}}
      </div>
    </pullup-loading>
  </layout>
</template>

<script>
/** @format */

export default {
    methods: {
        request() {
            return new Promise(resolve => {
                setTimeout(() => {
                    let flag = false // Math.random() > 0.5
                    resolve({
                        finished: flag,
                        error: !flag,
                    })
                }, 2000)
            })
        },
    },
}
</script>
