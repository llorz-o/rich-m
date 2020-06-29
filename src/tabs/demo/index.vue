<template>
  <div class="tabsDemo">
    <tabs animated>
      <tab title="test12">
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
        <p>2123</p>
      </tab>

      <tab title="test34">
        34
      </tab>

      <tab title="test45">
        <template slot="tab-left" v-if="showSlot">left</template>
        <template slot="tab-right" v-if="showSlot">right</template>
        <div class="button" @click="onClick">
          close
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSlot: true,
    }
  },
  methods: {
    onClick() {
      this.showSlot = !this.showSlot
    },
  },
}
</script>

<style lang="less">
.tabsDemo {
  height: 100vh;
  .x-tabs {
    height: 100%;
  }
}
</style>
