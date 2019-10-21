<!-- 最近访问页面 -->
<template>
  <div class="RecentVisit flex flex-1 flex-col">

    <van-nav-bar
      title="最近访问"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll">
          <van-cell-group v-if="listData.length">
            <van-cell is-link v-for="(row,i) in listData" :key="i" :ss="row.modelGid" :ssd="row.modelObjType">
              <template slot="title">
                <p class="leading-snug">{{row.someName}}<br />
                  <span class="text-gray-500">{{row.modelName}}</span>
                </p>
              </template>
            </van-cell>
          </van-cell-group>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  name: 'RecentVisit',
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 20
      },
      listData: []
    }
  },
  mounted(){
    this.$ajax.workbench.recentvisitlist(this.params).then(res=>{
      if (!res.code) {
        this.listData = res.data.list
      }
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
</style>