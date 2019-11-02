/**
 * m: mock
 */
// 工作台模块 所需接口列表
const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default ()=>{
  return {
    get: {
      // login: mock.GET + '/system/user/login.htm',
    },
    postJSON: {
      getBriefing: TEST_URL + '/workbench/briefing',             // 获取明细信息
      taskList: TEST_URL + '/task/list',                         // 获取任务列表
      workbenchSearch: TEST_URL +  '/workbench/search',          // 工作台搜索
      recentvisitlist: TEST_URL +  '/workbench/recentvisitlist', // 最近访问列表
    },
    upload: {
      // upload: '/lbccrm/common/upload' 
    }
  }
};