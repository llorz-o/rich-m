# Loading

## 引入

```js
import Vue from "vue";
import { Loading } from "rich";

Vue.use(Loading.name,Loading);
```

## 代码演示

### 基本使用

```vue
<loading text="加载中" />
```

### 样式类型

```vue
<loading text="加载中" type="point" />
```

## Props

### Loading

| prop-name | describe                                     | type   | default-value |
| --------- | -------------------------------------------- | ------ | ------------- |
| color     | 原型加载颜色                                 | String | none          |
| text      | 加载文字描述                                 | String | none          |
| type      | 圆形加载大小                                 | Number | 16            |
| type      | 加载组件样式[circle,point],point默认为随机色 | String | circle        |

