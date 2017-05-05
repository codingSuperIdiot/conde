// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  axios from  'axios'
import VueScroller from 'vue-scroller'
import * as filters from './js/filters'

//重置样式
require('./css/reset.css');

//axios写入vue
Vue.prototype.axios = axios;

//循环过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.config.productionTip = false

//上拉下拉刷新
Vue.use(VueScroller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
