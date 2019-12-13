<template>
  <div id="app" class="fixed inset-0 flex flex-col">

    <!-- <div v-if="!loginStatus" class="bg-gray-100 flex-1 flex items-center justify-center">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div> -->
    <router-view v-if="loginStatus"></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loginStatus: false
    }
  },
  mounted() {

    let _this = this
    window.setToken = function(token, userInfo){
      sessionStorage.Authorization = token
      userInfo && (sessionStorage.userInfo = JSON.stringify(userInfo))
      
      _this.loginStatus = true;
      setTimeout(()=>document.getElementById('loadingPage').style.display = 'none',2000)
      // location.reload()
      _this.$store.dispatch('getUserInfo').then((data)=>{
        _this.$root.userInfo = data
      })
    }

    // setToken('74d33508f4bd815c4fa8cc63e2a3f74e')
    // sessionStorage.Authorization = '74d33508f4bd815c4fa8cc63e2a3f74e'

    window.getUserInfoIosCallBack = (data) => {
      sessionStorage.Authorization = JSON.parse(data).datas.TOKEN
      sessionStorage.userInfo = JSON.stringify(JSON.parse(data).datas)
      window.Authorization = JSON.parse(data).datas.TOKEN
      _this.loginStatus = true;
      setTimeout(()=>document.getElementById('loadingPage').style.display = 'none',2000)
      // location.reload()
      _this.$store.dispatch('getUserInfo').then((data)=>{
        _this.$root.userInfo = data
      })

    }

    // 获取用户登录信息
    this.userAgent(() => { // 返回原生页面
      if(!sessionStorage.Authorization){
        var params = {"selector": "getUserInfo", "type": "LBHiOSApp"};
        var resultjson = prompt(JSON.stringify(params));
        eval(resultjson)
      }
    }, ()=>{
      if(!sessionStorage.Authorization){
        var userGsonStr = HelperNativeInterface.getUserInfo();
        sessionStorage.userInfo = userGsonStr
        sessionStorage.Authorization = JSON.parse(userGsonStr).TOKEN
        _this.loginStatus = true;
        setTimeout(()=>document.getElementById('loadingPage').style.display = 'none',2000)
        // location.reload()
        _this.$store.dispatch('getUserInfo').then((data)=>{
          _this.$root.userInfo = data
        })
      }
    })



    // window.setToken('74d33508f4bd815c4fa8cc63e2a3f74e',{ "SYSUSERFLAG": "1", "buOrgCd": "00000001", "ORG_CHILDREN": "", "TOKEN": "74d33508f4bd815c4fa8cc63e2a3f74e", "funauth": [ { "orgdispnm": "重卡-山西-晋北区域（朔州）", "orgid": "206", "roleisvis": "1", "isdisusr": "1", "rolename": "客户经理", "roleid": "10008" } ], "EMPLOYEE_ISDEPT": "晋中分公司", "IS_FINANCELEASE": "1", "EMPLOYEE_ID": "1000378", "EMPLOYEE_CODE": "0300040", "SIGN": "20693625c276f645253c9a0db97f31eb", "ORG_NAME": "", "genderCdList": [ { "isHide": false, "key": "007", "value": "客车（卡车业务）" }, { "isHide": false, "key": "001", "value": "卡车" } ], "EMPLOYEE_NAME": "董伟", "prdTypCateList": [ { "isHide": false, "key": "007", "value": "客车（卡车业务）" }, { "isHide": false, "key": "001", "value": "卡车" } ]})

  },
  methods: {
    setAuthorization(token){
      sessionStorage.Authorization = token
      this.loginStatus = true;
      setTimeout(()=>document.getElementById('loadingPage').style.display = 'none',2000)
      // location.reload()
      _this.$store.dispatch('getUserInfo').then((data)=>{
        _this.$root.userInfo = data
      })
    }
  },
  computed: {
    // loginStatus: function(){
    //   return sessionStorage.Authorization ? true : false
    // }
  }
}
</script>

<style>
*{
  font-size: 14px;
}
#app {
  font-family: Arial, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.formBar::before{
  position: absolute;
  left:0;
  top: 14px;
  content: '';
  width: 4px;
  height:13px;
  background-image: linear-gradient( #ff8b00 10%, #ffce00 80%);
}
.formBar::after{
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
</style>
