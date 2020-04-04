import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './register'

import Simulator from './components/simulator.vue'

import HomePage from './views/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "hash",
    routes: [{
        path: "*",
        component: HomePage
    }]
})

Vue.component(Simulator.name, Simulator)

const vm = new Vue({
    el: "#app",
    render: h => h(App),
    router
})

window.vue = vm