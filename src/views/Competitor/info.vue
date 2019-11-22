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
    <div>
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
    </div>
    <div style="height: .5rem;background: #fff;"></div>
    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="listBox">
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
                      竞对名称
                      <!-- <span class="text-red-500">*</span>竞对名称 -->
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
                  <div
                    class="text-sm"
                    style="color:#FF9B02"
                    @click="$router.push({path:'/DealerList', query: {modelGid: id,flag:2}})"
                  >关联</div>
                </div>
                <van-collapse v-model="currentCompetitor" v-show="isShowCompetitor">
                  <van-collapse-item
                    v-for="(r,i) in competitorlist"
                    :key="i"
                    :title="r.dealerName"
                    :name="r.dealerGid"
                  >
                    <div class="border-b border-gray-100 pt-2 pb-2">
                      <p class="text-xs text-gray-500">
                        竞对政策
                        <!-- <span class="text-red-500">*</span> -->
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
              <div class="shadow-md rounded-lg m-3 p-4 bg-white">
                <div class="flex pr-3 pb-3" style="border-bottom:1px solid #EDEDEE;">
                  <div class="flex-1 font-bold">动态记录</div>
                </div>
                <div
                  class="border-b"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in newslogList"
                  :key="i"
                >
                  <div class="flex">
                    <div
                      class="w-12 h-12 text-center rounded-full mr-4 text-3xl text-gray-700 baseName"
                    >z</div>
                    <div>
                      <div class="text-ms font-bold">{{r.userName}}</div>
                      <div class="text-xs" style="color:#80848D">{{r.userJobTitle}}</div>
                    </div>
                  </div>

                  <div class="flex items-center mt-3">
                    <p
                      v-if="r.content != '' "
                      class="text-ms leading-relaxed"
                      style="color:#252525"
                    >{{r.content}}</p>
                    <img v-if="r.pics != '' " :src="r.pics" alt />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.competitor.currentTabsIndex === 2">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pr-3 pb-3" style="border-bottom:1px solid #EDEDEE;">
                  <div class="flex-1 font-bold">操作历史</div>
                </div>
                <div
                  class="border-b"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in operatelogList"
                  :key="i"
                >
                  <span class="text-ms" style="color:#252525;padding-right:1rem;">{{r.userName}}</span>
                  <span class="text-gray-600">{{r.content}}</span>
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

      <form class="search-block" action="javascript:void 0">
        <input
          style="width:100%;text-align: center;"
          type="text"
          placeholder="请输入工作进展"
          input-align="center"
          class="rounded-lg h-12"
          v-model="$store.state.competitor.addNewslogParams.content"
          @keyup.13="tapToSearch"
        />
      </form>

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
      workProgress: "",
      isShowCompetitor: false,
      newslogList: [],
      operatelogList: []
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
          if (this.$store.state.competitor.info.dealerList != null) {
            this.isShowCompetitor = true;
            this.competitorlist = this.$store.state.competitor.info.dealerList;
            this.currentCompetitor = [this.competitorlist[0].dealerGid];
          } else {
            this.isShowCompetitor = false;
          }
        });
      }
      if (num === 1) {
        // 动态记录
        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listNewslogCompetitor",
              Object.assign({
                pageNum: this.$store.state.competitor.newslogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 4
              })
            )
            .then(msg => {
              this.newslogList = this.$store.state.competitor.listNewslog;
              resolve(msg);
            });
        });

        this.$store
          .dispatch(
            "listNewslogCompetitor",
            Object.assign({ modelId: this.id, modelObjType: 4, pageNum: 1 })
          )
          .then(res => {
            this.newslogList = this.$store.state.competitor.listNewslog;
          });
      }
      if (num === 2) {
        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listOperatelogCompetitor",
              Object.assign({
                pageNum:
                  this.$store.state.competitor.operatelogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 4
              })
            )
            .then(msg => {
              this.operatelogList = this.$store.state.competitor.listOperatelog;
            });
        });

        this.$store
          .dispatch(
            "listOperatelogCompetitor",
            Object.assign({ modelId: this.id, modelObjType: 4, pageNum: 1 })
          )
          .then(res => {
            this.operatelogList = this.$store.state.competitor.listOperatelog;
          });
      }
    },
    editor() {
      this.$store.commit("setParams", this.info);
      this.$router.push("/EditCompetitor");
    },
    tapToSearch() {
      // 
      this.$store.dispatch(
        "addNewslogCompetitor",
        Object.assign({ modelId: this.id, modelObjType: 4 })
      );

      this.$store
        .dispatch(
          "listNewslogCompetitor",
          Object.assign({ modelId: this.id, modelObjType: 4, pageNum: 1 })
        )
        .then(res => {
          this.newslogList = this.$store.state.competitor.listNewslog;
          this.$store.state.competitor.addNewslogParams.content = ''
        });
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

.CompetitorInfo /deep/ .van-field {
  width: 70%;
  background-color: #f6f6f6;
}
.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 191, 42, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
}
.footer-bar {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}
.search-block {
  width: 80%;
}
</style>