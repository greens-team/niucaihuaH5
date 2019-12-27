<!-- 竞争对手列表 -->
<template>
  <div class="selectedListContacts flex flex-1 flex-col">
    <!-- <van-nav-bar
      title="竞争对手"
      left-text="返回"
      @click-left="$store.state.competitor.selectedUserGids = $store.state.competitor.confirmUserGids; $router.go(-1)"
      @click-right="finish"
      left-arrow
    >
      <div slot="right">完成</div>
    </van-nav-bar> -->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.competitor.selectedUserGids = $store.state.competitor.confirmUserGids; $router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">竞争对手</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div @click="finish()">完成</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-checkbox-group class="flex flex-col checkBoxGroup" v-model="$store.state.competitor.confirmUserGids" >
            <div v-for="(item, i) in $store.state.competitor.selectedUserGids" :key="i" class="flex flex-col border-b border-gray-200 ml-4 mr-4">
              <van-checkbox
                icon-size="16px"
                class="pt-5"
                :name="item"
                style="padding: 0.86rem"
              >
                {{item.split(',')[0]}}
              </van-checkbox>
              <div class="pl-3">
                <van-field type="textarea" rows="2" maxlength="200" :show-word-limit="true" autosize v-model="$store.state.competitor.jobsUser[i]" placeholder="请输入应对策略" />
                <van-field type="textarea" rows="2" maxlength="200" :show-word-limit="true" autosize v-model="$store.state.competitor.jobsUser1[i]" placeholder="请输入竞对政策" />
              </div>
            </div>
          </van-checkbox-group>
          
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
  mounted() {
    this.$store.state.competitor.jobsUser = []
    this.$store.state.competitor.jobsUser1 = []
  },
  methods: {
    finish() {
      let arr = [];
      this.$store.state.competitor.selectedUserGids.filter((r, i) => {
        let obj = {
          contactsGid: "",
          jobTitle: "",
          jobTitle1: ""
        };
        this.$store.state.competitor.confirmUserGids.some(x => {
          if (x == r) {
            obj.contactsGid = x.split(",")[1];
            return true;
          }
        });
        if (obj.contactsGid) {
          obj.jobTitle = this.$store.state.competitor.jobsUser[i];
          obj.jobTitle1 = this.$store.state.competitor.jobsUser1[i];
          arr.push(obj);
        }
      });

      // 关联 竞争对手
      this.$store
        .dispatch("associatedcompetitor", {
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
