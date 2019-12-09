<!-- 关联竞争对手列表 -->
<template>
  <div class="CompetitorList flex flex-1 flex-col">
    <!-- <van-nav-bar title="竞争对手" left-text="取消" 
      @click-left="$store.state.competitor.confirmUserGids=[];$store.state.competitor.jobsUser=[]; $store.state.competitor.selectedUserGids = [];$router.go(-1)"  
      @click-right="selectedList" left-arrow>
      <div slot="right">下一步</div>
    </van-nav-bar> -->


    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.competitor.confirmUserGids=[];$store.state.competitor.jobsUser=[]; $store.state.competitor.selectedUserGids = [];$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">竞争对手</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div @click="selectedList()">下一步</div>
      </div>
    </div>



    <van-search
      v-model="$store.state.competitor.listParams.queryString"
      placeholder="搜索竞争对手"
      show-action
      shape="round"
    >
      <!-- <div slot="action" v-if="!$route.query.modelGid" @click="$router.push('/NewContacts')">新建</div> -->
      <div slot="action"></div>
    </van-search>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-checkbox-group v-model="$store.state.competitor.selectedUserGids" class="bg-white"> 
            <van-checkbox v-for="(item, i) in $store.state.competitor.list" :key="i" icon-size="16px" 
              class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" 
              :name="item.competorName+','+item.gid">
                {{item.competorName}}
            </van-checkbox>
          </van-checkbox-group>
          
      </div>
    </div>

    <div class="flex bg-gray-100 mt-1 p-3 h-14 items-center" v-show="$store.state.competitor.selectedUserGids.length">
      <div class="flex-1 ellipsis">
        <span class="text-gray-600 text-xs">已选择：</span>
        <span class="text-xs" v-for="(r,i) in $store.state.competitor.selectedUserGids" :key="i">
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'CompetitorList',
  created () {
  },
  data() {
    return {
    }
  },
  watch: {
    '$store.state.competitor.listParams.queryString'(val){
      this.$store.dispatch('listCompetitor', {queryString: val})
    }
  },
  mounted () {
    this.$store.state.competitor.confirmUserGids=[];
    this.$store.state.competitor.jobsUser=[]; 
    this.$store.state.competitor.selectedUserGids = [];
    this.$store.dispatch('listCompetitor')
  },
  methods: {
    selectedList(){
      if(this.$store.state.competitor.selectedUserGids.length){
        this.$store.state.competitor.jobsUser= [];
        this.$route.query.modelGid ? this.$router.push({path:'/SelectedCompetitorList', query: {modelGid: this.$route.query.modelGid}}) : this.$router.push('/SelectedCompetitorList') ;
        this.$store.state.competitor.confirmUserGids = this.$store.state.competitor.selectedUserGids
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
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>
