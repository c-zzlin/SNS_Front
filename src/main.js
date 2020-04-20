// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'												//ajax请求
import Axios from 'axios'
import './mock/mockServer.js'

import $ from 'jquery'
Vue.config.productionTip = false
/*Axios.defaults.baseURL = 'api/'*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
 render:h=> h(App),
})


