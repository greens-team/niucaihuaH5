import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/vant.js'            // vant 按需加载
import moment from './plugins/moment' // 时间统一处理
import { Toast, Dialog } from 'vant'

// import './assets/tailwind/tailwind.min.css'

require('./plugins/serveConf')

Vue.prototype.serverUrl = window[window.ENV];

Vue.config.productionTip = false


// 统一数据请求
import ajax from '@/plugins/axios'
import apiList from '@/api'

ajax (apiList, error => {
  document.getElementById('loadingBox').style.display = 'none'
  // 请求错误统一处理
  if (!error.response) {
    Dialog({ message: error.response.statusText || error.response.data.message });
    delete sessionStorage.Authorization
    router.push('/')
  }
  if (error.response.status == 401) {
    Dialog({ message: error.response.statusText || error.response.data.message });
    delete sessionStorage.Authorization
    router.push('/')
  } else {
    Dialog({ message: error.response.data.msg || error.response.statusText || error.response.data.message });
  }

}, function (response) {
  document.getElementById('loadingBox').style.display = 'none'
  // 请求成功统一处理
  if (Number(response.data.code)) {
    Dialog({ message: response.data.msg });
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
  //  this.addRecentvisit({ modelObjType: 4, modelId: this.id });
  store.dispatch('addRecentvisit', data).then(r => {
  })
}


// this.scrollLoad(this.$refs.contactsListBox, resolve => {
//   this.$store
//     .dispatch("listContacts", {
//       pageNum: this.$store.state.contacts.listContactsParams.pageNum + 1,
//       startTime: startTime,
//       endTime: endTime,
//       userGids: userGids,
//       deptGids: deptGids,
//       userType: userType,
//       onlyWrite: false
//     })
//     .then(msg => {
//       resolve(msg);
//     });
// });
//滚动加载
Vue.prototype.scrollLoad = (domBox, callback, positionCallback = false) => {
  let isSend = false
  domBox.onscroll = function () {
	  // console.log(domBox.scrollTop)
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
// this.uploadFile(
//   file,
//   fileUrl => {
//     this.tapToSearch(fileUrl);
//   },
//   0
// );
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



new Vue({
  data() {
    return {
      moment
    }
  },
  router,
  store,
  methods: {
  },
  created() {
  },
  mounted() {
  },
  render: h => h(App)
}).$mount('#app')
