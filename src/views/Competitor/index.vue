<!-- 竞争对手列表页 -->
<template>
  <div class="CompetitorList flex-1 flex flex-col">
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

        <div class="titleDropdown" style="position:relative;">
          <van-dropdown-menu>
            <van-dropdown-item
              @change="getDiffList"
              @open="open"
              @close="close"
              v-model="$store.state.competitor.dropDownValue"
              :options="$store.state.competitor.dropDownType"
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
            v-show="$root.checkRole('COMPETITOR_CREATE')"
            class="bar_icon plus_icon"
            @click="$store.commit('setInitAddParams');$router.push('/CreateCompetitor')"
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
          v-model="$store.state.competitor.listParams.queryString"
          @input="(keyword)=>$store.dispatch('listCompetitor',{queryString: keyword,pageNum: 1})"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false;$store.dispatch('listCompetitor',{queryString: '', pageNum: 1})"
          >取消</div>
        </van-search>
      </div>
    </div>
    <van-tabs
      v-model="$store.state.competitor.listParams.competorType"
      @click="$refs.swipe.swipeTo($store.state.competitor.listParams.competorType)"
    >
      <van-tab
        v-for="(row,index) in $store.state.competitor.competorType"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>

    <div class="flex items-center justify-around" style="border-bottom:1px solid #f8f8f8;">
      <div style="position:relative;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('listCompetitor',{orderType: num,pageNum:1})"
            v-model="$store.state.competitor.listParams.orderType"
            :options="$store.state.competitor.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>

      <Screening
        @onSearch="searchAll"
        :competorTypeValue="$store.state.competitor.listParams.competorType"
      />
    </div>

    <div class="flex-1 relative h-full competitorList">
      <div class="absolute inset-0 overflow-y-scroll" ref="competitorListBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listCompetitor',{competorType: num,pageNum:1})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.competitor.competorType" :key="index">
            <div
              class="flex flex-col m-4 bg-white last_child"
              style="border-bottom:1px solid #f8f8f8;padding-bottom:1rem;"
              v-for="(r,i) in $store.state.competitor.list"
              :key="i"
              @click="getInfo(r.gid)"
            >
              <van-cell is-link>
                <template slot="title">
                  <p class="custom-title text-lg font-bold">{{r.competorName}}</p>
                  <p
                    class="text-gray-800"
                  >{{$store.state.competitor.competorStatus_1[r.competorType-1]}}</p>
                </template>
              </van-cell>
            </div>
          </van-swipe-item>
        </van-swipe>
        <p v-if="isShowData" class="text-center mt-10" style="color:#80848d">没有筛选到相关的数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import Screening from "@/components/Screening/competitorSrceen";
export default {
  name: "CompetitorList",
  components: {
    Screening
  },
  data() {
    return {
      searchBar: false,
      homeSearch: false,
      dropDown: false,
      isShowData: false
    };
  },

  watch: {
    "$store.state.competitor.dropDownValue"() {
      this.$refs.competitorListBox.scrollTop = 0;
    }
  },
  created() {
    // 如果是全部经销商 清空参数值
    if (this.$store.state.competitor.dropDownValue == 0) {
      this.$store.commit("setInitParams");
    }
    // this.$store.commit("setInitParams");
  },
  mounted() {
    this.scrollLoad(this.$refs.competitorListBox, resolve => {
      this.$store
        .dispatch("listCompetitor", {
          pageNum: this.$store.state.competitor.listParams.pageNum + 1
        })
        .then(msg => {
          resolve(msg);
        });
    });
    this.$store.dispatch("listCompetitor", { pageNum: 1 });
  },
  methods: {
    getDiffList(value) {
      let userInfo = JSON.parse(sessionStorage.userInfo);
      let ownerUserGids = [];

      ownerUserGids = [
        {
          id: userInfo.EMPLOYEE_ID,
          refRlNm: userInfo.EMPLOYEE_NAME
        }
      ];
      this.$store.commit("setInitParams");

      if (value == 0) {
        // 全部
        this.$store.dispatch("listCompetitor", {
          followerUserGids: [],
          ownerUserGids: [],
          pageNum: 1
        });
      }
      if (value == 1) {
        // 我负责的
        this.$store.dispatch("listCompetitor", {
          followerUserGids: [],
          ownerUserGids: ownerUserGids,
          pageNum: 1
        });
      }
      if (value == 2) {
        // 我参与的
        this.$store.dispatch("listCompetitor", {
          followerUserGids: ownerUserGids,
          ownerUserGids: [],
          pageNum: 1
        });
      }
    },
    open() {
      this.dropDown = true;
    },
    close() {
      this.dropDown = false;
    },
    getInfo(id) {
      this.$store.state.competitor.currentTabsIndex = 0;
      this.$router.push({ name: "CompetitorInfo", query: { id: id } });
    },
    searchAll(data) {
      // 从全部列表中进行筛选
      this.$store.commit("setInitParams");
      this.$store.state.competitor.dropDownValue = 0;
      this.$refs.competitorListBox.scrollTop = 0;
      this.$store
        .dispatch("listCompetitor", Object.assign(data, { pageNum: 1 }))
        .then(res => {
          if (res.length) {
            this.isShowData = false;
          } else {
            this.isShowData = true;
          }
        });
    }
  }
};
</script>

<style scoped>
/* .CompetitorList /deep/ .van-tabs__line {
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  height: 6px;
} */
.CompetitorList /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.CompetitorList /deep/ .van-hairline--top-bottom::after,
.CompetitorList /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.CompetitorList /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.CompetitorList /deep/ [class*="van-hairline"]::after {
  position: static;
}
.CompetitorList /deep/ .van-tag {
  padding: 0 0.2em;
}

.CompetitorList /deep/ .van-cell {
  display: flex;
  align-items: center;
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
.CompetitorList /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.CompetitorList /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.CompetitorList /deep/ .van-dropdown-item__option--active,
.CompetitorList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.CompetitorList /deep/ .van-dropdown-item__option--active,
.CompetitorList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.competitorList /deep/ .van-cell {
  padding: 0;
}
.last_child:last-child {
  border-bottom: 0px !important;
}
.CompetitorList /deep/ .van-search {
  padding: 10px 0px;
}
.CompetitorList /deep/ .van-search__action {
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
.CompetitorList /deep/ .titleDropdown .van-dropdown-menu__title {
  padding: 0 25px 0 0;
  color: #252525;
  line-height: normal;
}
.CompetitorList /deep/ .titleDropdown .van-dropdown-menu__title .van-ellipsis {
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
.CompetitorList
  /deep/
  .titleDropdown
  .van-dropdown-item__option.van-dropdown-item__option--active {
  color: #ff9b02;
}
.CompetitorList /deep/ .titleDropdown .van-dropdown-item__option {
  /* justify-content: center; */
  text-align: center;
  color: #252525;
}
.CompetitorList
  /deep/
  .titleDropdown
  .van-dropdown-item__option
  .van-cell__title
  span {
  font-size: 1.143rem;
}
.CompetitorList
  /deep/
  .titleDropdown
  .van-dropdown-item__option--active
  .van-cell__value {
  flex: none;
}
.CompetitorList /deep/ .titleDropdown .van-icon-success:before {
  display: none;
}
</style>