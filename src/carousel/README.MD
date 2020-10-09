<!-- @format -->

# Layout

## 引入

```js
import Vue from 'vue'
import {Carousel, CarouselItem} from 'rich'

Vue.use(Carousel.name, Carousel)
Vue.use(CarouselItem.name, CarouselItem)
```

## 代码演示

### 基本使用

当前组件解决了在ios的回弹动画中有`过渡属性`时产生的抖动问题

```vue
<Carousel autoplay>
	<CarouselItem v-for="(item, index) in 5" :key="index">
		{{item}}
	</CarouselItem>
</Carousel>

<style lang="less" scoped>
/** @format */

.rich-carousel-item {
    text-align: center;
    line-height: 150px;
    font-weight: 600;
    font-size: 40px;
}
</style>
```
