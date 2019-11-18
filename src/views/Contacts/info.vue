 <!-- 联系人 内容页 -->
<template>
  <div class="ContactsInfo flex-1 flex flex-col bg-gray-100">
    <van-nav-bar
      title="联系人详情"
      @click-left="$router.go(-1)"
      left-text="返回"
      left-arrow>
        <i class="iconfont iconqipaocaidanbianji-bang" slot="right" style="font-size: 1.6rem;"></i>
        <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i>
    </van-nav-bar>

    <div class="flex-1 relative" >
      <div class="absolute inset-0 overflow-y-scroll">



        <div class="shadow-md rounded-lg m-3 flex p-4 bg-white pt-5 pb-5">
          <div class="circleBg font-bold mr-3">M</div>
          <p class="flex-1 text-xl font-bold">{{info.contactsName}}</p>
          <i class="iconfont iconweizhi text-orange-500"></i>
        </div>

        <van-tabs class="tabs -mt-2 -mb-2"  v-model="currentTabsIndex" @click="$refs.swipe.swipeTo(currentTabsIndex)">
          <van-tab title="基本信息" :name="0"></van-tab>
          <van-tab title="动态记录" :name="1"></van-tab>
          <van-tab title="操作历史" :name="2"></van-tab>
        </van-tabs>
        

        <van-swipe ref='swipe' :loop="false" :show-indicators="false" @change="(num)=> (currentTabsIndex = num)" class="mt-1">
          <van-swipe-item>
            <div  class="shadow-md rounded-lg m-3 p-3 flex bg-white">
              基本信息 <br />
              <!-- {{$store.state.contacts.contactsInfo}} -->
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div  class="shadow-md rounded-lg m-3 p-3 flex bg-white">
              动态记录
            </div>
            </van-swipe-item>
          <van-swipe-item>
            <div  class="shadow-md rounded-lg m-3 p-3 flex bg-white">
              操作历史
            </div>
          </van-swipe-item>
        </van-swipe>




      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsInfo',
  data() {
    return {
      currentTabsIndex: 0,
      info: {}
    }
  },
  mounted() {
    this.$store.dispatch('getContactsInfo', this.$route.query.gid).then(()=>{
      this.info = this.$store.state.contacts.contactsInfo
    })
  },
  methods: {
  }
}
</script>

<style scoped>
.circleBg{
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  text-align: center;
  line-height: 2rem;
  color: white;
}


.ContactsInfo .tabs /deep/.van-tabs__line{
  background-image: linear-gradient(160deg, #ffce00 20%,#ff8b00 80%);
  height: 4px;
}
.ContactsInfo .tabs /deep/ .van-hairline--top-bottom::after, .ContactsInfo .tabs /deep/ .van-hairline-unset--top-bottom::after{
  border: 0;
}
.ContactsInfo .tabs /deep/ .van-tab--active span{ font-size: 1.2rem; }
.ContactsInfo .tabs /deep/ [class*=van-hairline]::after{
  position: static;
}
.ContactsInfo .tabs /deep/ .van-tag{padding:0 0.2em;}
.ContactsInfo .tabs /deep/ .van-tabs__nav {
  background-color: inherit;
}

</style>