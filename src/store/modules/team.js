import moment from '@/plugins/moment' // 时间统一处理
export default {
  state: {
    team: {},
    userList: [],
    productAllList: [],
    productList: [],
    showProductList: [],
    currentUser: {id: ''},
    tip1: '',
    tip2: ''
  },
  mutations: {
    setCurrentUser(state, currentUser){
      if(currentUser == ''){
        state.currentUser = {id: ''}
        state.showProductList = state.productList
        state.tip1 = state.userList.length+'名成员'+state.productAllList.length+'个产品'
        state.tip2 = '已上架'+state.productList.length+'个产品'
      }else{
        state.currentUser = currentUser
        state.showProductList = state.productList.filter(row=>row.user_id == currentUser.id)

        let temp = state.productAllList.filter(row=>row.user_id == currentUser.id)
        state.tip1 = currentUser.name+'有'+temp.length+'个产品'
        state.tip2 = '已上架'+state.showProductList.length+'个产品'
      }
    }
  },
  actions: {
    getTeamInfo({ state }, data = {}){
      return new Promise(resolve => {
        window.$ajax.team.getTeamInfo(data).then(res => {
          state.team = res.data
          resolve(res)
        })
      })
    },
    postUserList({ state, dispatch }, data = {}){
      return new Promise(resolve => {
        window.$ajax.team.postUserList(data).then(res => {
          state.userList = res.data
          dispatch('postProductsList', data)
          resolve(res)
        })
      })
    },
    postProductsList({ state }, data = {}){
      return new Promise(resolve => {
        window.$ajax.team.postProductsList(data).then(res => {
          state.productAllList = res.data;
          state.productList = res.data.filter(row => {
            if(Number(row.sales)){
              row.pics = row.pics ? row.pics.split(',').map(r=>{return window[window.ENV]+r;}) : []
              return true
            }
          })
          console.log(state.productList, 777)
          // state.showProductList = JSON.parse(JSON.stringify(state.productList))
          state.showProductList = state.productList
          state.tip1 = state.userList.length+'名成员'+state.productAllList.length+'个产品'
          state.tip2 = '已上架'+state.productList.length+'个产品'
          resolve(res)
        })
      })
    },
  }
}