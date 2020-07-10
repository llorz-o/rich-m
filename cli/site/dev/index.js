import Vue from "vue"
import '../index'
import App from './App.vue'

window.__vue = new Vue({
    el: "#app",
    render: h => h(App),
})