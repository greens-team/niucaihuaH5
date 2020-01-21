
<!-- 阶段变化经销商列表 -->
<template>
  <div class="DealerManage flex-1 flex flex-col bg-white">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-4 pr-4 flex">
        <div class="flex-1 flex">
          <div
            @click="$router.push('/')"
            class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <span class="text-center font-bold bar_title">经销商</span>
        <div class="flex-1 items-center flex text-xl"></div>
      </div>
    </div>

    <div class="border-b border-gray-200 flex items-center justify-around"></div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="dealerListBox">
        <div
          class="flex flex-col p-4 border-b border-gray-200"
          v-for="(r,i) in $store.state.workbench.changeDealerList"
          :key="i"
          @click="goInfo(r.gid)"
        >
          <div class="flex items-center">
            <div class="flex-1 text-lg font-bold">{{r.dealerName}}</div>
            <div class="text-sm" style="color:#80848d">
              <span class="text-base" style="color:#f42929">{{r.notVisitDays}}</span>
              天未拜访
            </div>
          </div>
          <div class="text-base" style="color:#80848d">{{r.province + '' + r.city + '' + r.area}}</div>
          <div class="flex items-center pt-1">
            <span class="text-sm mr-2">{{r.ownerNames.toString()}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeDealer",
  created() {
    this.$store.commit("setInitParams");
  },
  data() {
    return {};
  },
  mounted() {
    // this.scrollLoad(this.$refs.dealerListBox, resolve => {
    //   this.$store
    //     .dispatch("getListData", {
    //       pageNum: this.$store.state.dealer.listParams.pageNum + 1
    //     })
    //     .then(msg => {
    //       resolve(msg);
    //     });
    // });
    // this.$store.dispatch("getListData", { pageNum: 1 });

    let startTime = Number(this.$route.query.startTime);
    let endTime = Number(this.$route.query.endTime);
    let userType = Number(this.$route.query.userType);
    let userGids = [];
    if (
      //选择了同事，详情页再跳回到列表
      typeof this.$route.query.userGids == "string" &&
      this.$route.query.userGids
    ) {
      userGids = [this.$route.query.userGids];
    } else if (
      //没有选择同事，详情页再跳回到列表
      typeof this.$route.query.userGids == "undefined" &&
      !this.$route.query.userGids
    ) {
      userGids = [];
    } else {
      //从简报每一次跳到列表
      userGids = this.$route.query.userGids;
    }

    let deptGids = [];
    if (
      typeof this.$route.query.deptGids == "string" &&
      this.$route.query.deptGids
    ) {
      deptGids = [this.$route.query.deptGids];
    } else if (
      typeof this.$route.query.deptGids == "undefined" &&
      !this.$route.query.deptGids
    ) {
      deptGids = [];
    } else {
      deptGids = this.$route.query.deptGids;
    }

    this.scrollLoad(this.$refs.dealerListBox, resolve => {
      this.$store
        .dispatch("changeDealerList", {
          pageNum: this.$store.state.workbench.listParams.pageNum + 1,
          startTime: startTime,
          endTime: endTime,
          userGids: userGids,
          deptGids: deptGids,
          userType: userType,
          onlyWrite: false
        })
        .then(msg => {
          resolve(msg);
        });
    });
    this.$store.dispatch("changeDealerList", {
      pageNum: 1,
      startTime: startTime,
      endTime: endTime,
      userGids: userGids,
      deptGids: deptGids,
      userType: userType,
      onlyWrite: false
    });
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: "加载中..."
      });
    },
    goInfo(id){
      this.$store.state.dealerInfo.currentTabsIndex = 0;
      this.$router.push({name: 'DealerInfo', query: {id: id}})
    }
  }
};
</script>

<style scoped>
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>