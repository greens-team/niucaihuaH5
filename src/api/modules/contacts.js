/**
 * m: mock
 */
// 联系人 所需接口
export default (m)=>{
  return {
    get: {
      getContactsInfo: m.GET + '/contacts/getinfo', // 获取联系人详情
    },
    postJSON: {
      listContacts: m.POST + '/contacts/listpage',          // 获取联系人列表
      createContacts: m.POST + '/contacts/add',             // 新建联系人
      editContacts: m.POST + '/contacts/edit',            // 编辑联系人信息
      associatedContacts: m.POST + '/contacts/associated', // 关联和解除关联经销商
    },
    upload: {
    }
  }
};