// import moment from '@/plugins/moment' // 时间统一处理
// 经销商列表及筛选的数据
export default {
  state: {
    oftenuselist: [],
    isLastPage: false,
    // 获取经营商列表的请求参数
    listParams: {
      "area": "",                 // 区域
      "city": "",                 // 城市
      "dealerName": "",           // 经销商名称
      "endTime": 0,               // 结束时间 时间戳 秒
      "followStatus": 0,          // 跟进状态（0 全部 1 线索入库  2 合作中  3  备案准入 4 达成合作   5 放弃）
      "followerUserGids": [],     // 跟进人gid 集合
      "level": [],                 // 经销商分级（1 一级 2 二级）
      "notVisitDays": '',          // 没有拜访的天数
      "orderType": 0,             // 排序规则：1 按拜访时间 2 按创建时间 3 按名称
      "ownerUserGids": [],        // 负责人gid 集合
      "pageNum": 1,               // 当前页数 1开始
      "pageSize": 10,             // 每页数量
      "province": "",             // 省
      "queryString": "",          // 查询输入值
      "relationHealth": 0,        // 关系健康度（1极差 2 差 3 一般 4 好 5 很好）
      "startTime": 0,             // 开始时间 时间戳 秒
      "visitCount": '',            // 拜访次数
      "notVisitConditions": 0,    // 未拜访天数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
      "visitConditions": 0,      // 拜访次数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）

      "ownerCd": [],              // 公司归属（ 1自有 2 第三方）
      "contactsName": "",        //法人姓名
      "creditCode": '',          // 统一社会社会信用代码
      "address": '',             // 详细地址
      "startEstablishTime": 0,      // 成立日期时间戳
      "endEstablishTime": 0,
      "certTypCd": [],         // 法人证件类型
      "certNo": '',              // 证件号码
      "contactsPhone": '',          // 手机号码
      "comment": '',            // 备注
    },
    status: [
      '稳定型', '已终止', '合作中', '深入沟通', '进行中'
    ],
    followStatus: [
      { name: '全部', id: 0 },
      { name: '线索入库', id: 1 },
      { name: '合作中', id: 2 },
      // {name:'备案准入',id:3},
      // {name:'达成合作',id:4},
      // {name:'放弃',id:5}
    ],
    orderType: [
      { text: '默认排序', value: 0 },
      { text: '按拜访时间排序', value: 1 },
      // { text: '按创建时间排序', value: 2 },
      { text: '按名称排序', value: 3 }
    ],
    relationHealth: [
      { id: 1, text: '极差' },
      { id: 2, text: '差' },
      { id: 3, text: '一般' },
      { id: 4, text: '好' },
      { id: 5, text: '很好' }
    ],
    conditions: [
      { text: '选择条件', value: 0 },
      { text: '大于', value: 1 },
      { text: '等于', value: 2 },
      { text: '小于', value: 3 },
      { text: '大于等于', value: 4 },
      { text: '小于等于', value: 5 },
    ],
    dropDownType: [
      { text: '全部经销商', value: 0 },
      { text: '我负责的', value: 1 },
      { text: '我参与的', value: 2 }
    ],
    dropDownValue: 0,
    // 经销商列表数据
    listData: [],

    provincesList: [],  // 省份
    citysList: [],      // 城市
    areasList: [],      // 区域

    colleagueDataList: [],
    deptDataList: [],

    confirmUserGids: [],
    jobsUser: [],
    jobsUser1: [],
    selectedUserGids: [],

    ownerCdTypes: {     // 公司归属
      1: '自有',
      2: '第三方'
    }


  },
  mutations: {
    setParamsEmpty(state) {
      state.jobsUser = []
      state.jobsUser1 = []
    },
    setAreasEmpty(state) {
      state.areasList = [{
        text: '选择区',
        value: ''
      }]
    },
    setInitParams(state) {
      state.listParams = {
        "area": "",                 // 区域
        "city": "",                 // 城市
        "dealerName": "",           // 经销商名称
        "endTime": 0,               // 结束时间 时间戳 秒
        "followStatus": 0,          // 跟进状态（0 全部 1 线索入库  2 合作中  3  备案准入 4 达成合作   5 放弃）
        "followerUserGids": [],     // 跟进人gid 集合
        "level": [],                 // 经销商分级（1 一级 2 二级）
        "notVisitDays": '',          // 没有拜访的天数
        "orderType": 0,             // 排序规则：1 按拜访时间 2 按创建时间 3 按名称
        "ownerUserGids": [],        // 负责人gid 集合
        "pageNum": 1,               // 当前页数 1开始
        "pageSize": 10,             // 每页数量
        "province": "",             // 省
        "queryString": "",          // 查询输入值
        "relationHealth": 0,        // 关系健康度（1极差 2 差 3 一般 4 好 5 很好）
        "startTime": 0,             // 开始时间 时间戳 秒
        "visitCount": '',            // 拜访次数
        "notVisitConditions": 0,    // 未拜访天数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
        "visitConditions": 0,        // 拜访次数的条件（1大于 2 等于 3 小于 4 大于等于 5小于等于）
        "ownerCd": [],              // 公司归属（ 1自有 2 第三方）
        "contactsName": "",        //法人姓名
        "creditCode": '',          // 统一社会社会信用代码
        "address": '',             // 详细地址
        "startEstablishTime": 0,      // 成立日期时间戳
        "endEstablishTime": 0,
        "certTypCd": [],         // 法人证件类型
        "certNo": '',              // 证件号码
        "contactsPhone": '',          // 手机号码
        "comment": '',            // 备注
      }
    }
  },
  actions: {
    getOftenuselist({ state }, data = {}) {
      return new Promise(resolve => {
        window.$ajax.auth.getOftenuselist(data).then(res => {
          if (!res.code) {
            state.oftenuselist = res.data
            resolve(res.data)
          }
        })
      })
    },
    getDept({ state }, data = {}) {
      return new Promise(resolve => {
        window.$ajax.auth.dept(data).then(res => {
          if (!res.code) {
            state.deptDataList = res.data.content
            resolve(res.data.content)
          }
        })
      })
    },
    getColleague({ state }, data = {}) {
      return new Promise(resolve => {
        window.$ajax.auth.colleague(data).then(res => {
          if (!res.code) {
            state.colleagueDataList = data.pageNum == 1 ? res.data.resultList : state.colleagueDataList.concat(res.data.resultList)
            if (data.pageNum == 1 && !data.rlNm) {
              let userInfo = JSON.parse(sessionStorage.userInfo)
              state.colleagueDataList.unshift({
                id: userInfo.EMPLOYEE_ID,
                refRlNm: userInfo.EMPLOYEE_NAME
              })
            }
            resolve(res.data.resultList)
          }
        })
      })
    },
    getListData({ state }, data = {}) {
      let params = Object.assign(state.listParams, data)

      //负责人
      if (params.ownerUserGids && params.ownerUserGids.length && params.ownerUserGids[0].id) {
        console.log("我负责的")
        params.ownerUserGids = params.ownerUserGids.map(r => {
          return String(r.id)
        })
      }
      //参与人
      if (params.followerUserGids && params.followerUserGids.length && params.followerUserGids[0].id) {
        console.log("我参与")
        params.followerUserGids = params.followerUserGids.map(r => {
          return String(r.id)
        })
      }
      if (params.pageNum == 1) {
        state.isLastPage = false
      }
      return new Promise(resolve => {
        if (state.isLastPage) {
          resolve()
          return
        }
        let timevals = {
          startTime: String(params.startTime).length == 13 ? params.startTime / 1000 : params.startTime,
          endTime: String(params.endTime).length == 13 ? params.endTime / 1000 : params.endTime,
          startEstablishTime: String(params.startEstablishTime).length == 13 ? params.startEstablishTime / 1000 : params.startEstablishTime,
          endEstablishTime: String(params.endEstablishTime).length == 13 ? params.endEstablishTime / 1000 : params.endEstablishTime,
        }

        let ownerCdNum = { ownerCd: params.ownerCd.map(i => +i) }

        window.$ajax.dealer.listData(Object.assign({}, params, timevals, ownerCdNum)).then(res => {
          if (!res.code) {
            state.listData = params.pageNum == 1 ? (res.data.list || []) : state.listData.concat(res.data.list)
            if (res.data.list && res.data.list.length < params.pageSize) {
              state.isLastPage = true
            }
            resolve(state.listData)
          }
        })
      })
    },
    getProvinces({ state }) { // 省份
      return new Promise(resolve => {
        window.$ajax.dealer.getProvinces({}).then(res => {
          if (!res.code) {
            state.provincesList = res.data.map(r => {
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
    getCitys({ state }, code) { // 城市
      return new Promise(resolve => {
        window.$ajax.dealer.getCitys({ provinceCode: code }).then(res => {
          if (!res.code) {
            state.citysList = res.data.map(r => {
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
    getAreas({ state }, code) { // 区域
      return new Promise(resolve => {
        window.$ajax.dealer.getAreas({ cityCode: code }).then(res => {
          if (!res.code) {
            state.areasList = res.data.map(r => {
              return {
                value: r.areaCode,
                text: r.areaName
              }
            })
            resolve(state.areasList)
          }
        })
      })
    },
    addlegal({ state }, data) { // 经销商添加法人信息 
      return new Promise(resolve => {
        window.$ajax.dealer.addlegal(data).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },
    editlegal({ state }, data) { // 经销商编辑法人信息
      return new Promise(resolve => {
        window.$ajax.dealer.editlegal(data).then(res => {
          if (!res.code) {
            resolve('操作成功')
          }
        })
      })
    },

  }
}