<template>
<div class="userDeptList flex-1 flex flex-col">
  <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600">
          <div
            slot="left"
            class="text-center"
            style="font-size:1.143rem;color:#1989fa;"
            @click="onClickLeft"
          >取消</div>
        </div>
      </div>
      <span class="text-center font-bold bar_title">选择同事</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div
          slot="right"
          class="text-center"
          style="font-size:1.143rem;color:#1989fa;"
          @click="onClickRight"
        >重置</div>
      </div>
    </div>

    <van-tabs
      v-model="active"
      title-active-color="#FF9B02"
      color="#FF9B02"
      @click="()=>{$refs.swipe.swipeTo(active)}"
    >
      <van-tab v-for="(tab,i) in tabs" :key="i" :title="tab.name" ></van-tab>
    </van-tabs>


    <div class="flex-1 relative">
      <div class="absolute inset-0" ref="colleagueListBox">
        <van-swipe ref="swipe" :loop="false" :show-indicators="false" @change="(num)=>{active=num}">
          <van-swipe-item v-for="(tab,i) in tabs" :key="i" class="pt-2 overflow-y-scroll" :ref="active == 1 ? 'colleagueListBox' : ''">

            <van-search v-show="tab.search" shape="round" :placeholder="'请输入搜索关键词'+tab.name" v-model="searchKeyword" />

            <van-checkbox-group v-model="tab.values" class="bg-white checkBoxGroup">
              <van-checkbox
                v-for="(row, i) in tab.data"
                :key="i"
                icon-size="16px"
                class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200"
                :name="row.value"
                @click="()=>tab.changeCheck(row, tab.values)"
              >{{row.lable}}</van-checkbox>
            </van-checkbox-group>

          </van-swipe-item>
        </van-swipe>
      </div>
    </div>


</div>
</template>

<script>
export default {
  props:[],
  name: 'UserDeptList',
  data () {
    let self = this
    return {
      tabs: [{
        name: "常用",
        search: false,
        data: [],
        values: [],
        url: 'getOftenuselist',
        getParams: () => {
          return {}
        },
        filterData: (data) => {
          return data.map(r => {
            return {
              lable: r.modelnName,
              value: r.type + '_' + r.modelnName + '_' + r.modelGid
            }
          })
        },
        changeCheck(row, values){
          let index = row.value.substr(0,1)
          if(values.includes(row.value)){
            self.tabs[index].values.splice(self.tabs[index].values.indexOf(row.value.substr(2)), 1)
          }else{
            self.tabs[index].values.push(row.value.substr(2))
          }
        }
      },{
        name: "同事",
        search: true,
        data: [],
        values: [],
        url: 'getColleague',
        getParams: (keyword) => {
          return {
            pageNum: 1,
            pageSize: 20,
            usrNM: '',
            rlNm: keyword
          }
        },
        filterData: (data) => {
          return data.map(r => {
            return {
              lable: r.refRlNm,
              value: r.refRlNm + '_' + r.id
            }
          })
        },
        changeCheck(row, values){
          if(values.includes(row.value)){
            self.tabs[0].values.includes('1_'+row.value) && self.tabs[0].values.splice(self.tabs[0].values.indexOf('1_' + row.value), 1)
          }else{
            self.tabs[0].data.some(r => {
              if(r.value == '1_'+row.value){
                self.tabs[0].values.push('1_'+row.value)
                return true
              }
            })
          }
        }
      },{
        name: "部门",
        search: false,
        data: [],
        values: [],
        url: 'getDept',
        getParams: (keyword) => {
          return {
            name: keyword,
            enabled: true
          }
        },
        filterData: (data) => {
          return data[0].children.map(r => {
            return {
              lable: r.name,
              value: r.name + '_' + r.id,
              children: r.children
            }
          })
        },
        changeCheck(row, values){
          if(values.includes(row.value)){
            self.tabs[0].values.includes('2_'+row.value) && self.tabs[0].values.splice(self.tabs[0].values.indexOf('2_' + row.value), 1)
          }else{
            self.tabs[0].data.some(r => {
              if(r.value == '2_'+row.value){
                self.tabs[0].values.push('2_'+row.value)
                return true
              }
            })
          }
        }
      }],
      active: '',
      searchKeyword: ''
    }
  },
  mounted () {
    this.active = 0
  },
  watch: {
    active(index){
      this.getTabsData(index)
    },
  },
  methods: {
    
    getTabsData(index){
      this.$store
        .dispatch(this.tabs[index].url, this.tabs[index].getParams(this.searchKeyword))
        .then((data) => {
          this.tabs[index].data = this.tabs[index].filterData ? this.tabs[index].filterData(data) : data
        })
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.$route.params.type == "briefing") {
        this.$store.commit("setBriefingColleagues", {
          userGids: [],
          deptGids: [],
          userType: 0
        });
      }
      if (this.$route.params.type == "task") {
        this.$store.commit("setTaskColleagues", {
          userGids: [],
          deptGids: [],
          userType: 1
        });
      }
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

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

.userDeptList /deep/ .van-swipe{
  height: 100%;
}

</style>