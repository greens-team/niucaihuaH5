import Vue from 'vue'
import Vuex from 'vuex'
import workbench from './modules/workbench'    // 工作台 - 所需数据
import dealer from './modules/dealer'          // 经销商 - 列表及筛选的数据
import dealerInfo from './modules/dealerInfo'  // 经销商 - 详情的数据
import newDealer from './modules/newDealer'    // 经销商 - 新建表单数据
import contacts from './modules/contacts'      // 联系人 - 增删改查 所需数据
import competitor from './modules/competitor'  // 合作竞对
import lessee from './modules/lessee'          // 承租人
import record from './modules/record'          // 承租人
import task from './modules/task'              // 任务
import my from './modules/my'              // 任务
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workbench,
    dealer,
    newDealer,
    contacts,
    dealerInfo,
    competitor,
    lessee,
    record,
    task,
    my
  },
  getters
})

export default store
