/**
 * m: mock
 */
// 承租人 所需接口
export default (m) => {
  return {
    get: {
      getLesseeInfo: '/lessee/getinfo', // 获取承租人详情
    },
    postJSON: {
      addLessee: '/lessee/add', // 新建承租人
      editLessee: '/lessee/edit', // 编辑承租人信息
      listLessee: '/lessee/listpage', // 获取承租人列表
      associatedLessee: '/lessee/associated', // 关联和解除关联经销商
    },
    upload: {
    }
  }
};