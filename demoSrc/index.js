import Vue from 'vue'
import VueRouter from 'vue-router'
import '../devSrc/register'
import "../src/sty/index.less"

import App from './app.vue'

import routes from './demoRoutes'

Vue.use(VueRouter)

import HomePage from './views/home.vue'

routes.push(...[{
    path: "/",
    component: HomePage
}])

const router = new VueRouter({
    mode: 'hash',
    base: "/",
    routes
})

Vue.config.devtools = true
Vue.config.performance = true
Vue.config.productionTip = false

new Vue({
    el: "#app",
    render: h => h(App),
    router,
    created() {
        this.init()
    },
    methods: {
        init() {
            window.parent.vue.$router.beforeEach((to, from, next) => {
                next()
            })
            window.parent.vue.$router.afterEach((to, from) => {
                if (this.$route.path !== window.parent.vue.$route.path) {
                    if (window.parent.vue.$route.matched.length > 0) {
                        this.$router.push(window.parent.vue.$route.fullPath)
                    }
                }
            })
            if (this.$route.path !== window.parent.vue.$route.path) {
                if (window.parent.vue.$route.matched.length > 0) {
                    // console.log(window.parent.vue.$route.path);
                    this.$router.push(window.parent.vue.$route.fullPath)
                }
            }
        }
    },
})