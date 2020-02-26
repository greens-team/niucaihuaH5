 <!-- 承租人列表页 -->
<template>
  <div class="LesseeList flex-1 flex flex-col">
    <div class="flex flex-col">
      <div
        class="flex-1 items-center pl-4 pr-4 flex"
        v-show="!searchBar"
        style="border-bottom:1px solid #f8f8f8;"
      >
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <!-- <span class="text-center font-bold bar_title">承租人</span> -->

        <div class="titleDropdown" style="position:relative;">
          <van-dropdown-menu>
            <van-dropdown-item
              @change="getDiffList"
              @open="open"
              @close="close"
              v-model="$store.state.lessee.dropDownValue"
              :options="$store.state.lessee.dropDownType"
            />
          </van-dropdown-menu>
          <img
            class="dropdown_icon icon_toggle"
            :class="{ active: dropDown}"
            src="../../assets/dealer/dropdownMenu.png"
            alt
          />
        </div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>

          <!-- 搜索图标 -->
          <img
            class="bar_icon search_icon"
            @click="searchBar = true"
            src="../../assets/topBarIcon/search_icon.png"
            alt="搜索"
          />

          <!-- 添加图标 -->
          <img
            class="bar_icon plus_icon"
            v-show="$root.checkRole('LESSEE_CREATE')"
            @click="$store.commit('setInitAddParams');$router.push('/CreateLessee')"
            src="../../assets/topBarIcon/add_icon.png"
            alt="添加"
          />
        </div>
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
          v-model="$store.state.lessee.listParams.queryString"
          @input="(keyword)=>$store.dispatch('listLessee',{queryString: keyword, pageNum: 1})"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false;$store.dispatch('listLessee',{queryString: '', pageNum: 1})"
          >取消</div>
        </van-search>
      </div>
    </div>
    <van-tabs
      v-model="$store.state.lessee.listParams.lesseeStatus"
      line-width="36px"
      @click="$refs.swipe.swipeTo($store.state.lessee.listParams.lesseeStatus)"
    >
      <van-tab
        v-for="(row,index) in $store.state.lessee.lesseeStatus"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>

    <div class="flex items-center justify-around" style="border-bottom:1px solid #f8f8f8;">
      <div style="position:relative;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('listLessee',{orderType: num,pageNum:1})"
            v-model="$store.state.lessee.listParams.orderType"
            :options="$store.state.lessee.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
      <Screening
        @onSearch="searchAll"
        :lesseeStatusValue="$store.state.lessee.listParams.lesseeStatus"
        :ownerUserGidsValue="ownerUserGids"
        :followerUserGidsValue="followerUserGids"
      />
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="lesseeListBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listLessee',{lesseeStatus: num,pageNum:1})"
        >
          <van-swipe-item
            v-for="(row,index) in $store.state.lessee.lesseeStatus"
            :key="index"
            class="bg-white"
          >
            <div
              class="flex flex-col m-4 bg-white last_child"
              style="border-bottom:1px solid #f8f8f8;padding-bottom:1rem;"
              v-for="(r,i) in $store.state.lessee.list"
              :key="i"
              @click="goInfo(r.gid)"
            >
              <div class="flex items-center">
                <div
                  class="w-12 h-12 text-center rounded-full mr-4 text-xl font-bold baseName"
                >{{r.lesseeName.trim().substring(0,1).toUpperCase()}}</div>
                <div style="flex:1">
                  <div class="flex items-center">
                    <div class="flex-1 text-base font-bold">{{r.lesseeName}}</div>
                    <div>
                      <van-tag plain type="primary" class="text-sm">
                        {{
                        $store.state.lessee.status[r.lesseeStatus-1] ? $store.state.lessee.status[r.lesseeStatus-1].text : ''
                        }}
                      </van-tag>
                    </div>
                  </div>
                  <div class="text-xs text-gray-900">{{r.homeAddress}}</div>
                  <div class="flex items-center">
                    <p>
                      <span
                        class="text-gray-900"
                        style="font-size:.86rem;margin-bottom: -.3rem;"
                      >负责人：</span>
                      <span
                        class="text-gray-900"
                        style="font-size:.86rem;"
                      >{{r.ownerNames.toString()}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>

        <p
          v-show="!$store.state.lessee.list.length"
          class="text-center mt-10"
          style="color:#80848d"
        >没有筛选到相关的数据</p>
      </div>
    </div>
    <!-- <div @click="$router.push('/LesseeInfo')">详情页</div> -->
  </div>
</template>

<script>
import Screening from "@/components/Screening/lesseeScreen";
export default {
  name: "LesseeList",
  components: {
    Screening
  },
  data() {
    return {
      searchBar: false,
      homeSearch: false,
      dropDown: false,
      followerUserGids: [],
      ownerUserGids: []
    };
  },
  watch: {
    "$store.state.lessee.dropDownValue"() {
      this.$refs.lesseeListBox.scrollTop = 0;
    },
    "$store.state.lessee.listParams.lesseeStatus"() {
      this.$refs.lesseeListBox.scrollTop = 0;
    }
  },
  created() {
    // 如果是全部经销商 清空参数值
    if (this.$store.state.lessee.dropDownValue == 0) {
      this.$store.commit("setInitParams");
    }
  },
  mounted() {
    this.scrollLoad(this.$refs.lesseeListBox, resolve => {
      this.$store
        .dispatch("listLessee", {
          pageNum: this.$store.state.lessee.listParams.pageNum + 1
        })
        .then(msg => {
          resolve(msg);
        });
    });

    this.$store.dispatch("listLessee", { pageNum: 1 });
  },
  methods: {
    goInfo(id) {
      this.$store.state.lessee.currentTabsIndex = 0;
      this.$router.push({ name: "LesseeInfo", query: { id: id } });
    },
    getDiffList(value) {
      let userInfo = JSON.parse(sessionStorage.userInfo);
      let ownerUserGids = [];

      ownerUserGids = [
        {
          id: userInfo.EMPLOYEE_ID,
          refRlNm: userInfo.EMPLOYEE_NAME
        }
      ];
      // this.$store.commit("setInitParams");

      if (value == 0) {
        // 全部
        this.$store.dispatch("listLessee", {
          followerUserGids: [],
          ownerUserGids: [],
          pageNum: 1
        });
        this.followerUserGids = [];
        this.ownerUserGids = [];
      }
      if (value == 1) {
        // 我负责的
        this.$store.dispatch("listLessee", {
          followerUserGids: [],
          ownerUserGids: ownerUserGids,
          pageNum: 1
        });
        this.followerUserGids = [];
        this.ownerUserGids = ownerUserGids;
      }
      if (value == 2) {
        // 我参与的
        this.$store.dispatch("listLessee", {
          followerUserGids: ownerUserGids,
          ownerUserGids: [],
          pageNum: 1
        });
        this.followerUserGids = ownerUserGids;
        this.ownerUserGids = [];
      }
    },
    open() {
      this.dropDown = true;
    },
    close() {
      this.dropDown = false;
    },
    searchAll(data) {
      // 从全部列表中进行筛选
      this.$refs.lesseeListBox.scrollTop = 0;
      this.$refs.swipe.swipeTo(data.lesseeStatus);
      this.$store.dispatch("listLessee", Object.assign(data, { pageNum: 1 }));

      let userId = JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID;

      // 在筛选组件回显 负责人 参与人的 值
      this.ownerUserGids = data.ownerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });
      this.followerUserGids = data.followerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });

      if (data.ownerUserGids.length != 0 && data.followerUserGids.length != 0) {
        this.$store.state.dealer.dropDownValue = 0;
      }
      if (this.$store.state.lessee.dropDownValue == 1) {
        if (
          !(
            data.ownerUserGids.length == 1 && data.ownerUserGids[0].id == userId
          )
        ) {
          this.$store.state.lessee.dropDownValue = 0;
        }
      }
      if (this.$store.state.lessee.dropDownValue == 2) {
        if (
          !(
            data.followerUserGids.length == 1 &&
            data.followerUserGids[0].id == userId
          )
        ) {
          this.$store.state.lessee.dropDownValue = 0;
        }
      }
    }
  }
};
</script>

