import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home' 
import team from './modules/team' 
// import newDealer from './modules/newDealer'    // 经销商 - 新建表单数据
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    team
  },
  getters
})

export default store
