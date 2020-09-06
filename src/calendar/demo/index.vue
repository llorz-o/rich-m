
<template>
    <div class="calendarDemo">
        <Block title="请求api;设置错误提示">
            <calendar :get-data="getData" fail-tip="请求数据失败了!!" height="325px"></calendar>
        </Block>
        <Block title="关闭文字背景,设置起始星期">
            <calendar height="325px" :first-day-of-week="1" :is-background="false"></calendar>
        </Block>
        <Block title="自定义渲染插槽">
            <calendar ref="calendar" :get-data="getData2">
                <template v-slot:title="{ year, month }">{{ year }}/{{ month }}</template>
                <template v-slot:default="{ year, month, day, currentMonth }">
                    <div
                        class="day x-hairline--top"
                        :class="{
							toMonth: Number(month) + 1 === Number(currentMonth),
						}"
                    >
                        Y: {{ year }}
                        <br />
                        M: {{ month }}
                        <br />
                        D:{{ day }}
                        <br />
                    </div>
                </template>
                <template v-slot:reqstate="{ isFaild }">
                    <div style="background-color: #fff; border-radius: 5px; padding: 5px;">
                        <div v-if="isFaild" @click="() => $refs.calendar.getCalendarData()">请求失败</div>
                        <div v-else>请求中...</div>
                    </div>
                </template>
            </calendar>
        </Block>
    </div>
</template>

<script>
/** @format */

export const name = '日历'
export default {
    data() {
        return {}
    },
    methods: {
        getData() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(Math.random() > 0.5)
                }, 2000)
            })
        },
        getData2() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(Math.random() > 0.5)
                }, 2000)
            })
        },
    },
}
</script>

<style lang="less">
/** @format */

.calendarDemo {
    height: 100vh;
    .day {
        font-size: 10px;
        width: 14.2857%;
        padding: 10px 0;
        opacity: 0.2;
        &[class*='x-hairline']::after {
            border-color: red;
        }
        &.toMonth {
            opacity: 1;
        }
    }
}
</style>
