<!-- 竞争对手列表页 -->
<template>
  <div class="CompetitorList flex-1 flex flex-col">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-4 pr-4 flex" v-show="!searchBar">
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <div class="flex-1 text-center font-bold bar_title">竞争对手</div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>

          <!-- 搜索图标 -->
          <img
            class="bar_icon search_icon"
            @click="searchBar = true"
            src="../../assets/topBarIcon/search_icon.png"
            alt="搜索"
          />

          <!-- 添加图标 -->
          <img
            v-show="$root.checkRole('COMPETITOR_CREATE')"
            class="bar_icon plus_icon"
            @click="$store.commit('setInitAddParams');$router.push('/CreateCompetitor')"
            src="../../assets/topBarIcon/add_icon.png"
            alt="添加"
          />
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
          @input="(keyword)=>$store.dispatch('listCompetitor',{queryString: keyword,pageNum: 1})"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false;$store.dispatch('listCompetitor',{queryString: '', pageNum: 1})"
          >取消</div>
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

    <div class="border-b border-gray-200 flex items-center justify-start px-4">
      <div style="position:relative;margin-left: 1.286rem;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('listCompetitor',{orderType: num,pageNum:1})"
            v-model="$store.state.competitor.listParams.orderType"
            :options="$store.state.competitor.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="competitorListBox">
        <!-- <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listCompetitor',{competorType: num,pageNum:1})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.competitor.competorType" :key="index">
            <div
              class="flex flex-col m-4 bg-white last_child"
              style="border-bottom:1px solid #ededee;padding-bottom:1rem;"
              v-for="(r,i) in $store.state.competitor.list"
              :key="i"
              @click="getInfo(r.gid)"
            >
              <van-cell is-link>
                <template slot="title">
                  <p class="custom-title text-lg font-bold">{{r.competorName}}</p>
                  <p
                    class="text-gray-800"
                  >{{$store.state.competitor.competorStatus_1[r.competorType-1]}}</p>
                </template>
              </van-cell>
            </div>
          </van-swipe-item>
        </van-swipe>-->

        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->

        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listCompetitor',{competorType: num,pageNum:1})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.competitor.competorType" :key="index">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="我们是有底线的"
              @load="onLoad"
              :offset="20"
            >
              <div
                class="flex flex-col m-4 bg-white last_child"
                style="border-bottom:1px solid #ededee;padding-bottom:1rem;"
                v-for="(r,i) in itemList"
                :key="i"
                @click="getInfo(r.gid)"
              >
                <van-cell is-link>
                  <template slot="title">
                    <p class="custom-title text-lg font-bold">{{r.competorName}}</p>
                    <p
                      class="text-gray-800"
                    >{{$store.state.competitor.competorStatus_1[r.competorType-1]}}</p>
                  </template>
                </van-cell>
              </div>
            </van-list>
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
      homeSearch: false,

      loading: false,
      finished: false,
      page: 1, //请求第几页
      total: 0, //总共的数据条数
      itemList: []
    };
  },
  created() {
    //设置为初始值
    this.$store.commit("setInitParams");
  },
  mounted() {
    // this.scrollLoad(this.$refs.competitorListBox, resolve => {
    //   this.$store
    //     .dispatch("listCompetitor", {
    //       pageNum: this.$store.state.competitor.listParams.pageNum + 1
    //     })
    //     .then(msg => {
    //       resolve(msg);
    //     });
    // });
    // this.$store.dispatch("listCompetitor", { pageNum: 1 });

    this.getListData();
  },
  methods: {
    getInfo(id) {
      this.$store.state.competitor.currentTabsIndex = 0;
      this.$router.push({ name: "CompetitorInfo", query: { id: id } });
    },
    getListData() {
      this.$store
        .dispatch("listCompetitor", { pageNum: this.page })
        .then(res => {
          let rows = res;
          this.loading = false;
          this.total = this.$store.state.competitor.total;

          if (rows.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }

          // 将新数据与老数据进行合并
          this.itemList = this.itemList.concat(rows);

          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.itemList.length >= this.total) {
            this.finished = true;
          }
        });
    },

    //滚动加载时触发，list组件定义的方法
    onLoad() {
      this.page++;
      this.getListData();
    }
  }
};
</script>

<style scoped>
/* .CompetitorList /deep/ .van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.CompetitorList /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
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
.search_icon {
  margin-right: 1.143rem;
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
.order_icon {
  width: 1.286rem;
  height: 1.286rem;
  position: absolute;
  top: 16px;
}
.CompetitorList /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.CompetitorList /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.CompetitorList /deep/ .van-dropdown-item__option--active,
.CompetitorList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.CompetitorList /deep/ .van-dropdown-item__option--active,
.CompetitorList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.CompetitorList /deep/ .van-cell {
  padding: 0;
}
.last_child:last-child {
  border-bottom: 0px !important;
}
</style>