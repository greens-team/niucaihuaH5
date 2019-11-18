// import moment from '@/plugins/moment' // 时间统一处理
// 关联竞争对手
export default {
  state: {

    addParams: {
      competorName: '',
      competorType: 0,
      comment: '',
      ownerUserGids: [],
      followerUserGids: []
    },
    info: {},   //合作竞对 - 基本信息

    editParams: {
      gid: '',
      competorName: '',
      competorType: 0,
      comment: '',
      ownerUserGids: [],
      followerUserGids: []
    },

    listParams: {
      queryString: '',
      orderType: 1,
      competorType: 0,
      pageNum: 1,
      pageSize: 10
    },

    list: [],

    associatedParams: {
      associatedType: 1,
      modelGid: '',
      associatedAttr: [
        {
          modelGid: '',
          modelAttr: '',
          modelAttr2: ''
        }
      ]
    },

    confirmUserGids: [],
    jobsUser: [],
    jobsUser1: [],
    selectedUserGids: [],

    competorStatus: [
      '第三方', '厂商金融'
    ],
    competorType: [
      { name: '全部', id: 0 },
      { name: '第三方', id: 1 },
      { name: '厂商金融', id: 2 },
      { name: '银行', id: 3 }
    ],

    tabs: [{
      id: 0,
      text: '基本信息'
    }, {
      id: 1,
      text: '操作历史'
    }, {
      id: 2,
      text: '动态记录'
    }],
    currentTabsIndex: 0

  },
  mutations: {
    setCurrentTabsIndex_competitor(state, num) {
      state.currentTabsIndex = num;
    },
    setInitParams(state) {
      state.listParams = {
        queryString: '',
        orderType: 1,
        competorType: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    setInitParams_tabs(state){
      state.currentTabsIndex = 0
    }
  },
  actions: {
    addCompetitor({ state }, data = {}) {   // 新建合作竞对
      return new Promise(resolve => {
        window.$ajax.competitor.addCompetitor(Object.assign(state.addParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    getCompetitorInfo({ state }, id) {   // 获取合作竞对详情
      return new Promise(resolve => {
        window.$ajax.competitor.getCompetitorInfo({ competitorGid: id }).then(res => {
          if (!Number(res.code)) {
            state.info = res.data
            resolve(res.msg)
          }
        })
      })
    },
    editCompetitor({ state }, data = {}) {   // 编辑合作竞对信息
      return new Promise(resolve => {
        window.$ajax.competitor.editCompetitor(Object.assign(state.editParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    listCompetitor({ state }, data = {}) {   // 获取合作竞对列表
      return new Promise(resolve => {
        window.$ajax.competitor.listCompetitor(Object.assign(state.listParams, data)).then(res => {
          if (!Number(res.code)) {
            state.list = res.data.list
            resolve(res.msg)
          }
        })
      })
    },
    associatedCompetitor({ state }, data = {}) {   // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.competitor.associatedCompetitor(Object.assign(state.associatedParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
  }
}