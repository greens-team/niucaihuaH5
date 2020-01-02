import { stat } from "fs";

// import moment from '@/plugins/moment' // 时间统一处理
// 关联竞争对手
export default {
  state: {
    isLastPage: false,
    addParams: {
      competorName: '',
      competorType: null,
      comment: '',
      ownerUserGids: [],
      followerUserGids: []
    },
    info: {},   //合作竞对 - 基本信息

    editParams: {
      gid: '',
      competorName: '',
      competorType: 1,
      comment: '',
      ownerUserGids: [],
      followerUserGids: []
    },

    listParams: {
      queryString: '',
      orderType: 1,
      competorType: 1,
      pageNum: 1,
      pageSize: 10
    },

    list: [],
    total: 0,

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


    //合作竞对 关联和解除经销商

    confirmUserGids: [],
    jobsUser: [],
    jobsUser1: [],
    selectedUserGids: [],

    competorStatus_1: [
      '第三方', '厂商金融'
    ],
    competorStatus: [
      {
        text: '第三方',
        value: 1
      },
      {
        text: '厂商金融',
        value: 2
      }
    ],
    competorType: [
      { name: '全部', id: 0 },
      { name: '第三方', id: 1 },
      { name: '厂商金融', id: 2 },
      // { name: '银行', id: 3 }
    ],

    orderType: [
      { text: '默认排序', value: 1 },
      { text: '按名称排序', value: 2 }
    ],

    tabs: [{
      id: 0,
      text: '基本信息'
    }, {
      id: 1,
      text: '动态记录'
    }, {
      id: 2,
      text: '操作历史'
    }],
    currentTabsIndex: 0,

    // 获取动态记录
    listNewslog: [],

    // 获取操作记录
    listOperatelog: []

  },
  mutations: {
    setCurrentTabsIndex_competitor(state, num) {
      state.currentTabsIndex = num;
    },
    setInitParams(state) {
      state.listParams = {
        queryString: '',
        orderType: 1,
        competorType: 0,   //竞对类型 0全部 1第三方 2厂商金融
        pageNum: 1,
        pageSize: 10
      }
    },
    // setInitParams_tabs(state) {
    //   state.currentTabsIndex = 0
    // },
    setInitAddParams(state) {

      state.addParams = {
        competorName: '',
        competorType: 1,
        comment: '',
        ownerUserGids: [],
        followerUserGids: []
      }
    },
    // setEditParams(state) {
    //   state.editParams = {
    //     gid: '',
    //     competorName: '',
    //     competorType: 1,
    //     comment: '',
    //     ownerUserGids: [],
    //     followerUserGids: []
    //   }
    // },
    //编辑竞争对手 页面初始显示
    setParamsCompetitor(state, data = {}) {
      Object.assign(state.editParams, data)
    }
  },
  actions: {
    addCompetitor({ state }, data = {}) {   // 新建合作竞对
      return new Promise(resolve => {
        window.$ajax.competitor.addCompetitor(Object.assign(state.addParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },
    getCompetitorInfo({ state }, id) {   // 获取合作竞对详情
      return new Promise(resolve => {
        window.$ajax.competitor.getCompetitorInfo({ competitorGid: id }).then(res => {
          if (!Number(res.code)) {
            state.info = res.data
            resolve('操作成功')
          }
        })
      })
    },
    editCompetitor({ state }, data = {}) {   // 编辑合作竞对信息
      return new Promise(resolve => {
        window.$ajax.competitor.editCompetitor(Object.assign(state.editParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },
    // listCompetitor({ state }, data = {}) {   // 获取合作竞对列表
    //   let params = Object.assign(state.listParams, data);
    //   if (params.pageNum == 1) {
    //     state.isLastPage = false;
    //   }
    //   return new Promise(resolve => {
    //     if (state.isLastPage) {
    //       resolve();
    //       return;
    //     }
    //     window.$ajax.competitor.listCompetitor(params).then(res => {
    //       if (!res.code) {
    //         state.list = params.pageNum == 1 ? res.data.list : state.list.concat(res.data.list);
    //         if (res.data.list.length < params.pageSize)
    //           state.isLastPage = true
    //         resolve('操作成功')
    //       }
    //     })
    //   })
    // },

    listCompetitor({ state }, data = {}) {   // 获取合作竞对列表
      return new Promise(resolve => {
        window.$ajax.competitor.listCompetitor(Object.assign(state.listParams, data)).then(res => {
          if (!res.code) {
            state.list = res.data.list;
            state.total = res.data.total
            resolve(state.list)
          }
        })
      })
    },


    associatedCompetitor({ state }, data = {}) {   // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.competitor.associatedCompetitor(Object.assign(state.associatedParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },

    addNewslogCompetitor({ state }, data = {}) {   // 添加动态记录
      return new Promise(resolve => {
        window.$ajax.history.addNewslog(data).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },

    listNewslogCompetitor({ state }, data = {}) {   // 获取动态记录列表
      return new Promise(resolve => {
        window.$ajax.history.listNewslog(data).then(res => {
          if (!res.code) {
            state.listNewslog = data.pageNum == 1 ? res.data.list : state.listNewslog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    },

    listOperatelogCompetitor({ state }, data = {}) {   // 操作历史
      return new Promise(resolve => {
        window.$ajax.history.listOperatelog(data).then(res => {
          if (!res.code) {
            state.listOperatelog = data.pageNum == 1 ? res.data.list : state.listOperatelog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    }
  }
}