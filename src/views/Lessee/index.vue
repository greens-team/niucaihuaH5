 <!-- 承租人列表页 -->
<template>
  <div class="LesseeList">
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
        <div class="flex-1 text-center text-lg font-medium pt-2">承租人</div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>

          <!-- 搜索图标 -->
          <van-icon
            name="search"
            @click="searchBar = true"
            class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"
          />
          <!-- 添加图标 -->
          <van-icon name="plus" @click="$store.commit('setInitAddParams');$router.push('/CreateLessee')" slot="right" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"/>
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
          @input="(keyword)=>$store.dispatch('listLessee',{queryString: keyword})"
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
      v-model="$store.state.lessee.listParams.lesseeStatus"
      @click="$refs.swipe.swipeTo($store.state.lessee.listParams.lesseeStatus)"
    >
      <van-tab
        v-for="(row,index) in $store.state.lessee.lesseeStatus"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>

    <div class="border-b border-gray-200 flex items-center justify-start px-4">
      <van-dropdown-menu>
        <van-dropdown-item
          @change="(num)=>$store.dispatch('listLessee',{orderType: num})"
          v-model="$store.state.lessee.listParams.orderType"
          :options="$store.state.lessee.orderType"
        />
      </van-dropdown-menu>
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listLessee',{lesseeStatus: num})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.lessee.lesseeStatus" :key="index">
            <div
              class="flex flex-col border-b border-gray-200 p-4"
              v-for="(r,i) in $store.state.lessee.list"
              :key="i"
              @click="goInfo(r.gid)"
            >
              <div class="flex items-center">
                <div class="w-12 h-12 text-center rounded-full mr-4 text-3xl text-gray-700 baseName">z</div>
                <div style="flex:1">
                  <div class="flex items-center">
                    <div class="flex-1 text-base font-bold">{{r.lesseeName}}</div>
                    <div>
                      <van-tag
                        plain
                        type="primary"
                        class="text-sm"
                      >{{$store.state.lessee.status[r.lesseeStatus]}}</van-tag>
                    </div>
                  </div>
                  <div class="text-xs text-gray-900">{{r.homeAddress}}</div>
                  <div class="flex items-center pt-1">
                    <p>
                      <span class="text-xs text-gray-900">负责人：</span>
                      <span class="text-xs text-gray-900">{{r.ownerNames.toString()}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- <div @click="$router.push('/LesseeInfo')">详情页</div> -->
  </div>
</template>

<script>
export default {
  name: "LesseeList",
  data() {
    return {
      searchBar: false,
      homeSearch: false
    };
  },
  created(){
    this.$store.commit('setInitParams')
  },
  mounted() {
    this.$store.dispatch("listLessee");
  },
  methods: {
    goInfo(id) {
      this.$router.push({ name: "LesseeInfo", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.LesseeList /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 4px;
}
.LesseeList /deep/ .van-hairline--top-bottom::after,
.LesseeList /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.LesseeList /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.LesseeList /deep/ [class*="van-hairline"]::after {
  position: static;
}
.LesseeList /deep/ .van-tag {
  padding: 0 0.2em;
}

.LesseeList /deep/ .van-cell {
  display: flex;
  align-items: center;
}
.LesseeList /deep/ [class*="van-hairline"]::after {
  position: absolute;
}
.baseName {
  background: linear-gradient(245deg,rgba(255,191,42,1) 0%,rgba(254,233,124,1) 100%)
}
</style>