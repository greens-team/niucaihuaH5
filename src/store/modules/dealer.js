// import moment from '@/plugins/moment' // 时间统一处理
// 经销商列表及筛选的数据
export default {
  state: {
    isLastPage: false,
    // 获取经营商列表的请求参数
    listParams: {
      "area": "",                 // 区域
      "city": "",                 // 城市
      "dealerName": "",           // 经销商名称
      "endTime": 0,               // 结束时间 时间戳 秒
      "followStatus": 0,          // 跟进状态（0 全部 1 线索入库  2 意向跟进  3  备案准入 4 达成合作   5 放弃）
      "followerUserGids": [],     // 跟进人gid 集合
      "level": 0,                 // 经销商分级（1 一级 2 二级）
      "notVisitDays": 0,          // 没有拜访的天数
      "orderType": 0,             // 排序规则：1 按拜访时间 2 按创建时间 3 按名称
      "ownerUserGids": [],        // 负责人gid 集合
      "pageNum": 1,               // 当前页数 1开始
      "pageSize": 20,             // 每页数量
      "province": "",             // 省
      "queryString": "",          // 查询输入值
      "relationHealth": 0,        // 关系健康度（1极差 2 差 3 一般 4 好 5 很好）
      "startTime": 0,             // 开始时间 时间戳 秒
      "visitCount": 0,            // 拜访次数
      "notVisitConditions": 1,    // 未拜访天数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
      "visitConditions": 1       // 拜访次数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
    },
    status: [
      '稳定型', '已终止', '合作中', '深入沟通', '进行中'
    ],
    followStatus: [
      {name:'全部',id: 0},
      {name:'线索入库',id:1},
      {name:'意向跟进',id:2},
      // {name:'备案准入',id:3},
      // {name:'达成合作',id:4},
      // {name:'放弃',id:5}
    ],
    orderType: [
      { text: '默认排序', value: 0 },
      { text: '按拜访时间排序', value: 1 },
      { text: '按创建时间排序', value: 2 },
      { text: '按名称排序', value: 3 }
    ],
    relationHealth: [
      {id: 1, text: '极差'},
      {id: 2, text: '差'},
      {id: 3, text: '一般'},
      {id: 4, text: '好'},
      {id: 5, text: '很好'}
    ],
    conditions: [
      {text: '大于',    value: 1},
      {text: '等于',    value: 2},
      {text: '小于',    value: 3},
      {text: '大于等于', value: 4},
      {text: '小于等于', value: 5},
    ],
    // 经销商列表数据
    listData: [],

    provincesList: [],  // 省份
    citysList: [],      // 城市
    areasList: [],      // 区域

    colleagueDataList: [],

    confirmUserGids: [],
    jobsUser: [],
    jobsUser1: [],
    selectedUserGids: [],


  },
  mutations: {
    setAreasEmpty(state){
      state.areasList = [{
        text: '选择区',
        value: ''
      }]
    },
    setInitParams(state){
      state.listParams = {
        "area": "",                 // 区域
        "city": "",                 // 城市
        "dealerName": "",           // 经销商名称
        "endTime": 0,               // 结束时间 时间戳 秒
        "followStatus": 0,          // 跟进状态（0 全部 1 线索入库  2 意向跟进  3  备案准入 4 达成合作   5 放弃）
        "followerUserGids": [],     // 跟进人gid 集合
        "level": 0,                 // 经销商分级（1 一级 2 二级）
        "notVisitDays": 0,          // 没有拜访的天数
        "orderType": 0,             // 排序规则：1 按拜访时间 2 按创建时间 3 按名称
        "ownerUserGids": [],        // 负责人gid 集合
        "pageNum": 1,               // 当前页数 1开始
        "pageSize": 20,             // 每页数量
        "province": "",             // 省
        "queryString": "",          // 查询输入值
        "relationHealth": 0,        // 关系健康度（1极差 2 差 3 一般 4 好 5 很好）
        "startTime": 0,             // 开始时间 时间戳 秒
        "visitCount": 0,            // 拜访次数
        "notVisitConditions": 1,    // 未拜访天数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
        "visitConditions": 1       // 拜访次数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
      }
    }
  },
  actions: {
    getColleague ({state}, data={}) {
      return new Promise(resolve => {
        window.$ajax.auth.colleague(data).then( res => {
          if (!res.code) {
            state.colleagueDataList = data.pageNum == 1 ? res.data.resultList : state.colleagueDataList.concat(res.data.resultList)
            resolve(res.data.resultList.length)
          }
        })
      })
    },
    getListData ({state}, data = {}) {
      let params = Object.assign(state.listParams, data)
      params.ownerUserGids = params.ownerUserGids.map(r => {
        return String(r.id)
      })
      if(params.pageNum == 1){
        state.isLastPage = false
      }
      return new Promise(resolve => {
        if(state.isLastPage){
          resolve()
          return
        }
        window.$ajax.dealer.listData(params).then(res => {
          if(!res.code){
            state.listData = params.pageNum == 1 ? res.data.list : state.listData.concat(res.data.list)
            if(res.data.list.length < params.pageSize){
              state.isLastPage = true
            }
            resolve(state.listData)
          }
        })
      })
    },
    getProvinces ({state}) { // 省份
      return new Promise(resolve => {
        window.$ajax.dealer.getProvinces({}).then(res => {
          if(!res.code){
            state.provincesList = res.data.map(r=>{
              return {
                value: r.provinceCode,
                text: r.provinceName
              }
            })
            resolve(state.provincesList)
          }
        })
      })
      
    },
    getCitys ({state}, code) { // 城市
      return new Promise(resolve => {
        window.$ajax.dealer.getCitys({provinceCode: code}).then(res => {
          if(!res.code){
            state.citysList = res.data.map(r=>{
              return {
                value: r.cityCode,
                text: r.cityName
              }
            })
          }
          resolve(state.citysList)
        })
      })
    },
    getAreas ({state}, code) { // 区域
      return new Promise(resolve => {
        window.$ajax.dealer.getAreas({cityCode: code}).then(res => {
          if(!res.code){
            state.areasList = res.data.map(r=>{
              return {
                value: r.areaCode,
                text: r.areaName
              }
            })
            resolve(state.areasList)
          }
        })
      })
    }
  }
}