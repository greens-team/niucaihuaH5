<!-- 首页 -->
<template>
  <div class="home flex-1 flex flex-col">

    <Layout></Layout>

    <!-- <Layout v-if="loginStatus"></Layout>
    <Login v-else /> -->

  </div>
</template>

<script>
// import Login from './Login'
import Layout from './Layout'
export default {
  name: 'home',
  components: {
    // Login,
    Layout
  },
  created(){
  },
  data() {
    return {
    }
  },
  watch: {
  },
  mounted(){
    

  },
  methods: {
  },
  computed: {
    // loginStatus: function(){
    //   return localStorage.loginState == 'true' ? true : false
    // }
  }
}
</script>

<style scope>

</style>
