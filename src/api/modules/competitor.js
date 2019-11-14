/**
 * m: mock
 */
// 竞争对手 所需接口
export default (m)=>{
  return {
    get: {
      getCompetitorInfo: m.GET + '/competitor/getinfo', // 获取合作竞对详情
    },
    postJSON: {
      addCompetitor: m.POST + '/competitor/add', // 新建合作竞对
      editCompetitor: m.POST + '/competitor/edit', // 编辑合作竞对信息
      listCompetitor: m.POST + '/competitor/listpage', // 获取合作竞对列表
      associatedCompetitor: m.POST + '/competitor/associated', // 关联和解除关联经销商
    },
    upload: {
    }
  }
};