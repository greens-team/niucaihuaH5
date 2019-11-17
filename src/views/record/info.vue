 <!-- 提交备案信息 -->
<template>
  <div class="recordSubmit flex flex-1 flex-col">
    <van-nav-bar
      title="备案信息"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">
        sss
      </div>
    </div>
    <div class="bglinear text-white font-bold text-xl p-2 text-center m-3 rounded">提交备案</div>
  </div>
</template>

<script>
export default {
  name: 'recordSubmit',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.bglinear{
  background:linear-gradient(225deg,rgba(255,149,5,1) 0%,rgba(254,196,58,1) 100%);
}
</style>