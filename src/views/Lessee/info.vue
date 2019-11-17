 <!-- 承租人内容页 -->
<template>
  <div class="LesseeInfo flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="承租人" @click-left="$router.go(-1)" left-text="返回" left-arrow>
      <i class="iconfont iconqipaocaidanbianji-bang" slot="right" style="font-size: 1.6rem;"></i>
      <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll">
        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3 flex justify-between">
            <span class="text-xl font-bold">{{info.lesseeName}}</span>
            <div>
              <img
                src="../../assets/lessee/iphone.png"
                class="inline-block float-left mt-2 w-6 mr-6"
                alt
              />
              <img
                src="../../assets/lessee/map.png"
                class="inline-block float-left mt-2 w-6 mr-5"
                alt
              />
            </div>
          </div>
          <div class="flex mt-4 justify-between">
            <p class="text-sm">{{info.homeAddress}}</p>
          </div>
          <div class="flex mt-4 justify-between">
            <div class="text-center text-xs">
              4
              <br />经销商
            </div>
          </div>
        </div>

        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3 flex justify-between">
            <span class="text-xl font-bold">承租人状态</span>
            <span>放弃</span>
          </div>
          <div>
            <div class="flex mt-2">
              <div v-for="(row,i) in $store.state.lessee.lesseeStatus" :key="i">
                <div
                  v-if="i && i<$store.state.lessee.lesseeStatus.length-1"
                  :class="['flex flex-1 items-center', {gray: i <= info.lesseeStatus}]"
                >
                  <div class="rounded bg-line p-2 text-center text-sm shadow">{{row.name}}</div>
                  <div class="triangle-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <van-tabs
          class="tabs -mt-2 -mb-2"
          v-model="$store.state.lessee.currentTabsIndex"
          @click="$refs.swipe.swipeTo($store.state.lessee.currentTabsIndex)"
        >
          <van-tab
            v-for="(row,index) in $store.state.lessee.tabs"
            :key="index"
            :title="row.text"
            :name="row.id"
          ></van-tab>
        </van-tabs>

        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.commit('setCurrentTabsIndex', num)"
        >
          <van-swipe-item v-for="(row,index) in $store.state.lessee.tabs" :key="index">
            <!-- 基本信息 -->
            <!-- <div v-if="$store.state.competitor.currentTabsIndex === 0">
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
                    <p>{{$store.state.competitor.competorStatus[info.competorType-1]}}</p>
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
            </div>-->
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="absolute right-0 bottom-0 left-0 flex bg-white py-3">
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
  name: "LesseeInfo",
  data() {
    return {
      id: "",
      info: {},
      lesseeInfolist: [],
      currentLessee: [],
      workProgress: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.$store.state.lessee.currentTabsIndex) {
      this.getBaseInfo(0);
      this.getBaseInfo(this.$store.state.lessee.currentTabsIndex);
    } else {
      this.getBaseInfo(0);
    }
  },
  watch: {
    "$store.state.competitor.currentTabsIndex"(num) {
      this.getBaseInfo(num);
    }
  },
  methods: {
    getBaseInfo(num) {
      if (num === 0) {
        this.$store.dispatch("getLesseeInfo", this.id).then(res => {
          this.info = this.$store.state.lessee.info;
          this.lesseeInfolist = this.$store.state.lessee.info.dealerList;
          this.currentCompetitor = [this.lesseeInfolist[0].dealerGid];
        });
      }
    }
  }
};
</script>

<style scoped>
.LesseeInfo /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 4px;
}
.LesseeInfo /deep/ .van-hairline--top-bottom::after,
.LesseeInfo /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.LesseeInfo /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.LesseeInfo /deep/ .van-tabs__nav {
  background: transparent;
}
</style>
