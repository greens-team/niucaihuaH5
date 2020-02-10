// import moment from '@/plugins/moment' // 时间统一处理
// 联系人数据
export default {
  state: {
    isLastPage: false,
    selectedUserGids: [], // 已选中的联系人列表
    confirmUserGids: [], // 最终确认的联系人列表
    jobsUser: [], // 职位

    listContactsParams: {  // 获取联系人列表
      queryString: '',
      orderType: 1,
      pageNum: 1,
      pageSize: 10,
      followerUserGids: [],     // 跟进人gid 集合
      ownerUserGids: [],        // 负责人gid 集合
      contactsName: "",
      contactsPhone: "",
      weichatNum: "",
      comment: ""
    },
    listContacts: [],
    total: 0,

    createContactsParams: {    //新建联系人信息
      contactsName: '',
      contactsPhone: '',
      weichatNum: '',
      comment: '',
      ownerUserGids: [],
      followerUserGids: []
    },


    contactsInfo: {},

    editContactsParams: {  // 编辑联系人信息
      contactsName: '',
      contactsPhone: '',
      weichatNum: '',
      comment: '',
      ownerUserGids: [],
      followerUserGids: [],
      gid: ''
    },

    associatedContactsParams: {  // 关联和解除关联经销商
      associatedType: 1,
      modelGid: '',
      associatedAttr: [
        {
          modelGid: '',
          modelAttr: ''
        }
      ]
    },

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
    listOperatelog: [],

    dropDownType: [
      { text: '全部联系人', value: 0 },
      { text: '我负责的', value: 1 },
      { text: '我参与的', value: 2 }
    ],
    dropDownValue: 0,

  },
  mutations: {
    setCreateContactsParamsEmpty(state) { // 初始新建联系人参数
      state.createContactsParams = {
        contactsName: '',
        contactsPhone: '',
        weichatNum: '',
        comment: '',
        ownerUserGids: [],
        followerUserGids: []
      }
    },
    setCurrentTabsIndex_contacts(state, num) {
      state.currentTabsIndex = num
    },
    // setInitParams_tabs(state) {
    //   state.currentTabsIndex = 0
    // },
    setInitParams(state) {
      state.listContactsParams = {  // 获取联系人列表
        queryString: '',
        orderType: 1,
        pageNum: 1,
        pageSize: 10,
        followerUserGids: [],     // 跟进人gid 集合
        ownerUserGids: [],        // 负责人gid 集合
        
        contactsName: "",
        contactsPhone: "",
        weichatNum: "",
        comment: ""
      }
    },
    //编辑页面初始显示
    setParamsContatcs(state, data = {}) {
      Object.assign(state.editContactsParams, data);
    }
  },
  actions: {
    listContacts({ state }, data = {}) {  // 获取联系人列表

      let params = Object.assign(state.listContactsParams, data);
      //负责人
      if (params.ownerUserGids && params.ownerUserGids.length && params.ownerUserGids[0].id) {
        params.ownerUserGids = params.ownerUserGids.map(r => {
          return String(r.id)
        })
      }
      //参与人
      if (params.followerUserGids && params.followerUserGids.length && params.followerUserGids[0].id) {
        params.followerUserGids = params.followerUserGids.map(r => {
          return String(r.id)
        })
      }
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.contacts.listContacts(params).then(res => {
          if (!res.code) {
            state.listContacts = params.pageNum == 1 ? res.data.list : state.listContacts.concat(res.data.list);
            if (res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve('操作成功')
          }
        })
      })

      // return new Promise(resolve => {
      //   window.$ajax.contacts.listContacts(Object.assign(state.listContactsParams, data)).then(res => {
      //     if (!Number(res.code)) {
      //       state.listContacts = res.data.list
      //       state.total = res.data.total
      //       resolve()
      //     }
      //   })
      // })
    },
    createContacts({ state }, data = {}) {  // 新建联系人
      return new Promise(resolve => {
        window.$ajax.contacts.createContacts(Object.assign(state.createContactsParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve(res)
          }
        })
      })
    },
    getContactsInfo({ state }, gid) { // 获取联系人详情
      return new Promise(resolve => {
        window.$ajax.contacts.getContactsInfo({ contactsGid: gid }).then(res => {
          if (!Number(res.code)) {
            state.contactsInfo = res.data
            resolve()
          }
        })
      })
    },
    editContacts({ state }, data = {}) {  // 编辑联系人信息
      return new Promise(resolve => {
        window.$ajax.contacts.editContacts(Object.assign(state.editContactsParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },
    associatedContacts({ state }, data = {}) { // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.contacts.associatedContacts(Object.assign(state.associatedContactsParams, data)).then(res => {
          if (!Number(res.code)) {
            resolve('操作成功')
          }
        })
      })
    },

    addNewslogContacts({ state }, data = {}) {   // 添加动态记录
      return new Promise(resolve => {
        window.$ajax.history.addNewslog(data).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },

    listNewslogContacts({ state }, data = {}) {   // 获取动态记录列表
      return new Promise(resolve => {
        window.$ajax.history.listNewslog(data).then(res => {
          if (!res.code) {
            state.listNewslog = data.pageNum == 1 ? res.data.list : state.listNewslog.concat(res.data.list)
            resolve(res.data.list.length)
          }
        })
      })
    },

    listOperatelogContacts({ state }, data = {}) {   // 操作历史
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