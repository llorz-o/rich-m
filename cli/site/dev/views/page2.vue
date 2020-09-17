<template>
  <layout>
    <template #header>
      <Header title="header" @click-left="$router.go(-1)">
        <template #left>
          返回
        </template>
      </Header>
    </template>
  </layout>
</template>

<script>
/** @format */

export default {}
</script>
