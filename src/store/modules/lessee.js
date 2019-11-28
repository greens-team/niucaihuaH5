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
      gender: 0,   //性别
      homeAddress: '',
      idcardBackPic: '',
      idcardFrontPic: '',
      idcardNum: '',
      lesseeName: '',
      lesseePhone: '',
      lesseeType: 0,
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
      birthday: null,
      comment: '',
      domicilePlace: '',
      followerUserGids: [],
      gender: 0,
      homeAddress: '',
      idcardBackPic: '',
      idcardFrontPic: '',
      idcardNum: '',
      lesseeName: '',
      lesseePhone: '',
      lesseeType: 0,
      marry: 0,
      ownerUserGids: [],
      userPic: '',
      workingYears: null,
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
      { text: '按创建时间排序', value: 1 },
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

    //添加动态记录
    addNewslogParams: {
      modelObjType: 3,  //1 经销商 2 联系人 3 承租人 4 竞争对手
      modelId: "",
      content: '',
      pics: ''
    },
    // 获取动态记录
    newslogParams: {
      modelObjType: 3,
      modelId: "",
      pageNum: 1,
      pageSize: 10
    },
    listNewslog: [],

    // 获取操作记录
    operatelogParams: {
      modelObjType: 3,
      modelId: "",
      pageNum: 1,
      pageSize: 10
    },
    listOperatelog: []

  },
  mutations: {
    setInfo(state, data = {}) {
      Object.assign(state.info, data)
    },
    setCurrentTabsIndex_lessee(state, num) {
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
    setInitParams_tabs(state) {
      state.currentTabsIndex = 0
    },
    setInitAddParams(state) {
      state.addParams = {

        birthday: null,
        comment: '',
        domicilePlace: '',
        followerUserGids: [],
        gender: 0,
        homeAddress: '',
        idcardBackPic: '',
        idcardFrontPic: '',
        idcardNum: '',
        lesseeName: '',
        lesseePhone: '',
        lesseeType: 0,
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
            resolve(res.msg)
          }
        })
      })
    },
    getLesseeInfo({ state }, id) {   // 获取承租人详情
      return new Promise(resolve => {
        window.$ajax.lessee.getLesseeInfo({ lesseeGid: id }).then(res => {
          if (!Number(res.code)) {
            state.info = res.data
            resolve(res.msg)
          }
        })
      })
    },
    editLessee({ state }, data = {}) {   // 编辑承租人信息
      return new Promise(resolve => {
        window.$ajax.lessee.editLessee(Object.assign(state.editParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve(res.msg)
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
            resolve(res.msg)
          }
        })
      })
    },
    associatedLessee({ state }, data = {}) {   // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.lessee.associatedLessee(Object.assign(state.associatedParams, data)).then(res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },

    addNewslogLessee({ state }, data = {}) {   // 添加动态记录
      return new Promise(resolve => {
        window.$ajax.history.addNewslog(Object.assign(state.addNewslogParams, data)).then(res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },

    listNewslogLessee({ state }, data = {}) {   // 获取动态记录列表
      let params = Object.assign(state.newslogParams, data)
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.history.listNewslog(params).then(res => {
          if (!res.code) {
            state.listNewslog = params.pageNum == 1 ? res.data.list : state.listNewslog.concat(res.data.list);
            if (res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve(res.msg)
          }
        })
      })
    },

    listOperatelogLessee({ state }, data = {}) {   // 操作历史
      let params = Object.assign(state.operatelogParams, data)
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.history.listOperatelog(params).then(res => {
          if (!res.code) {
            state.listOperatelog = params.pageNum == 1 ? res.data.list : state.listOperatelog.concat(res.data.list);
            if (res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve(res.msg)
          }
        })
      })
    }
  }
}