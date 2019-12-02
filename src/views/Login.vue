<!-- 登录页面 -->
<template>
  <div class="loginPage flex-1 flex flex-col">

    <div v-if="loading" class="flex-1 flex flex-col items-center justify-center relative">
      <img src="../assets/login/logo1.png" alt="" class="w-40 -mt-20" />
      <p class="text-center text-gray-800 absolute bottom-0 mb-20">让工作更快乐，让协作更简单</p>
    </div>
    <div v-else class="pt-40">
      <img src="../assets/login/logo2.png" alt="" class="w-40 m-auto"/>
      <p class="text-center text-gray-800  mt-8">规范企业管理，打造PDCA管理闭环</p>
      <div class="mt-20 w-10/12 m-auto">
        <van-field v-model="params.username" placeholder="请输入工号" />
        <van-field class="mt-4" type="password" v-model="params.password" placeholder="请输入起始密码" />
        <div class="text-red-500 pl-5 mt-3 h-1">
          <span v-show="loginFailedText">{{loginFailedText}}</span>
        </div>
        <div @click="login" class="mt-16 ml-4 mr-4 text-xl font-bold loginBut text-center text-white p-2 rounded cursor-pointer">登 录</div>
        <div class="text-xs text-center text-gray-500 mt-4 cursor-pointer hover:text-gray-800">登录后设置新密码</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'loginPage',
  data() {
    return {
      params: {
        username: '',
        password: ''
      },
      loading: true,
      loginFailedText: false
    }
  },
  mounted(){
    setTimeout(()=>{
      this.loading = false
    }, 3000)
  },
  watch: {
    'params.username'(){
      this.loginFailedText = false
    },
    'params.password'(){
      this.loginFailedText = false
    }
  },
  methods: {
    ...mapMutations([
      'setLoginState'
    ]),
    login(){
      if (!this.params.username || !this.params.password) {
        this.$toast({
          position: 'bottom',
          message: '账号或密码不能为空!'
        });
      }else{
        // let params = {
        //   code: "fxc",
        //   password: "123456",
        //   username: "admin",
        //   uuid: "3111c4fb663d41a580c0fffc39812a37"
        // }
        this.$ajax.auth.login(this.params).then(res=>{
          if (!res.code) {
            this.setLoginState(true);
            localStorage.Authorization = 'Bearer ' + res.data.token
            this.$router.go(0)
          }else{
            this.loginFailedText = res.msg;
            
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.loginBut{
  background:linear-gradient(247deg,rgba(255,146,2,1) 0%,rgba(252,254,124,1) 100%);
}
.loginPage .van-cell:not(:last-child)::after{
  right: 16px;
}
</style>