<!-- 竞争对手列表页 -->
<template>
  <div class="CompetitorList">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-3 pr-3 flex border-b border-gray-200" v-show="!searchBar">
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
          >
            <van-icon class name="arrow-left" />
            <span>返回</span>
          </div>
        </div>
        <div class="flex-1 text-center text-lg font-medium pt-2">合作竞对</div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>

          <!-- 搜索图标 -->
          <van-icon
            name="search"
            @click="searchBar = true"
            class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"
          />
          <!-- 添加图标 -->
          <van-icon name="plus" slot="right" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600" />
        </div>
      </div>
      <div
        v-show="searchBar"
        :class="['flex items-center pl-3 pr-3 flex border-b border-gray-200', {'pr-0': homeSearch }]"
      >
        <div
          v-if="homeSearch"
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <van-icon class name="arrow-left" />
          <span>返回</span>
        </div>
        <van-search
          class="flex-1"
          v-model="$store.state.competitor.listParams.queryString"
          @input="(keyword)=>$store.dispatch('listCompetitor',{queryString: keyword})"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div v-else slot="action" @click="searchBar = false">取消</div>
        </van-search>
      </div>
    </div>
    <van-tabs
      v-model="$store.state.competitor.listParams.competorType"
      @click="$refs.swipe.swipeTo($store.state.competitor.listParams.competorType)"
    >
      <van-tab
        v-for="(row,index) in $store.state.competitor.competorType"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>
    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listCompetitor',{competorType: num})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.competitor.competorType" :key="index">
            <div
              class="p-1 m-3 border-b"
              v-for="(r,i) in $store.state.competitor.list"
              :key="i"
              @click="getInfo(r.gid)"
            >
              <van-cell is-link>
                <template slot="title">
                  <p class="custom-title text-lg font-bold">{{r.competorName}}</p>
                  <p
                    class="text-gray-800"
                  >{{$store.state.competitor.competorStatus[r.competorType-1]}}</p>
                </template>
              </van-cell>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- <div @click="$router.push('/CompetitorInfo')">详情页</div> -->
  </div>
</template>

<script>
export default {
  name: "CompetitorList",
  data() {
    return {
      searchBar: false,
      homeSearch: false
    };
  },
  created() {
    //设置为初始值
    this.$store.commit("setInitParams");
  },
  mounted() {
    this.$store.dispatch("listCompetitor");
  },
  methods: {
    getInfo(id) {
      this.$router.push({ name: "CompetitorInfo", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.CompetitorList /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 4px;
}
.CompetitorList /deep/ .van-hairline--top-bottom::after,
.CompetitorList /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.CompetitorList /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.CompetitorList /deep/ [class*="van-hairline"]::after {
  position: static;
}
.CompetitorList /deep/ .van-tag {
  padding: 0 0.2em;
}

.CompetitorList /deep/ .van-cell {
  display: flex;
  align-items: center;
}
</style>