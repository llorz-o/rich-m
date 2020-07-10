import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {
    getDemoPages
} from "../index"

Vue.use(VueRouter)

import Routes from './views/routes.vue'

const router = new VueRouter({
    mode: "hash",
    routes: [{
            path: "/",
            component: Routes
        },
        ...getDemoPages(),
        {
            path: "*",
            component: Routes
        }
    ]
})

import Block from './components/Block.vue'
import Fill from './components/Fill.vue'

Vue.component(Block.name, Block)
Vue.component(Fill.name, Fill)

window.__vue = new Vue({
    el: "#app",
    render: h => h(App),
    data() {
        return {
            pageRoutes: getDemoPages(),
        }
    },
    router
})