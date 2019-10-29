<!-- 经销商详情信息页面 -->
<template>
<!--  -->
  <div class="DealerInfo flex-1 flex flex-col">
    <van-nav-bar
      title="经销商详情"
      @click-left="$router.go(-1)"
      left-text="返回"
      left-arrow>
        <i class="iconfont iconqipaocaidanbianji-bang" slot="right" style="font-size: 1.6rem;"></i>
        <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i>
    </van-nav-bar>
    info info
  </div>
</template>

<script>
export default {
  name: 'DealerInfo',
  data() {
    return {
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
  },
  methods: {
  }
}
</script>

<style scoped>
</style>