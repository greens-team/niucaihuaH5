<!-- 关联经销商列表 c -->
<template>
  <div class="LesseeList flex flex-1 flex-col">
    <!-- <van-nav-bar
      title="关联经销商"
      left-text="取消"
      @click-left="$store.state.dealer.confirmUserGids=[];$store.state.dealer.jobsUser=[]; $store.state.dealer.selectedUserGids = [];$router.go(-1)"
      left-arrow
    >
     <div slot="right" @click="$router.push('/newDealer')">新建</div>
    </van-nav-bar>
    -->
    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.dealer.confirmUserGids=[];$store.state.dealer.jobsUser=[]; $store.state.dealer.selectedUserGids = [];$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">关联经销商</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
      </div>
    </div>
    <van-search
      v-model="$store.state.dealer.listParams.queryString"
      placeholder="请输入搜索内容"
      show-action
      shape="round"
    >
      <div slot="action"></div>
    </van-search>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto"  ref="listBox">
        <van-checkbox-group v-model="$store.state.dealer.selectedUserGids" class="bg-white checkBoxGroup">
          <van-checkbox
            v-for="(item, i) in $store.state.dealer.listData"
            :key="i"
            icon-size="16px"
            class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200"
            :name="item.dealerName+','+item.gid"
          >{{item.dealerName}}</van-checkbox>
        </van-checkbox-group>
      </div>
    </div>

    <div
      class="flex bg-gray-100 mt-1 p-3 h-14 items-center"
      v-show="$store.state.dealer.selectedUserGids.length"
    >
      <div class="flex-1 ellipsis">
        <span class="text-gray-600 text-base">已选择：</span>
        <span class="text-base" v-for="(r,i) in $store.state.dealer.selectedUserGids" :key="i">
          <span v-if="i">,</span>
          {{r.split(',')[0]}}
        </span>
      </div>
      <div slot="right" class="py-2 px-3 rounded-sm text-white nextPage" @click="selectedList()">下一步</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DealerList",
  created() {},
  data() {
    return {};
  },
  watch: {
    "$store.state.dealer.listParams.queryString"(val) {
      this.$store.dispatch("getListData", { queryString: val, onlyWrite:this.$route.query.onlyWrite ? true : false, pageNum: 1 });
    }
  },
  mounted() {
    this.$store.state.dealer.confirmUserGids = [];
    this.$store.state.dealer.jobsUser = [];
    this.$store.state.dealer.selectedUserGids = [];
    this.$store.dispatch("getListData",{onlyWrite:this.$route.query.onlyWrite ? true : false, pageNum: 1});
	
	this.$refs.listBox && this.scrollLoad(this.$refs.listBox, resolve => {
		this.$store.dispatch("getListData", {
			pageNum: this.$store.state.dealer.listParams.pageNum+1
		})
		.then(msg => {
			resolve(msg);
		});
	});
  },
  methods: {
    selectedList() {
      let flag = this.$route.query.flag;
      if (flag == 1) {
        if (this.$store.state.dealer.selectedUserGids.length) {
          this.$store.state.dealer.jobsUser = [];
          this.$route.query.modelGid
            ? this.$router.push({
                path: "/DealerSelectedList",
                query: { modelGid: this.$route.query.modelGid }
              })
            : this.$router.push("/DealerSelectedList");
          this.$store.state.dealer.confirmUserGids = this.$store.state.dealer.selectedUserGids;
        } else {
          this.$toast('请选择联系人')
          // this.$notify({ type: "warning", message: "请选择联系人" });
        }
      }
      if (flag == 2) {
        if (this.$store.state.dealer.selectedUserGids.length) {
          this.$store.state.dealer.jobsUser = [];
          this.$route.query.modelGid
            ? this.$router.push({
                path: "/CompetitorSelectedList",
                query: { modelGid: this.$route.query.modelGid }
              })
            : this.$router.push("/CompetitorSelectedList");
          this.$store.state.dealer.confirmUserGids = this.$store.state.dealer.selectedUserGids;
        } else {
          this.$toast('请选择联系人')
          // this.$notify({ type: "warning", message: "请选择联系人" });
        }
      }
      if (flag == 3) {
        if (this.$store.state.dealer.selectedUserGids.length) {
          this.$store.state.dealer.jobsUser = [];
          this.$route.query.modelGid
            ? this.$router.push({
                path: "/ContactsSelectedList",
                query: { modelGid: this.$route.query.modelGid }
              })
            : this.$router.push("/ContactsSelectedList");
          this.$store.state.dealer.confirmUserGids = this.$store.state.dealer.selectedUserGids;
        } else {
          this.$toast('请选择联系人')
          // this.$notify({ type: "warning", message: "请选择联系人" });
        }
      }
    }
  }
};
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nextPage {
  background: linear-gradient(to right, #fec43a, #ff9505);
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
.checkBoxGroup /deep/ .van-nav-bar__text {
  color: #ff9b02;
  font-size: 1.143rem;
}
.checkBoxGroup /deep/ .van-nav-bar .van-icon {
  color: #ff9b02;
  font-size: 1.143rem;
  display: none;
}
.checkBoxGroup /deep/ .van-checkbox__icon--checked .van-icon {
  background-color: #ff9b02;
  border-color: #ff9b02;
}
.checkBoxGroup /deep/ .van-nav-bar__arrow + .van-nav-bar__text {
  margin-left: -25px;
}
</style>
