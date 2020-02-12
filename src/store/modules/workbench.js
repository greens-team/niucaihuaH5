import moment from '@/plugins/moment' // 时间统一处理
export default {
  state: {

    colleaguesTaskPageNum: 1,
    myTaskPageNum: 1,

    isLastPage: false,

    // 登录状态
    currentModelActive: 0,

    // 工作台任务状态
    workbenchTaskStatus: 0,
    // 同事任务参数
    taskColleagues: {
      userGids: [],
      deptGids: [],
      userType: 1
    },
    // 简报同事选择
    briefingColleagues: {
      userGids: [],
      deptGids: [],
      userType: 0
    },
    // 时间范围
    briefingDate: {
      text: '本月',
      startTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    },
    myTaskList: [],
    colleaguesTaskList: [],

    myTaskTime: new Date(moment().format('YYYY-MM-DD')), // 我的任务时间
    colleaguesTaskTime: new Date(moment().format('YYYY-MM-DD')), // 同事任务时间

    listParams: {
      userType: 0,
      startTime: 0,
      endTime: 0,
      userGids: [],
      deptGids: [],
      pageNum: 1,
      pageSize: 20
    },
    changeDealerList: [],
    newTaskParams: {
      userType: 0,
      startTime: 0,
      endTime: 0,
      userGids: [],
      deptGids: [],
      pageNum: 1,
      pageSize: 20
    },
    newMyTasklist: [],

    taskFinishStatus: [
      { name: '全部', id: 0 },
      { name: '已完成', id: 1 },
      { name: '未完成', id: 2 }
    ],
    ativeMyTaskStatus: 0,
    myTaskListCount: {
      "sumFinish": 0,
      "sumNotFinish": 0,
      "sumAll": 0
    }
  },
  mutations: {
    setLoginState(state, val) {
      // 变更登录状态
      localStorage.loginState = true
      state.currentModelActive = 0;
    },

    // 我的任务时间
    setMyTaskTime(state, val) {
      state.myTaskTime = val
    },
    // 同事任务时间
    setColleaguesTaskTime(state, val) {
      state.colleaguesTaskTime = val
    },
    // 工作台任务状态
    setWorkbenchTaskStatus(state, val) {
      state.workbenchTaskStatus = val
    },
    // 同事任务参数
    setTaskColleagues(state, data) {
      state.taskColleagues = data
    },
    // 简报同事选择
    setBriefingColleagues(state, data) {
      state.briefingColleagues = data
    },
    setBriefingDate(state, data) {
      state.briefingDate = data
    }
  },
  actions: {
    addRecentvisit({ state }, data = {}) {
      return new Promise(resolve => {
        window.$ajax.workbench.addRecentvisit(data).then(res => {
          resolve(res)
        })
      })
    },

    // 获取任务列表
    getTaskList({ state }, data = {}) {
      return new Promise(resolve => {
        let userGids = []
        state.taskColleagues.userGids.map(r => {
          userGids.push(r.split(',')[1])
        })
        let deptGids = []
        state.taskColleagues.deptGids.map(r => {
          deptGids.push(r.split(',')[1])
        })

        let params = {}
        let apiUrlKey = '';
        if (state.workbenchTaskStatus) {
          params = {
            startTime: this._vm.$root.timeStamp(moment(state.colleaguesTaskTime).format('YYYY-MM-DD 00:00:00')) / 1000,
            endTime: this._vm.$root.timeStamp(moment(state.colleaguesTaskTime).format('YYYY-MM-DD 23:59:59')) / 1000,
            userGids: userGids,
            deptGids: deptGids,
            userType: 1,
            pageNum: state.colleaguesTaskPageNum,
            pageSize: 20,
            finishType:state.ativeMyTaskStatus
          }
          apiUrlKey = 'tasklistpage'

        } else {
          params = {
            startTime: this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 00:00:00')) / 1000,
            endTime: this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 23:59:59')) / 1000,
            userGids: [String(JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID)],
            deptGids: [],
            userType: 0,
            pageNum: state.myTaskPageNum,
            pageSize: 20,
            finishType:state.ativeMyTaskStatus
          }
          apiUrlKey = 'taskmylistpage'
        }

        if (data.pageNum === 1) {
          state.myTaskPageNum = 1
          state.colleaguesTaskPageNum = 1
        }

        if (params.pageNum == 1) {
          state.isLastPage = false
        }

        if (state.isLastPage) {
          resolve()
          return
        }




        window.$ajax.workbench[apiUrlKey](params).then(res => {
          if (!res.code) {
            if (state.workbenchTaskStatus) {
              state.myTaskList = []
              state.colleaguesTaskList = params.pageNum == 1 ? res.data.list : state.colleaguesTaskList.concat(res.data.list)
              resolve(res.data.list.length)
            } else {
              state.colleaguesTaskList = []
              state.myTaskList = params.pageNum == 1 ? res.data.list : state.myTaskList.concat(res.data.list)
              resolve(res.data.list.length)
            }
            if (res.data.list.length < params.pageSize) {
              state.isLastPage = true
            }
          }
        })
      })
    },

    // 获取阶段性变化的经销商列表
    changeDealerList({ state }, data = {}) {

      let params = Object.assign(state.listParams, data)
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.workbench.changeDealerList(params).then(res => {
          if (!res.code) {
            state.changeDealerList = params.pageNum == 1 ? (res.data.list || []) : state.changeDealerList.concat(res.data.list);
            if (res.data.list && res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve('操作成功')
          }
        })
      })
    },


    // 新增的拜访记录列表
    newTaskList({ state }, data = {}) {
      let params = Object.assign(state.newTaskParams, data)
      if (params.pageNum == 1) {
        state.isLastPage = false;
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve();
          return;
        }
        window.$ajax.workbench.tasklistpage(params).then(res => {
          if (!res.code) {
            state.newMyTasklist = params.pageNum == 1 ? (res.data.list || []) : state.newMyTasklist.concat(res.data.list);
            if (res.data.list && res.data.list.length < params.pageSize) {
              state.isLastPage = true;
            }
            resolve('操作成功')
          }
        })
      })
    },


    mylistpagecount({ state }, data = {}) {
      return new Promise(resolve => {
        let userGids = []
        state.taskColleagues.userGids.map(r => {
          userGids.push(r.split(',')[1])
        })
        let deptGids = []
        state.taskColleagues.deptGids.map(r => {
          deptGids.push(r.split(',')[1])
        })

        let params = {}

        params = {
          startTime: this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 00:00:00')) / 1000,
          endTime: this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 23:59:59')) / 1000,
          userGids: [String(JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID)],
          deptGids: [],
          userType: 0,
          pageNum: state.myTaskPageNum,
          pageSize: 20,
          finishType: state.ativeMyTaskStatus
        }
        window.$ajax.workbench.mylistpagecount(params).then(res => {
          if (!res.code) {
            state.myTaskListCount = res.data;
            resolve(res.data)
          }
        })
      })
    },
  }
}