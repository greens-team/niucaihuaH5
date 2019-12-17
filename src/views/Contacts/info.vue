 <!-- 联系人 内容页 -->
<template>
  <div class="ContactsInfo flex-1 flex flex-col bg-gray-100">
    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">联系人详情</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>

        <!-- 添加图标 -->
        <img
          v-show="$root.checkRole('CONTACTS_EDIT')"
          @click="$root.dataCheck({modelObjType:2, modelId: id}, editor)"
          class="bar_icon edit_icon"
          slot="right"
          src="../../assets/topBarIcon/edit_icon.png"
          alt="编辑"
        />
      </div>
    </div>
    <div>
      <div class="shadow-md rounded-lg m-3 flex p-4 bg-white pt-6 pb-6" style="line-height:3rem;">
        <div
          class="circleBg font-bold mr-3 text-xl"
          style="color:#252525"
        >{{info.contactsName && info.contactsName.trim().substring(0,1).toUpperCase()}}</div>
        <p class="flex-1 text-xl font-bold">{{info.contactsName}}</p>
        <div>
          <img
            src="../../assets/lessee/iphone.png"
            class="inline-block float-left mt-2 w-6 mr-6"
            alt
          />
        </div>
      </div>

      <van-tabs
        class="tabs"
        v-model="$store.state.contacts.currentTabsIndex"
        @click="$refs.swipe.swipeTo($store.state.contacts.currentTabsIndex)"
      >
        <van-tab
          v-for="(row,index) in $store.state.contacts.tabs"
          :key="index"
          :title="row.text"
          :name="row.id"
        ></van-tab>
      </van-tabs>
    </div>
    <!-- <div style="height: .5rem;background: #fff;"></div> -->
    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="listBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.commit('setCurrentTabsIndex_contacts', num)"
        >
          <van-swipe-item v-for="(row,index) in $store.state.contacts.tabs" :key="index">
            <!-- 基本信息 经销商-->
            <div v-if="$store.state.contacts.currentTabsIndex === 0">
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
                    <p class="text-xs text-gray-500 ownerUser" style="color:#80848d">姓名</p>
                    <p class="text-gray-900 text-base">{{info.contactsName}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;position:relative;">
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
                    <p class="text-xs text-gray-500" style="color:#80848d">手机号</p>
                    <p
                      class="text-gray-900 text-base"
                      :style="{color:info.contactsPhone?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.contactsPhone ? info.contactsPhone : '-'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500" style="color:#80848d">微信号</p>
                    <p
                      class="text-gray-900 text-base"
                      :style="{color:info.weichatNum?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.weichatNum ? info.weichatNum : '-'}}</p>
                  </div>
                  <div class="pt-2 pb-2">
                    <p class="text-xs text-gray-500" style="color:#80848d">备注</p>
                    <p
                      class="text-gray-900 text-base"
                      :style="{color:info.comment?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.comment ? info.comment : '-'}}</p>
                  </div>
                </div>
              </div>

              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white dealer">
                <div class="flex pb-3" style="height:3.143rem;line-height:3.143rem;">
                  <div class="flex-1 font-bold">经销商</div>
                  <div
                    class="text-base"
                    style="color:#FF9B02"
                    v-show="$root.checkRole('CONTACTS_EDIT')"
                    @click="$root.dataCheck({modelObjType:2, modelId: id}, ()=>$router.push({path:'/DealerList', query: {modelGid: id,flag:3,onlyWrite:true}}))"
                  >添加</div>
                </div>
                <van-collapse v-model="currentContacts" v-show="isShowDealer">
                  <van-collapse-item
                    v-for="(r,i) in contactsInfolist"
                    :key="i"
                    :title="r.dealerName"
                    :name="r.dealerGid"
                    class="text-gray-900 text-lg"
                  >
                    <div class="border_line pt-2 pb-2">
                      <p class="text-xs text-gray-500" style="color:#80848d">经销商名称</p>
                      <p
                        class="text-base"
                        style="color:#0885FF;"
                        @click="$root.selectdpcheck({modelObjType:1, modelId:r.dealerGid}, ()=>$router.push({path:'/DealerInfo',query:{id:r.dealerGid}}))"
                      >{{r.dealerName}}</p>
                      <!-- @click="$router.push({path:'/DealerInfo',query:{id:r.dealerGid}})" -->
                    </div>
                    <div class="pt-2 pb-2">
                      <p class="text-xs text-gray-500" style="color:#80848d">职务</p>

                      <p
                        class="text-base"
                        :style="{color:r.jobTitle?'#252525':'rgba(69, 90, 100, 0.6)'}"
                      >{{r.jobTitle ? r.jobTitle : '-'}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.contacts.currentTabsIndex === 1">
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
                  class="border-b"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in $store.state.contacts.listNewslog"
                  :key="i"
                >
                  <div class="flex">
                    <div
                      class="w-12 h-12 text-center rounded-full mr-4 text-xl circleBg"
                    >{{r.userName && r.userName.trim().substring(0,1).toUpperCase()}}</div>

                    <div>
                      <div class="text-ms font-bold">{{r.userName}}</div>
                      <div class="text-xs" style="color:#80848D">{{r.userJobTitle}}</div>
                    </div>
                  </div>

                  <div class="flex items-center mt-3 pl-2">
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
                  >{{$root.moment(r.createTime*1000).format('YYYY-MM-DD HH:mm')}}</p>
                </div>
              </div>
            </div>
            <div v-if="$store.state.contacts.currentTabsIndex === 2">
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
                  class="border-b"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in $store.state.contacts.listOperatelog"
                  :key="i"
                >
                  <!-- <span class="text-ms" style="color:#252525;padding-right:1rem;">{{r.userName}}</span> -->
                  <div
                    class="text-gray-600"
                    style="padding-right:1rem;word-wrap:break-word;"
                  >{{r.content}}</div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div
      class="flex bg-white footer-bar border-t border-gray-300 iteams-center"
      style="box-shadow: 0 -2px 10px 0px rgba(0,0,0,.03); z-index: 1;"
    >
      <van-uploader
        :after-read="logPic"
        :before-read="file => uploadFile(file,true)"
        :max-count="1"
        style="height:90%"
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
  name: "ContactsInfo",
  data() {
    return {
      id: "",
      info: {},
      contactsInfolist: [],
      currentContacts: [],
      showInfo1: true,
      isShowDealer: false,

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
  watch: {
    "$store.state.contacts.currentTabsIndex"(num) {
      this.getBaseInfo(num);
    }
  },
  created() {
    //每次进来时候将参数设置为初始值
    this.$store.commit("setInitParams_tabs");
  },
  mounted() {
    this.id = this.$route.query.gid;
    this.picServer = window.picServer;
    this.addRecentvisit({ modelObjType: 2, modelId: this.id });
    if (this.$store.state.contacts.currentTabsIndex) {
      this.getBaseInfo(0);
      this.getBaseInfo(this.$store.state.contacts.currentTabsIndex);
    } else {
      this.getBaseInfo(0);
    }

    // 动态记录
    this.$refs.listBox &&
      this.scrollLoad(this.$refs.listBox, resolve => {
        if (
          this.$store.state.contacts.currentTabsIndex == 1 &&
          !this.isNewslogLastPage
        ) {
          this.$store
            .dispatch("listNewslogContacts", {
              modelObjType: 2,
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
          this.$store.state.contacts.currentTabsIndex == 2 &&
          !this.isOperatelogLastPage
        ) {
          this.$store
            .dispatch("listOperatelogCompetitor", {
              modelObjType: 2,
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
  methods: {
    getBaseInfo(num) {
      if (num === 0) {
        this.$store.dispatch("getContactsInfo", this.id).then(res => {
          this.info = this.$store.state.contacts.contactsInfo;
          if (this.$store.state.contacts.contactsInfo.dealerList != null) {
            this.isShowDealer = true;
            this.contactsInfolist = this.$store.state.contacts.contactsInfo.dealerList;
            this.currentContacts = [this.contactsInfolist[0].dealerGid];
          } else {
            this.isShowDealer = false;
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
          .dispatch("listNewslogContacts", {
            modelObjType: 2,
            modelId: this.id,
            pageNum: this.listNewslogPageNum,
            pageSize: 10
          })
          .then(len => {
            if (len) {
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
          .dispatch("listOperatelogContacts", {
            modelObjType: 2,
            modelId: this.id,
            pageNum: this.listOperatelogNum,
            pageSize: 10
          })
          .then(len => {
            if (len) {
              this.isShowNoData_1 = false;
            } else {
              this.isShowNoData_1 = true;
            }
          });
      }
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
      if (this.newsLogContent || typeof picUrl == "string") {
        this.$store
          .dispatch("addNewslogContacts", {
            modelObjType: 2,
            modelId: this.id,
            content: this.newsLogContent || "",
            pics: typeof picUrl == "string" ? picUrl : ""
          })
          .then(msg => {
            this.$store.state.contacts.currentTabsIndex = 1;
            this.isNewslogLastPage = false;
            this.listNewslogPageNum = 1;
            this.newsLogContent = "";
            this.isShowNoData = false;
            this.$store.dispatch("listNewslogContacts", {
              modelObjType: 2,
              modelId: this.id,
              pageNum: this.listNewslogPageNum,
              pageSize: 10
            });
          });
      }
    },

    editor() {
      if (this.info.comment == null) {
        this.info.comment = "";
      } else {
        this.info.comment;
      }
      this.$store.commit(
        "setParamsContatcs",
        Object.assign(this.info, { comment: this.info.comment })
      );
      this.$router.push("/EditContacts");
    }
  }
};
</script>

<style scoped>
.circleBg {
  background: linear-gradient(
    245deg,
    rgba(255, 164, 0, 1) 0%,
    rgba(255, 205, 43, 1) 100%
  );
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 3rem;
  color: #252525;
}

.ContactsInfo /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.ContactsInfo .tabs /deep/ .van-hairline--top-bottom::after,
.ContactsInfo .tabs /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.ContactsInfo .tabs /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.ContactsInfo .tabs /deep/ [class*="van-hairline"]::after {
  position: static;
}
.ContactsInfo .tabs /deep/ .van-tag {
  padding: 0 0.2em;
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
.ContactsInfo /deep/ ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  text-align: center;
}
.ContactsInfo /deep/ ::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
.ContactsInfo /deep/ :-ms-input-placeholder {
  /* IE 10+ */
  text-align: center;
}
.ContactsInfo /deep/ :-moz-placeholder {
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
.ContactsInfo /deep/ .van-nav-bar__right {
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
.ContactsInfo /deep/ .van-hairline--top-bottom::after,
.ContactsInfo /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.ContactsInfo /deep/ .van-tabs__nav {
  background: transparent;
}
.icon_toggle.active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.ContactsInfo /deep/ .van-collapse-item__content {
  padding: 0px 0px;
}
.ContactsInfo /deep/ .van-cell:not(:last-child)::after {
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
</style>