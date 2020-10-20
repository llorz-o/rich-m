<template>
  <div class="item">
    {{source.value}}
  </div>
</template>

<script>
/** @format */

export default {
    props: {
        index: {
            // index of current item
            type: Number,
        },
        source: {
            // here is: {uid: 'unique_1', text: 'abc'}
            type: Object,
            default() {
                return {}
            },
        },
    },
}
</script>

<style lang="less">
/** @format */

.item {
    height: 50px;
}
</style>
