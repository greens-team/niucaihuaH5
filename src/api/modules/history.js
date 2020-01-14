/**
 * m: mock
 */
// 动态历史 和 操作记录 所需接口
export default (m)=>{
    return {
      postJSON: {
        listNewslog:  '/newslog/listpage', // 获取动态记录列表
        addNewslog:  '/newslog/add', // 添加动态记录列表

        listOperatelog: '/operatelog/listpage', // 获取操作记录列表
      },
      upload: {
      }
    }
  };