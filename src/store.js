import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态
    loginState: false,
    currentModelActive: 0
  },
  mutations: {
    setLoginState (state, res) {
      // 变更登录状态
      state.loginState = res
      localStorage.loginState = res
      state.currentModelActive = 0
    }
  },
  actions: {

  }
})