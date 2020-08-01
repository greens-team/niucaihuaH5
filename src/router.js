import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
    },{
      path: '/team',
      name: 'team',
      component: () => import(/* webpackChunkName: "Team" */ './views/Team.vue')
    },
  ]
})
