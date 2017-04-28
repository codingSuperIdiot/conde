/**
 * Created by supercodingfans on 2017/4/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const userStore = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo:{}
  }
})
