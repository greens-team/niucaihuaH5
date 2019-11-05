/**
 * m: mock
 */
// 经销商模块 所需接口
export default (m)=>{
  return {
    get: {
      getProvinces: m.GET + '/common/provinces',   // 获取省份
      getCitys: m.GET + '/common/citys',           // 获取城市
      getAreas: m.GET + '/common/areas',           // 获取区域
    },
    postJSON: {
      add: m.POST + '/dealer/add',                              // 新建经销商
      getinfo: m.POST + '/dealer/getinfo',                      // 获取经销商详情
      getcontactslist: m.POST + '/dealer/getcontactslist',      // 获取经销商详情联系人信息
      getlesseelist: m.POST + '/dealer/getlesseelist',          // 获取经销商详情承租人信息
      getcompetitorlist: m.POST + '/dealer/getcompetitorlist',  // 获取经销商详情竞对信息
      listData: m.POST + '/dealer/listpage',                    // 获取经销商列表
    },
    upload: {
    }
  }
};