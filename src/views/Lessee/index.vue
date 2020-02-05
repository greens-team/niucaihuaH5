 <!-- 承租人列表页 -->
<template>
  <div class="LesseeList flex-1 flex flex-col">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-4 pr-4 flex" v-show="!searchBar" style="border-bottom:1px solid #f8f8f8;">
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <span class="text-center font-bold bar_title">承租人</span>
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

    <div class="flex items-center justify-start" style="border-bottom:1px solid #f8f8f8;">
      <div style="position:relative;margin-left: 1.286rem;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('listLessee',{orderType: num,pageNum:1})"
            v-model="$store.state.lessee.listParams.orderType"
            :options="$store.state.lessee.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="lesseeListBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('listLessee',{lesseeStatus: num,pageNum:1})"
        >
          <van-swipe-item v-for="(row,index) in $store.state.lessee.lesseeStatus" :key="index" class="bg-white">
            <div
              class="flex flex-col m-4 bg-white last_child"
              style="border-bottom:1px solid #f8f8f8;padding-bottom:1rem;"
              v-for="(r,i) in $store.state.lessee.list"
              :key="i"
              @click="goInfo(r.gid)"
            >
              <div class="flex items-center">
                <div class="w-12 h-12 text-center rounded-full mr-4 text-xl font-bold baseName">{{r.lesseeName.trim().substring(0,1).toUpperCase()}}</div>
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
      </div>
    </div>
    <!-- <div @click="$router.push('/LesseeInfo')">详情页</div> -->
  </div>
</template>

<script>
export default {
  name: "LesseeList",
  data() {
    return {
      searchBar: false,
      homeSearch: false
    };
  },
  created() {
    this.$store.commit("setInitParams");
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
      // console.log(this.$store.state.lessee.currentTabsIndex)
      this.$router.push({ name: "LesseeInfo", query: { id: id } });
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
  height: 4px;;
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
</style>