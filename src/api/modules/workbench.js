/**
 * m: mock
 */
// 工作台模块 所需接口列表
export default (mock)=>{
  return {
    get: {
      // login: mock.GET + '/system/user/login.htm',
    },
    postJSON: {
      getBriefing: mock.POST + '/workbench/briefing',             // 获取明细信息
      taskList: mock.POST + '/task/list',                         // 获取任务列表
      workbenchSearch: mock.POST +  '/workbench/search',          // 工作台搜索
      recentvisitlist: mock.POST +  '/workbench/recentvisitlist', // 最近访问列表
    },
    upload: {
      // upload: '/lbccrm/common/upload' 
    }
  }
};