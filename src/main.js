import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'
import store from './store/'

import './assets/css/font-awesome.min.css'
import './assets/css/style.css'

import mintUi from "mint-ui"
import 'mint-ui/lib/style.css'


Vue.use(mintUi)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})



new Vue({
  el: '#app',
  router ,
  store ,
  render: h => h(App)
})
