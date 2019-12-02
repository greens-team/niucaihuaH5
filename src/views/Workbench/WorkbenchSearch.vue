<!-- 工作台搜索 -->
<template>
  <div class="WorkbenchSearch flex-1 flex flex-col">
    
    <!-- 搜索 -->
    <div class="flex items-center pr-3 pl-3">
      <van-icon name="arrow-left" class="text-blue-500" style="font-size: 18px;" @click="$router.go(-1)" />
      <van-search
        class="flex-1"
        v-model="params.queryString"
        placeholder="请输入搜索关键词"
        show-action
        @clear="initSend"
        shape="round">
          <div slot="action" @click="initSend">搜索</div>
      </van-search>
    </div>
    
    <van-tabs class="-mt-2" v-model="params.modelType">
      <van-tab v-for="(row,index) in tabs" :key="index" :title="row.name" :name="row.id">
      </van-tab>
    </van-tabs>

    <div class="flex-1 border-t border-gray-100 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="listBox">

        <van-cell-group v-if="listData && listData.length">
          <van-cell is-link v-for="(row,i) in listData" :key="i" :ss="row.modelGid" :ssd="row.modelObjType" @click="goDetail(row)">
            <template slot="title">
              <p class="leading-snug">{{row.someName}}<br />
                <span v-if="!params.modelType" class="text-gray-500">{{row.modelName}}</span>
              </p>
            </template>
          </van-cell>
        </van-cell-group>
        <p v-else class="text-center mt-10 text-gray-600">
          没有找到相关的关键词
        </p>

      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'WorkbenchSearch',
  data() {
    return {
      tabs: [
        {name:'全部',id: 0},
        {name:'经销商',id:1},
        {name:'联系人',id:2},
        {name:'承租人',id:3},
        {name:'竞争对手',id:4}
      ],
      params: {
        queryString: '',
        modelType: 0,
        pageNum: 1,
        pageSize: 13
      },
      listData: [],

      isEnd: false
    }
  },
  watch: {
    'params.queryString'(val){
      sessionStorage.globalSearchVal = val
    },
    'params.modelType'(){
      this.initSend()
    },
    'params.pageNum'(){
      this.onSearch()
    }
  },
  mounted() {
    this.params.queryString = sessionStorage.globalSearchVal || ''
    this.onSearch()

    // 滚动加载
    this.$refs.listBox && this.scrollLoad(this.$refs.listBox, (resolve)=>{
        this.params.pageNum++
        resolve()
    })

  },
  methods: {
    goDetail(row){
      switch (row.modelName) {
        case '经销商':
          this.$router.push({path:'/DealerInfo', query:{id:row.modelGid}})
          break;
        case '联系人':
          this.$router.push({path:'/ContactsInfo', query:{gid:row.modelGid}})
          break;
        case '承租人':
          this.$router.push({path:'/LesseeInfo', query:{id:row.modelGid}})
          break;
        case '竞争对手':
          this.$router.push({path:'/CompetitorInfo', query:{id:row.modelGid}})
          break;
      }

    },
    initSend(){
      this.isEnd = false
      this.listData = []
      this.params.pageNum == 1 ? this.onSearch() : (this.params.pageNum = 1)
    },
    onSearch () {
      if(!this.isEnd){
       this.$ajax.workbench.workbenchSearch(this.params).then(res => {
          if (!res.code && res.data.list) {
            this.listData = (this.params.pageNum == 1) ? res.data.list : this.listData.concat(res.data.list);
            if(res.data.list.length < this.params.pageSize){this.isEnd = true}
          }else {
            this.listData = []
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.WorkbenchSearch /deep/.van-tabs__line{
  background-image: linear-gradient(160deg, #ffce00 20%,#ff8b00 80%);
  height: 4px;
}
.WorkbenchSearch /deep/ .van-hairline--top-bottom::after, .WorkbenchSearch /deep/ .van-hairline-unset--top-bottom::after{
  border: 0;
}
.WorkbenchSearch /deep/ .van-tab--active span{ font-size: 1.2rem; }
.WorkbenchSearch /deep/ [class*=van-hairline]::after{
  position: static;
}
</style>