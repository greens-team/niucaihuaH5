<!-- 关联承租人列表 -->
<template>
  <div class="LesseeList flex flex-1 flex-col">
    <!-- <van-nav-bar title="承租人" left-text="取消" 
      @click-left="$store.state.lessee.confirmUserGids=[];$store.state.lessee.jobsUser=[]; $store.state.lessee.selectedUserGids = [];$router.go(-1)"  
      @click-right="selectedList" left-arrow>
      <div slot="right">下一步</div>
    </van-nav-bar> -->


    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.lessee.confirmUserGids=[];$store.state.lessee.jobsUser=[]; $store.state.lessee.selectedUserGids = [];$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">承租人</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" @click="selectedList">下一步</div>
      </div>
    </div>


    <van-search
      v-model="$store.state.lessee.listParams.queryString"
      placeholder="搜索承租人"
      show-action
      shape="round"
    >
      <!-- <div slot="action" v-if="!$route.query.modelGid" @click="$router.push('/NewContacts')">新建</div> -->
      <div slot="action"></div>
    </van-search>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-checkbox-group v-model="$store.state.lessee.selectedUserGids" class="bg-white"> 
            <van-checkbox v-for="(item, i) in $store.state.lessee.list" :key="i" icon-size="16px" 
              class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" 
              :name="item.lesseeName+','+item.gid">
                {{item.lesseeName}}
            </van-checkbox>
          </van-checkbox-group>
          
      </div>
    </div>

    <div class="flex bg-gray-100 mt-1 p-3 h-14 items-center" v-show="$store.state.lessee.selectedUserGids.length">
      <div class="flex-1 ellipsis">
        <span class="text-gray-600 text-xs">已选择：</span>
        <span class="text-xs" v-for="(r,i) in $store.state.lessee.selectedUserGids" :key="i">
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'LesseeList',
  created () {
  },
  data() {
    return {
    }
  },
  watch: {
    '$store.state.lessee.listParams.queryString'(val){
      this.$store.dispatch('listLessee', {queryString: val,onlyWrite:this.$route.query.onlyWrite ? true : false})
    }
  },
  mounted () {
    this.$store.state.lessee.confirmUserGids=[];
    this.$store.state.lessee.jobsUser=[]; 
    this.$store.state.lessee.selectedUserGids = [];
    this.$store.dispatch('listLessee', {onlyWrite:this.$route.query.onlyWrite ? true : false})
  },
  methods: {
    selectedList(){
      if(this.$store.state.lessee.selectedUserGids.length){
        this.$store.state.lessee.jobsUser= [];
        this.$route.query.modelGid ? this.$router.push({path:'/SelectedLesseeList', query: {modelGid: this.$route.query.modelGid}}) : this.$router.push('/SelectedLesseeList') ;
        this.$store.state.lessee.confirmUserGids = this.$store.state.lessee.selectedUserGids
      }else{
        this.$toast('请选择承租人')
        // this.$notify({ type: 'warning', message: '请选择承租人' })
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
