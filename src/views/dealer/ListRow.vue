 <!-- 经销商列表组件 -->
<template>
  <div>
    <div class="flex flex-col p-4 border-b border-gray-200" v-for="(r,i) in $store.state.dealer.listData" :key="i" @click="goInfo(r.gid)">
      <div class="flex items-center">
        <div class="flex-1 text-lg font-bold">{{r.dealerName}}</div>
        <div class="text-sm text-gray-500">
          <span class="text-sm text-red-500">{{r.notVisitDays}}</span>
          天未拜访
        </div>
      </div>
      <div class="text-sm text-gray-500">{{r.province + '' + r.city + '' + r.area + '' + r.address}}</div>
      <div class="flex items-center pt-1">
        <span class="text-sm mr-2">{{r.ownerNames.toString()}}</span>
        <van-tag type="primary" round class="text-sm">{{$store.state.dealer.status[r.status]}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DealerManage',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    goInfo(id){
      this.$router.push({name: 'DealerInfo', query: {id: id}})
    }
  }
}
</script>

<style scoped>
</style>