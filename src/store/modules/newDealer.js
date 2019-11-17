// import moment from '@/plugins/moment' // 时间统一处理
// 新建经销商数据
export default {
  state: {
    params: {

      // dealerName: '',         // 名称
      // creditCode: '',         // 统一社会社会信用代码
      // establishTime: '',      // 成立日期时间戳
      // splAttrCd: 2,           // 不展示 默认值为2； 供应商属性（1自然人  2法人）
      // rgnPrCd: '',            // 省 代码
      // rgnCyCd: '',            // 市 代码
      // rgnArCd: '',            // 区 代码
      // ownerCd: 1,             // 公司归属（ 1自有 2 第三方）
      // chkBusTypCdList: '',    // 多选 业务类型 查征信的业务类型List 代码逗号隔开 

      // // idcardFrontPic: '',  // 身份证正面照片地址
      // // idcardBackPic: '',   // 身份证背面照片地址
      // // licensePic: '',      // 营业执照照片地址

      // address: '',            // 详细地址

      // area: '',               // 区
      // city: '',               // 城市
      // province: '',           // 省

      // addType: 0,             // 0 直接新建经销商  1 新建经销商并添加联系人
      // dealerContactsList: [{
      //   contactsGid: '',      // 联系人gid
      //   jobTitle: ''          // 职称
      // }],

      // latitude: '',           // 纬度  double
      // longitude: '',          // 纬度  double
      
      // level: 1,               // 经销商分级（1 一级  2 二级）
      // ownerUserGids: [],      // [1,2,3]负责人gid 集合
      // followerUserGids: [],   // 跟进人gid集合

      // comment: '',            // 备注

    },
    levelList: [{             // 经销商分级
      text: '一级',
      value: 1
    },{
      text: '二级',
      value: 2
    }],
    ownerCdTypes: [           // 公司归属
      {
        text: '自有',
        value: 1
      },{
        text: '第三方',
        value: 2
      }
    ],

    splAttrCd: [{
      value:1,
      text: '自然人'
    },{
      value:2,
      text: '法人'
    }],

    businessTypesValues: [],
    businessTypes: [          // 业务类型
      {
        text: '新车-重卡',
        value: 1001001
      },{
        text: '新车-轻卡',
        value: 1001002
      },{
        text: '新车-汽车',
        value: 1001003
      },{
        text: '新车-客车',
        value: 1001004
      },{
        text: '车抵贷',
        value: 1001005
      },{
        text: '二手车-重卡',
        value: 2001001
      },{
        text: '二手车-轻卡',
        value: 2001002
      },{
        text: '二手车-汽车',
        value: 2001003
      },{
        text: '二手车-客车',
        value: 2001004
      },{
        text: '二手车交易贷',
        value: 2001005
      }
    ]
  },
  mutations: {
    setChkBusTypCdList(state){
      state.chkBusTypCdList = state.businessTypesValues.toString()
    },
    setParams(state, data = {}){
      Object.assign(state.params, data)
    },
    setNewDealerParams(state){
      state.params = {

        dealerName: '',         // 名称
        creditCode: '',         // 统一社会社会信用代码
        establishTime: '',      // 成立日期时间戳
        splAttrCd: 2,           // 不展示 默认值为2； 供应商属性（1自然人  2法人）
        rgnPrCd: '',            // 省 代码
        rgnCyCd: '',            // 市 代码
        rgnArCd: '',            // 区 代码
        ownerCd: 1,             // 公司归属（ 1自有 2 第三方）
        chkBusTypCdList: '',    // 多选 业务类型 查征信的业务类型List 代码逗号隔开 
  
        // idcardFrontPic: '',  // 身份证正面照片地址
        // idcardBackPic: '',   // 身份证背面照片地址
        // licensePic: '',      // 营业执照照片地址
  
        address: '',            // 详细地址
  
        area: '',               // 区
        city: '',               // 城市
        province: '',           // 省
  
        addType: 0,             // 0 直接新建经销商  1 新建经销商并添加联系人
        dealerContactsList: [{
          contactsGid: '',      // 联系人gid
          jobTitle: ''          // 职称
        }],
  
        latitude: '',           // 纬度  double
        longitude: '',          // 纬度  double
        
        level: 1,               // 经销商分级（1 一级  2 二级）
        ownerUserGids: [],      // [1,2,3]负责人gid 集合
        followerUserGids: [],   // 跟进人gid集合
  
        comment: '',            // 备注
  
      }
    }
  },
  actions: {
    addNewDealer ({state}) {
      return new Promise(resolve=>{
        window.$ajax.dealer.add(state.params).then(res => {
          if(!res.code){
            resolve()
          }
        })
      })
    }
  }
}