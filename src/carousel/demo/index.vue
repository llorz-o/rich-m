<template>
  <layout>
    <Header slot="header" left-text="返回" title="轮播" @click-left="$router.go(-1)" />
    <Block title="基本使用">
      <Carousel autoplay>
        <CarouselItem v-for="(item, index) in 5" :key="index">
          {{item}}
        </CarouselItem>
      </Carousel>
    </Block>
  </layout>
</template>

<script>
/** @format */
export const name = '轮播'
export default {}
</script>

<style lang="less" scoped>
/** @format */

.rich-carousel-item {
    text-align: center;
    line-height: 150px;
    font-weight: 600;
    font-size: 40px;
}
</style>
