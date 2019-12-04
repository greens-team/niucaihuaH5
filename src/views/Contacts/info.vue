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
      <span class="text-center font-medium bar_title">联系人详情</span>
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
                    <i class="iconfont iconweizhankai ml-2" style="color:#80848D"></i>
                  </div>
                </div>
                <div v-show="showInfo1">
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">
                      <span class="text-red-500">*</span>姓名
                    </p>
                    <p class="text-gray-900 text-sm">{{info.contactsName}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">电话</p>
                    <p
                      class="text-gray-900 text-sm"
                    >{{info.contactsPhone ? info.contactsPhone : '—'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text-gray-500">微信号</p>
                    <p class="text-gray-900 text-sm">{{info.weichatNum ? info.weichatNum : '—'}}</p>
                  </div>
                  <div class="pt-2 pb-2">
                    <p class="text-xs text-gray-500">备注</p>
                    <p class="text-gray-900 text-sm">{{info.comment ? info.comment : '—'}}</p>
                  </div>
                </div>
              </div>

              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pr-3 pb-3" style="height:3.143rem;line-height:3.143rem;">
                  <div class="flex-1 font-bold">经销商</div>
                  <div
                    class="text-sm"
                    style="color:#FF9B02"
                    @click="$router.push({path:'/DealerList', query: {modelGid: id,flag:3}})"
                  >关联</div>
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
                      <p class="text-xs text-gray-500">经销商名称</p>
                      <p
                        class="text-base"
                        style="color:#0885FF;"
                        @click="$router.push({path:'/DealerInfo',query:{id:r.dealerGid}})"
                      >{{r.dealerName}}</p>
                    </div>
                    <div class="pt-2 pb-2">
                      <p class="text-xs text-gray-500">职务</p>
                      <p class="text-base">{{r.jobTitle ? r.jobTitle : '—'}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.contacts.currentTabsIndex === 1">
              <div class="shadow-md rounded-lg m-3 p-4 bg-white">
                <div class="flex pr-3 pb-3" style="border-bottom:1px solid #EDEDEE;">
                  <div class="flex-1 font-bold">动态记录</div>
                </div>
                <div
                  class="border-b"
                  style="padding-top: 1rem;padding-bottom: 1rem;"
                  v-for="(r,i) in $store.state.contacts.listNewslog"
                  :key="i"
                >
                  <div class="flex">
                    <div class="w-12 h-12 text-center rounded-full mr-4 text-2xl circleBg">z</div>
                    <div>
                      <div class="text-ms font-bold">{{r.userName}}</div>
                      <div class="text-xs" style="color:#80848D">{{r.userJobTitle}}</div>
                    </div>
                  </div>

                  <div class="flex items-center mt-3 pl-2">
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
            <div v-if="$store.state.contacts.currentTabsIndex === 2">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pr-3 pb-3" style="border-bottom:1px solid #EDEDEE;">
                  <div class="flex-1 font-bold">操作历史</div>
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

      picServer: ""
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
        });
      }
      if (num === 1) {
        // 动态记录
        this.$store.dispatch("listNewslogContacts", {
          modelObjType: 2,
          modelId: this.id,
          pageNum: this.listNewslogPageNum,
          pageSize: 10
        });
      }
      if (num === 2) {
        //操作历史
        this.$store.dispatch("listOperatelogContacts", {
          modelObjType: 2,
          modelId: this.id,
          pageNum: this.listOperatelogNum,
          pageSize: 10
        });
      }
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

.ContactsInfo .tabs /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
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
</style>