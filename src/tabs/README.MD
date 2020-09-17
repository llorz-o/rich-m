# Tabs 标签页

## 引入

```js
import Vue from "vue";
import { Tabs, Tab } from "rich";

Vue.component(Tabs.name, Tabs);
```

## 代码演示

### 基础用法

通过`index.sync`绑定当前激活的 tab 的索引值,默认为`0`,亦可不绑定.

```vue
<tabs animated>
	<tab title="标签1">
		<Fill>1</Fill>
	</tab>
	<tab title="标签2" disable>
		<Fill>2</Fill>
	</tab>
	<tab title="标签3">
		<Fill>3</Fill>
	</tab>
</tabs>
```

### 滑动切换与粘性布局

`animated` 开启切换动画,`swiper`开启手势滑动,`sticky`开启粘性布局

```vue
<tabs animated swiper sticky>
	<tab title="标签1">
		<Fill>1</Fill>
	</tab>
	<tab title="标签2">
		<Fill>2</Fill>
	</tab>
	<tab title="标签3">
		<Fill>3</Fill>
	</tab>
</tabs>
```

### 卡片样式

`type="card"` 目前只有`default`与`card`两种样式

```vue
<tabs type="card">
	<tab title="标签1">
		<Fill>1</Fill>
	</tab>
	<tab title="标签2">
		<Fill>2</Fill>
	</tab>
	<tab title="标签3">
		<Fill>3</Fill>
	</tab>
</tabs>
```

### 滚动导航

`scroll`开启上下滑动,可设置内容高度形成滚动.`swipe-threshold`设置标签上限,超过上限将允许 `title` 滚动

```vue
<tabs scroll content-height="300px">
	<tab title="标签1">
		<Fill>1</Fill>
	</tab>
	<tab title="标签2">
		<Fill>2</Fill>
	</tab>
	<tab title="标签3">
		<Fill>3</Fill>
	</tab>
	<tab title="标签4">
		<Fill>4</Fill>
	</tab>
	<tab title="标签5">
		<Fill>5</Fill>
	</tab>
	<tab title="标签6">
		<Fill>6</Fill>
	</tab>
</tabs>
```

### 插槽

提供少量插槽

```vue
<tabs content-height="300px">
	<template #nav-left>
		<div style="line-height:40px;padding:0 5px;">nav-left</div>
	</template>
	<tab title="标签1">
		<Fill>1</Fill>
	</tab>
	<tab title="标签2">
		<Fill>2</Fill>
	</tab>
	<tab title="标签3">
        <template #title>
			title 插槽
        </template>
		<Fill >3</Fill>
	</tab>
</tabs>
```

## Api

### Tabs Props

| prop-name       | describe                     | type           | default-value |
| --------------- | ---------------------------- | -------------- | ------------- |
| index.sync         | 绑定当前选中标签的下标       | Number         | none          |
| animated        | 开启切换动画                 | Boolean        | false         |
| swiper          | 开启手势滑动切换             | Boolean        | false         |
| sticky          | 开启粘性 title               | Boolean        | false         |
| scroll          | 开启上下滚动                 | Boolean        | false         |
| content-height  | 设置内容区高度 ["200px",200] | String\|Number | none          |
| swipe-threshold | 超过该值将开启 title 滚动    | Number         | 4             |
| type            | 样式,["card"]                | String         | default       |
| offset-top | 粘性布局顶部距离 | String | 0px |

### Tab Props

| prop-name   | describe               | type    | default-value |
| ----------- | ---------------------- | ------- | ------------- |
| title-style | 标题栏样式             | String  | none          |
| disable     | 关闭该标签的切换与点击 | Boolean | false         |
| title       | 该标签的标题           | String  | ""            |
