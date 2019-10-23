/**
 * index.vue        经销商管理页面
 * CreateDealer.vue 创建经销商页面
 * NewContacts.vue  创建联系人
 */

 <!-- 经销商管理页面 -->
<template>
  <div class="DealerManage">

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
            v-model="searchKeyword"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="searchBar = false">取消</div>
          </van-search>
        </div>
    </div>

   



    <van-tabs  v-model="activeTab">
      <van-tab v-for="(row,index) in tabs" :key="index" :title="row.name" :name="row.id">
      </van-tab>
    </van-tabs>

    <div class="border-b border-gray-200 flex items-center justify-around">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <Screening @onSearch="onSearch" />
    </div>

    <!-- 全部 -->
    <div v-if="activeTab == 0" class="ml-6 mr-6">

      <div class="flex flex-col pt-4 pb-4 border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-1 text-lg font-bold">内蒙古商用销售车有限公司</div>
          <div class="text-sm text-gray-500">
            <span class="text-sm text-red-500">36</span>
            天未拜访
          </div>
        </div>
        <div class="text-sm text-gray-500">内蒙古呼和浩特区泰康大厦503</div>
        <div class="flex items-center pt-1">
          <span class="text-sm mr-2">商务经理：刘静</span>
          <van-tag type="primary" round class="text-sm">标签</van-tag>
        </div>
      </div>

      <div class="flex flex-col pt-4 pb-4 border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-1 text-lg font-bold">内蒙古商用销售车有限公司</div>
          <div class="text-sm text-gray-500">
            <span class="text-sm text-red-500">36</span>
            天未拜访
          </div>
        </div>
        <div class="text-sm text-gray-500">内蒙古呼和浩特区泰康大厦503</div>
        <div class="flex items-center pt-1">
          <span class="text-sm mr-2">商务经理：刘静</span>
          <van-tag type="primary" round class="text-sm">标签</van-tag>
        </div>
      </div>

      <div class="flex flex-col pt-4 pb-4 border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-1 text-lg font-bold">内蒙古商用销售车有限公司</div>
          <div class="text-sm text-gray-500">
            <span class="text-sm text-red-500">36</span>
            天未拜访
          </div>
        </div>
        <div class="text-sm text-gray-500">内蒙古呼和浩特区泰康大厦503</div>
        <div class="flex items-center pt-1">
          <span class="text-sm mr-2">商务经理：刘静</span>
          <van-tag type="primary" round class="text-sm">标签</van-tag>
        </div>
      </div>
      
    </div>


  

   

  </div>
</template>

<script>
import Screening from '@/components/Screening'
export default {
  name: 'DealerManage',
  components: {
    Screening
  },
  data() {
    return {
      searchBar: false,
      searchKeyword: '',
      tabs: [
        {name:'全部',id: 0},
        {name:'线索入库',id:1},
        {name:'意向跟进',id:2},
        {name:'信审环节',id:3},
        {name:'合作中',id:4},
        {name:'线索入库',id:5},
        {name:'意向跟进',id:6},
        {name:'信审环节',id:7},
        {name:'合作中',id:8}
      ],
      activeTab: 0,

      value1: 0,
      value2: 'a',
      option1: [
        { text: '默认排序', value: 0 },
        { text: '按拜访时间排序', value: 1 },
        { text: '按创建时间排序', value: 2 },
        { text: '按名称排序', value: 3 }
      ],
      option2: [
        { text: '筛选', value: 'a' },
      ]
    }
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
    },
    onSearch(){ // 筛选传参 params
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