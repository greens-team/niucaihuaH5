// import moment from '@/plugins/moment' // 时间统一处理
// 任务
export default {
  state: {
    // visitType followerUserGids ownerUserGids
    addEditTaskParams: {
      comment: '',
      dealerGid: '',
      followerUserGids: [],
      mainUserGids: [],
      otherUserGids: [],
      ownerUserGids: [],
      taskName: '',
      taskTime: new Date().getTime() / 1000,
      alarmTime: Math.floor((new Date().getTime() - 30 * 60 * 1000) / 1000),
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

    addEditVisitlogParams: {
      competitorList: [
        {
          modelGid: '',
          modelAttr: ''
        }
      ],
      competitorOrderCount: null,
      dealerDes: '',
      gid: '',
      lbPreOrderCount: null,
      lesseeList: [
        {
          lesseeName: '',
          lesseeComment: ''
        }
      ],
      pics: '',
      visitComment: ''
    },
    taskTypeArr: [
      {
        text: '拜访', value: 1
      },
      {
        text: '任务', value: 2
      }
    ],


  },
  mutations: {
    setAddEditVisitlogParams(state) {
      state.addEditVisitlogParams = {
        competitorList: [
          {
            modelGid: '',
            modelAttr: ''
          }
        ],
        competitorOrderCount: null,
        dealerDes: '',
        gid: '',
        lbPreOrderCount: null,
        lesseeList: [
          {
            lesseeName: '',
            lesseeComment: ''
          }
        ],
        pics: '',
        visitComment: ''
      }
    },
    setAddEditTaskParams(state, data = {}) {
      state.addEditTaskParams = Object.assign({
        comment: '',
        dealerGid: '',
        followerUserGids: [],
        mainUserGids: [],
        otherUserGids: [],
        ownerUserGids: [],
        taskName: '',
        taskTime: new Date().getTime() / 1000,
        alarmTime: Math.floor((new Date().getTime() - 30 * 60 * 1000) / 1000),
        taskType: 1,
        visitAim: 0,
        visitType: 0

      }, data)
    }
  },
  actions: {
    addTask({ state }, data = {}) {  // 新建任务接口
      return new Promise(resolve => {
        Object.assign(state.addEditTaskParams, data)
        let params = Object.assign({}, state.addEditTaskParams, {
          mainUserGids: state.addEditTaskParams.mainUserGids.length ? state.addEditTaskParams.mainUserGids.split(',').map(r => {
            return String(r)
          }) : [],
          otherUserGids: state.addEditTaskParams.otherUserGids.length ? state.addEditTaskParams.otherUserGids.split(',').map(r => {
            return String(r)
          }) : [],
        })
        window.$ajax.task.addTask(params).then(res => {
          if (!res.code) {
            resolve(res)
          }
        })
      })
    },
    getTaskInfo({ state }, id) {  // 获取任务详情
      return new Promise(resolve => {
        window.$ajax.task.getTaskInfo({ taskGid: id }).then(res => {
          if (!res.code) {
            state.taskInfo = res.data ? res.data : res
            resolve(res.msg || '')
          }
        })
      })
    },
    editTask({ state }, data = {}) {  // 编辑任务接口
      return new Promise(resolve => {
        window.$ajax.task.editTask(Object.assign(state.addEditTaskParams, data)).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },
    clockincheck({ state }, data = {}) {  // 签到打卡范围确认
      return new Promise(resolve => {
        window.$ajax.task.clockincheck(Object.assign(state.clockincheckParams, data)).then(res => {
          if (!res.code) {
            resolve(res)
          }
        })
      })
    },
    clockin({ state }, data = {}) {  // 确认打卡接口
      return new Promise(resolve => {
        window.$ajax.task.clockin(Object.assign(state.clockinParams, data)).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },
    addvisitlog({ state }, data = {}) {  // 添加拜访记录
      return new Promise(resolve => {
        window.$ajax.task.addvisitlog(Object.assign(state.addEditVisitlogParams, data)).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },
    editvisitlog({ state }, data = {}) {  // 编辑拜访记录
      return new Promise(resolve => {
        window.$ajax.task.editvisitlog(Object.assign(state.addEditVisitlogParams, data)).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },
    finishTask({ state }, id) {  // 编辑拜访记录
      return new Promise(resolve => {
        window.$ajax.task.finishTask({ taskGid: id }).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },


  }
}