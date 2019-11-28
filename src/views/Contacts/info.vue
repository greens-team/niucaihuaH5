 <!-- 联系人 内容页 -->
<template>
  <div class="ContactsInfo flex-1 flex flex-col bg-gray-100">
    <!-- <van-nav-bar title="联系人详情" @click-left="$router.go(-1)" left-text="返回" left-arrow>
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
        <div class="circleBg font-bold mr-3 text-xl" style="color:#252525">M</div>
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
                  v-for="(r,i) in newslogList"
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
                    <img v-if="r.pics != '' " :src="r.pics" alt />
                  </div>
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
      <i
        class="iconfont iconjingxiaoshangbaifang mx-3"
        @click="$router.push({name:'CreateTask',query:{taskType:1,editor: true}})"
        style="font-size: 2rem;"
      ></i>
      <i class="iconfont iconzhaopianhover mr-3" style="font-size: 2rem;"></i>

      <form class="search-block" action="javascript:void 0">
        <input
          type="text"
          placeholder="请输入工作进展"
          class="rounded-lg h-12 progress"
          v-model="$store.state.contacts.addNewslogParams.content"
          @keyup.13="tapToSearch"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入工作进展'"
        />
      </form>

      <i class="iconfont iconyuyinhover mx-3" style="font-size: 2rem;"></i>
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
      newslogList: [],
      operatelogList: []
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
    this.addRecentvisit({modelObjType:2, modelId:this.id})
    if (this.$store.state.contacts.currentTabsIndex) {
      this.getBaseInfo(0);
      this.getBaseInfo(this.$store.state.contacts.currentTabsIndex);
    } else {
      this.getBaseInfo(0);
    }

    // this.$store.dispatch("getContactsInfo", this.$route.query.gid).then(() => {
    //   this.info = this.$store.state.contacts.contactsInfo;
    // });
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
        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listNewslogContacts",
              Object.assign({
                pageNum: this.$store.state.contacts.newslogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 2
              })
            )
            .then(msg => {
              this.newslogList = this.$store.state.contacts.listNewslog;
            });
        });

        this.$store
          .dispatch(
            "listNewslogContacts",
            Object.assign({ modelId: this.id, modelObjType: 2, pageNum: 1 })
          )
          .then(msg => {
            this.newslogList = this.$store.state.contacts.listNewslog;
          });
      }
      if (num === 2) {
        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listOperatelogContacts",
              Object.assign({
                pageNum:
                  this.$store.state.contacts.operatelogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 2
              })
            )
            .then(msg => {
              this.operatelogList = this.$store.state.contacts.listOperatelog;
            });
        });

        this.$store
          .dispatch(
            "listOperatelogContacts",
            Object.assign({ modelId: this.id, modelObjType: 2, pageNum: 1 })
          )
          .then(res => {
            this.operatelogList = this.$store.state.contacts.listOperatelog;
          });
      }
    },

    tapToSearch() {
      //
      this.$store
        .dispatch(
          "addNewslogContacts",
          Object.assign({ modelId: this.id, modelObjType: 2 })
        )
        .then(msg => {
          this.$store
            .dispatch(
              "listNewslogContacts",
              Object.assign({ modelId: this.id, modelObjType: 2, pageNum: 1 })
            )
            .then(res => {
              this.newslogList = this.$store.state.contacts.listNewslog;
              this.$store.state.contacts.addNewslogParams.content = "";
            });
        });
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
  width: 80%;
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
  width: 100%;
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