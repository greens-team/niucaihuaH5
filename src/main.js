import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'            // vant 按需加载
import moment from './plugins/moment' // 时间统一处理

Vue.config.productionTip = false

// 统一数据请求
import ajax from '@/plugins/axios'
import apiList from '@/api'

ajax(apiList,function(error){
  // 请求错误统一处理
  // console.log(error.response, error.response.status, 767)
  if(error.response.status == 403){
    alert('response.status:' + 403)
    // window.location.href="http://localhost:88/#/login"
  }
},function(){
  // 请求成功统一处理
  // console.log(response)
});

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
