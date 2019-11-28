/**
 * m: mock
 */
// 任务 所需接口
export default (m) => {
  return {
    get: {
      getTaskInfo: m.GET + '/task/getinfo', // 获取任务详情
    },
    postJSON: {
      addTask: m.POST + '/task/add', // 新建任务接口
      editTask: m.POST + '/task/edittask', // 编辑任务接口
      clockincheck: m.POST + '/task/clockincheck', // 签到打卡范围确认
      clockin: m.POST + '/task/clockin', // 确认打卡接口
      addvisitlog: m.POST + '/task/addvisitlog', // 添加拜访记录
      editvisitlog: m.POST + '/task/editvisitlog', // 编辑拜访记录
      finishTask: m.POST + '/task/finishnormaltask', // 完成任务事项接口
    },
    upload: {
    }
  }
};