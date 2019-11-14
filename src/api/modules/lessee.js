/**
 * m: mock
 */
// 承租人 所需接口
export default (m)=>{
  return {
    get: {
      getLesseeInfo: m.GET + '/lessee/getinfo', // 获取承租人详情
    },
    postJSON: {
      addLessee: m.POST + '/lessee/add', // 新建承租人
      editLessee: m.POST + '/lessee/edit', // 编辑承租人信息
      listLessee: m.POST + '/lessee/listpage', // 获取承租人列表
      associatedLessee: m.POST + '/lessee/associated', // 关联和解除关联经销商
    },
    upload: {
    }
  }
};