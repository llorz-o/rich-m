import Vue from "vue"
import VueRouter from 'vue-router'
import '../index'
import App from './App.vue'

Vue.use(VueRouter)

import home from './views/home.vue'
import page2 from './views/page2.vue'
import loading from './views/loading.vue'
import layout from './views/layout.vue'
import layout2 from './views/layout2.vue'

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
		path: "/loading",
		component: loading,
		meta: {
			title: "加载组件"
		}
	},
	{
		path: "/layout",
		component: layout,
		meta: {
			title: "布局组件"
		}
	},
	{
		path: "/layout2",
		component: layout2,
		meta: {
			title: "布局组件"
		}
	},
]

const $bus = new Vue({})

Vue.prototype.$bus = $bus

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
	watch: {
		$route(news) {
			console.log(news);
		}
	},
})
