<!-- 用户列表 -->
<template>
<div>
  <div  @click="userListValues = []; userListShow = true">
    <span v-if="!soltCon">{{paramsVal | fiterUser}}</span>
    <slot></slot>
  </div>
  <van-popup
      v-model="userListShow"
      position="bottom"
      :style="{ height: '40%'}">
      <van-nav-bar
        :title="title"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="clickleft"
        @click-right="clickright"
      />
      <van-search shape="round" placeholder="请输入姓名"  clearable v-model="searchKeyword" />
      <div class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200" style="top:100px;" ref="userListDom">
        <van-checkbox-group v-model="userListValues">
          <van-checkbox icon-size="16px" class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3" v-for="(r,i) in $store.state.dealer.colleagueDataList" :key="i" :name="r">{{r.refRlNm}}</van-checkbox>
        </van-checkbox-group>
      </div>
    </van-popup>
</div>
</template>

<script>
export default {
  props:['title', 'paramsVal', 'soltCon'],
  name: 'Screening',
  data () {
    return {
      searchKeyword: '',
      userListShow: false,
      userListValues: [],
      getColleaguePageNum: 1,
      colleagueLastPage:false,
    }
  },
  filters: {
    fiterUser(data){
      let arr = [];
      data.map(r=>{
        arr.push(r.ownerUserName || r.refRlNm)
      })
      return arr.length ? arr.toString() : '请选择'
    }
  },
  mounted() {
  },
  watch: {
    searchKeyword(keyword){
      this.getColleaguePageNum = 1;
      this.colleagueLastPage = false; 
      this.$store.dispatch('getColleague',{pageNum: 1,pageSize: 10,usrNM: '',rlNm: keyword})
    },
    userListShow (val) {
      !val && (this.userListValues = [])
      if(val){
        setTimeout(() => {
          // 负责人联系列表滚动加载
          !this.$refs.userListDom.onscroll && this.scrollLoad(this.$refs.userListDom, resolve => {
            if(!this.colleagueLastPage){
              this.$store.dispatch('getColleague',{
                pageNum: ++this.getColleaguePageNum,
                pageSize: 10,
                usrNM: '',
                rlNm: this.searchKeyword
              }).then(len=>{
                if(len < 10){
                  this.colleagueLastPage = true
                }
                resolve()
              })
            }else{
              resolve()
            }
          })
        },0);

        this.getColleaguePageNum = 1;
        this.colleagueLastPage = false;
        this.$store.dispatch('getColleague',{
          pageNum: this.getColleaguePageNum,
          pageSize: 10,
          usrNM: '',
          rlNm: ''
        })
        
      }
    },
  },
  methods: {
    clickleft(){
      this.userListShow = false;
    },
    clickright(){
      this.userListShow = false; 
      this.$emit('setParams',this.userListValues)
    }
  }
}
</script>

<style scoped>
</style>