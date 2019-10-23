<!-- 我的基本信息 -->
<template>
  <div class="Base">
    
    <van-nav-bar title="个人资料" left-text="" @click-left="$router.go(-1)" left-arrow>
      <van-icon name="edit" size="18px" slot="right" />
      <!-- <img @click="$router.push('/MyBaseInfo')" slot="right"  src="../../../assets/my/icon_editor.png" class="w-5" alt=""> -->
      <!-- <van-icon name="plus" size="20px" @click="$router.push('/CreateDealer')" slot="right" /> -->
    </van-nav-bar>

    <div class="flex items-center p-5">
      <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1624240531,2195794812&fm=26&gp=0.jpg" class="border shadow-md border-white w-20 h-20 rounded-full" alt="">
      <div class="text-sm text-gray-700 ml-5">
        <span  class="font-bold text-xl text-black">王成阔</span><br />
        广州城市经理<br />
        工号：1004746
      </div>
    </div>

    <div class="pt-2 bg-gray-100">
      <van-cell-group>
        <van-field
          value="王成阔"
          label="姓名"
          disabled
        />
        <van-field
          value="1004746"
          label="工号"
          disabled
        />
        <van-field
          value="重卡 BU-湘患鄂大区-武汉"
          label="部门"
          disabled
        />
        <van-field
          value="武汉城市经理"
          label="职位"
          disabled
        />
        <van-field
          value="wangchengguang@sadfad.com"
          label="邮箱"
          disabled
        />
      </van-cell-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Base',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.Base .van-cell:not(:last-child)::after{
  right: 16px;
}
</style>