<style scoped>
/* .LesseeList /deep/ .van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.LesseeList /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.LesseeList /deep/ .van-hairline--top-bottom::after,
.LesseeList /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.LesseeList /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.LesseeList /deep/ [class*="van-hairline"]::after {
  position: static;
}
.LesseeList /deep/ .van-tag {
  padding: 0 0.2em;
}

.LesseeList /deep/ .van-cell {
  display: flex;
  align-items: center;
}
.LesseeList /deep/ [class*="van-hairline"]::after {
  position: absolute;
}
.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 164, 0, 1) 0%,
    rgba(255, 205, 43, 1) 100%
  );
  color: #252525;
  line-height: 3rem;
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
.LesseeList /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.LesseeList /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.LesseeList /deep/ .van-dropdown-item__option--active,
.LesseeList /deep/ .van-dropdown-item__option--active .van-dropdown-item__icon {
  color: #ff9b02;
}
.LesseeList /deep/ .van-dropdown-item__option--active,
.LesseeList /deep/ .van-dropdown-item__option--active .van-dropdown-item__icon {
  color: #ff9b02;
}
.LesseeList /deep/ .van-hairline--top-bottom::after,
.LesseeList /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.last_child:last-child {
  border-bottom: 0px !important;
}
.LesseeList /deep/ .van-search {
  padding: 10px 0px;
}
.LesseeList /deep/ .van-search__action {
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
.LesseeList /deep/ .titleDropdown .van-dropdown-menu__item {
  z-index: 1;
}
.LesseeList /deep/ .titleDropdown .van-dropdown-menu__title {
  padding: 0 25px 0 0;
  color: #252525;
  line-height: normal;
}
.LesseeList /deep/ .titleDropdown .van-dropdown-menu__title .van-ellipsis {
  font-size: 1.286rem;
  font-weight: bold;
}
.icon_toggle {
  transition: 0.2s;
}
.icon_toggle.active {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.LesseeList
  /deep/
  .titleDropdown
  .van-dropdown-item__option.van-dropdown-item__option--active {
  color: #ff9b02;
}
.LesseeList /deep/ .titleDropdown .van-dropdown-item__option {
  /* justify-content: center; */
  text-align: center;
  color: #252525;
}
.LesseeList
  /deep/
  .titleDropdown
  .van-dropdown-item__option
  .van-cell__title
  span {
  font-size: 1.143rem;
}
.LesseeList
  /deep/
  .titleDropdown
  .van-dropdown-item__option--active
  .van-cell__value {
  flex: none;
}
.LesseeList /deep/ .titleDropdown .van-icon-success:before {
  display: none;
}
</style>