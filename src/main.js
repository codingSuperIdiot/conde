// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  axios from  'axios'
import {filterTime} from './js/index'

Vue.prototype.axios = axios

Vue.filter('time',function (creatTime) {
  let oldtime = new Date(creatTime);
  let newtime = (new Date() - oldtime)/1000;
  let month = Math.floor(newtime/3600/24/30);
  let day = Math.floor(newtime/3600/24);
  let hours = Math.floor(newtime/3600);
  let mins = Math.floor(newtime/60);
  let str = '';
  if (hours === 0) {
    if (mins <= 3) {
      str = '刚刚';
    } else {
      str = mins + '分钟前';
    }
  } else if (day === 0){
    str = hours + '小时前';
  } else if (month === 0){
    str = day + '天前';
  } else {
    str = month + '月前';
  }
  return str;
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
