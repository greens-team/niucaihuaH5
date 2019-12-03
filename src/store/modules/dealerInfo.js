// import moment from '@/plugins/moment' // 时间统一处理
// 经销商详情的数据
export default {
  state: {
    baseInfo: {},       // 获取经销商 - 基本信息
    contactslist: [],   // 获取经销商 - 联系人信息
    lesseelist: [],     // 获取经销商 - 承租人信息
    competitorlist: [], // 获取经销商 - 竞争对手信息

    tabs: [{
      id: 0,
      text: '基本信息'
    },{
      id: 1,
      text: '联系人'
    },{
      id: 2,
      text: '竞争对手'
    },{
      id: 3,
      text: '承租人'
    },{
      id: 4,
      text: '动态记录'
    },{
      id: 5,
      text: '操作历史'
    }],
    currentTabsIndex: 0,

    listNewslog: [],
    listOperatelog: []
  },
  mutations: {
    setInfo(state, data = {}){
      Object.assign(state.baseInfo, data)
    },
    setCurrentTabsIndex(state, num){
      state.currentTabsIndex = num
    },
  },
  actions: {
    editDealer ({state}, data={}) { // 编辑经销商信息
      return new Promise(resolve => {
        window.$ajax.dealer.editDealer(data).then(res => {
          if(!res.code){
            resolve('操作成功')
          }
        })
      })
    }, 
    getinfo ({state}, id) { // 获取经销商 - 基本信息
      return new Promise(resolve => {
        window.$ajax.dealer.getinfo({dealerGid: id}).then(res => {
          if(!res.code){
            state.baseInfo = res.data
            resolve(res)
          }
        })
      })
    }, 
    getcontactslist ({state}, id) { // 获取经销商 - 联系人信息
      return new Promise(resolve => {
        window.$ajax.dealer.getcontactslist({dealerGid: id}).then(res => {
          if(!res.code){
            state.contactslist = res.data
            resolve(res)
          }
        })
      })
    },
    getlesseelist ({state}, id) { // 获取经销商 - 承租人信息
      return new Promise(resolve => {
        window.$ajax.dealer.getlesseelist({dealerGid: id}).then(res => {
          if(!res.code){
            state.lesseelist = res.data
            resolve(res)
          }
        })
      })
    },
    getcompetitorlist ({state}, id) {  // 获取经销商 - 竞争对手信息
      return new Promise(resolve => {
        window.$ajax.dealer.getcompetitorlist({dealerGid: id}).then(res => {
          if(!res.code){
            state.competitorlist = res.data
            resolve(res)
          }
        })
      })
    }, 
    associatedcontacts ({state},data = {}) {  // 关联和解除关联联系人
      return new Promise(resolve => {
        window.$ajax.dealer.associatedcontacts(data).then(res => {
          if(!res.code){
            resolve('操作成功')
          }
        })
      })
    }, 
    associatedlessee ({state},data = {}) {  // 关联和解除关联承租人
      return new Promise(resolve => {
        window.$ajax.dealer.associatedlessee(data).then(res => {
          if(!res.code){
            resolve('操作成功')
          }
        })
      })
    }, 
    associatedcompetitor ({state},data = {}) {  // 关联和解除关联合作竞对
      return new Promise(resolve => {
        window.$ajax.dealer.associatedcompetitor(data).then(res => {
          if(!res.code){
            resolve('操作成功')
          }
        })
      })
    }, 
    listNewslog ({state},data = {}) {  // 获取动态记录列表
      return new Promise(resolve => {
        window.$ajax.dealer.listNewslog(data).then(res => {
          if(!res.code){
            state.listNewslog = data.pageNum == 1 ? res.data.list : state.listNewslog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    }, 
    addNewslog ({state},data = {}) {  // 添加动态记录列表
      return new Promise(resolve => {
        window.$ajax.dealer.addNewslog(data).then(res => {
          if(!res.code){
            resolve('操作成功')
          }
        })
      })
    }, 
    listOperatelog ({state},data = {}) {  // 获取操作记录列表
      return new Promise(resolve => {
        window.$ajax.dealer.listOperatelog(data).then(res => {
          if(!res.code){
            state.listOperatelog = data.pageNum == 1 ? res.data.list :  state.listOperatelog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    }, 

    

    
  }
}