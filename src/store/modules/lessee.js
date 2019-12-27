import { stat } from "fs";

// import moment from '@/plugins/moment' // 时间统一处理
// 关联 承租人
export default {
  state: {
    isLastPage: false,
    addParams: {
      birthday: 0,
      comment: '',
      domicilePlace: '',
      followerUserGids: [],
      gender: null,   //性别
      homeAddress: '',
      idcardBackPic: '',
      idcardFrontPic: '',
      idcardNum: '',
      lesseeName: '',
      lesseePhone: '',
      lesseeType: null,
      marry: 0,    //婚否
      ownerUserGids: [],
      userPic: '',
      workingYears: null
    },
    genderList: [{             // 选择性别
      text: '男',
      value: 0
    }, {
      text: '女',
      value: 1
    }],
    marryList: [{             // 是否已婚
      text: '否',
      value: 0
    }, {
      text: '是',
      value: 1
    }],
    lesseeTypeList: [
      {
        text: '自然人',
        value: 0
      },
      {
        text: '法人',
        value: 1
      }
    ],
    info: {},

    editParams: {
      birthday: '',
      comment: '',
      domicilePlace: '',
      followerUserGids: [],
      gender: '',
      homeAddress: '',
      idcardBackPic: '',
      idcardFrontPic: '',
      idcardNum: '',
      lesseeName: '',
      lesseePhone: '',
      lesseeType: '',
      marry: 0,
      ownerUserGids: [],
      userPic: '',
      workingYears: '',
      lesseeStatus: 1,
      giveupReason: '',
      giveupComment: '',
      gid: ''
    },

    listParams: {
      queryString: '',
      orderType: 1,
      lesseeStatus: 0,
      pageNum: 1,
      pageSize: 10
    },
    list: [],

    associatedParams: {
      associatedType: 1,
      modelGid: '',
      modelGids: []
    },

    //承租人 关联和解除关联经销商

    confirmUserGids: [],
    jobsUser: [],
    selectedUserGids: [],

    lesseeStatus: [
      { name: '全部', id: 0 },
      { name: '线索承租人', id: 1 },
      { name: '已出单', id: 2 },
      // { name: '放弃', id: 3 }
    ],
    orderType: [
      { text: '默认排序', value: 1 },
      { text: '按名称排序', value: 2 }
    ],
    status: [
      {
        text: '线索承租人', value: 1
      },
      {
        text: '已出单', value: 2
      }
    ],
    tabs: [{
      id: 0,
      text: '基本信息'
    }, {
      id: 1,
      text: '经销商'
    }, {
      id: 2,
      text: '动态记录'
    }, {
      id: 3,
      text: '操作历史'
    }],
    currentTabsIndex: 0,

    // 获取动态记录
    listNewslog: [],

    // 获取操作记录
    listOperatelog: []

  },
  mutations: {
    setInfo(state, data = {}) {
      Object.assign(state.info, data)
    },
    setCurrentTabsIndex_lessee(state, num){
      state.currentTabsIndex = num
    },
    setInitParams(state) {
      state.listParams = {
        queryString: '',
        orderType: 1,
        lesseeStatus: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    // setInitParams_tabs(state) {
    //   state.currentTabsIndex = 0
    // },
    setInitAddParams(state) {
      state.addParams = {

        birthday: null,
        comment: '',
        domicilePlace: '',
        followerUserGids: [],
        gender: null,
        homeAddress: '',
        idcardBackPic: '',
        idcardFrontPic: '',
        idcardNum: '',
        lesseeName: '',
        lesseePhone: '',
        lesseeType: null,
        marry: 0,
        ownerUserGids: [],
        userPic: '',
        workingYears: null,
        lesseeStatus: 0,
        giveupReason: '',
        giveupComment: '',
        gid: ''
      }
    },

    //编辑承租人 页面初始显示
    setParamsLessee(state, data = {}) {
      Object.assign(state.editParams, data);
    }
  },
  actions: {
    addLessee({ state }, data = {}) {   // 新建承租人
      return new Promise(resolve => {
        window.$ajax.lessee.addLessee(Object.assign(state.addParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },
    getLesseeInfo({ state }, id) {   // 获取承租人详情
      return new Promise(resolve => {
        window.$ajax.lessee.getLesseeInfo({ lesseeGid: id }).then(res => {
          if (!Number(res.code)) {
            state.info = res.data
            resolve('操作成功')
          }
        })
      })
    },
    editLessee({ state }, data = {}) {   // 编辑承租人信息
      return new Promise(resolve => {
        window.$ajax.lessee.editLessee(Object.assign(state.editParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },
    listLessee({ state }, data = {}) {   // 获取承租人列表
      let params = Object.assign(state.listParams, data)
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.lessee.listLessee(params).then(res => {
          if (!res.code) {
            state.list = params.pageNum == 1 ? res.data.list : state.list.concat(res.data.list);
            if (res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve('操作成功')
          }
        })
      })
    },
    associatedLessee({ state }, data = {}) {   // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.lessee.associatedLessee(Object.assign(state.associatedParams, data)).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },

    addNewslogLessee({ state }, data = {}) {   // 添加动态记录
      return new Promise(resolve => {
        window.$ajax.history.addNewslog(data).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },

    listNewslogLessee({ state }, data = {}) {   // 获取动态记录列表
      return new Promise(resolve => {
        window.$ajax.history.listNewslog(data).then(res => {
          if (!res.code) {
            state.listNewslog = data.pageNum == 1 ? res.data.list : state.listNewslog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    },

    listOperatelogLessee({ state }, data = {}) {   // 操作历史
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