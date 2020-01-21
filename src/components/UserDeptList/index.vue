<template>
<div class="userDeptList flex-1 flex flex-col fixed inset-0 z-50">
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
          v-if="tabs.length === 3"
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


    <div class="flex-1 relative bg-white topB" >
      <div class="absolute inset-0" >
        <van-swipe ref="swipe" :loop="false" :show-indicators="false" @change="(num)=>{active=num}">
          <van-swipe-item v-for="(tab,i) in tabs" :key="i" class="pt-2  overflow-y-scroll colleagueListBox">
            <van-search v-show="tab.search" class="-mt-2" shape="round" :placeholder="'请输入搜索关键词'+tab.name" v-model="searchKeyword" />

            <!-- 面包屑 -->
            <div v-if="tab.tree && tab.data.length > 1" class="flex ml-5 mr-5 border-b border-gray-200 pb-2">
              <div v-for="(row,i) in tab.data" :key="i" class="text-blue-600">
                <span class="text-xs pl-1 pr-1 text-gray-500" v-if="i">></span>
                <span @click="tab.data.splice(i+1,tab.data.length)" :class="['text-sm',{'text-gray-500': i == tab.data.length-1}]">{{row.lable}}</span>
              </div>
            </div>

            <van-checkbox-group v-model="tab.values" :class="['bg-white checkBoxGroup', {treeImg: tab.tree}]">
              <van-checkbox
                v-for="(row, i) in (tab.tree && tab.data.length ? tab.data[tab.data.length - 1]['children'] : tab.data)"
                :key="i"
                icon-size="16px"
                class="ml-5 mr-5 pt-3 pb-3 border-b border-gray-200"
                :name="row.value"
                @click="()=>tab.changeCheck(row, tab.values)"
              >
                <div v-if="tab.tree" class="w-full flex items-center">
                  <div class="flex-1">{{row.lable}}</div>
                  <div v-if="row.children && row.children.length">
                    <div v-if="tab.values.includes(row.value)" class="flex items-center" @click="nextLevel">
                      <img width="15px" src="../../assets/workbench/nextLevel1.png" alt="下级" />
                      <span class="text-sm" :style="{'color': '#cccc'}">下级</span>
                    </div>
                    <div v-else @click="(e)=>{tab.data.push(row);nextLevel(e, tab.data);}" class="flex items-center" >
                      <img width="15px" src="../../assets/workbench/nextLevel2.png" alt="下级" />
                      <span class="text-sm text-blue-500">下级</span>
                    </div>
                  </div>
                </div>
                <div v-else>{{row.lable}}</div>
              </van-checkbox>
            </van-checkbox-group>
			
			

          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="bg-gray-100 p-1 pl-5 flex items-center">
      <div>已选择：</div>
      <div class="ellipsis flex-1 pr-2" v-if="[].concat.apply([],tabs.filter((r,i)=>i && r).map(r=>r.values)).length">{{[].concat.apply([],tabs.filter((r,i)=>i && r).map(r=>r.values)).map(r=>r.split('_')[0]).toString()}}</div>
      <div class="flex-1 text-gray-500" v-else>无</div>
      <van-icon @click="showResults=true" v-if="[].concat.apply([],tabs.filter((r,i)=>i && r).map(r=>r.values)).length" name="arrow-up" class="text-orange-400 pr-2" style="font-weight: 600;" />
      <div class="sendBtn ml-2" @click="getResults" style="width: 60px; padding: 12px;">确定</div>
    </div>


    <van-popup
      v-model="showResults"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-nav-bar
        title="已选择"
        left-text="取消"
        right-text="确定"
        @click-left="showResults=false"
        @click-right="showResults=false"
      />
      <div class="absolute inset-0 overflow-y-scroll" style="top:46px;">
        <template v-if="tabs[2] && tabs[2].tree">
          <div v-for="(row, i) in tabs[2].values" :key="'a'+i">
            <div class="flex items-center pt-3 pb-3 ml-5 mr-5 border-b border-gray-200">
              <img width="20" src="../../assets/workbench/deptIcon.png" />
              <div class="flex-1 ml-2">
                {{row.split('_')[0]}}
              </div> 
              <img @click="deleteRow(2,i)" width="18" src="../../assets/workbench/deleteIcon.png" />
            </div>
          </div>
        </template>
        <div v-for="(row, i) in tabs[1].values" :key="'b'+i">
          <div class="flex items-center pt-3 pb-3 ml-5 mr-5 border-b border-gray-200">
            <img width="20" src="../../assets/workbench/memberIcon.png" />
            <div class="flex-1 ml-2">
              {{row.split('_')[0]}}
            </div>
            <img @click="deleteRow(1,i)" width="18" src="../../assets/workbench/deleteIcon.png" />
          </div>
        </div>
      </div>
    </van-popup>


