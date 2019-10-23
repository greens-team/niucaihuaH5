<!-- 选择同事及组织页面 -->
<template>
  <div class="Colleague flex-1 flex flex-col">

    <van-nav-bar
      title="选择同事"
      left-text="取消"
      right-text="重置"
      @click-left="onClickLeft"
    />

    <van-search shape="round" placeholder="请输入搜索关键词" v-model="searchKeyword" />
    
    <van-tabs v-model="active" title-active-color="#FF9B02" color="#FF9B02">
      <van-tab title="常用"></van-tab>
      <van-tab title="同事"></van-tab>
      <van-tab title="部门"></van-tab>
    </van-tabs>


    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll">
          <div class="pt-1 bg-gray-100" v-if="active == 0">
            <div class="bg-white pt-1">
            </div>
          </div>
          
            <van-index-bar class="pt-1" v-if="active == 1">
              <van-checkbox-group v-model="checked" class="bg-white">
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="a">全选</van-checkbox>

                <van-index-anchor index="A" class=" bg-gray-100"/>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="d">复选框</van-checkbox>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="c">复选框</van-checkbox>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="h">复选框</van-checkbox>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="j">复选框</van-checkbox>

                <van-index-anchor index="B" class=" bg-gray-100"/>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="b">复选框</van-checkbox>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="e">复选框</van-checkbox>
                <van-checkbox icon-size="16px" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200" name="f">复选框</van-checkbox>
                <div class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200 flex">
                  <van-checkbox class="flex-1" icon-size="16px"  name="z">刘海涛（139）</van-checkbox>
                  <div class="text-blue-500 text-sm"><span class="pr-2 text-gray-500">|</span>下级</div>
                </div>
                <div class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200 flex">
                  <van-checkbox class="flex-1" icon-size="16px"  name="z">刘海涛（139）</van-checkbox>
                  <div class="text-blue-500 text-sm"><span class="pr-2 text-gray-500">|</span>下级</div>
                </div>
                <div class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200 flex">
                  <van-checkbox class="flex-1" icon-size="16px"  name="z">刘海涛（139）</van-checkbox>
                  <div class="text-blue-500 text-sm"><span class="pr-2 text-gray-500">|</span>下级</div>
                </div>

              </van-checkbox-group>

            </van-index-bar>
          <div class="pt-1 bg-gray-100" v-if="active == 2">
            <div class="bg-white pt-1">
              <van-checkbox-group>
                <div v-for="(row, i) in deptData" :key="i">
                  {{row.name}}
                  <div v-show="row.children.length" v-for="(r, i) in row.children" :key="i">

                    {{r.name}}

                    <div v-show="r.children.length" v-for="(item, i) in r.children" :key="i" class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200 flex">
                      <van-checkbox class="flex-1" icon-size="16px"  :name="'ss' + item.id">{{item.name}}</van-checkbox>
                      <van-checkbox class="flex-1" icon-size="16px"  name="z">刘海涛（139）</van-checkbox>
                      <div class="text-blue-500 text-sm"><span class="pr-2 text-gray-500">|</span>下级</div>
                    </div>

                  </div>
                </div>
              </van-checkbox-group>
            </div>
          </div>

      </div>
    </div>

    <div class="flex bg-gray-100 mt-1 p-3 h-14 justify-between items-center">
      <div><span class="text-gray-600">已选择：</span>adsf,砌砖，劳而无功ds...</div>
      <div class="btn text-white rounded text-sm p-1 pl-3 pr-3">确 定</div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Colleague',
  data() {
    return {
      searchKeyword: '',
      active: 1,
      checked: [],
      deptData: []
    }
  },
  created(){
    this.$ajax.auth.dept({
      page: 0,
      size: 10,
      sort: 'id,desc'
    }).then(res=>{
      this.deptData = res.body.content
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
    }
  }
}
</script>

<style scoped>
.btn{
  background:linear-gradient(225deg,rgba(255,149,5,1) 0%,rgba(254,196,58,1) 100%);
}
/* .Colleague /deep/ .van-tabs__line{
  background:linear-gradient(225deg,rgba(255,149,5,1) 0%,rgba(254,196,58,1) 100%);
} */
</style>