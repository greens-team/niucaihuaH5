<!-- 最近访问页面 -->
<template>
  <div class="RecentVisit flex flex-1 flex-col">
    <!-- <van-nav-bar title="最近访问1" left-text="返回" left-arrow @click-left="onClickLeft" /> -->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="onClickLeft"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">最近访问</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll">
        <van-cell-group v-if="listData.length">
          <van-cell
            is-link
            v-for="(row,i) in listData"
            :key="i"
            :ss="row.modelGid"
            :ssd="row.modelObjType"
            @click="goDetails(row)"
          >
            <template slot="title">
              <p class="leading-snug">
                {{row.someName}}
                <br />
                <span class="text-gray-500">{{row.modelName}}</span>
              </p>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentVisit",
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 20
      },
      listData: []
    };
  },
  mounted() {
    this.$ajax.workbench.recentvisitlist(this.params).then(res => {
      if (!res.code) {
        this.listData = res.data.list;
      }
    });
  },
  methods: {
    goDetails(row) {
      switch (row.modelObjType) {
        case 1:
          this.$router.push({
            name: "DealerInfo",
            query: { id: row.modelGid }
          });
          break;
        case 2:
          this.$router.push({
            name: "ContactsInfo",
            query: { gid: row.modelGid }
          });
          break;
        case 3:
          this.$router.push({
            name: "LesseeInfo",
            query: { id: row.modelGid }
          });
          break;
        case 4:
          this.$router.push({
            name: "CompetitorInfo",
            query: { id: row.modelGid }
          });
          break;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: "加载中..."
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