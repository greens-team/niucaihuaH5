import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import DealerManage from './views/dealer/DealerManage.vue' // 经销商管理
import CreateDealer from './views/dealer/CreateDealer.vue' // 新增经销商
import NewContacts from './views/dealer/NewContacts.vue'   // 新建联系人
import MyBaseInfo from './views/My/BaseInfo/Base.vue'
import Colleague from './views/Workbench/Colleague.vue'    // 选择同事
import RecentVisit from './views/Workbench/RecentVisit.vue'          // 最近访问


import DateRange from './components/DateRange/index.vue'    // 选择时间段
import WorkbenchSearch from './views/Workbench/WorkbenchSearch.vue'    // 选择同事




Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/DealerManage', // 经销商管理
      name: 'DealerManage',
      component: DealerManage
    },
    {
      path: '/CreateDealer', // 新增经销商
      name: 'CreateDealer',
      component: CreateDealer
    },
    {
      path: '/NewContacts',  // 新建联系人
      name: 'NewContacts',
      component: NewContacts
    },
    {
      path: '/RecentVisit', // 最近访问
      name: 'RecentVisit',
      component: RecentVisit
    },
    {
      path: '/MyBaseInfo',
      name: 'MyBaseInfo',
      component: MyBaseInfo
    },
    {
      path: '/Colleague',
      name: 'Colleague',
      component: Colleague
    },
    {
      path: '/DateRange',
      name: 'DateRange',
      component: DateRange
    },
    {
      path: '/WorkbenchSearch',
      name: 'WorkbenchSearch',
      component: WorkbenchSearch
    },
    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
