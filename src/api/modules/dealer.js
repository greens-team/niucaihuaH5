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

      getinfo: m.GET + '/dealer/getinfo',                      // 获取经销商 - 基本信息
      getcontactslist: m.GET + '/dealer/getcontactslist',      // 获取经销商 - 联系人信息
      getlesseelist: m.GET + '/dealer/getlesseelist',          // 获取经销商 - 承租人信息
      getcompetitorlist: m.GET + '/dealer/getcompetitorlist',  // 获取经销商 - 竞对信息
    },
    postJSON: {
      add: m.POST + '/dealer/add',                              // 新建经销商
      listData: m.POST + '/dealer/listpage',                    // 获取经销商 - 列表
      associatedcontacts: m.POST + '/dealer/associatedcontacts',// 关联和解除关联联系人
      associatedlessee: m.POST + '/dealer/associatedlessee',    // 关联和解除关联承租人
      associatedcompetitor: m.POST + '/dealer/associatedcompetitor', // 关联和解除关联合作竞对
      editDealer: m.POST + '/dealer/edit', // 编辑经销商信息
    },
    upload: {
    }
  }
};