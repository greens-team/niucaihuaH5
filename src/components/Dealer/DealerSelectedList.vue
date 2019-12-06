<!-- 承租人 关联选中 的经销商 c-->
<template>
  <div class="selectedListLessee flex flex-1 flex-col">
    <!-- <van-nav-bar
      title="已选择经销商"
      left-text="返回"
      @click-left="$store.state.dealer.selectedUserGids = $store.state.dealer.confirmUserGids; $router.go(-1)"
      left-arrow
    >
      <div slot="right" @click="finish()">确定</div>
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
      <div class="absolute inset-0 overflow-y-auto">
        <!-- <div class="flex"> -->

        <van-checkbox-group v-model="$store.state.dealer.confirmUserGids" class="flex-1 ml-5">
          <van-checkbox
            v-for="(item, i) in $store.state.dealer.selectedUserGids"
            :key="i"
            icon-size="16px"
            class="border-b border-gray-200"
            style="padding: 0.86rem"
            :name="item"
          >{{item.split(',')[0]}}</van-checkbox>
        </van-checkbox-group>

        <!-- <div class="mr-5">
            <div v-for="(item, i) in $store.state.lessee.selectedUserGids" :key="i" class="border-b border-gray-200" >
              <van-field
                v-model="$store.state.lessee.jobsUser[i]"
                placeholder="请输入职位"
              />
            </div>
          </div>
        </div>-->
        <!-- <van-popup v-model="showNext" position="bottom">
          <div class="bg-gray-200">
            <div style="color:#ff9b02"
              class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
            >新建经销商</div>
            <div style="color:#ff9b02"
              class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
            >新建并关联经销商</div>
            <div 
              class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer mt-1"
              @click="showNext=false"
            >取消</div>
          </div>
        </van-popup>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectedListDealer",
  created() {},
  data() {
    return {
      showNext: false
    };
  },
  mounted() {},
  methods: {
    finish() {
      let arr = [];
      this.$store.state.dealer.selectedUserGids.filter((r, i) => {
        let obj = {
          contactsGid: "",
          jobTitle: ""
        };
        this.$store.state.dealer.confirmUserGids.some(x => {
          if (x == r) {
            obj.contactsGid = x.split(",")[1];
            return true;
          }
        });
        if (obj.contactsGid) {
          obj.jobTitle = this.$store.state.dealer.jobsUser[i];
          arr.push(obj);
        }
      });

      // 关联经销商
      this.$store
        .dispatch("associatedLessee", {
          associatedType: 0,
          modelGid: this.$route.query.modelGid,
          modelGids: arr.map(r => {
            return r.contactsGid;
          })
        })
        .then(msg => {
          this.$notify({ type: "success", message: msg });
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
</style>
