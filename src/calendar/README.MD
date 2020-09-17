# Calendar 日历组件

## 引入

```javascript
import Vue from "vue";
import { Calendar } from "rich";

Vue.component(Calendar.name, Calendar);
```

## 代码演示

### 请求 api,设置错误提示

```vue
<calendar :get-data="getData" fail-tip="请求数据失败了!!" height="325px" />

<script>
export default {
	methods: {
		getData() {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(Math.random() > 0.5);
				}, 2000);
			});
		}
	}
};
</script>
```

### 关闭文字背景,设置起始星期

```vue
<calendar height="325px" :first-day-of-week="1" :is-background="false" />
```

### 自定义渲染插槽

```vue
<calendar ref="calendar" :get-data="getData2">
	<template v-slot:title="{ year, month }">
		{{ year }}/{{ month }}
	</template>
	<template v-slot:default="{ year, month, day, currentMonth }">
		<div class="day rich-hairline--top" :class="{ toMonth: Number(month) + 1 === Number(currentMonth)}">
			Y: {{ year }}<br />
			M: {{ month }}<br />
			D:{{ day }}<br />
		</div>
	</template>
	<template v-slot:reqstate="{ isFaild }">
		<div style="background-color: #fff; border-radius: 5px; padding: 5px;" >
			<div v-if="isFaild" @click="() => $refs.calendar.getCalendarData()">
				请求失败
			</div>
			<div v-else>
				请求中...
			</div>
		</div>
	</template>
</calendar>

<script>
export default {
	methods: {
		getData2() {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(Math.random() > 0.5);
				}, 2000);
			});
		}
	}
};
</script>
```

### Api

### Calender Props

| prop-name      | describe                              | type       | default-value               |
| -------------- | ------------------------------------- | ---------- | --------------------------- |
| height         | 日历高度                              | String     | 80vh                        |
| getData        | 获取异步数据                          | _Function_ | () => Promise.reslove(true) |
| firstDayOfWeek | 设置日历的第一天为星期几;0 为周日;0-6 | Number     | 0                           |
| failTip        | getData 返回 false 后的提示语         | String     | 日历请求失败,点击重新请求!  |
| isBackground   | 是否启用背景                          | Boolean    | false                       |

### Calender Slot

| slot-name | describe               | slot-props                                 |
| --------- | ---------------------- | ------------------------------------------ |
| default   | 日历内容               | year, month                                |
| title     | 关闭该标签的切换与点击 | year, month(0-11), day, currentMonth(1-12) |
| reqstate  | 请求状态               | isFaild                                    |
