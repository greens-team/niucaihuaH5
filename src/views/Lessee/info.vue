 <!-- 承租人内容页 -->
<template>
  <div class="LesseeInfo flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="承租人" @click-left="$router.go(-1)" left-text="返回" left-arrow>
      <i
        class="iconfont iconqipaocaidanbianji-bang"
        @click="editor"
        slot="right"
        style="font-size: 1.6rem;"
      ></i>
      <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0">
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
            <span class="text-sm text-red-500">放弃</span>
          </div>
          <div>
            <div class="flex mt-2">
              <div
                @click="changeFollowStatus(i)"
                v-for="(row,i) in $store.state.lessee.lesseeStatus"
                :key="i"
              >
                <div
                  v-if="i && i<$store.state.lessee.lesseeStatus.length-1"
                  :class="['flex flex-1 items-center relative', {gray: i <= info.lesseeStatus+1}]"
                >
                  <div class="rounded bg-line mr-4 p-3 px-5 text-center text-sm shadow">{{row.name}}</div>
                  <div class="status-correct"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </div>
    <div style="height: 3rem;background: #fff;"></div>
    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="listBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.commit('setCurrentTabsIndex_lessee', num)"
        >
          <van-swipe-item v-for="(row,index) in $store.state.lessee.tabs" :key="index">
            <!-- 基本信息 经销商-->
            <div v-if="$store.state.lessee.currentTabsIndex === 0">
              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex items-center">
                  <div class="flex flex-1 items-center font-bold" @click="showInfo1 = !showInfo1">
                    承租人基本信息
                    <i class="iconfont iconweizhankai ml-2"></i>
                  </div>
                </div>
                <div v-show="showInfo1">
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">
                      <span class="text-red-500">*</span>承租人姓名
                    </p>
                    <p class="text-gray-900 text-sm">{{info.lesseeName}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">身份证号码</p>
                    <p class="text-gray-900 text-sm">{{info.idcardNum}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">出生日期</p>
                    <p
                      class="text-gray-900 text-sm"
                    >{{info.birthday == null ? null : $root.moment(info.birthday*1000).format('YYYY-MM-DD')}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">婚姻状况</p>
                    <p class="text-gray-900 text-sm">{{info.marry ? '已婚' : '未婚'}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">性别</p>
                    <p class="text-gray-900 text-sm">{{info.gender ? '女' : '男'}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">客户类型</p>
                    <!-- r.lesseeType -->
                    <p class="text-gray-900 text-sm">自然人</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">手机号</p>
                    <p class="text-gray-900 text-sm" style="color:#0885FF;">{{info.lesseePhone}}</p>
                  </div>
                  <!-- <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">年龄</p>
                    <p
                      class="text-gray-900 text-sm"
                    >{{Math.floor((((new Date()).valueOf() - info.birthday))/31536000000)}}</p>
                  </div>-->
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">户口所在地</p>
                    <p class="text-gray-900 text-sm">{{info.domicilePlace}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">家庭住址</p>
                    <p class="text-gray-900 text-sm" style="color:#0885FF;">{{info.homeAddress}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">从业年限</p>
                    <p class="text-gray-900 text-sm">{{info.workingYears}}</p>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">照片</p>
                    <img :src="info.userPic" width="130" alt="照片" />
                  </div>
                  <div class="pt-2 pb-2">
                    <p class="text-xs text-gray-500">上传法人身份证件照片</p>
                    <div class="flex">
                      <img :src="info.idcardFrontPic" width="130" alt="身份证正面" />
                      <img :src="info.idcardBackPic" class="ml-1" width="130" alt="身份证反面" />
                    </div>
                  </div>
                  <div class="border-b border-gray-100 pt-2 pb-2">
                    <p class="text-xs text-gray-500">备注</p>
                    <p class="text-gray-900 text-sm">{{info.comment}}</p>
                  </div>
                </div>
              </div>

              <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                <div class="flex pr-3 pb-3">
                  <div class="flex-1 font-bold">经销商</div>
                  <div
                    class="text-sm"
                    style="color:#FF9B02"
                    @click="$router.push({path:'/DealerList', query: {modelGid: id,flag:1}})"
                  >关联</div>
                </div>
                <van-collapse v-model="currentLessee" v-show="isShowDealer">
                  <van-collapse-item
                    v-for="(r,i) in lesseeInfolist"
                    :key="i"
                    :title="r.dealerName"
                    :name="r.dealerGid"
                    class="text-gray-900 text-lg"
                  >
                    <div class="border-b border-gray-100 pt-2 pb-2">
                      <p class="text-xs text-gray-500">经销商名称</p>
                      <p class="text-base" style="color:#0885FF;">{{r.dealerName}}</p>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>
            </div>

            <div v-if="$store.state.lessee.currentTabsIndex === 1">
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
            <div v-if="$store.state.lessee.currentTabsIndex === 2">
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
          v-model="$store.state.lessee.addNewslogParams.content"
          @keyup.13="tapToSearch"
        />
      </form>

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
      showInfo1: true,
      isShowDealer: false,
      newslogList: [],
      operatelogList: []
    };
  },
  created() {
    //每次进来时候将参数设置为初始值
    this.$store.commit("setInitParams_tabs");
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
    "$store.state.lessee.currentTabsIndex"(num) {
      this.getBaseInfo(num);
    }
  },
  methods: {
    getBaseInfo(num) {
      if (num === 0) {
        this.$store.dispatch("getLesseeInfo", this.id).then(res => {
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
        });
      }
      if (num === 1) {
        // 动态记录
        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listNewslogLessee",
              Object.assign({
                pageNum: this.$store.state.lessee.newslogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 3
              })
            )
            .then(msg => {
              this.newslogList = this.$store.state.lessee.listNewslog;
            });
        });

        this.$store
          .dispatch(
            "listNewslogLessee",
            Object.assign({ modelId: this.id, modelObjType: 3, pageNum: 1 })
          )
          .then(msg => {
            this.newslogList = this.$store.state.lessee.listNewslog;
          });
      }
      if (num === 2) {

        this.scrollLoad(this.$refs.listBox, resolve => {
          this.$store
            .dispatch(
              "listOperatelogLessee",
              Object.assign({
                pageNum: this.$store.state.lessee.operatelogParams.pageNum + 1,
                modelId: this.id,
                modelObjType: 3
              })
            )
            .then(msg => {
              this.operatelogList = this.$store.state.lessee.listOperatelog;
            });
        });

        this.$store
          .dispatch(
            "listOperatelogLessee",
            Object.assign({ modelId: this.id, modelObjType: 3, pageNum: 1 })
          )
          .then(res => {
            this.operatelogList = this.$store.state.lessee.listOperatelog;
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
      this.$store.commit(
        "setParams",
        Object.assign(this.info, {
          lesseeType: 0,
          lesseeStatus: 1 //默认就是线索承租人
        })
      );
      this.$router.push("/EditLessee");
    },
    tapToSearch() {
      this.$store.dispatch(
        "addNewslogLessee",
        Object.assign({ modelId: this.id, modelObjType: 3 })
      );

      this.$store
        .dispatch(
          "listNewslogLessee",
          Object.assign({ modelId: this.id, modelObjType: 3, pageNum: 1 })
        )
        .then(res => {
          this.newslogList = this.$store.state.lessee.listNewslog;
          this.$store.state.lessee.addNewslogParams.content = ''
        });
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
.gray .status-correct {
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: #fff;
  right: 1.2rem;
  bottom: 0.2rem;
}
.gray .status-correct::after {
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
.LesseeInfo /deep/ .van-field {
  width: 70%;
  background-color: #f6f6f6;
}
.LesseeInfo /deep/ .van-cell__title span {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}
.footer-bar {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}
.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 191, 42, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
}
.search-block {
  width: 80%;
}
</style>
