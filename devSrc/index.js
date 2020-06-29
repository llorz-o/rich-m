import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './register'

import Simulator from './components/simulator.vue'

import HomePage from './views/home.vue'
import DebPage from './views/dev.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "hash",
    routes: [{
        path: '/dev',
        component: DebPage,
    }, {
        path: "*",
        component: HomePage
    }]
})

Vue.component(Simulator.name, Simulator)


Vue.config.devtools = true
Vue.config.performance = true
Vue.config.productionTip = false


const vm = new Vue({
    el: "#app",
    render: h => h(App),
    router
})

window.vue = vm