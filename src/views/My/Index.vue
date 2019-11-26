/**
 * index.vue        我的模块首页
 * BaseInfo.vue     我的基本信息
 */

 <!-- 我的模块首页 -->
<template>
  <div class="My">
    <div class="baseinfo m-5 rounded-lg relative">

      <div class="p-6 pl-8">
        <div class="flex justify-between items-center">
          <p>
            <span class="text-xl font-bold">王成阔</span><br>
            广州城市经理
          </p>
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1624240531,2195794812&fm=26&gp=0.jpg" class="border border-white w-20 h-20 rounded-full" alt="">
        </div>
        <p class="text-xs mt-3">
          电话 15110289222<br />
          工号 1004746
        </p>
      </div>

      <div class="editor absolute bottom-0 right-0 bg-white pl-2 pt-2">
        <img @click="$router.push('/MyBaseInfo')" src="../../assets/my/icon_editor.png" class="w-5 m-1" alt="">
      </div>
    </div>

    <div class="bg-gray-100 mt-8">
      <!-- <van-cell is-link>
        <template slot="title">
          <div  class="flex items-center justify-between w-24">
            <div class="flex-1 flex items-center justify-center">
              <img class="w-6 h-6 mr-1" src="../../assets/my/icon1.png" alt="">
            </div>
            <p>我的团队</p>
          </div>
        </template>
      </van-cell>
      <van-cell is-link>
        <template slot="title">
          <div  class="flex items-center  justify-between w-24">
            <div class="flex-1 flex items-center justify-center">
              <img class="w-6 h-6 mr-1" src="../../assets/my/icon2.png" alt="">
            </div>
            <p>活动状态</p>
          </div>
        </template>
      </van-cell> 
      <van-cell class="mt-3" is-link>
        <template slot="title">
          <div  class="flex items-center  justify-between w-24">
            <div class="flex-1 flex items-center justify-center">
              <img class="w-5 h-5 mr-1" src="../../assets/my/icon3.png" alt="">
            </div>
            <p>快速入门</p>
          </div>
        </template>
      </van-cell>
      -->
      <van-cell is-link @click="$router.push('/FeedBack');"> 
        <template slot="title">
          <div  class="flex items-center  justify-between w-24">
            <div class="flex-1 flex items-center justify-center">
              <img class="w-4 h-4 mr-1" src="../../assets/my/icon4.png" alt="">
            </div>
            <p>意见反馈</p>
          </div>
        </template>
      </van-cell>
      <van-cell class="mt-3" is-link @click="$router.push('/MySetInfo');">
        <template slot="title">
          <div  class="flex items-center  justify-between w-24" >
            <div class="flex-1 flex items-center justify-center">
              <img class="w-6 h-6 mr-1" src="../../assets/my/icon5.png" alt="">
              <span class="custom-title">设置信息</span>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.baseinfo{
  background:linear-gradient(245deg,rgba(255,191,42,1) 0%,rgba(254,233,124,1) 100%);
  box-shadow:0px 2px 13px 5px rgba(221,221,221,0.5);
}
.baseinfo .editor{
  border-top-left-radius: 5rem;
  border-bottom-right-radius: 1rem;
}
.My  .van-cell:not(:last-child)::after{
  right: 16px;
}
</style>