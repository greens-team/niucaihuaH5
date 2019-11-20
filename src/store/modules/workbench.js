import moment from '@/plugins/moment' // 时间统一处理
export default {
  state: {
    
    colleaguesTaskPageNum:1,
    myTaskPageNum:1,

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
      endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    myTaskList: [],
    colleaguesTaskList: [],

    myTaskTime: new Date(moment().format('YYYY-MM-DD')), // 我的任务时间
    colleaguesTaskTime: new Date(moment().format('YYYY-MM-DD')), // 同事任务时间
  },
  mutations: {
    setLoginState (state, val) {
      // 变更登录状态
      localStorage.loginState = val
      state.currentModelActive = 0
    },

    // 我的任务时间
    setMyTaskTime (state, val) {
      state.myTaskTime = val
    },
    // 同事任务时间
    setColleaguesTaskTime (state, val) {
      state.colleaguesTaskTime = val
    },
    // 工作台任务状态
    setWorkbenchTaskStatus (state, val) {
      state.workbenchTaskStatus = val
    },
    // 同事任务参数
    setTaskColleagues (state, data) {
      state.taskColleagues = data
    },
    // 简报同事选择
    setBriefingColleagues (state, data) {
      state.briefingColleagues = data
    },
    setBriefingDate(state, data) {
      state.briefingDate = data
    }
  },
  actions: {
    addRecentvisit({state}, data = {}){
      return new Promise(resolve=>{
        window.$ajax.workbench.addRecentvisit(data).then(res => {
          resolve(res)
        })
      })
    },

    // 获取任务列表
    getTaskList({state},data = {}){
      let userGids = []
      state.taskColleagues.userGids.map(r => {
        userGids.push(r.split(',')[1])
      })
      let deptGids = []
      state.taskColleagues.deptGids.map(r => {
        deptGids.push(r.split(',')[1])
      })

      let params = {}
      if(state.workbenchTaskStatus){
        params = {
          startTime:this._vm.$root.timeStamp(moment(state.colleaguesTaskTime).format('YYYY-MM-DD 00:00:00'))/1000,
          endTime:this._vm.$root.timeStamp(moment(state.colleaguesTaskTime).format('YYYY-MM-DD 23:59:59'))/1000,
          userGids: userGids,
          deptGids: deptGids,
          userType: 1,
          pageNum: state.colleaguesTaskPageNum,
          pageSize: 20
        }
      }else{
        params = {
          startTime:this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 00:00:00'))/1000,
          endTime:this._vm.$root.timeStamp(moment(state.myTaskTime).format('YYYY-MM-DD 23:59:59'))/1000,
          userGids: [],
          deptGids: [],
          userType: 0,
          pageNum: state.myTaskPageNum,
          pageSize: 20
        }
      }
      Object.assign(params, data)

      if(params.pageNum == 1){
        state.isLastPage = false
      }

      if(state.isLastPage){
        return
      }
      
      window.$ajax.workbench.taskList(params).then(res => {
        if(!res.code){
          if (state.workbenchTaskStatus) {
            state.myTaskList = []
            state.colleaguesTaskList = params.pageNum == 1 ? res.data.list : state.colleaguesTaskList.concat(res.data.list)
          } else { 
            state.colleaguesTaskList = []
            state.myTaskList = params.pageNum == 1 ? res.data.list : state.myTaskList.concat(res.data.list)
          }
          if(res.data.list.length < params.pageSize){
            state.isLastPage = true
          }
        }
      })

    },
  }
}