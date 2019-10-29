/**
 * index.vue        经销商管理页面
 * CreateDealer.vue 创建经销商页面
 * NewContacts.vue  创建联系人
 * ListRow.vue      经销商列表单行组件
 */

 <!-- 经销商管理页面 -->
<template>
  <div class="DealerManage flex-1 flex flex-col">

    <div class="flex flex-col">
      <div class="flex-1 items-center pl-3 pr-3 flex border-b border-gray-200" v-show="!searchBar">
        <div class="flex-1 flex">
          <div @click="$router.go(-1)" class="flex  text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600" >
            <van-icon  class="" name="arrow-left" />
            <span>返回</span>
          </div>
        </div>
        <div class="flex-1 text-center text-lg font-medium pt-2">经销商</div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>
          <van-icon name="search"  @click="searchBar = true" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600" />
          <van-icon name="plus" @click="$router.push('/CreateDealer')" slot="right" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"/>
        </div>
      </div>
       <div v-show="searchBar" class="flex items-center pl-3 pr-3 flex border-b border-gray-200">
          <van-search
            class="flex-1"
            v-model="$store.state.dealer.listParams.queryString"
            placeholder="请输入搜索关键词"
            @input="(keyword)=>$store.dispatch('getListData',{queryString: keyword})"
            show-action
            shape="round"
          >
            <div slot="action" @click="searchBar = false; $store.dispatch('getListData',{queryString: ''})">取消</div>
          </van-search>
        </div>
    </div>
    
    <van-tabs  v-model="$store.state.dealer.listParams.followStatus" @click="$refs.swipe.swipeTo($store.state.dealer.listParams.followStatus)">
      <van-tab v-for="(row,index) in $store.state.dealer.followStatus" :key="index" :title="row.name" :name="row.id">
      </van-tab>
    </van-tabs>

    <div class="border-b border-gray-200 flex items-center justify-around">
      <van-dropdown-menu>
        <van-dropdown-item 
          @change="(num)=>$store.dispatch('getListData',{orderType: num})" 
          v-model="$store.state.dealer.listParams.orderType" 
          :options="$store.state.dealer.orderType" />
      </van-dropdown-menu>
      <Screening @onSearch="data => $store.dispatch('getListData', data)" />
    </div>

    <div class="flex-1 relative" >
      <div class="absolute inset-0 overflow-y-scroll">
        <van-swipe ref='swipe' :loop="false" :show-indicators="false" @change="(num)=>$store.dispatch('getListData',{followStatus: num})">
          <van-swipe-item v-for="(row,index) in $store.state.dealer.followStatus" :key="index"> <ListRow /> </van-swipe-item>
        </van-swipe>
      </div>
    </div>

  </div>
</template>

<script>
import Screening from '@/components/Screening'
import ListRow from './ListRow'
export default {
  name: 'DealerManage',
  components: {
    Screening,
    ListRow
  },
  data() {
    return {
      searchBar: false,

      value2: 'a',
      option2: [
        { text: '筛选', value: 'a' },
      ]
    }
  },
  mounted() {
    this.$store.dispatch('getListData')
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
    },
    goInfo(id){
      this.$router.push({name: 'DealerInfo', query: {id: id}})
    }
  }
}
</script>

<style scoped>
.DealerManage /deep/.van-tabs__line{
  background-image: linear-gradient(160deg, #ffce00 20%,#ff8b00 80%);
  height: 4px;
}
.DealerManage /deep/ .van-hairline--top-bottom::after, .DealerManage /deep/ .van-hairline-unset--top-bottom::after{
  border: 0;
}
.DealerManage /deep/ .van-tab--active span{ font-size: 1.2rem; }
.DealerManage /deep/ [class*=van-hairline]::after{
  position: static;
}
.DealerManage /deep/ .van-tag{padding:0 0.2em;}
</style>