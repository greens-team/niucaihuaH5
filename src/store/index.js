import Vue from 'vue'
import Vuex from 'vuex'
import workbench from './modules/workbench'
import dealer from './modules/dealer'
import newDealer from './modules/newDealer'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workbench,
    dealer,
    newDealer
  },
  getters
})

export default store
