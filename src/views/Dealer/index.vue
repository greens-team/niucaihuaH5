/**
 * index.vue        经销商管理页面
 * CreateDealer.vue 创建经销商页面
 * NewContacts.vue  创建联系人
 * ListRow.vue      经销商列表单行组件
 */

 <!-- 经销商管理页面 -->
<template>
  <div class="DealerManage flex-1 flex flex-col bg-white">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-4 pr-4 flex" v-show="!searchBar">
        <div class="flex-1 flex">
          <!-- <div @click="$router.go(-1)" class="flex  text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600" >
            <van-icon  class="" name="arrow-left" />
            <span>返回</span>
          </div>-->

          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <!-- <div class="flex-1 text-center text-lg font-medium pt-2">经销商</div> -->
        <span class="text-center font-bold bar_title">经销商</span>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>
          <img
            class="bar_icon search_icon"
            @click="searchBar = true"
            src="../../assets/topBarIcon/search_icon.png"
            alt="搜索"
          />
          <img
            class="bar_icon plus_icon"
            v-show="$root.checkRole('DEALER_CREATE')"
            @click="$store.commit('setNewDealerParams'); $router.push('/CreateDealer')"
            src="../../assets/topBarIcon/add_icon.png"
            alt="添加"
          />
          <!-- <van-icon name="search"  @click="searchBar = true" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600" />
          <van-icon name="plus" @click="$store.commit('setNewDealerParams'); $router.push('/CreateDealer')" slot="right" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"/>-->
        </div>
      </div>
      <div
        v-show="searchBar"
        :class="['flex items-center pl-3 pr-3 flex border-b border-gray-200', {'pr-0': homeSearch }]"
      >
        <div
          v-if="homeSearch"
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <van-icon class name="arrow-left" />
          <span>返回</span>
        </div>
        <van-search
          class="flex-1"
          v-model="$store.state.dealer.listParams.queryString"
          placeholder="请输入搜索关键词"
          @input="(keyword)=>$store.dispatch('getListData',{queryString: keyword, pageNum: 1})"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false; $store.dispatch('getListData',{queryString: '', pageNum: 1})"
          >取消</div>
        </van-search>
      </div>
    </div>

    <van-tabs
      v-model="$store.state.dealer.listParams.followStatus"
      @click="$refs.swipe.swipeTo($store.state.dealer.listParams.followStatus)"
    >
      <van-tab
        v-for="(row,index) in $store.state.dealer.followStatus"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>

    <div class="border-b border-gray-200 flex items-center justify-around">
      <div style="position:relative;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('getListData',{orderType: num, pageNum: 1})"
            v-model="$store.state.dealer.listParams.orderType"
            :options="$store.state.dealer.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
      <Screening @onSearch="searchAll" />
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="dealerListBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('getListData',{followStatus: num, pageNum: 1})"
        >
          <van-swipe-item
            class="bg-white"
            v-for="(row,index) in $store.state.dealer.followStatus"
            :key="index"
          >
            <ListRow />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import Screening from "@/components/Screening";
import ListRow from "./ListRow";
export default {
  name: "DealerManage",
  components: {
    Screening,
    ListRow
  },
  created() {
    // 首页进来时直接显示搜索
    if (this.$route.query.search) {
      this.homeSearch = true;
      this.searchBar = true;
    }
    this.$store.commit("setInitParams");
  },
  data() {
    return {
      searchBar: false,
      homeSearch: false
    };
  },
  watch: {
    '$store.state.dealer.listParams.followStatus'(){
      this.$refs.dealerListBox.scrollTop = 0
    }
  },
  mounted() {
    this.scrollLoad(this.$refs.dealerListBox, resolve => {
      this.$store
        .dispatch("getListData", {
          pageNum: this.$store.state.dealer.listParams.pageNum + 1
        })
        .then(msg => {
          resolve(msg);
        });
    });
    this.$store.dispatch("getListData", { pageNum: 1 });
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: "加载中..."
      });
    },
    searchAll(data) {
      this.$store.dispatch("getListData", Object.assign(data, { pageNum: 1 }));
    }
  }
};
</script>

<style scoped>
/* .DealerManage /deep/.van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.DealerManage /deep/ .van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.DealerManage /deep/ .van-hairline--top-bottom::after,
.DealerManage /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.DealerManage /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.DealerManage /deep/ [class*="van-hairline"]::after {
  position: static;
}
.DealerManage /deep/ .van-tag {
  padding: 0 0.2em;
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
.DealerManage /deep/ .van-dropdown-item__option--active,
.DealerManage
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.DealerManage /deep/ .van-dropdown-item__option--active,
.DealerManage
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.DealerManage /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.DealerManage /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.DealerManage /deep/ .van-cell--required::before {
  position: absolute;
  left: 8px;
  color: #f42929;
  font-size: 14px;
  content: "*";
}
</style>