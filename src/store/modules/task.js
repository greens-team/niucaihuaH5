// import moment from '@/plugins/moment' // 时间统一处理
// 任务
export default {
  state: {
    // visitType followerUserGids ownerUserGids
    addEditTaskParams: {
      alarmTime: 0,
      comment: '',
      dealerGid: '',
      followerUserGids: [],
      mainUserGids: [],
      otherUserGids: [],
      ownerUserGids: [],
      taskName: '',
      taskTime: 0,
      taskType: 1,
      visitAim: 0,
      visitType: 0
    },

    taskInfo: {},

    clockincheckParams: {
      gid: '',
      longitude: 1,
      latitude: 1
    },

    clockinParams: {
      gid: '',
      longitude: 1,
      latitude: 1,
      clockinPlaceName: '',
      clockinPlaceAddress: ''
    },

    addEditVisitlogParams:{
      competitorList: [
        {
          modelGid: '',
          modelAttr: ''
        }
      ],
      competitorOrderCount: 0,
      dealerDes: '',
      gid: '',
      lbPreOrderCount: 0,
      lesseeList: [
        {
          lesseeName: '',
          lesseeComment: ''
        }
      ],
      pics: '',
      visitComment: ''
    },

  },
  mutations: {
  },
  actions: {
    addTask ({state}, data={}) {  // 新建任务接口
      return new Promise(resolve => {
        window.$ajax.task.addTask(Object.assign(state.addEditTaskParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },
    getTaskInfo ({state}, id) {  // 获取任务详情
      return new Promise(resolve => {
        window.$ajax.task.getTaskInfo({taskGid: id}).then( res => {
          if (!res.code) {
            this.taskInfo = res.data ? res.data : res
            resolve(res.msg || '')
          }
        })
      })
    },
    editTask ({state}, data={}) {  // 编辑任务接口
      return new Promise(resolve => {
        window.$ajax.task.editTask(Object.assign(state.addEditTaskParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },
    clockincheck ({state}, data={}) {  // 签到打卡范围确认
      return new Promise(resolve => {
        window.$ajax.task.clockincheck(Object.assign(state.clockincheckParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },
    clockin ({state}, data={}) {  // 确认打卡接口
      return new Promise(resolve => {
        window.$ajax.task.clockin(Object.assign(state.clockinParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },
    addvisitlog ({state}, data={}) {  // 添加拜访记录
      return new Promise(resolve => {
        window.$ajax.task.addvisitlog(Object.assign(state.addEditVisitlogParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },
    editvisitlog ({state}, data={}) {  // 编辑拜访记录
      return new Promise(resolve => {
        window.$ajax.task.editvisitlog(Object.assign(state.addEditVisitlogParams, data)).then( res => {
          if (!res.code) {
            resolve(res.msg)
          }
        })
      })
    },

    
  }
}