

/**
 * m: mock
 */
// 经销商模块 所需接口
export default (mock)=>{
  return {
    get: {
    },
    postJSON: {
      add: mock.POST + '/dealer/add',                              // 新建经销商
      getinfo: mock.POST + '/dealer/getinfo',                      // 获取经销商详情
      getcontactslist: mock.POST + '/dealer/getcontactslist',      // 获取经销商详情联系人信息
      getlesseelist: mock.POST + '/dealer/getlesseelist',          // 获取经销商详情承租人信息
      getcompetitorlist: mock.POST + '/dealer/getcompetitorlist',  // 获取经销商详情竞对信息
      listData: mock.POST + '/dealer/listpage',                    // 获取经销商列表
    },
    upload: {
    }
  }
};