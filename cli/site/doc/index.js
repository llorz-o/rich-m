import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App.vue"

Vue.use(VueRouter)

window.__vue = new Vue({
    el: "#app",
    render: h => h(App),
    router: new VueRouter({
        mode: "hash",
        routes: []
    })
})