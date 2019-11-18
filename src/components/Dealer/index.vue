<!-- 关联经销商列表 -->
<template>
  <div class="LesseeList flex flex-1 flex-col">
    <van-nav-bar title="经销商" left-text="取消" 
      @click-left="$store.state.dealer.confirmUserGids=[];$store.state.dealer.jobsUser=[]; $store.state.dealer.selectedUserGids = [];$router.go(-1)"  
      @click-right="selectedList" left-arrow>
      <div slot="right">下一步</div>
    </van-nav-bar>

    <van-search
      v-model="$store.state.dealer.listParams.queryString"
      placeholder="搜索经销商"
      show-action
      shape="round"
    >
      <div slot="action"></div>
    </van-search>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-checkbox-group v-model="$store.state.dealer.selectedUserGids" class="bg-white"> 
            <van-checkbox v-for="(item, i) in $store.state.dealer.listData" :key="i" icon-size="16px" 
              class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" 
              :name="item.dealerName+','+item.gid">
                {{item.dealerName}}
            </van-checkbox>
          </van-checkbox-group>
          
      </div>
    </div>

    <div class="flex bg-gray-100 mt-1 p-3 h-14 items-center" v-show="$store.state.dealer.selectedUserGids.length">
      <div class="flex-1 ellipsis">
        <span class="text-gray-600 text-xs">已选择：</span>
        <span class="text-xs" v-for="(r,i) in $store.state.dealer.selectedUserGids" :key="i">
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'DealerList',
  created () {
  },
  data() {
    return {
    }
  },
  watch: {
    '$store.state.dealer.listParams.queryString'(val){
      this.$store.dispatch('getListData', {queryString: val})
    }
  },
  mounted () {
    this.$store.state.dealer.confirmUserGids=[];
    this.$store.state.dealer.jobsUser=[]; 
    this.$store.state.dealer.selectedUserGids = [];
    this.$store.dispatch('getListData')
  },
  methods: {
    selectedList(){
      if(this.$store.state.dealer.selectedUserGids.length){
        this.$store.state.dealer.jobsUser= [];
        this.$route.query.modelGid ? this.$router.push({path:'/SelectedDealerList', query: {modelGid: this.$route.query.modelGid}}) : this.$router.push('/SelectedDealerList') ;
        this.$store.state.dealer.confirmUserGids = this.$store.state.dealer.selectedUserGids
      }else{
        this.$notify({ type: 'warning', message: '请选择联系人' })
      }
    }
  }
}
</script>

<style scoped>
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
