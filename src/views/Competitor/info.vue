 <!-- 竞争对手内容页 -->
<template>
  <div class="CompetitorInfo flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="竞争对手" @click-left="$router.go(-1)" left-text="返回" left-arrow>
      <i
        class="iconfont iconqipaocaidanbianji-bang"
        @click="editor"
        slot="right"
        style="font-size: 1.6rem;"
      ></i>
      <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll">
        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3">
            <p class="text-xl font-bold">{{info.competorName}}</p>
            <p class="text-sm">{{$store.state.competitor.competorStatus_1[info.competorType-1]}}</p>
          </div>
        </div>

        <van-tabs
          class="tabs"
          v-model="$store.state.competitor.currentTabsIndex"
          @click="$refs.swipe.swipeTo($store.state.competitor.currentTabsIndex)"
        >
          <van-tab
            v-for="(row,index) in $store.state.competitor.tabs"
            :key="index"
            :title="row.text"
            :name="row.id"
          ></van-tab>
        </van-tabs>

        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.commit('setCurrentTabsIndex_competitor', num)"
        >
          <van-swipe-item v-for="(row,index) in $store.state.competitor.tabs" :key="index">
            <!-- 基本信息 经销商-->
            <div v-if="$store.state.competitor.currentTabsIndex === 0">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex items-center">
                  <div class="flex flex-1 items-center font-bold">基本信息</div>
                </div>
                <div>
                  <div class="border-t border-gray-100 p-2 mt-2">
                    <p class="text-xs text-gray-500">
                      <span class="text-red-500">*</span>竞对名称
                    </p>
                    <p>{{info.competorName}}</p>
                  </div>
                  <div class="border-t border-gray-100 p-2 mt-2">
                    <p class="text-xs text-gray-500">竞对类型</p>
                    <p>{{$store.state.competitor.competorStatus_1[info.competorType-1]}}</p>
                  </div>
                </div>
              </div>

              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pl-3 pr-3 pb-3">
                  <div class="flex-1 font-bold">经销商</div>
                  <div class="text-sm text-blue-500">关联</div>
                </div>
                <van-collapse v-model="currentCompetitor">
                  <van-collapse-item
                    v-for="(r,i) in competitorlist"
                    :key="i"
                    :title="r.dealerName"
                    :name="r.dealerGid"
                  >
                    <div class="border-b border-gray-100 pt-2 pb-2">
                      <p class="text-xs text-gray-500">
                        <span class="text-red-500">*</span>竞对政策
                      </p>
                      <p class="text-gray-900 text-sm">{{r.racePolicy}}</p>
                    </div>
                    <div class="border-b border-gray-100 pt-2 pb-2">
                      <p class="text-xs text-gray-500">狮桥应对策略</p>
                      <p class="text-gray-900 text-sm">{{r.tactics}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.competitor.currentTabsIndex === 1">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex items-center">
                  <div class="flex flex-1 items-center font-bold">操作历史</div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.competitor.currentTabsIndex === 2">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex items-center">
                  <div class="flex flex-1 items-center font-bold">动态记录</div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="flex bg-white footer-bar">
      <i class="iconfont iconjingxiaoshangbaifang mx-3" style="font-size: 2rem;"></i>
      <i class="iconfont iconzhaopianhover mr-3" style="font-size: 2rem;"></i>
      <van-field
        class="rounded-lg h-12"
        v-model="workProgress"
        placeholder="请输入工作进展"
        label-width="130"
        input-align="center"
      />
      <i class="iconfont iconyuyinhover mx-3" style="font-size: 2rem;"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompetitorInfo",
  data() {
    return {
      id: "",
      info: {},
      currentCompetitor: [],
      competitorlist: [],
      workProgress: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.$store.state.competitor.currentTabsIndex) {
      this.getBaseInfo(0);
      this.getBaseInfo(this.$store.state.competitor.currentTabsIndex);
    } else {
      this.getBaseInfo(0);
    }
  },
  watch: {
    "$store.state.competitor.currentTabsIndex"(num) {
      this.getBaseInfo(num);
    }
  },
  created() {
    //每次进来时候将参数设置为初始值
    this.$store.commit("setInitParams_tabs");
  },
  methods: {
    getBaseInfo(num) {
      if (num === 0) {
        this.$store.dispatch("getCompetitorInfo", this.id).then(res => {
          this.info = this.$store.state.competitor.info;
          this.competitorlist = this.$store.state.competitor.info.dealerList;
          this.currentCompetitor = [this.competitorlist[0].dealerGid];
        });
      }
    },
    editor() {
      this.$store.commit("setEditParams");
      this.$store.commit(
        "setParams",
        Object.assign({
          comment: this.info.comment,
          competorName: this.info.competorName,
          competorType: this.info.competorType
        })
      );
      this.$router.push("/EditCompetitor");
    }
  }
};
</script>

<style scoped>
.CompetitorInfo /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 4px;
}
.CompetitorInfo /deep/ .van-hairline--top-bottom::after,
.CompetitorInfo /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.CompetitorInfo /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.CompetitorInfo /deep/ [class*="van-hairline"]::after {
  position: static;
}
.CompetitorInfo /deep/ .van-tag {
  padding: 0 0.2em;
}

.CompetitorInfo /deep/ .van-cell {
  display: flex;
  align-items: center;
}

.CompetitorInfo /deep/ .van-tabs__nav {
  background-color: transparent;
}

.CompetitorInfo /deep/ .van-field {
  width: 70%;
  background-color: #f6f6f6;
}
.footer-bar {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}
</style>