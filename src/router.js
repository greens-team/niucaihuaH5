import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import DealerManage from './views/Dealer'                           // 经销商管理
import CreateDealer from './views/Dealer/CreateDealer.vue'          // 新增经销商

import NewContacts from './components/Contacts/newContacts.vue'     // 新建联系人
import ContactsList from './components/Contacts'                // 关联 获取联系人列表
import SelectedList from './components/Contacts/selectedList.vue'  // 关联 已选中的联系人

import CompetitorList from './components/Competitor'                // 关联 竞争对手列表
import SelectedCompetitorList from './components/Competitor/selectedList.vue'  // 关联 已选中的竞争对手

import LesseeList from './components/Lessee'                // 关联 竞争对手列表
import SelectedLesseeList from './components/Lessee/selectedList.vue'  // 关联 已选中的竞争对手

import DealerInfo from './views/Dealer/DealerInfo.vue'              // 经销商详情

import MyBaseInfo from './views/My/BaseInfo'                        // 我的基本信息
import Colleague from './views/Workbench/Colleague.vue'             // 选择同事及组织树
import RecentVisit from './views/Workbench/RecentVisit.vue'         // 最近访问

import DateRange from './components/DateRange'                      // 选择日期范围
import WorkbenchSearch from './views/Workbench/WorkbenchSearch.vue' // 选择同事


import Competitor from './views/Competitor'              //竞争对手列表页
import CompetitorInfo from './views/Competitor/info.vue'  //竞争对手详情页
import Lessee from './views/Lessee'              //竞争对手列表页
import LesseeInfo from './views/Lessee/info.vue'  //竞争对手详情页
import CreateLessee from './views/Lessee/CreateLessee.vue'          // 新增承租人


import recordCheck from './views/record'  //经销商提交备案信息 检查
import recordInfo from './views/record/info.vue'  //经销商提交备案


import CreateTask from './views/Task/create.vue'  //经销商拜访记录
import TaskDetail from './views/Task'  //任务详情


import DealerList from './components/Dealer'                // 关联 经销商列表
import SelectedDealerList from './components/Dealer/selectedList.vue'  // 关联 已选中的经销商


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


    {
      path: '/CompetitorList',   // 关联竞争对手
      name: 'CompetitorList',
      component: CompetitorList
    },
    {
      path: '/SelectedCompetitorList',   // 关联选中的竞争对手
      name: 'SelectedCompetitorList',
      component: SelectedCompetitorList
    },
    {
      path: '/LesseeList',   // 关联承租人
      name: 'LesseeList',
      component: LesseeList
    },
    {
      path: '/SelectedLesseeList',   // 关联选中的承租人
      name: 'SelectedLesseeList',
      component: SelectedLesseeList
    },

    {
      path: '/DealerList',   // 关联经销商
      name: 'DealerList',
      component: DealerList
    },
    {
      path: '/SelectedDealerList',   // 关联选中的经销商
      name: 'SelectedDealerList',
      component: SelectedDealerList
    },
    {
      path: '/Competitor',   //竞争对手列表页
      name: 'Competitor',
      component: Competitor
    },
    {
      path: '/CompetitorInfo',   //竞争对手详情页
      name: 'CompetitorInfo',
      component: CompetitorInfo
    },
    {
      path: '/Lessee',   //承租人列表页
      name: 'Lessee',
      component: Lessee
    },
    {
      path: '/LesseeInfo',   //承租人详情页
      name: 'LesseeInfo',
      component: LesseeInfo
    },
    {
      path: '/CreateLessee',   //新建承租人
      name: 'CreateLessee',
      component: CreateLessee
    },

    {
      path: '/recordCheck',   //经销商提交备案准入
      name: 'recordCheck',
      component: recordCheck
    },
    {
      path: '/recordInfo',   //经销商提交备案信息
      name: 'recordInfo',
      component: recordInfo
    },


    {
      path: '/CreateTask',   //新增拜访记录
      name: 'CreateTask',
      component: CreateTask
    },
    {
      path: '/TaskDetail',   //任务详情
      name: 'TaskDetail',
      component: TaskDetail
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
