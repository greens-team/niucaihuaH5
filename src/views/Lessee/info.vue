 <!-- 承租人内容页 -->
<template>
  <div class="LesseeInfo bg-gray-100 absolute inset-0 overflow-y-scroll" ref="listBox">
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
      <span class="text-center font-bold bar_title">承租人详情</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>

        <!-- 添加图标 -->
        <img
          class="bar_icon edit_icon"
          slot="right"
          v-show="$root.checkRole('LESSEE_EDIT')"
          @click="$root.dataCheck({modelObjType:3, modelId: id}, editor)"
          src="../../assets/topBarIcon/edit_icon.png"
          alt="编辑"
        />
      </div>
    </div>

    <div style="margin:65px 0;">
      <div class="briefBox" ref="briefBox">
        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3 flex justify-between">
            <span class="text-xl font-bold lessee_name">{{info.lesseeName}}</span>
            <!-- <div>
                <img
                  src="../../assets/lessee/iphone.png"
                  class="inline-block float-left mt-2 mr-6"
                  style="width:1.57rem;"
                  alt
                />
                <img
                  src="../../assets/lessee/map.png"
                  style="width:1.57rem;"
                  class="inline-block float-left mt-2 mr-5"
                  alt
                />
            </div>-->
          </div>
          <div class="flex mt-4 justify-between">
            <p class="text-sm">{{info.homeAddress}}</p>
          </div>
          <div class="flex mt-4 justify-between">
            <div class="text-center text-xs" @click="$refs.swipe.swipeTo(1)">
              {{this.$store.state.lessee.info.dealerList == null ? 0 : this.$store.state.lessee.info.dealerList.length}}
              <br />经销商
            </div>
          </div>
        </div>
        <div class="shadow-md rounded-lg m-3 p-4 bg-white">
          <div class="mb-3 flex justify-between">
            <span class="text-xl font-bold">承租人状态</span>
            <!-- <span class="text-sm text-red-500">放弃</span> -->
          </div>
          <div>
            <div class="flex mt-2">
              <div
                @click="changeFollowStatus(i)"
                v-for="(row,i) in $store.state.lessee.lesseeStatus"
                :key="i"
              >
                <div
                  v-if="i"
                  :class="['flex flex-1 relative items-center', {gray: i <= info.lesseeStatus}]"
                >
                  <div class="rounded bg-line mr-4 p-3 px-5 text-center text-sm shadow">{{row.name}}</div>
                  <div class="status_correct"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="height:44px;" v-show="positioning"></div>
      <div :class="{positioning:positioning}">
        <van-tabs
          class="tabs"
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
      </div>

      <div :style="{minHeight:positioning ? '600px': 'auto'}">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.commit('setCurrentTabsIndex_lessee', num)"
        >
          <van-swipe-item v-for="(row,index) in $store.state.lessee.tabs" :key="index">
            <!-- 基本信息 经销商-->
            <div v-if="$store.state.lessee.currentTabsIndex === 0" style="padding-top:.3rem;">
              <div class="shadow-md rounded-lg pl-4 pr-4 bg-white" style="margin: 0 .75rem;">
                <div class="flex items-center">
                  <div
                    class="flex flex-1 items-center font-bold border_line"
                    style="height:3.143rem;"
                    @click="showInfo1 = !showInfo1"
                  >
                    承租人基本信息
                    <i
                      class="iconfont iconweizhankai ml-2 icon_toggle"
                      style="color:#80848D"
                      :class="{ active: showInfo1}"
                    ></i>
                  </div>
                </div>
                <div v-show="showInfo1">
                  <div class="border_line pt-2 pb-2" style="height:4rem;position:relative;">
                    <p class="text-xs text_title ownerUser">承租人姓名</p>
                    <p class="text_content text-base">{{info.lesseeName}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">身份证号码</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.idcardNum?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{ info.idcardNum ? info.idcardNum : '-'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">出生日期</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.birthday?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.birthday == null ? '-' : $root.moment(info.birthday*1000).format('YYYY-MM-DD')}}</p>
                  </div>
                  <!-- <div class="border_line pt-2 pb-2" style="height:4rem;">
                        <p class="text-xs text_title">婚姻状况</p>
                        <p class="text_content text-sm">{{info.marry ? '已婚' : '未婚'}}</p>
                  </div>-->
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">性别</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.gender != null ?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.gender == null ? '-' : (info.gender ? '女' : '男')}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;position:relative;">
                    <p class="text-xs text_title ownerUser">负责人</p>
                    <p
                      class="text_content text-base"
                      style="color:#252525"
                    >{{ownerUserGidsName.toString()}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">参与人</p>
                    <p
                      class="text_content text-base"
                      :style="{color:followerUserGidsName.length ?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{followerUserGidsName.length ? followerUserGidsName.toString():'-'}}</p>
                  </div>

                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">客户类型</p>
                    <!-- r.lesseeType -->
                    <p
                      class="text_content text-base"
                      :style="{color:info.lesseeType != null ?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.lesseeType == null ? '-' : (info.lesseeType ? '法人' : '自然人')}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">手机号</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.lesseePhone?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.lesseePhone ? info.lesseePhone : '-'}}</p>
                  </div>
                  <!-- <div class="border-b border-gray-100 pt-2 pb-2">
                        <p class="text-xs text_title">年龄</p>
                        <p
                          class="text_content text-sm"
                        >{{Math.floor((((new Date()).valueOf() - info.birthday))/31536000000)}}</p>
                  </div>-->
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">户口所在地</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.domicilePlace?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.domicilePlace ? info.domicilePlace : '-'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">家庭住址</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.homeAddress?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.homeAddress ? info.homeAddress : '-'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2" style="height:4rem;">
                    <p class="text-xs text_title">从业年限</p>
                    <p
                      class="text_content text-base"
                      :style="{color:info.workingYears?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.workingYears ? info.workingYears : '-'}}</p>
                  </div>
                  <div class="border_line pt-2 pb-2">
                    <p class="text-xs text_title py-2">照片</p>

                    <div class="flex justify-space">
                      <template v-if="userPicArr.length">
                        <div v-for="(r,i) in userPicArr" :key="i" class="userPic">
                          <img :src="picServer + r" alt="照片" class="lessessPics" />
                        </div>
                      </template>

                      <div style="color:rgba(69, 90, 100, 0.6)" class="flex" v-else>-</div>
                    </div>
                  </div>
                  <div class="border_line pt-2 pb-2">
                    <p class="text-xs text_title py-2">上传承租人身份证件照片</p>
                    <div class="flex justify-space">
                      <div v-if="info.idcardFrontPic" class="userPic">
                        <img
                          :src="info.idcardFrontPic ? picServer + info.idcardFrontPic : info.idcardFrontPic"
                          alt="身份证正面"
                          class="lessessPics"
                        />
                      </div>
                      <div style="color:rgba(69, 90, 100, 0.6)" class="flex" v-else>-</div>

                      <div v-if="info.idcardBackPic" class="userPic">
                        <img
                          :src="info.idcardBackPic ? picServer + info.idcardBackPic : info.idcardBackPic"
                          alt="身份证反面"
                          class="lessessPics"
                        />
                      </div>
                      <div style="color:rgba(69, 90, 100, 0.6)" class="flex" v-else>-</div>
                    </div>
                  </div>

                  <div class="pt-2 pb-2">
                    <p class="text-xs text_title">备注</p>
                    <p
                      class="text_content text-sm"
                      :style="{color:info.comment?'#252525':'rgba(69, 90, 100, 0.6)'}"
                    >{{info.comment ? info.comment : '-'}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.lessee.currentTabsIndex === 1" style="padding-top:.3rem;">
              <div
                class="shadow-md rounded-lg p-2 pl-4 pr-4 bg-white dealer"
                style="margin: 0 .75rem;"
              >
                <div class="flex pb-3" style="height:3.143rem;line-height:3.143rem;">
                  <div class="flex-1 font-bold">经销商</div>
                  <div
                    class="text-base"
                    style="color:#FF9B02"
                    v-show="$root.checkRole('LESSEE_EDIT')"
                    @click="$root.dataCheck({modelObjType:3, modelId: id}, ()=>$router.push({path:'/DealerList', query: {modelGid: id,flag:1, onlyWrite:true}}))"
                  >添加</div>
                </div>
                <van-collapse v-model="currentLessee" v-show="isShowDealer">
                  <van-collapse-item
                    v-for="(r,i) in lesseeInfolist"
                    :key="i"
                    :title="r.dealerName"
                    :name="r.dealerGid"
                    class="text_content text-lg"
                  >
                    <div class="pt-2 pb-2 border_line">
                      <p class="text-xs text_title">经销商名称</p>
                      <p
                        class="text-base"
                        style="color:#0885FF;"
                        @click="$root.selectdpcheck({modelObjType:1, modelId:r.dealerGid}, ()=>{$store.state.dealerInfo.currentTabsIndex = 0;$router.push({path:'/DealerInfo',query:{id:r.dealerGid}})})"
                      >{{r.dealerName}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.lessee.currentTabsIndex === 2" style="padding-top:.3rem;">
              <div class="shadow-md rounded-lg p-4 bg-white" style="margin: 0 .75rem;">
                <div class="flex pr-3 pb-3">
                  <div class="flex-1 font-bold">动态记录</div>
                </div>
                <div
                  class="flex justify-center items-center text-center"
                  style="height:16rem;margin-top:-4rem;"
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
                  v-for="(r,i) in $store.state.lessee.listNewslog"
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

                  <!-- <div class="flex items-center mt-3 pl-2">
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
            <div v-if="$store.state.lessee.currentTabsIndex === 3" style="padding-top:.3rem;">
              <div class="shadow-md rounded-lg p-2 pl-4 pr-4 bg-white" style="margin: 0 .75rem;">
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
                  v-for="(r,i) in $store.state.lessee.listOperatelog"
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
      class="flex bg-white footer-bar border-t border-gray-300 iteams-center fixed bottom-0 left-0 right-0 z-10"
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
  name: "LesseeInfo",
  data() {
    return {
      positioning: false,
      topVal: 245, // 滚动到238距离时 positioning设为true
      id: "",
      info: {},
      lesseeInfolist: [],
      currentLessee: [],
      showInfo1: true,
      isShowDealer: false,
      newslogList: [],
      operatelogList: [],

      picServer: window.picServer,
      userPicArr: [],

      listNewslogPageNum: 1,
      listOperatelogNum: 1,
      isNewslogLastPage: false,
      isOperatelogLastPage: false,

      newsLogContent: "",

      isShowNoData: false,
      isShowNoData_1: false,

      ownerUserGidsName: "",
      followerUserGidsName: ""
    };
  },
  created() {
    //每次进来时候将参数设置为初始值
    // this.$store.commit("setInitParams_tabs");
  },
  mounted() {
    this.id = this.$route.query.id;
    this.addRecentvisit({ modelObjType: 3, modelId: this.id });

    console.log(this.$store.state.lessee.currentTabsIndex);

    this.getBaseInfo(this.$store.state.lessee.currentTabsIndex);

    // if (this.$store.state.lessee.currentTabsIndex) {
    //   this.getBaseInfo(0);
    //   this.getBaseInfo(this.$store.state.lessee.currentTabsIndex);
    // } else {
    //   this.getBaseInfo(0);
    // }

    this.$refs.listBox &&
      this.scrollLoad(
        this.$refs.listBox,
        resolve => {
          if (
            this.$store.state.lessee.currentTabsIndex == 2 &&
            !this.isNewslogLastPage
          ) {
            this.$store
              .dispatch("listNewslogLessee", {
                modelObjType: 3,
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
            this.$store.state.lessee.currentTabsIndex == 3 &&
            !this.isOperatelogLastPage
          ) {
            this.$store
              .dispatch("listOperatelogLessee", {
                modelObjType: 3,
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
    "$store.state.lessee.currentTabsIndex"(num) {
      if (this.positioning) {
        this.$refs.listBox.scrollTop = this.topVal;
      }
      this.getBaseInfo(num);
    }
  },
  methods: {
    getBaseInfo(num) {
      if (num === 0) {
        this.$store.dispatch("getLesseeInfo", this.id).then(res => {
          this.info = this.$store.state.lessee.info;

          this.info.ownerUserGids = this.info.ownerUserList.map(r => {
            return String(r.ownerUserGid);
          });

          this.info.followerUserGids = this.info.followerUserList.map(r => {
            return String(r.ownerUserGid);
          });

          if (this.info.userPic) {
            this.userPicArr = this.info.userPic.split(",");
          }

          let followerUserList = [];
          this.info.followerUserList.map(r => {
            followerUserList.push(r.ownerUserName);
          });
          this.followerUserGidsName = followerUserList.toString();

          let ownerUserList = [];
          this.info.ownerUserList.map(r => {
            ownerUserList.push(r.ownerUserName);
          });
          this.ownerUserGidsName = ownerUserList.toString();
        });
      }
      if (num === 1) {
        // this.$store.dispatch("getLesseeInfo", this.id).then(res => {
          this.info = this.$store.state.lessee.info;
          if (this.$store.state.lessee.info.dealerList != null) {
            this.isShowDealer = true;
            this.lesseeInfolist = this.$store.state.lessee.info.dealerList;
            this.currentLessee = [this.lesseeInfolist[0].dealerGid];
          } else {
            this.isShowDealer = false;
          }
          //判断如果出生日期为null 显示空
          if (this.info.birthday == null) {
            this.info.birthday = null;
          }
        // });
      }
      if (num === 2) {
        // 动态记录
        this.listNewslogPageNum = 1;
        this.isNewslogLastPage = false;
        this.$store
          .dispatch("listNewslogLessee", {
            modelObjType: 3,
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
      if (num === 3) {
        this.listOperatelogNum = 1;
        this.isOperatelogLastPage = false;
        this.$store
          .dispatch("listOperatelogLessee", {
            modelObjType: 3,
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
    changeFollowStatus(i) {
      this.$dialog
        .confirm({
          message: "确认要改变业务状态吗？"
        })
        .then(() => {
          // on confirm
          this.$store
            .dispatch(
              "editLessee",
              Object.assign({}, this.info, { lesseeStatus: i })
            )
            .then(msg => {
              this.$store.commit("setInfo", { lesseeStatus: i });
            });
        });
    },
    editor() {
      // this.$store.commit("setInitEditParams");
      this.$store.commit("setParamsLessee", Object.assign(this.info));
      this.$router.push("/EditLessee");
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
          .dispatch("addNewslogLessee", {
            modelObjType: 3,
            modelId: this.id,
            content: this.newsLogContent || "",
            pics: typeof picUrl == "string" ? picUrl : ""
          })
          .then(msg => {
            this.$store.state.lessee.currentTabsIndex = 2;
            this.isNewslogLastPage = false;
            this.listNewslogPageNum = 1;
            this.newsLogContent = "";
            this.isShowNoData = false;
            this.$store.dispatch("listNewslogLessee", {
              modelObjType: 3,
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
/* .LesseeInfo /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.LesseeInfo /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.LesseeInfo /deep/ .van-hairline--top-bottom::after,
.LesseeInfo /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.LesseeInfo /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.bg-line {
  background: #f4f4f4;
  flex: 1;
  color: #252525;
}

.gray .bg-line {
  background: linear-gradient(#ffad00, #ffd844);
  flex: 1;
  color: #222;
}
.gray .status_correct {
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: #fff;
  right: 1.2rem;
  bottom: 0.2rem;
}
.gray .status_correct::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 5px;
  width: 50%;
  height: 30%;
  border: 2px solid #ffbc42;
  border-radius: 1px;
  border-top: none;
  border-right: none;
  background: transparent;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
/* .LesseeInfo /deep/ .van-field {
  width: 90%;
  background-color: #f6f6f6;
} */
.LesseeInfo /deep/ .van-cell__title span {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}
.footer-bar {
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}
.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 164, 0, 1) 0%,
    rgba(255, 205, 43, 1) 100%
  );
  line-height: 3rem;
}
.search-block {
  width: 90%;
}
.LesseeInfo /deep/ ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  text-align: center;
}
.LesseeInfo /deep/ ::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
.LesseeInfo /deep/ :-ms-input-placeholder {
  /* IE 10+ */
  text-align: center;
}
.LesseeInfo /deep/ :-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}
.progress {
  width: 97%;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f6f6f6;
}
.LesseeInfo {
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
.LesseeInfo /deep/ .van-nav-bar__right {
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
.LesseeInfo /deep/ .van-cell:not(:last-child)::after {
  border-bottom: 1px solid #ededee;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}
.border_line {
  border-bottom: 1px solid #ededee;
}
.lessee_name {
  width: 16rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon_toggle.active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.LesseeInfo /deep/ .van-collapse-item__content {
  padding: 0px 0px;
}
.LesseeInfo /deep/ .van-cell:not(:last-child)::after {
  position: absolute;
  left: 0px;
}

.LesseeInfo /deep/ .van-hairline--top-bottom::after,
.LesseeInfo /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.LesseeInfo /deep/ .van-tabs__nav {
  background: transparent;
}
.ownerUser::before {
  position: absolute;
  left: -7px;
  color: #f42929;
  font-size: 14px;
  content: "*";
  top: 8px;
}
.lessessPics {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.userPic {
  width: 78px;
  height: 78px;
  margin-right: 0.5rem;
}
.userPic:last-child {
  margin-right: 0rem;
}
.dealer /deep/ .van-cell {
  padding: 10px 0px;
}
</style>
