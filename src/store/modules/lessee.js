// import moment from '@/plugins/moment' // 时间统一处理
// 关联 承租人
export default {
  state: {
    
    addParams: {
      birthday: 0,
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
      workingYears: 0
    },
    info: {},

    editParams: {
      birthday: 0,
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
      workingYears: 0,
      lesseeStatus: 0,
      giveupReason: '',
      giveupComment: '',
      gid: ''
    },

    listParams: {
      queryString: '',
      orderType: 1,
      lesseeStatus: 1,
      pageNum: 1,
      pageSize: 10
    },
    list: [],

    associatedParams: {
      associatedType: 1,
      modelGid: '',
      modelGids: []
    },

    confirmUserGids: [],
    jobsUser: [],
    selectedUserGids: [],

  },
  mutations: {
  },
  actions: {
    addLessee({state}, data = {}){   // 新建承租人
      return new Promise(resolve => {
        window.$ajax.lessee.addLessee(Object.assign(state.addParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    getLesseeInfo({state}, id){   // 获取承租人详情
      return new Promise(resolve => {
        window.$ajax.lessee.getLesseeInfo({lesseeGid: id}).then( res => {
          if (!Number(res.code)) {
            state.info = res.data
            resolve(res.msg)
          }
        })
      })
    },
    editLessee({state}, data = {}){   // 编辑承租人信息
      return new Promise(resolve => {
        window.$ajax.lessee.editLessee(Object.assign(state.editParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    listLessee({state}, data = {}){   // 获取承租人列表
      return new Promise(resolve => {
        window.$ajax.lessee.listLessee(Object.assign(state.listParams, data)).then( res => {
          if (!Number(res.code)) {
            state.list = res.data.list
            resolve(res.msg)
          }
        })
      })
    },
    associatedLessee({state}, data = {}){   // 关联和解除关联经销商
      return new Promise(resolve => {
        window.$ajax.lessee.associatedLessee(Object.assign(state.associatedParams, data)).then( res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
  }
}