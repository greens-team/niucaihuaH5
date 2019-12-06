import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/vant.js'            // vant 按需加载
import moment from './plugins/moment' // 时间统一处理
import { Notify, Toast } from 'vant'

require('./plugins/serveConf')

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'VKoxtkFSuXPVRULh2ohYVQ9tubl99xss'
})

Vue.config.productionTip = false


// 统一数据请求
import ajax from '@/plugins/axios'
import apiList from '@/api'

ajax(apiList, error => {
  // 请求错误统一处理
  if (!error.response || error.response.status == 401) {
    Notify({ type: 'warning', message: error.response.statusText })
    delete sessionStorage.Authorization
    // store.commit('setLoginState', false)
    router.push('/')
  }
  if (error.response.status !== 401) {
    Notify({ type: 'warning', message: error.response.data.msg || error.response.statusText })
  }
}, function (response) {
  // 请求成功统一处理
  if (Number(response.data.code)) {
    Notify({ type: 'warning', message: response.data.msg })
    return
  }
});

// 获取时间戳
Vue.prototype.timeStamp = (time) => {
  return moment(time).valueOf()
}

Vue.prototype.formatter = (type, value) => {
  if (type === 'year') {
    return `${value}年`;
  } else if (type === 'month') {
    return `${value}月`
  } else if (type == 'day') {
    return `${value}日`;
  } else if (type == 'hour') {
    return `${value}时`;
  } else if (type == 'minute') {
    return `${value}分`;
  }
}

//填加埋点
Vue.prototype.addRecentvisit = (data) => {
  store.dispatch('addRecentvisit', data).then(r => {
  })
}

//滚动加载
Vue.prototype.scrollLoad = (domBox, callback) => {
  let isSend = false
  domBox.onscroll = function () {
    if (domBox.scrollTop > domBox.scrollHeight - domBox.clientHeight - 10 && !isSend) {
      isSend = true
      new Promise(resolve => {
        callback(resolve)
      }).then(() => {
        isSend = false
      })
    }
  }
}

//文件上传
Vue.prototype.uploadFile = (file, checkOrCallback, uploadType, objMap) => {
  if (typeof checkOrCallback == "boolean" && file.name) { // 上传文件前校验
    if (!file.type.includes('image/')) {
      Toast('请上传 png 格式图片');
      return false;
    }
    return true;
  }
  if (typeof checkOrCallback == "boolean" && file instanceof Array) { // 上传文件前校验
    let res = file.some(f => {
      if (!f.type.includes('image/')) {
        Toast('请上传 png 格式图片');
        return true;
      }
    })
    return !res;
  }
  if (file instanceof Array) {
    file.map((f) => {
      store.dispatch('fileUpload', { file: f.file, uploadType: uploadType }).then(res => {
        if (objMap) {
          checkOrCallback({
            name: f.file.name,
            path: res.data[0].filePath
          })
        } else {
          checkOrCallback(res.data[0].filePath)
        }
      })
    })
  } else {
    store.dispatch('fileUpload', { file: file.file, uploadType: uploadType }).then(res => {
      if (objMap) {
        checkOrCallback({
          name: file.file.name,
          path: res.data[0].filePath
        })
      } else {
        checkOrCallback(res.data[0].filePath)
      }
    })
  }
}

Vue.prototype.userAgent = (iosCallback, androidCallback) => {
  var  u = navigator.userAgent;
  if(u.indexOf('lbh_app_ios') > -1 ){ //  助手iOS
    iosCallback()
  }
  if(u.indexOf('lbh_app_android') > -1){ // 助手Android
    androidCallback()
  }
}


new Vue({
  data() {
    return {
      moment,
      userInfo: {
        roles: []
      }
    }
  },
  router,
  store,
  methods: {
    checkRole(key, tip = false){
      console.log(this.userInfo.roles)
      let res = this.userInfo.roles.includes(key)
      !res && tip && Toast('没有权限');
      return res
    },
    async dataCheck(data, callback){
      let result = false
      await this.$store.dispatch('dataprivilegecheck', data).then((res)=>{
        res.data && Toast('没有权限');
        result = res.data
      })
      result && callback()
    }
  },
  created() {
    this.$store.dispatch('getUserInfo').then((data)=>{
      this.userInfo = data
    })
  },
  mounted() {
    
    
  },
  render: h => h(App)
}).$mount('#app')
