 <!-- 联系人列表页 -->
<template>
  <div class="ListContacts flex-1 flex flex-col">
    <div class="flex flex-col">
      <div class="flex-1 items-center flex pl-4 pr-4" style="border-bottom:1px solid #f8f8f8;" v-show="!searchBar">
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <div class="flex-1 text-center font-bold bar_title">联系人</div>
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
            v-show="$root.checkRole('CONTACTS_CREATE')" 
            class="bar_icon plus_icon"
            @click="$store.commit('setCreateContactsParamsEmpty');$router.push('/CreateContacts')"
            src="../../assets/topBarIcon/add_icon.png"
            alt="添加"
          />
        </div>
      </div>
      <div v-show="searchBar" :class="['flex items-center pl-4 pr-4 flex', {'pr-0': homeSearch }]">
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
          v-model="$store.state.contacts.listContactsParams.queryString"
          placeholder="请输入搜索关键词"
          @input="(keyword)=>$store.dispatch('listContacts',{queryString: keyword,pageNum: 1})"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false; $store.dispatch('listContacts',{queryString: '',pageNum: 1})"
          >取消</div>
        </van-search>
      </div>
    </div>

    <div class="flex pl-5" style="border-bottom:1px solid #f8f8f8;">
      <div style="position:relative;margin-left: 1.286rem;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('listContacts',{orderType: num,pageNum:1})"
            v-model="$store.state.contacts.listContactsParams.orderType"
            :options="$store.state.contacts.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
    </div>
    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="contactsListBox">
        <div>
          <div
            v-for="(r,i) in $store.state.contacts.listContacts"
            :key="i"
            class="flex m-4  items-center last_child"
            style="border-bottom:1px solid #f8f8f8;padding-bottom:1rem;"
            @click="$store.state.contacts.currentTabsIndex = 0;$router.push({name:'ContactsInfo',query:{gid:r.gid}})"
          >
            <div class="circleBg font-bold mr-4 text-xl">{{r.contactsName.trim().substring(0,1).toUpperCase()}}</div>
            <div class="text-base contactsDetail font-bold">{{r.contactsName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListContacts",
  data() {
    return {
      searchBar: false,
      homeSearch: false,
      firstName:''
    };
  },

  created() {
    this.$store.commit("setInitParams");
  },
  mounted() {
    this.scrollLoad(this.$refs.contactsListBox, resolve => {
      this.$store
        .dispatch("listContacts", {
          pageNum: this.$store.state.contacts.listContactsParams.pageNum + 1
        })
        .then(msg => {
          resolve(msg);
        });
    });
    this.$store.dispatch("listContacts", { pageNum: 1 });
  },

  methods: {}
};
</script>

<style scoped>
/* .circleBg {
  background: linear-gradient(
    245deg,
    rgba(255, 191, 42, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 3rem;
  color: #252525;
} */

.circleBg {
  background: linear-gradient(
    245deg,
    rgba(255, 164, 0, 1) 0%,
    rgba(255, 205, 43, 1) 100%
  );
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 3rem;
  color: #252525;
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
.ListContacts /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.ListContacts /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.ListContacts /deep/ .van-dropdown-item__option--active,
.ListContacts
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.ListContacts /deep/ .van-dropdown-item__option--active,
.ListContacts
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.ListContacts /deep/ .van-hairline--top-bottom::after,
.ListContacts /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.contactsDetail {
  width: 80%;
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
}
.last_child:last-child {
  border-bottom: 0px !important;
}
.ListContacts /deep/ .van-search {
  padding: 10px 0px;
}
.ListContacts /deep/ .van-search__action {
  padding: 0 0 0 8px;
}
</style>