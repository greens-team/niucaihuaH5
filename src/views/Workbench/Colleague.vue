<!-- 选择同事及组织页面 -->
<template>
  <div class="Colleague flex-1 flex flex-col">

    <van-nav-bar
      title="选择同事"
      left-text="取消"
      right-text="重置"
      @click-right="onClickRight"
      @click-left="onClickLeft"
    />

    <van-search shape="round" placeholder="请输入搜索关键词"  v-model="searchKeyword" />
    
    <van-tabs v-model="active" title-active-color="#FF9B02" color="#FF9B02" @click="()=>{$refs.swipe.swipeTo(active)}">
      <!-- <van-tab title="常用"></van-tab> -->
      <van-tab title="同事"></van-tab>
      <van-tab title="部门"></van-tab>
    </van-tabs>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="colleagueListBox">

          <!-- <div class="pt-1 bg-gray-100" v-if="active == 0">
            <div class="bg-white pt-1">
              sds
            </div>
          </div> -->
          
          <van-swipe ref='swipe' :loop="false" :show-indicators="false" @change='(num)=>{active=num}'>
            <van-swipe-item >
                <van-checkbox-group v-model="colleagues.userGids" class="bg-white"> 
                  <!-- <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="a">全选</van-checkbox> -->
                  <!-- <van-index-anchor index="A" class=" bg-gray-100"/> -->
                  <div class="h-1"></div>
                  <van-checkbox v-for="(item, i) in colleagueData" :key="i" icon-size="16px" 
                    class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" 
                    :name="item.refRlNm+','+item.id">
                      {{item.refRlNm}}
                  </van-checkbox>
                </van-checkbox-group>
            </van-swipe-item>
            <van-swipe-item>
                <div class="pt-1 bg-gray-100">
                  <div class="bg-white pt-1 pl-3 pr-3">
                    <van-checkbox-group  v-model="colleagues.deptGids" class="bg-white NestedDept">
                      <NestedDept :deptData="deptData" />
                    </van-checkbox-group>
                  </div>
                </div>
            </van-swipe-item>
          </van-swipe>

      </div>
    </div>

    <div class="flex bg-gray-100 mt-1 p-3 h-14 items-center">
      <div class="flex-1 ellipsis">
        <span class="text-gray-600 text-xs">已选择：</span>
        <span class="text-xs" v-for="(r,i) in colleagues.userGids" :key="i">
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
        <span class="text-xs" v-for="(r,i) in colleagues.deptGids" :key="'a'+i">
          <span v-if="!i && colleagues.userGids.length">,</span>
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
      </div>
      <div class="btn text-white rounded text-sm p-1 pl-3 pr-3" @click="selectColleague">确 定</div>
    </div>

  </div>
</template>

<script>
import NestedDept from '@/components/NestedDept'
export default {
  name: 'Colleague',
  data() {
    return {
      searchKeyword: '',
      active: 0,
      deptData: [],
      colleagueData: [],
      colleagues: {
        userGids: [],
        deptGids: [],
        userType: 1
      }
    }
  },
  watch:{
    searchKeyword(){
      this.active ? this.getDept() : this.getColleague()
    },
    active(num){
      num ? this.getDept() : this.getColleague()
    }
  },
  components: {
    NestedDept
  },
  created(){
    this.getColleague()
  },
  mounted() {

    // this.scrollLoad(this.$refs.colleagueListBox, (resolve)=>{

    //     if(this.$store.state.workbench.workbenchTaskStatus){
    //       this.$store.state.workbench.colleaguesTaskPageNum++
    //     }else{
    //       this.$store.state.workbench.myTaskPageNum++
    //     }
    //     this.$store.dispatch('getTaskList').then(msg=>{
    //       resolve(msg)
    //     })

    // })
    
    
    // this.selected = this.$route.params
  },
  methods: {
    getDept(keyword){
      this.$ajax.auth.dept({}).then(res=>{
        this.deptData = res.data.content
        this.colleagueData = []
      })
    },
    getColleague(){
      this.$ajax.auth.colleague({
        pageNum: 1,
        pageSize: 30,
        usrNM: this.searchKeyword,
        rlNm: ''
      }).then(res=>{
        if(!res.code){
          this.colleagueData = res.data.resultList
          this.deptData = []
        }
      })
    },
    selectColleague() {
      if (this.colleagues.userGids.concat(this.colleagues.deptGids).length) {
        if(this.$route.params.type == 'briefing'){
          this.$store.commit('setBriefingColleagues', this.colleagues)
        }
        if(this.$route.params.type == 'task'){
          this.$store.commit('setTaskColleagues', this.colleagues)
        }
      }
      this.$router.go(-1)
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      if(this.$route.params.type == 'briefing'){
        this.$store.commit('setBriefingColleagues', {
          userGids: [],
          deptGids: [],
          userType: 0
        })
      }
      if(this.$route.params.type == 'task'){
        this.$store.commit('setTaskColleagues', {
          userGids: [],
          deptGids: [],
          userType: 1
        })
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.btn{
  background:linear-gradient(225deg,rgba(255,149,5,1) 0%,rgba(254,196,58,1) 100%);
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>