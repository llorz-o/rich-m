import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App.vue"
import Doc from './views/Doc.vue'

import * as docs from '../../dist/component-descript'

Vue.use(VueRouter)

let routes = []
let componentsKeys = Object.keys(docs)

componentsKeys.forEach(key => routes.push({
	path: `/${key}`,
	component: Doc,
}))

window.__vue = new Vue({
	el: "#app",
	render: h => h(App),
	router: new VueRouter({
		mode: "hash",
		routes,
	}),
	data() {
		return {
			componentsKeys,
			currentComponent: null,
		}
	},
	computed: {
		doc() {
			return this.currentComponent && docs[this.currentComponent]
		}
	},
	watch: {
		$route(news) {
			let {
				component
			} = news.query
			this.currentComponent = component
		}
	},
	mounted() {
		let {
			component
		} = this.$route.query
		this.currentComponent = component
	},
})
