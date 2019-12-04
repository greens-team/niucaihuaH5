 <!-- 竞争对手内容页 -->
<template>
  <div class="CompetitorInfo flex-1 flex flex-col bg-gray-100">
    <!-- <van-nav-bar title="竞争对手" @click-left="$router.go(-1)" left-text="返回" left-arrow>
      <i
        class="iconfont iconqipaocaidanbianji-bang"
        @click="editor"
        slot="right"
        style="font-size: 1.6rem;"
      ></i>
    </van-nav-bar>-->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-medium bar_title">竞争对手详情</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>

        <!-- 添加图标 -->
        <img
          class="bar_icon edit_icon"
          slot="right"
          @click="editor"
          src="../../assets/topBarIcon/edit_icon.png"
          alt="编辑"
        />
      </div>
    </div>

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
                  <div
                    class="flex flex-1 items-center font-bold border_line"
                    style="height:3.143rem;"
                    @click="showInfo1 = !showInfo1"
                  >
                    基本信息
                    <i class="iconfont iconweizhankai ml-2" style="color:#80848D"></i>
                  </div>
                </div>
                <div v-show="showInfo1">
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">
                      竞对名称
                      <!-- <span class="text-red-500">*</span>竞对名称 -->
                    </p>
                    <p>{{info.competorName}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">竞对类型</p>
                    <p>{{$store.state.competitor.competorStatus_1[info.competorType-1]}}</p>
                  </div>

                  <div class="pt-2 pb-2">
                    <p class="text-xs text-gray-500">备注</p>
                    <p>{{info.comment ? info.comment : '—'}}</p>
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
                    class="text-gray-900 text-lg"
                  >
                    <div class="border_line pt-2 pb-2">
                      <p class="text-xs text-gray-500">经销商名称</p>
                      <p
                        class="text-base"
                        style="color:#0885FF;"
                        @click="$router.push({path:'/DealerInfo',query:{id:r.dealerGid}})"
                      >{{r.dealerName}}</p>
                    </div>
                    <div class="border_line pt-2 pb-2">
                      <p class="text-xs text-gray-500">竞对政策</p>
                      <p class="text-gray-900 text-sm">{{r.racePolicy}}</p>
                    </div>
                    <div class="pt-2 pb-2">
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
                  v-for="(r,i) in $store.state.competitor.listNewslog"
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
                    <img v-if="r.pics != '' " :src="picServer+r.pics" alt />
                  </div>
                  <p
                    class="text-sm text-gray-500"
                  >{{$root.moment(r.createTime*1000).format('YYYY-MM-DD HH:mm')}}</p>
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
                  v-for="(r,i) in $store.state.competitor.listOperatelog"
                  :key="i"
                >
                  <!-- <span class="text-ms" style="color:#252525;padding-right:1rem;">{{r.userName}}</span> -->
                  <span
                    class="text-gray-600"
                    style="padding-right:1rem;word-wrap:break-word;"
                  >{{r.content}}</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div
      class="flex bg-white footer-bar border-t border-gray-300 iteams-center"
      style="box-shadow: 0 -2px 10px 0px rgba(0,0,0,.1); z-index: 1;"
    >
      <van-uploader
        :after-read="logPic"
        :before-read="file => uploadFile(file,true)"
        :max-count="1"
        style="height:90%"
      >
        <i class="iconfont iconzhaopianhover mr-3 ml-3" style="font-size: 2rem;"></i>
      </van-uploader>

      <form class="search-block" action="javascript:void 0">
        <input
          type="text"
          placeholder="请输入工作进展"
          input-align="center"
          class="rounded-lg bg-gray-200 flex-1 mr-3 p-3 h-12 progress"
          v-model="newsLogContent"
          @keyup.13="tapToSearch"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入工作进展'"
        />
      </form>
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
      showInfo1: true,

      listNewslogPageNum: 1,
      listOperatelogNum: 1,
      isNewslogLastPage: false,
      isOperatelogLastPage: false,

      newsLogContent: "",

      picServer: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.picServer = window.picServer;
    this.addRecentvisit({ modelObjType: 4, modelId: this.id });
    if (this.$store.state.competitor.currentTabsIndex) {
      this.getBaseInfo(0);
      this.getBaseInfo(this.$store.state.competitor.currentTabsIndex);
    } else {
      this.getBaseInfo(0);
    }

    // 动态记录
    this.$refs.listBox &&
      this.scrollLoad(this.$refs.listBox, resolve => {
        if (
          this.$store.state.competitor.currentTabsIndex == 1 &&
          !this.isNewslogLastPage
        ) {
          this.$store
            .dispatch("listNewslogCompetitor", {
              modelObjType: 4,
              modelId: this.id,
              pageNum: ++this.listNewslogPageNum,
              pageSize: 10
            })
            .then(len => {
              if (len < 10) {
                this.isNewslogLastPage = true;
              }
              resolve();
            });
        }
        if (
          this.$store.state.competitor.currentTabsIndex == 2 &&
          !this.isOperatelogLastPage
        ) {
          this.$store
            .dispatch("listOperatelogCompetitor", {
              modelObjType: 4,
              modelId: this.id,
              pageNum: ++this.listOperatelogNum,
              pageSize: 10
            })
            .then(len => {
              if (len < 10) {
                this.isOperatelogLastPage = true;
              }
              resolve();
            });
        }
        resolve();
      });
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
        this.$store.dispatch("listNewslogCompetitor", {
          modelObjType: 4,
          modelId: this.id,
          pageNum: this.listNewslogPageNum,
          pageSize: 10
        });
      }
      if (num === 2) {
        //操作历史
        this.$store.dispatch("listOperatelogCompetitor", {
          modelObjType: 4,
          modelId: this.id,
          pageNum: this.listOperatelogNum,
          pageSize: 10
        });
      }
    },
    editor() {
      this.$store.commit("setParamsCompetitor", this.info);
      this.$router.push("/EditCompetitor");
    },
    logPic(file) {
      this.uploadFile(
        file,
        fileUrl => {
          this.tapToSearch(fileUrl);
        },
        0
      );
    },
    tapToSearch(picUrl) {
      if (this.newsLogContent || typeof picUrl == "string") {
        this.$store
          .dispatch("addNewslogCompetitor", {
            modelObjType: 4,
            modelId: this.id,
            content: this.newsLogContent || "",
            pics: typeof picUrl == "string" ? picUrl : ""
          })
          .then(msg => {
            this.$store.state.competitor.currentTabsIndex = 1;
            this.isNewslogLastPage = false;
            this.listNewslogPageNum = 1;
            this.newsLogContent = "";
            this.$store.dispatch("listNewslogCompetitor", {
              modelObjType: 4,
              modelId: this.id,
              pageNum: this.listNewslogPageNum,
              pageSize: 10
            });
          });
      }
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
  width: 90%;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  text-align: center;
}
::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
:-ms-input-placeholder {
  /* IE 10+ */
  text-align: center;
}
:-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}
.progress {
  width: 97%;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f6f6f6;
}
.ContactsInfo {
  background: #f7f8f9;
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01),
    0 2px 4px -1px rgba(0, 0, 0, 0.01);
}
.border_line {
  border-bottom: 1px solid #ededee;
}
.text_title {
  color: #80848d;
}
.text_content {
  color: #252525;
}
.edit_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.CompetitorInfo /deep/ .van-nav-bar__right {
  bottom: 12px;
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
.CompetitorInfo /deep/ .van-hairline--top-bottom::after,
.CompetitorInfo /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
</style>