// import moment from '@/plugins/moment' // 时间统一处理
// 关联经销商备案
export default {
  state: {
    dealerRecord: {}, // crm经销商信息
    splRecord: {}, // 业务系统经销商信息

    
    certTypCd: {  // 证件类型
      '0':'身份证',
      '1':'户口簿',
      '2':'护照',
      '3':'军官证',
      '4':'士兵证',
      '5':'港澳居民来往内地通行证',
      '6':'台湾同胞来往内地通行证',
      '7':'临时身份证',
      '8':'外国人居留证',
      '9':'警官证',
      'A':'香港身份证',
      'B':'澳门身份证',
      'C':'台湾身份证',
      'X':'其他证件',
      'a':'组织机构代码证',
      'b':'营业执照',
      'c':'贷款卡',
      '91':'社会统一信用代码'}
    },

  mutations: {
  },
  actions: {
    checkRecord({state}, data = {}){   // 经销商备案前校验接口
      return new Promise(resolve => {
        window.$ajax.record.checkRecord(data).then( res => {
          if (!Number(res.code)) {
            if(res.data){
              state.dealerRecord = res.data.dealerRecord
              state.splRecord = res.data.splRecord
            }
            if(res.dealerRecord){
              state.dealerRecord = res.dealerRecord
              state.splRecord = res.splRecord
            }
            resolve(res.msg)
          }
        })
      })
    },
    recordSubmit({state}, data = {}){   // 经销商提交备案准入接口
      return new Promise(resolve => {
        window.$ajax.record.recordSubmit(data).then( res => {
          if (!Number(res.code)) {
            resolve(res.msg)
          }
        })
      })
    },
    fileUpload({state}, data = {}){   // 普通文件上传接口
      return new Promise(resolve => {
        window.$ajax.record.fileUpload(data).then( res => {
          if (!Number(res.code)) {
            resolve(res)
          }
        })
      })
    },
  }
}