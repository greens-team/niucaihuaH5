<!-- 我的设置信息 -->
<template>
  <div class="mySet">
    <van-nav-bar title="设置" left-text @click-left="$router.go(-1)" left-arrow></van-nav-bar>
    <div class="py-12 rounded-lg relative bg-white">
      <div class="flex-1 flex flex-col items-center relative">
        <img src="../../../assets/login/logo_set.png" alt class="w-24" />
        <p class="text-center text-gray-800 py-4">重卡CRM 1.0.0</p>
      </div>
    </div>
    <div class="logOut" @click="logOut">退出登录</div>

    <div class="p-5">
      <p>测试数据</p>
      {{testToken}}<br />
      {{userInfo}}
    </div>
    
  </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      testToken: '',
      userInfo: {}
    };
  },
  mounted() {
     this.testToken = localStorage.Authorization
     this.userInfo = JSON.parse(sessionStorage.userInfo)
  },
  methods: {
    // this.$router.go(-1);
    // this.$store.commit("setLoginState", false);
    logOut() {
      this.userAgent(() => { // 返回原生页面
        let params = {"selector":"navigationGoBack","type":"LBHiOSApp"};
        let resultjson = prompt(JSON.stringify(params));
        delete localStorage.Authorization
      }, ()=>{
        HelperNativeInterface.navigationGoBack()
        delete localStorage.Authorization
      })
    }
  }
};
</script>
<style scoped>
.mySet {
  background: #f8fafb;
  height: 100%;
}
.logOut {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top: 0.5rem;
  height: 3.5rem;
  font-size: 1.2rem;
  color: #f42929;
}
</style>