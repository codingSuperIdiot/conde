import Vue from 'vue'
import Router from 'vue-router'
import artList from '@/components/artList'
import article from '@/components/active'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'artList',
      component: artList
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article
    }
  ]
})
