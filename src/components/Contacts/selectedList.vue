<!-- 获取联系人列表 -->
<template>
  <div class="selectedListContacts flex flex-1 flex-col">
    <!-- <van-nav-bar
      title="联系人"
      left-text="返回"
      @click-left="$store.state.contacts.selectedUserGids = $store.state.contacts.confirmUserGids; $router.go(-1)"
      @click-right="finish"
      left-arrow
    >
      <div slot="right">完成</div>
    </van-nav-bar> -->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$store.state.contacts.selectedUserGids = $store.state.contacts.confirmUserGids; $router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">联系人</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" @click="finish">完成</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">
        <div class="flex">
          <van-checkbox-group v-model="$store.state.contacts.confirmUserGids" class="flex-1 ml-5 checkBoxGroup">
            <van-checkbox
              v-for="(item, i) in $store.state.contacts.selectedUserGids"
              :key="i"
              icon-size="16px"
              class="border-b border-gray-200 ellipsis"
              style="padding: 0.86rem"
              :name="item"
            >{{item.split(',')[0]}}</van-checkbox>
          </van-checkbox-group>

          <div class="mr-5">
            <div
              v-for="(item, i) in $store.state.contacts.selectedUserGids"
              :key="i"
              class="border-b border-gray-200"
            >
              <van-field v-model="$store.state.contacts.jobsUser[i]" placeholder="请输入职位" />
            </div>
          </div>
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
  mounted() {},
  methods: {
    finish() {
      let arr = [];
      this.$store.state.contacts.selectedUserGids.filter((r, i) => {
        let obj = {
          contactsGid: "",
          jobTitle: ""
        };
        this.$store.state.contacts.confirmUserGids.some(x => {
          if (x == r) {
            obj.contactsGid = x.split(",")[1];
            return true;
          }
        });
        if (obj.contactsGid) {
          obj.jobTitle = this.$store.state.contacts.jobsUser[i];
          arr.push(obj);
        }
      });

      if (this.$route.query.modelGid) {
        // 关联联系人
        this.$store
          .dispatch("associatedcontacts", {
            associatedType: 0,
            modelGid: this.$route.query.modelGid,
            associatedAttr: arr.map(r => {
              return {
                modelGid: r.contactsGid,
                modelAttr: r.jobTitle
              };
            })
          })
          .then(msg => {
            this.$toast(msg)
            // this.$notify({ type: "success", message: msg });
            this.$router.go(-2);
          });
      } else {
        this.$store.getters.NDparams.dealerContactsList = arr;
        this.$store.getters.NDparams.addType = 1;

        this.$store.dispatch("addCreateDealer").then(r => {
          console.log(r, 222);
          this.$router.push("/DealerManage");
        });
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
