import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import DealerManage from './views/Dealer'                           // 经销商管理
import CreateDealer from './views/Dealer/CreateDealer.vue'          // 新增经销商
import NewContacts from './components/Contacts/newContacts.vue'     // 新建联系人
import ContactsList from './components/Contacts'                // 获取联系人列表
import SelectedList from './components/Contacts/selectedList.vue'  // 已选中的联系人
import DealerInfo from './views/Dealer/DealerInfo.vue'              // 经销商详情

import MyBaseInfo from './views/My/BaseInfo'                        // 我的基本信息
import Colleague from './views/Workbench/Colleague.vue'             // 选择同事及组织树
import RecentVisit from './views/Workbench/RecentVisit.vue'         // 最近访问

import DateRange from './components/DateRange'                      // 选择日期范围
import WorkbenchSearch from './views/Workbench/WorkbenchSearch.vue' // 选择同事


import Map from './components/Map'                              // 选择地图

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
      path: '/DealerManage',     // 经销商管理
      name: 'DealerManage',
      component: DealerManage
    },
    {
      path: '/CreateDealer',     // 新增经销商
      name: 'CreateDealer',
      component: CreateDealer
    },
    {
      path: '/ContactsList',      // 获取联系人列表
      name: 'ContactsList',
      component: ContactsList 
    },{
      path: '/SelectedList',      // 新建联系人
      name: 'SelectedList',
      component: SelectedList
    },{
      path: '/NewContacts',      // 新建联系人
      name: 'NewContacts',
      component: NewContacts
    },
    {
      path: '/RecentVisit',      // 最近访问
      name: 'RecentVisit',
      component: RecentVisit
    },
    {
      path: '/MyBaseInfo',      // 基本信息
      name: 'MyBaseInfo',
      component: MyBaseInfo
    },
    {
      path: '/Colleague',       // 选择同事及组织
      name: 'Colleague',
      component: Colleague
    },
    {
      path: '/DateRange',       // 日期范围
      name: 'DateRange',
      component: DateRange
    },
    {
      path: '/WorkbenchSearch', // 工作台搜索
      name: 'WorkbenchSearch',
      component: WorkbenchSearch
    },
    {
      path: '/DealerInfo', // 经销商详情
      name: 'DealerInfo',
      component: DealerInfo
    },
    {
      path: '/Map',   // 地图
      name: 'Map',
      component: Map
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
