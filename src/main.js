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

ajax(apiList,error=>{
  // 请求错误统一处理
  if(!error.response || error.response.status == 401){
    Notify({ type: 'warning', message: error.response.statusText })
    delete localStorage.Authorization
    store.commit('setLoginState', false)
    router.push('/')
  }
  if(error.response.status !== 401){
    Notify({ type: 'warning', message: error.response.data.msg || error.response.statusText })
  }
},function(response){
  // 请求成功统一处理
  if(Number(response.data.code)){
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
  } else if (type == 'day'){
    return `${value}日`;
  } else if (type == 'hour'){
    return `${value}时`;
  } else if (type == 'minute'){
    return `${value}分`;
  }
}

//填加埋点
Vue.prototype.addRecentvisit = (data) => {
  store.dispatch('addRecentvisit', data).then(r=>{
    console.log(r)
  })
}

//滚动加载
Vue.prototype.scrollLoad = (domBox, callback) => {
  let isSend = false
  domBox.onscroll = function(){
    if(domBox.scrollTop > domBox.scrollHeight - domBox.clientHeight - 10 && !isSend){
      isSend = true
      new Promise(resolve=>{
        callback(resolve)
      }).then(()=>{
        isSend = false
      })
    }
  }
}

//文件上传
Vue.prototype.uploadFile = (file, checkOrCallback, uploadType) => {
  if(typeof checkOrCallback == "boolean"){ // 上传文件前校验
    console.log(file.type)
    if (!file.type.includes('image/')) {
      Toast('请上传 png 格式图片');
      return false;
    }
    return true;
  }
  store.dispatch('fileUpload',{file: file.file, uploadType: uploadType}).then(res=>{
    checkOrCallback(res.data[0].filePath)
  })
}


new Vue({
  data(){
    return {
      moment
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
