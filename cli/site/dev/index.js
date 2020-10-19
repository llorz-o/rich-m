import Vue from 'vue'
import VueRouter from 'vue-router'
import '../index'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.less';

Vue.use(VueRouter)
Vue.use(Vant)


const _routes = [{
	path: "/",
	meta: {
		title: "路由列表"
	},
	component: () => import("./routes.vue")
}]

const requireComponent = require.context(
	// 其组件目录的相对路径
	'./views',
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/[A-z0-9-]+\.vue$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const page = requireComponent(fileName)
	// 获取组件的 PascalCase 命名
	// 获取和目录深度无关的文件名
	const componentName = fileName
		.split('/')[1]
		.replace(/\.\w+$/, '')

	_routes.push({
		path: `/${componentName}`,
		component: page.default || page,
		meta: {
			title: page.title || componentName
		},
	})
})

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
