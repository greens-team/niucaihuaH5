


/**
 * m: mock
 */
export default (mock)=>{
  return {
    get: {
      login: '/lbccrm/system/user/login', //mock.GET + 
      logout: '/lbccrm/system/user/logout'
    },
    postJSON: {
      test: '/lbccrm/dealer/test',
      getMaxDate: '/dp/salesAnalysis/getMaxDate',                       // 更新时间

      postTest: mock.POST + '/getList',                                 // mock测试数据
      findSomeOneDoc: '/help-sys/api/reportPlatform/findSomeOneDoc',    // 帮忙文档
      getSecondCategory: '/dp/common/getCategoryDropDownByDivision',    // 二级品类
      getThirdCategory: '/dp/common/getCategoryDropDownByCategory',     // 三级品类
      getBrand: '/dp/common/getBrandDropDownByCategory',                // 品牌列表

      getStore: '/dp/salesScale/getStoreList',                          // 门店列表
      totalInfo: '/dp/salesScale/totalInfo',                            // 汇总信息
      contrastChart: '/dp/salesScale/contrastChart',                    // 销售对比
      analysisChart: '/dp/salesScale/analysisChart',                    // 销售同比
      detailInfo: '/dp/salesScale/detailInfo',                          // 获取明细信息
    }
  }
};