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
      <div
        class="flex-1 items-center pl-4 pr-4 flex"
        v-show="!searchBar"
        style="border-bottom:1px solid #f8f8f8;"
      >
        <div class="flex-1 flex">
          <!-- <div @click="$router.go(-1)" class="flex  text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600" >
            <van-icon  class="" name="arrow-left" />
            <span>返回</span>
          </div>-->

          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <!-- <div class="flex-1 text-center text-lg font-medium pt-2">经销商</div> -->

        <div class="titleDropdown" style="position:relative;" v-if="!flag">
          <van-dropdown-menu>
            <van-dropdown-item
              title-class="dropDown_title"
              @change="getDiffDealerList"
              @open="open"
              @close="close"
              v-model="$store.state.dealer.dropDownValue"
              :options="$store.state.dealer.dropDownType"
            />
          </van-dropdown-menu>
          <img
            class="dropdown_icon icon_toggle"
            :class="{ active: dropDown}"
            src="../../assets/dealer/dropdownMenu.png"
            alt
          />
        </div>

        <span class="text-center font-bold bar_title" v-else>经销商</span>

        <div class="flex-1 items-center flex text-xl" v-if="!flag">
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
        <div class="flex-1 items-center flex text-xl" v-else></div>
      </div>
      <div
        v-show="searchBar"
        :class="['flex items-center pl-4 pr-4 flex border-b border-gray-200', {'pr-0': homeSearch }]"
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
      v-if="!flag"
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

    <div
      class="flex items-center justify-around"
      style="border-bottom:1px solid #f8f8f8;"
      v-if="!flag"
    >
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
      <Screening
        @onSearch="searchAll"
        :followStatusValue="$store.state.dealer.listParams.followStatus"
        :ownerUserGidsValue="ownerUserGids"
        :followerUserGidsValue="followerUserGids"
      />
    </div>
    <div class="border-b border-gray-200 flex items-center justify-around" v-else></div>

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

        <p
          v-show="!$store.state.dealer.listData.length"
          class="text-center mt-10"
          style="color:#80848d"
        >没有筛选到相关的数据</p>
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

    // 如果是全部经销商 清空参数值
    if (this.$store.state.dealer.dropDownValue == 0) {
      this.$store.commit("setInitParams");
    }
    // this.$store.commit("setInitParams");
  },
  data() {
    return {
      searchBar: false,
      homeSearch: false,
      flag: 0,
      dropDown: false,
      followerUserGids: [],
      ownerUserGids: []
    };
  },
  watch: {
    "$store.state.dealer.listParams.followStatus"() {
      this.$refs.dealerListBox.scrollTop = 0;
    },
    "$store.state.dealer.dropDownValue"() {
      this.$refs.dealerListBox.scrollTop = 0;
    }
  },
  mounted() {
    this.$store.commit("setInitParams");
    this.$store.state.dealer.dropDownValue = 0;

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
    this.flag = this.$route.query.flag;
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
        .dispatch("getListData", {
          pageNum: this.$store.state.dealer.listParams.pageNum + 1,
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

    this.$store.dispatch("getListData", {
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
    searchAll(data) {
      this.$refs.dealerListBox.scrollTop = 0;
      this.$refs.swipe.swipeTo(data.followStatus);

      this.$store.dispatch("getListData", Object.assign(data, { pageNum: 1 }));

      let userId = JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID;
      
      this.ownerUserGids = data.ownerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });
      this.followerUserGids = data.followerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });

      if (data.ownerUserGids.length != 0 && data.followerUserGids.length != 0) {
        this.$store.state.dealer.dropDownValue = 0;
      }
      if (this.$store.state.dealer.dropDownValue == 1) {
        if (
          !(
            data.ownerUserGids.length == 1 && data.ownerUserGids[0].id == userId
          )
        ) {
          this.$store.state.dealer.dropDownValue = 0;
        }
      }
      if (this.$store.state.dealer.dropDownValue == 2) {
        if (
          !(
            data.followerUserGids.length == 1 &&
            data.followerUserGids[0].id == userId
          )
        ) {
          this.$store.state.dealer.dropDownValue = 0;
        }
      }
    },
    getDiffDealerList(value) {
      let userInfo = JSON.parse(sessionStorage.userInfo);
      let ownerUserGids = [];

      ownerUserGids = [
        {
          id: userInfo.EMPLOYEE_ID,
          refRlNm: userInfo.EMPLOYEE_NAME
        }
      ];
      // this.$store.commit("setInitParams");
      let params = {
        dealerName: "",
        startTime: "",
        endTime: "",
        relationHealth: "",
        notVisitDays: "",
        visitCount: "",
        notVisitConditions: 0,
        visitConditions: 0,
        level: [],
        // ownerUserGids: [],
        area: "",
        areaVal: "",
        city: "",
        cityVal: "",
        province: "",
        provinceVal: "",
        // followerUserGids: [], // 参与人id
        ownerCd: [], // 公司归属（ 1自有 2 第三方）
        contactsName: "", // 法人姓名
        creditCode: "", // 统一社会社会信用代码
        address: "", // 详细地址
        // followStatus: 0, // 业务类型
        startEstablishTime: "", // 成立日期
        endEstablishTime: "",
        certTypCd: [], // 法人证件类型
        certNo: "", // 证件号码
        contactsPhone: "", //手机号码
        comment: ""
      };
      if (value == 0) {
        // 全部
        this.$store.dispatch(
          "getListData",
          Object.assign({}, params, {
            followerUserGids: [],
            ownerUserGids: [],
            pageNum: 1
          })
        );

        this.followerUserGids = [];
        this.ownerUserGids = [];
      }
      if (value == 1) {
        // 我负责的
        this.$store.dispatch(
          "getListData",
          Object.assign({}, params, {
            followerUserGids: [],
            ownerUserGids: ownerUserGids,
            pageNum: 1
          })
        );

        this.followerUserGids = [];
        this.ownerUserGids = ownerUserGids;
      }
      if (value == 2) {
        // 我参与的
        this.$store.dispatch(
          "getListData",
          Object.assign({}, params, {
            followerUserGids: ownerUserGids,
            ownerUserGids: [],
            pageNum: 1
          })
        );
        this.followerUserGids = ownerUserGids;
        this.ownerUserGids = [];
      }
    },
    open() {
      this.dropDown = true;
    },
    close() {
      this.dropDown = false;
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
.DealerManage /deep/ .van-search {
  padding: 10px 0px;
}
.DealerManage /deep/ .van-search__action {
  padding: 0 0 0 8px;
}
/* 经销商顶部下拉筛选 */
.dropdown_icon {
  width: 1.286rem;
  height: 1.286rem;
  position: absolute;
  top: 16px;
  right: 0;
}
.DealerManage /deep/ .titleDropdown .van-dropdown-menu__title {
  padding: 0 25px 0 0;
  color: #252525;
  line-height: normal;
}
.DealerManage /deep/ .titleDropdown .van-dropdown-menu__title .van-ellipsis {
  font-size: 1.286rem;
  font-weight: bold;
}
.icon_toggle {
  transition: 0.3s;
}
.icon_toggle.active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.DealerManage
  /deep/
  .titleDropdown
  .van-dropdown-item__option.van-dropdown-item__option--active {
  color: #ff9b02;
}
.DealerManage /deep/ .titleDropdown .van-dropdown-item__option {
  /* justify-content: center; */
  text-align: center;
  color: #252525;
}
.DealerManage
  /deep/
  .titleDropdown
  .van-dropdown-item__option
  .van-cell__title
  span {
  font-size: 1.143rem;
}
.DealerManage
  /deep/
  .titleDropdown
  .van-dropdown-item__option--active
  .van-cell__value {
  flex: none;
}
.DealerManage /deep/ .titleDropdown .van-icon-success:before {
  display: none;
}
</style>