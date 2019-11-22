/**
 * m: mock
 */
// 动态历史 和 操作记录 所需接口
export default (m)=>{
    return {
      postJSON: {
        listNewslog: m.POST + '/newslog/listpage', // 获取动态记录列表
        addNewslog: m.POST + '/newslog/add', // 添加动态记录列表

        listOperatelog: m.POST + '/operatelog/listpage', // 获取操作记录列表
      },
      upload: {
      }
    }
  };