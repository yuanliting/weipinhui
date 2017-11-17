// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import router from './router/router.js';
import './assets/font-awesome/css/font-awesome.min.css'
import './assets/jquery.js';
import store from './store'
import axios from 'axios';
import VueResource from 'vue-resource';
import Validator from 'vue-validator';
import lodash from 'lodash';
//时间模块
import moment from 'moment';
// import setCookie from  './assets/js/cookie'
Vue.prototype.$axios = axios;
Vue.prototype.$lodash = lodash;
Vue.use(VueResource);
Vue.use(Validator);
// Vue.filter('toTel',function (str) {
//     let start = str.substring(0,4);
//     let end = str.substring(-2);
//     return `${start}******${end}`;
// })
// Vue.use(VueRouter)
//
// const routes = [{
//   path: '/',
//   component: Home
// }]
//
// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
    store,
  render: h => h(App)
}).$mount('#app')
