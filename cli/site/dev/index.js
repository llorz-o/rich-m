import Vue from "vue"
import VueRouter from 'vue-router'
import '../index'
import App from './App.vue'

Vue.use(VueRouter)

import home from './views/home.vue'
import page2 from './views/page2.vue'

const _routes = [{
		path: "/",
		redirect: "/home"
	}, {
		path: "/home",
		component: home
	},
	{
		path: "/page2",
		component: page2
	}
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
