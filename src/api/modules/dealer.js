/**
 * m: mock
 */
// 经销商模块 所需接口
export default (m) => {
  return {
    get: {
      getProvinces: '/common/provinces',   // 获取省份
      getCitys: '/common/citys',           // 获取城市
      getAreas: '/common/areas',           // 获取区域

      getinfo: '/dealer/getinfo',                      // 获取经销商 - 基本信息
      getcontactslist: '/dealer/getcontactslist',      // 获取经销商 - 联系人信息
      getlesseelist: '/dealer/getlesseelist',          // 获取经销商 - 承租人信息
      getcompetitorlist: '/dealer/getcompetitorlist',  // 获取经销商 - 竞对信息
    },
    postJSON: {
      add: '/dealer/add',                              // 新建经销商
      listData: '/dealer/listpage',                    // 获取经销商 - 列表
      associatedcontacts: '/dealer/associatedcontacts',// 关联和解除关联联系人
      associatedlessee: '/dealer/associatedlessee',    // 关联和解除关联承租人
      associatedcompetitor: '/dealer/associatedcompetitor', // 关联和解除关联合作竞对
      editDealer: '/dealer/edit', // 编辑经销商信息

      listNewslog: '/newslog/listpage', // 获取动态记录列表
      addNewslog: '/newslog/add', // 添加动态记录列表
      listOperatelog: '/operatelog/listpage', // 获取操作记录列表

      addlegal: '/dealer/addlegal', // 经销商添加法人信息 
      editlegal: '/dealer/editlegal', // 经销商编辑法人信息

    },
    upload: {
    }
  }
};