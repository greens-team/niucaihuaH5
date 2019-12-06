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
      <van-tab title="常用"></van-tab>
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
            <van-swipe-item>
              <van-checkbox-group v-model="oftenuseValues" class="bg-white">
                  <div class="h-1"></div>
                  <van-checkbox v-for="(item, i) in $store.state.dealer.oftenuselist" :key="i" icon-size="16px" 
                    class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" 
                    :name="item.type+'-'+item.modelnName+','+item.modelGid">
                      {{item.modelnName}}
                  </van-checkbox>
                </van-checkbox-group>
            </van-swipe-item>
            <van-swipe-item >
                <van-checkbox-group v-model="colleagues.userGids" class="bg-white"> 
                  <!-- <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="a">全选</van-checkbox> -->
                  <!-- <van-index-anchor index="A" class=" bg-gray-100"/> -->
                  <div class="h-1"></div>
                  <van-checkbox v-for="(item, i) in $store.state.dealer.colleagueDataList" :key="i" icon-size="16px" 
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
                      <NestedDept :deptData="$store.state.dealer.deptDataList" />
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
        <span class="text-xs" v-for="(r,i) in distinct(colleagues.oftenuse,colleagues.userGids,colleagues.deptGids)" :key="i">
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
      colleagues: {
        userGids: [],
        deptGids: [],
        oftenuse: [],
        userType: 1
      },
      oftenuseValues:[],

      getColleaguePageNum: 1,
      colleagueLastPage: false,
    }
  },
  watch:{
    oftenuseValues(val){
      this.colleagues.oftenuse = val.map(r=>{
        return r.split('-')[1]
      })
      // if(val.length){
      //   let v = val[val.length-1].split('-')
      //   v[0] == 1 ? this.colleagues.userGids.push(v[1]) : this.colleagues.deptGids.push(v[1]) 
      // }
    },
    searchKeyword(){
      // active ? this.getDept() : this.getColleague()
      switch (this.active) {
        case 0:
          this.getOftenuselist()
          break;
        case 1:
          this.getColleague()
          break;
        case 2:
          this.getDept()
          break;
      }
    },
    active(num){
      this.searchKeyword = ''
      switch (num) {
        case 0:
          this.getOftenuselist()
          break;
        case 1:
          this.getColleague()
          break;
        case 2:
          this.getDept()
          break;
      }
    }
  },
  components: {
    NestedDept
  },
  created(){
    this.getOftenuselist()
  },
  mounted() {},
  methods: {
    distinct(a, b, c=[]) {
        let arr = a.concat(b,c);
        return arr.filter((item, index)=> {
            return arr.indexOf(item) === index
        })
    },
    getDept(keyword){
      this.$store.dispatch('getDept',{
          name: this.searchKeyword,
          enabled: true
      }).then(()=>{
        this.$store.state.dealer.colleagueDataList = []
      })
    },
    getOftenuselist(){
      this.$store.dispatch('getOftenuselist',{queryString: this.searchKeyword})
    },
    getColleague(){
      this.colleagueLastPage = false
      this.getColleaguePageNum = 1
      this.$store.dispatch('getColleague',{
        pageNum: this.getColleaguePageNum,
        pageSize: 20,
        usrNM: '',
        rlNm: this.searchKeyword
      }).then(()=>{
        this.$store.state.dealer.deptDataList = []
      })

      setTimeout(() => {
        // 同事列表滚动加载
        this.scrollLoad(this.$refs.colleagueListBox, resolve => {
          console.log(111)
          if(!this.active){
            if(!this.colleagueLastPage){
              this.$store.dispatch('getColleague',{
                pageNum: ++this.getColleaguePageNum,
                pageSize: 20,
                usrNM: '',
                rlNm: this.searchKeyword
              }).then(len => {
                if(len < 20){
                  this.colleagueLastPage = true
                }
                resolve()
              })
            }else{
              resolve()
            }
          }
        })
      }, 0);

    },
    selectColleague() {
      let userGids = []
      let deptGids = []
      this.oftenuseValues.map(r=>{
        let v = r.split('-')
        v[0] == 1 ? userGids.push(v[1]) : deptGids.push(v[1]) 
      })

      Object.assign(this.colleagues, {
        userGids: this.distinct(userGids,this.colleagues.userGids),
        deptGids: this.distinct(deptGids,this.colleagues.deptGids),
      })
      
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