import Vue from 'vue'
import Vuex from 'vuex'
import workbench from './modules/workbench'    // 工作台 - 所需数据
import dealer from './modules/dealer'          // 经销商 - 列表及筛选的数据
import dealerInfo from './modules/dealerInfo'  // 经销商 - 详情的数据
import newDealer from './modules/newDealer'    // 经销商 - 新建表单数据
import contacts from './modules/contacts'      // 联系人 - 增删改查 所需数据
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workbench,
    dealer,
    newDealer,
    contacts,
    dealerInfo
  },
  getters
})

export default store
