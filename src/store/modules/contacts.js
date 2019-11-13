// import moment from '@/plugins/moment' // 时间统一处理
// 联系人数据
export default {
  state: {
    selectedUserGids: [], // 已选中的联系人列表
    confirmUserGids: [], // 最终确认的联系人列表
    jobsUser: [], // 职位
    
    listContactsParams: {  // 获取联系人列表
      queryString: '',
      orderType: 1,
      pageNum: 1,
      pageSize: 20
    },
    listContacts: [],
    total: 0,

    createContactsParams: {},

    getContactsInfoParams: {  // 获取联系人详情
      contactsGid: ""
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

  },
  mutations: {
    setCreateContactsParamsEmpty(state){ // 初始新建联系人参数
      state.createContactsParams = {
        contactsName: '',
        contactsPhone: '',
        weichatNum: '',
        comment: '',
        ownerUserGids: [],
        followerUserGids: []
      }
    }
  },
  actions: {
    listContacts({state}, data = {}){  // 获取联系人列表
      return new Promise(resolve => {
        window.$ajax.contacts.listContacts(Object.assign(state.listContactsParams, data)).then( res => {
          if (!Number(res.code)) {
            state.listContacts = res.data.list
            state.total = res.data.total
            resolve()
          }
        })
      })
    },
    createContacts({state}, data = {}){  // 新建联系人
      return new Promise(resolve => {
        window.$ajax.contacts.createContacts(Object.assign(state.createContactsParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    getContactsInfo({state}, data = {}){ // 获取联系人详情
      return new Promise(resolve => {
        window.$ajax.contacts.getContactsInfo(Object.assign(state.getContactsInfoParams, data)).then( res => {
          if (!Number(res.code)) {
            state.contactsInfo = res.data
            resolve()
          }
        })
      })
    },
    editContacts({state}, data = {}){  // 编辑联系人信息
      return new Promise(resolve => {
        window.$ajax.contacts.editContacts(Object.assign(state.editContactsParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve()
          }
        })
      })
    },
    associatedContacts({state}, data = {}){ // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.contacts.associatedContacts(Object.assign(state.associatedContactsParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve()
          }
        })
      })
    }
  }
}