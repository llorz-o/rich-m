# Layout

## 引入

```js
import Vue from "vue";
import { Layout } from "rich";

Vue.use(Layout.name,Layout);
```

## transition

```vue
<div class="root">
    <transition
                enter-active-class="animated enter"
                leave-active-class="animated leave">
        <router-view></router-view>
    </transition>
</div>

<style lang="less">
html,
body,
.root {
    width: 100%;
    height: 100%;
	position: relative;
	overflow: hidden;
}
.animated {
    position: absolute;
    top: 0;
    left: 0;
    animation-timing-function: linear;
    animation-duration: 300ms;
}
.enter {
    animation-name: enter;
    @keyframes enter {
        0% {
            left: 100%;
        }
        to {
            left: 0;
        }
    }
}
.leave {
    animation-name: leave;
    @keyframes leave {
        0% {
            left: 0;
        }
        to {
            left: -100%;
        }
    }
}
</style>
```



## 代码演示

在`api`请求后将赋值的函数`push`入`promiseList`中,`layout`组件会在动画结束后进行赋值.

>页面渲染会影响动画的帧数,必须将赋值推迟至动画结束后

```vue
<layout :promise="promiseList">
	 <div v-for="item in list" :key="item">{{item}}</div>
</layout>

<script>
export default {
    data(){
        return {
            promiseList:[],
            list:[]
        }
    },
    methods:{
        getData(){
            setTimeout(() => {
                // 请求api
                this.promiseList.push(() => {
                    // 将赋值方法推入数组
                    this.list = [1,2,3,4,5]
                })
            },2000)
        }
    },
    create(){
        this.getData()
    }
}
</script>
```

## Api

### Layout Props

| prop-name | describe       | type       | default-value |
| --------- | -------------- | ---------- | ------------- |
| promise   | 赋值函数的数组 | [Function] | []            |

