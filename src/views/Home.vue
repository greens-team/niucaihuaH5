<!-- 首页 -->
<template>
  <div class="home flex-1 flex flex-col">
    <Layout v-if="loginStatus"></Layout>
    <Login v-else />
  </div>
</template>

<script>
import Login from './Login'
import Layout from './Layout'
// import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    Login,
    Layout
  },
  created(){
  },
  data() {
    return {
      active: 0,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  },
  watch: {
  },
  mounted(){
  },
  methods: {
  },
  computed: {
    loginStatus: function(){
      return localStorage.loginState == 'true' ? true : false
    }
  }
}
</script>

<style scope>

</style>
