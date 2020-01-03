import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/vant.js'            // vant 按需加载
import moment from './plugins/moment' // 时间统一处理
import { Toast, Dialog } from 'vant'

require('./plugins/serveConf')

import VueAMap from 'vue-amap'
Vue.use(VueAMap);
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'VKoxtkFSuXPVRULh2ohYVQ9tubl99xss'
// })
VueAMap.initAMapApiLoader({
  key: '276923c83894386e499c8b979ee7f446',
  plugin: ['AMap.Geolocation','AMap.ToolBar'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.9',
  uiVersion: "1.0.11"
});


Vue.config.productionTip = false


// 统一数据请求
import ajax from '@/plugins/axios'
import apiList from '@/api'

ajax(apiList, error => {
  // 请求错误统一处理
  if (!error.response) {
    Dialog({ message: error.response.statusText || error.response.data.message });
    // Notify({ type: 'warning', message: error.response.statusText })
    delete sessionStorage.Authorization
    // store.commit('setLoginState', false)
    router.push('/')
  }
  if (error.response.status == 401) {
    Dialog({ message: error.response.statusText || error.response.data.message });
    // Notify({ type: 'warning', message: error.response.statusText })
    delete sessionStorage.Authorization
    // store.commit('setLoginState', false)
    router.push('/')
  }else{
    Dialog({ message: error.response.data.msg || error.response.statusText || error.response.data.message });
    // Notify({ type: 'warning', message: error.response.data.msg || error.response.statusText })
  }

}, function (response) {
  // 请求成功统一处理
  if (Number(response.data.code)) {
    Dialog({ message: response.data.msg });
    // Notify({ type: 'warning', message: response.data.msg })
    return
  }
});


let sendStart = true
// 延迟请求
Vue.prototype.delaySend = () => {
  if(sendStart){
    sendStart = false
    setTimeout(()=>{
      sendStart = true
    },1000)
    return false
  }else{
    return true
  }
}

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
Vue.prototype.scrollLoad = (domBox, callback, positionCallback = false) => {
  let isSend = false
  domBox.onscroll = function () {
    positionCallback && positionCallback(domBox.scrollTop)
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
      // console.log(this.userInfo.roles)
      let res = this.userInfo.roles.includes(key)
      !res && tip && Toast('没有权限');
      return res
    },
    async dataCheck(data, callback){
      let result = false
      await this.$store.dispatch('dataprivilegecheck', data).then((res)=>{
        !res.data && Toast('没有权限');
        result = res.data
      })
      result && callback()
    },
    async selectdpcheck(data, callback){
      let result = false
      await this.$store.dispatch('selectdpcheck', data).then((res)=>{
        !res.data && Toast('没有权限');
        result = res.data
      })
      result && callback()
    },
    //百度坐标转高德（传入经度、纬度）
    bgps_gps(bd_lng, bd_lat) {
      var X_PI = Math.PI * 3000.0 / 180.0;
      var x = bd_lng - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);
      return {lng: gg_lng, lat: gg_lat}
    },
    //高德坐标转百度（传入经度、纬度）
    gps_bgps(gg_lng, gg_lat) {
      var X_PI = Math.PI * 3000.0 / 180.0;
      var x = gg_lng, y = gg_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return {
          lat: bd_lat,
          lng: bd_lng
      };
    }
  },
  created() {
  },
  mounted() {
    
    
  },
  render: h => h(App)
}).$mount('#app')
