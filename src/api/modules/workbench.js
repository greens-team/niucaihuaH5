/**
 * m: mock
 */
// 工作台模块 所需接口列表
// const TEST_URL = process.env.NODE_ENV === 'production' ? '' : '/test';
export default (m)=>{
  return {
    get: {
      // login: mock.GET + '/system/user/login.htm',
    },
    postJSON: {
      getBriefing: m.POST + '/workbench/briefing',             // 获取明细信息
      tasklistpage: m.POST + '/task/listpage',                 // 获取全部任务列表
      taskmylistpage: m.POST + '/task/mylistpage',             // 获取我的任务列表
      workbenchSearch: m.POST +  '/workbench/search',          // 工作台搜索
      recentvisitlist: m.POST +  '/workbench/recentvisitlist', // 最近访问列表
      addRecentvisit: m.POST +  '/workbench/addrecentvisit',   // 埋点-最近访问的数据
    },
    upload: {
      // upload: '/lbccrm/common/upload' 
    }
  }
};