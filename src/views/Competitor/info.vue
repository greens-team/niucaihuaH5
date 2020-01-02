 <!-- 竞争对手内容页 -->
<template>
  <div class="CompetitorInfo bg-gray-100 absolute inset-0 overflow-y-scroll" ref="listBox">
    <!-- <van-nav-bar title="竞争对手" @click-left="$router.go(-1)" left-text="返回" left-arrow>
      <i
        class="iconfont iconqipaocaidanbianji-bang"
        @click="editor"
        slot="right"
        style="font-size: 1.6rem;"
      ></i>
    </van-nav-bar>-->

    <div
      class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-10"
    >
      <div class="flex-1 flex">
        <div
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">竞争对手详情</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>

        <!-- 添加图标 -->
        <img
          class="bar_icon edit_icon"
          v-show="$root.checkRole('COMPETITOR_EDIT')"
          @click="$root.dataCheck({modelObjType:4, modelId: id}, editor)"
          slot="right"
          src="../../assets/topBarIcon/edit_icon.png"
          alt="编辑"
        />
      </div>
    </div>

    <div style="margin:65px 0;">
      <div>
        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3">
            <p class="text-xl font-bold">{{info.competorName}}</p>
            <p class="text-sm">{{$store.state.competitor.competorStatus_1[info.competorType-1]}}</p>
          </div>
        </div>

        <div style="height:44px;" v-show="positioning"></div>
        <div :class="{positioning:positioning}">
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
      </div>
      <div :style="{minHeight:positioning ? '600px': 'auto'}">
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
                    <i
                      class="iconfont iconweizhankai ml-2 icon_toggle"
                      style="color:#80848D"
                      :class="{ active: showInfo1}"
                    ></i>
                  </div>
                </div>
                <div v-show="showInfo1">
                  <div class="border_line pt-2 pb-2" style="height:4rem;position:relative;">
                    <p class="text-xs text-gray-500 ownerUser">竞对名称</p>
                    <p>{{info.competorName}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;position:relative">
                    <p class="text-xs text_title ownerUser">负责人</p>
                    <p
                      class="text_content text-base"
                      :style="{color:ownerUserGids ?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{ownerUserGids.toString()}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">参与人</p>
                    <p
                      class="text_content text-base"
                      :style="{color:followerUserGids.length ?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{followerUserGids.length ? followerUserGids.toString():'-'}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">竞对类型</p>
                    <p
                      :style="{color:info.competorType?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.competorType ? $store.state.competitor.competorStatus_1[info.competorType-1] : '-'}}</p>
                  </div>

                  <div class="pt-2 pb-2">
                    <p class="text-xs text-gray-500">备注</p>
                    <p
                      :style="{color:info.comment?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.comment ? info.comment : '-'}}</p>
                  </div>
                </div>
              </div>

              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white dealer">
                <div class="flex">
                  <div class="flex-1 font-bold">经销商</div>
                  <div
                    class="text-base"
                    style="color:#FF9B02"
                    v-show="$root.checkRole('COMPETITOR_EDIT')"
                    @click="$root.dataCheck({modelObjType:4, modelId: id}, ()=>$router.push({path:'/DealerList', query: {modelGid: id,flag:2,onlyWrite:true}}))"
                  >添加</div>
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
                        @click="$root.selectdpcheck({modelObjType:1, modelId:r.dealerGid}, ()=>{$store.state.dealerInfo.currentTabsIndex = 0;$router.push({path:'/DealerInfo',query:{id:r.dealerGid}})})"
                      >{{r.dealerName}}</p>
                    </div>
                    <div class="border_line pt-2 pb-2">
                      <p class="text-xs text-gray-500">竞对政策</p>
                      <p
                        class="text-gray-900 text-sm"
                        :style="{color:info.comment?'#252525':'rgba(69, 90, 100, 0.6)'}"
                      >{{r.racePolicy ? r.racePolicy : '-'}}</p>
                    </div>
                    <div class="pt-2 pb-2">
                      <p class="text-xs text-gray-500">狮桥应对策略</p>
                      <p
                        class="text-gray-900 text-sm"
                        :style="{color:info.comment?'#252525':'rgba(69, 90, 100, 0.6)'}"
                      >{{r.tactics ? r.tactics : '-'}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.competitor.currentTabsIndex === 1">
              <div class="shadow-md rounded-lg m-3 p-4 bg-white">
                <div class="flex pr-3 pb-3">
                  <div class="flex-1 font-bold">动态记录</div>
                </div>
                <div
                  class="flex justify-center items-center text-center"
                  style="height:20rem;margin-top:-4rem;"
                  v-show="isShowNoData"
                >
                  <div>
                    <img
                      src="../../assets/workbench/no_data.png"
                      style=" width: 7.85rem;height: 7.85rem;margin: 0 auto;"
                      alt="暂无数据"
                    />
                    <p style="color:#484C55;font-weight:bold">暂无数据</p>
                    <p style="color:#80848D">暂时还没有数据呢～</p>
                  </div>
                </div>
                <div
                  class="border-b last_child" 
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in $store.state.competitor.listNewslog"
                  :key="i"
                >
                  <div class="flex">
                    <div
                      class="w-12 h-12 text-center rounded-full mr-4 text-base baseName font-bold"
                      style="width:2.3rem;height:2.3rem;line-height:2.3rem;"
                    >{{r.userName && r.userName.trim().substring(0,1).toUpperCase()}}</div>
                    <div>
                      <div class="text-ms font-bold">{{r.userName}}</div>
                      <div class="text-xs" style="color:#80848D">{{r.userJobTitle}}</div>
                    </div>
                  </div>

                  <!-- <div class="flex items-center mt-3">
                      <p
                        v-if="r.content != null "
                        class="text-ms leading-relaxed"
                        style="color:#252525"
                      >{{r.content}}</p>
                      <img v-if="r.pics != null " :src="picServer+r.pics" alt />
                    </div>
                    <p
                      class="text-sm text-gray-500"
                      style="color:#80848D;margin-left:.5rem;padding:.5rem 0;"
                  >{{$root.moment(r.createTime*1000).format('YYYY-MM-DD HH:mm')}}</p>-->

                  <div class="mt-3" style="margin-left:3.3rem;">
                    <p
                      v-if="r.content != '' "
                      class="text-ms leading-relaxed"
                      style="color:#252525"
                    >{{r.content}}</p>

                    <img v-if="r.pics != null " :src="picServer+r.pics" alt />
                    <p
                      class="text-sm mt-3"
                      style="color:#80848D"
                    >{{$root.moment(r.createTime*1000).format('YYYY-MM-DD HH:mm:ss')}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.competitor.currentTabsIndex === 2">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pr-3 pb-3">
                  <div class="flex-1 font-bold">操作历史</div>
                </div>
                <div
                  class="flex justify-center items-center text-center"
                  style="height:20rem;margin-top:-4rem;"
                  v-show="isShowNoData_1"
                >
                  <div>
                    <img
                      src="../../assets/workbench/no_data.png"
                      style=" width: 7.85rem;height: 7.85rem;margin: 0 auto;"
                      alt="暂无数据"
                    />
                    <p style="color:#484C55;font-weight:bold">暂无数据</p>
                    <p style="color:#80848D">暂时还没有数据呢～</p>
                  </div>
                </div>
                <div
                  class="border-b last_child"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in $store.state.competitor.listOperatelog"
                  :key="i"
                >
                  <!-- <span class="text-ms" style="color:#252525;padding-right:1rem;">{{r.userName}}</span> -->
                  <span
                    class="text-gray-600"
                    style="padding-right:1rem;word-wrap:break-word;color:#252525"
                  >{{r.content}}</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div
      class="flex bg-white footer-bar iteams-center fixed bottom-0 left-0 right-0 z-10"
      style="box-shadow: 0 -2px 10px 0px rgba(0,0,0,.03); z-index: 1;"
    >
      <van-uploader
        :after-read="logPic"
        :before-read="file => uploadFile(file,true)"
        :max-count="1"
        style="height:105%"
      >
        <i class="iconfont iconzhaopianhover ml-3" style="font-size: 2rem;"></i>
      </van-uploader>

      <!-- <form class="search-block" action="javascript:void 0">
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
      </form>-->

      <van-field
        v-model="newsLogContent"
        class="rounded-lg m-3"
        style="background:#f6f6f6;height:70%;"
        placeholder="请输入工作进展"
      />

      <div class="sendBtn" @click="tapToSearch">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompetitorInfo",
  data() {
    return {
      positioning: false,
      topVal: 103, // 滚动到238距离时 positioning设为true
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

      picServer: "",

      isShowNoData: false,
      isShowNoData_1: false,
      ownerUserGids: "",
      followerUserGids: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.picServer = window.picServer;
    this.addRecentvisit({ modelObjType: 4, modelId: this.id });

    this.getBaseInfo(this.$store.state.competitor.currentTabsIndex);

    // if (this.$store.state.competitor.currentTabsIndex) {
    //   this.getBaseInfo(0);
    //   this.getBaseInfo(this.$store.state.competitor.currentTabsIndex);
    // } else {
    //   this.getBaseInfo(0);
    // }

    // 动态记录
    this.$refs.listBox &&
      this.scrollLoad(
        this.$refs.listBox,
        resolve => {
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
        },
        scrollTopVal => {
          // console.log(scrollTopVal);
          if (scrollTopVal > this.topVal && !this.positioning) {
            this.positioning = true;
          }
          if (scrollTopVal < this.topVal && this.positioning) {
            this.positioning = false;
          }
        }
      );
  },
  watch: {
    "$store.state.competitor.currentTabsIndex"(num) {
      if (this.positioning) {
        this.$refs.listBox.scrollTop = this.topVal;
      }
      this.getBaseInfo(num);
    }
  },
  created() {
    //每次进来时候将参数设置为初始值
    // this.$store.commit("setInitParams_tabs");
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

          let followerUserList = [];
          this.info.followerUserList.map(r => {
            followerUserList.push(r.ownerUserName);
          });
          this.followerUserGids = followerUserList.toString();

          let ownerUserList = [];
          this.info.ownerUserList.map(r => {
            ownerUserList.push(r.ownerUserName);
          });
          this.ownerUserGids = ownerUserList.toString();
        });
      }
      if (num === 1) {
        // 动态记录
        this.listNewslogPageNum = 1;
        this.isNewslogLastPage = false;
        this.$store
          .dispatch("listNewslogCompetitor", {
            modelObjType: 4,
            modelId: this.id,
            pageNum: this.listNewslogPageNum,
            pageSize: 10
          })
          .then(len => {
            if (len > 0) {
              this.isShowNoData = false;
            } else {
              this.isShowNoData = true;
            }
          });
      }
      if (num === 2) {
        //操作历史
        this.listOperatelogNum = 1;
        this.isOperatelogLastPage = false;
        this.$store
          .dispatch("listOperatelogCompetitor", {
            modelObjType: 4,
            modelId: this.id,
            pageNum: this.listOperatelogNum,
            pageSize: 10
          })
          .then(len => {
            if (len > 0) {
              this.isShowNoData_1 = false;
            } else {
              this.isShowNoData_1 = true;
            }
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
          this.newsLogContent = "";
          this.tapToSearch(fileUrl);
        },
        0
      );
    },
    tapToSearch(picUrl) {
      if (this.delaySend()) {
        return;
      }
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
            this.isShowNoData = false;
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
/* .CompetitorInfo /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.CompetitorInfo /deep/ .van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
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

/* .CompetitorInfo /deep/ .van-field {
  width: 90%;
  background-color: #f6f6f6;
} */
.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 164, 0, 1) 0%,
    rgba(255, 205, 43, 1) 100%
  );
  line-height: 3rem;
}
.footer-bar {
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}
.search-block {
  width: 90%;
}

.CompetitorInfo /deep/ ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  text-align: center;
}
.CompetitorInfo /deep/ ::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
.CompetitorInfo /deep/ :-ms-input-placeholder {
  /* IE 10+ */
  text-align: center;
}
.CompetitorInfo /deep/ :-moz-placeholder {
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
.CompetitorInfo /deep/ .van-tabs__nav {
  background: transparent;
}
.icon_toggle.active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.CompetitorInfo /deep/ .van-collapse-item__content {
  padding: 16px 0px;
}
.CompetitorInfo /deep/ .van-cell:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0px;
}
.ownerUser::before {
  position: absolute;
  left: -7px;
  color: #f42929;
  font-size: 14px;
  content: "*";
  top: 8px;
}
.dealer /deep/ .van-cell {
  padding: 10px 0px;
}
.last_child:last-child {
  border-bottom: 0px;
}
</style>