<!-- 合作竞对 关联选中 的经销商 c-->
<template>
  <div class="selectedListCompetitor flex flex-1 flex-col">
    <!-- <van-nav-bar
      title="已选择经销商"
      left-text="返回"
      @click-left="$store.state.dealer.selectedUserGids = $store.state.dealer.confirmUserGids; $router.go(-1)"
      left-arrow
    >
      <div slot="right" @click="finish">确定</div>
    </van-nav-bar>-->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.dealer.selectedUserGids = $store.state.dealer.confirmUserGids; $router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">已选择经销商</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div @click="finish()">确定</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto selectedList">
        <div
          v-for="(item, i) in $store.state.dealer.selectedUserGids"
          :key="i"
          icon-size="16px"
          class="border-b border-gray-200"
          style="padding: .86rem .86rem 0 .86rem"
        >
          <van-checkbox-group v-model="$store.state.dealer.confirmUserGids">
            <van-checkbox :name="item">{{item.split(',')[0]}}</van-checkbox>
          </van-checkbox-group>

          <van-field v-model="$store.state.dealer.jobsUser[i]" placeholder="应对策略" />
          <van-field v-model="$store.state.dealer.jobsUser1[i]" placeholder="竞对政策" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectedListContacts",
  created() {},
  data() {
    return {};
  },
  created() {
    this.$store.commit("setParamsEmpty");
  },
  mounted() {},
  methods: {
    finish() {
      let arr = [];
      this.$store.state.dealer.selectedUserGids.filter((r, i) => {
        let obj = {
          contactsGid: "",
          jobTitle: "",
          jobTitle1: ""
        };
        console.log(this.$store.state.dealer.jobsUser1[i]);
        this.$store.state.dealer.confirmUserGids.some(x => {
          if (x == r) {
            obj.contactsGid = x.split(",")[1];
            return true;
          }
        });
        if (obj.contactsGid) {
          obj.jobTitle = this.$store.state.dealer.jobsUser[i];
          obj.jobTitle1 = this.$store.state.dealer.jobsUser1[i];
          arr.push(obj);
        }
      });

      // 关联 竞争对手
      this.$store
        .dispatch("associatedCompetitor", {
          associatedType: 0,
          modelGid: this.$route.query.modelGid,
          associatedAttr: arr.map(r => {
            return {
              modelGid: r.contactsGid,
              modelAttr: r.jobTitle,
              modelAttr2: r.jobTitle1
            };
          })
        })
        .then(msg => {
          this.$toast(msg)
          // this.$notify({ type: "success", message: msg });
          this.$router.go(-2);
        });
    }
  }
};
</script>

<style scoped>
/* .ellipsis /deep/ .van-checkbox__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 8rem;
} */
.selectedList /deep/ .van-cell {
  padding: 10px 28px;
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>
