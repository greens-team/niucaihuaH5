 <!-- 联系人列表页 -->
<template>
  <div class="ListContacts">

    <div class="flex flex-col">
      <div class="flex-1 items-center pl-3 pr-3 flex border-b border-gray-200" v-show="!searchBar">
        <div class="flex-1 flex">
          <div @click="$router.go(-1)" class="flex  text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600" >
            <van-icon  class="" name="arrow-left" />
            <span>返回</span>
          </div>
        </div>
        <div class="flex-1 text-center text-lg font-medium pt-2">联系人</div>
        <div class="flex-1 items-center flex text-xl">
          <div class="flex-1"></div>
          <van-icon name="search"  @click="searchBar = true" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600" />
          <van-icon name="plus" slot="right" class="pt-5 pb-4 pl-1 pr-1 hover:text-blue-600"/>
        </div>
      </div>
      <div v-show="searchBar" :class="['flex items-center pl-3 pr-3 flex border-b border-gray-200', {'pr-0': homeSearch }]">
        <div v-if="homeSearch" @click="$router.go(-1)" class="flex  text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600" >
          <van-icon  class="" name="arrow-left" />
          <span>返回</span>
        </div>
        <van-search
          class="flex-1"
          v-model="$store.state.contacts.listContactsParams.queryString"
          placeholder="请输入搜索关键词"
          @input="(keyword)=>$store.dispatch('listContacts',{queryString: keyword})"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div v-else slot="action"  @click="searchBar = false; $store.dispatch('listContacts',{queryString: ''})">取消</div>
        </van-search>
      </div>
    </div>


    <div class="border-b border-gray-200 flex pl-5">
      <van-dropdown-menu>
        <van-dropdown-item 
          @change="(num)=>$store.dispatch('listContacts',{orderType: num})" 
          v-model="$store.state.contacts.listContactsParams.orderType" 
          :options="$store.state.contacts.orderType" />
      </van-dropdown-menu>
    </div>

    <div 
      v-for="(r,i) in $store.state.contacts.listContacts" :key="i" 
      class="p-2 border-b border-gray-200 flex ml-5 mr-5 items-center"
      @click="$router.push({name:'ContactsInfo',query:{gid:r.gid}})">
        <div class="circleBg font-bold mr-3">M</div>
        <div class="text-sm">{{r.contactsName}}</div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'ListContacts',
  data() {
    return {
      searchBar: false,
      homeSearch: false
    }
  },
  mounted() {
    this.$store.dispatch('listContacts')
  },
  methods: {
  }
}
</script>

<style scoped>
.circleBg{
  background-image: linear-gradient(160deg, #ffce00 20%, #ff8b00 80%);
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  text-align: center;
  line-height: 2rem;
  color: white;
}
</style>