</div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    memberList: {
      type: Array,
      default: ()=>[]
    },
    deptList: {
      type: Array,
      default: ()=>[]
    },
    deptTree: {
      type: Boolean,
      default: true
    }
  },
  name: 'UserDeptList',
  data () {
    let self = this
    return {
      showResults: false,
      tabs: [
        {
        name: "常用",
        search: false,
        data: [],
        values: [],
        url: 'getOftenuselist',
        getParams: () => {
          return {}
        },
        filterData: (data) => {
          // 如果tabs长度为2时，只处理常用的同事，不处理常用部门
          if(this.tabs.length == 2){
            data = data.filter(r=>{
              return r.type === 1
            })
          }
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
      },
      {
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
      },
      {
        name: "部门",
        search: true,
        tree: true,
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
          let eachmap = (data)=>{
            return data.map(r => {
              let res = {children: []}
              if(r.children){
                res.children = eachmap(r.children)
              }
              res.lable = r.name;
              res.value = r.name + '_' + r.id;
              return res
            })
          }
          data = eachmap(data)
          return data
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
      }
      ],
      active: '',
      searchKeyword: '',
      colleagueLastPage: false,
      getColleaguePageNum: 1,
    }
  },
  mounted () {

    console.log(this.memberList, 88996)

    // 是否对部门进行处理
    !this.deptTree && this.tabs.splice(2,1)

    this.active = 0

    this.tabs[1].values = Object.assign([],this.memberList)

    
    this.memberList.map(r=>{
      this.tabs[0].values.push('1_'+r)
    })

    if(this.tabs.length == 3){
      this.tabs[2].values = Object.assign([],this.deptList)
      this.deptList.map(r=>{
        this.tabs[0].values.push('2_'+r)
      })
    }

  },
  watch: {
    searchKeyword(){
      this.getTabsData(this.active)
    },
    active(index){
      this.searchKeyword = ''
      this.getColleaguePageNum = 1;
      this.getTabsData(index)
      // 同事列表滚动加载
      document.getElementsByClassName('colleagueListBox')[index].scrollTop = 0
      this.scrollLoadData(document.getElementsByClassName('colleagueListBox')[1], resolve => {
        if (!this.colleagueLastPage) {
          this.getColleaguePageNum++;
          this.colleagueLastPage = true;
          this.$store
            .dispatch(this.tabs[index].url, 
              Object.assign(
                this.tabs[index].getParams(this.searchKeyword), 
                {pageNum: this.getColleaguePageNum, pageSize: 20},
              )
            )
            .then(data => {
              !data && (data = [])
              this.tabs[index].data = this.tabs[index].data.concat(this.tabs[index].filterData ? this.tabs[index].filterData(data) : data)
              this.colleagueLastPage = false;
              resolve();
            });
        } else {
          resolve();
        }
      });
    },
  },
  methods: {
    deleteRow(rowIndex, index){
      let resIndex = this.tabs[0].values.indexOf(rowIndex+'_'+this.tabs[rowIndex].values[index])
      resIndex > -1 && (this.tabs[0].values.splice(resIndex, 1))
      this.tabs[rowIndex].values.splice(index,1)
    },
    scrollLoadData (domBox, callback, positionCallback = false) {
      let isSend = false
      domBox.onscroll = function () {
        console.log(domBox.scrollTop)
        positionCallback && positionCallback(domBox.scrollTop)

        if (domBox.scrollTop > domBox.scrollHeight - domBox.clientHeight - 10 && !isSend) {
          isSend = true
          new Promise(resolve => {
            callback(resolve)
          }).then(() => {
            isSend = false
          })
        }
      }
    },
    
    getTabsData(index){
      let params = this.tabs[index].getParams(this.searchKeyword)
      params.pageNum && (params.pageNum = 1)
      this.$store
        .dispatch(this.tabs[index].url, params)
        .then((data) => {
          this.tabs[index].data = this.tabs[index].filterData ? this.tabs[index].filterData(data) : data
        })
    },

    onClickLeft() {
      this.$emit('cancel')
    },
    onClickRight() {
      // if (this.$route.params.type == "briefing") {
      //   this.$store.commit("setBriefingColleagues", {
      //     userGids: [],
      //     deptGids: [],
      //     userType: 0
      //   });
      // }
      // if (this.$route.params.type == "task") {
      //   this.$store.commit("setTaskColleagues", {
      //     userGids: [],
      //     deptGids: [],
      //     userType: 1
      //   });
      // }
      this.$emit('reset')
    },
    nextLevel(e, data = []){
      e.stopPropagation()
      console.log(data, 1111)
    },
    getResults(){
      this.$emit('confirm',this.tabs[1].values, this.tabs[2] ? this.tabs[2].values : [])
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


.treeImg /deep/ .van-checkbox__label{width: 100%; padding-right: 5px;}

.ellipsis{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.userDeptList /deep/ .van-nav-bar__text{
  color: #ff9b02;
}

.userDeptList /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width: 1px 0;
}

</style>