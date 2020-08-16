import Vue from "vue"
import VueRouter from 'vue-router'
import '../index'
import App from './App.vue'
import Rich from './lib/es6'

Vue.use(Rich)
Vue.use(VueRouter)

import home from './views/home.vue'
import page2 from './views/page2.vue'
import calendar from './views/calendar.vue'

const _routes = [{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		component: home,
		meta: {
			title: "键盘key测试"
		}
	},
	{
		path: "/page2",
		component: page2,
		meta: {
			title: "editor测试"
		}
	},
	{
		path: "/calendar",
		component: calendar,
		meta: {
			title: "日历组件"
		}
	},
]

window.__vue = new Vue({
	el: "#app",
	render: h => h(App),
	router: new VueRouter({
		mode: "hash",
		routes: _routes
	}),
	data() {
		return {
			localRoutes: _routes
		}
	},
})
