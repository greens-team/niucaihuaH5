/**
 * m: mock
 */
// 任务 所需接口
export default (m) => {
  return {
    get: {
      getTaskInfo: '/task/getinfo', // 获取任务详情
    },
    postJSON: {
      addTask: '/task/add', // 新建任务接口
      editTask: '/task/edittask', // 编辑任务接口
      clockincheck: '/task/clockincheck', // 签到打卡范围确认
      clockin: '/task/clockin', // 确认打卡接口
      addvisitlog: '/task/addvisitlog', // 添加拜访记录
      editvisitlog: '/task/editvisitlog', // 编辑拜访记录
      finishTask: '/task/finishnormaltask', // 完成任务事项接口
    },
    upload: {
    }
  }
};