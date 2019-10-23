/**
 * index.vue           工作台模块首页
 * Colleague.vue       选择同事及组织页面
 * RecentVisit.vue     最近访问
 * WorkbenchSearch.vue 工作台搜索页面
 */

<!-- 工作台模块首页 -->
<template>
  <div class="Workbench bg-gray-100 overflow-hidden">

    <!-- 搜索 -->
    <div class="flex items-center pr-3 pl-3">
      <i class="iconfont icontixing" style="font-size: 20px;"></i>
      <van-search @focus="$router.push('/WorkbenchSearch')" class="flex-1 -ml-1 -mr-1" background="inherit" placeholder="请输入搜索内容" shape="round" />
      <i @click="logout" class="iconfont icongongzuotai-tupianshangchuan-guanbi" style="font-size:20px;"></i>
    </div>

    <!-- 销售简报 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 p-2 rounded-lg shadow">
      
      <div class="flex p-1 items-center justify-center">
        <div class="font-bold">销售简报</div>
        <div class="flex-1"></div>
        <div class="text-xs text-gray-600 hover:text-blue-500" @click="$router.push('/Colleague')">
          <i class="iconfont iconwo" style="font-size: 0.6rem"></i>
          选择同事
        </div>
        <div class="text-xs text-gray-600 pl-2 pr-2"> | </div>
        <!-- $root.moment(formatterSalesKitDate).format('YYYY-MM-DD') -->
        <div class="flex items-center justify-center text-gray-600 hover:text-blue-500" @click="$router.push({name:'DateRange', params: briefingDate})">
          <i class="iconfont iconcalendar mr-1"></i>
          <div v-if="briefingDate.text" class="text-xs ">{{briefingDate.text}}</div>
          <div v-else style="font-size:.5rem; line-height:.8rem;">
            {{$root.moment(briefingDate.startTime).format('YYYY-MM-DD')}}<br />
            {{$root.moment(briefingDate.endTime).format('YYYY-MM-DD')}}
          </div>
        </div>
        
      </div>
      
      <div class="flex p-1 pt-2 justify-between">
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addDealerCount}}</span>个<br />
          新增经销商
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addContactsCount}}</span>个<br />
          新增联系人
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addVisitCount}}</span>个<br />
          新增经拜访
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.dealerChangeStateCount}}</span>个<br />
          阶段变化经销商
        </div>
      </div>
    </div>

    <!-- <van-uploader :after-read="afterRead" /> -->

    <!-- 快速入口 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 p-2 rounded-lg shadow">
      
      <div class="flex p-1">
        <div class="font-bold">快速入口</div>
      </div>
      
      <div class="flex p-1 pt-2 justify-between">
        <div class="text-center text-gray-800" @click="$router.push('/DealerManage')">
          <img src="../../assets/workbench/icon1.png" alt="" class="w-10 m-auto mb-1">
          <div class="text-sm">经销商管理</div>
        </div>
        <div class="text-center text-gray-800" @click="$router.push('/RecentVisit')">
          <img src="../../assets/workbench/icon2.png" alt="" class="w-10 m-auto mb-1">
          <div class="text-sm">新建拜访</div>
        </div>
        <div class="text-center text-gray-800" @click="$router.push('/RecentVisit')">
          <img src="../../assets/workbench/icon3.png" alt="" class="w-10 m-auto mb-1">
          <div class="text-sm">新建任务</div>
        </div>
        <div class="text-center text-gray-800" @click="$router.push('/RecentVisit')">
          <img src="../../assets/workbench/icon4.png" alt="" class="w-10 m-auto mb-1">
          <div class="text-sm">最近访问</div>
        </div>
      </div>
    </div>

    <!-- 我的任务 同事任务 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 pt-2 pb-2 rounded-lg shadow">
      <div class="flex p-1 border-b border-gray-200 pl-2 pr-2">
        <div :class="['font-bold text-gray-600 tabCustomize flex flex-col justify-center items-center cursor-pointer', {tabActive: !currentTaskStatus}]" @click="currentTaskStatus=0;">我的任务</div>
        <div :class="['font-bold relative ml-4 text-gray-600 tabCustomize flex flex-col justify-center items-center cursor-pointer', {tabActive: currentTaskStatus}]"  @click="currentTaskStatus=1;">
          同事任务
          <div  class="absolute" style="top: 0.1rem; right:-1.3rem">
            <van-icon name="arrow-down" />
          </div>
        </div>
        <div class="flex-1"></div>
        <van-icon size="20px" name="plus" @click="$router.push('/RecentVisit')"/>
      </div>

      <!-- 我的任务列表 -->
      <div v-if="!currentTaskStatus">
        
        <div class="flex mt-2 justify-center items-center  pl-2 pr-2">
          <div class="text-sm text-gray-700 flex justify-center items-center" @click="taskDateBox= true;">
            <i class="iconfont iconcalendar mr-1"></i>{{$root.moment(myTaskTime).format('YYYY-MM-DD')}}
          </div>
          <div class="flex-1"></div>
          <!-- <div class="text-xs text-gray-600 hover:text-blue-500" @click="$router.push('/Colleague')">
            <i class="iconfont iconwo" style="font-size: 0.6rem"></i>
            选择同事
          </div> -->
        </div>

        <div class="text-gray-500 text-xs mt-3 border-t border-gray-100  p-2">
          已完成：3
          <span class="pl-3 text-xs">未完成：3</span>
        </div>


        <div class="flex flex-col p-2 relative rowBox" v-for="(row, i) in myTaskList" :key="'t'+i">
          <div class="flex">
            <span class="text-base font-bold text-gray-900">{{visitAim[row.visitAim]}}</span>
            <div class="flex-1"></div>
            <span class="text-xs  text-gray-600">{{$root.moment(row.taskTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <span class="text-base  text-gray-900">{{row.dealerName}}</span>
          <div class="text-sm text-gray-600 mt-1">{{row.deptName}} > {{row.positionName}} > {{row.userName}}</div>
          <img v-show="row.isFinish" class="absolute bottom-0 right-0 mr-2 w-16" src="../../assets/workbench/icon5.png" alt="">
        </div>

      </div>

      <!-- 同事任务列表 -->
      <div v-else>
        
        <div class="flex mt-2 justify-center items-center pl-2 pr-2">
          <div class="text-sm text-gray-700 flex justify-center items-center" @click="taskDateBox= true;">
            <i class="iconfont iconcalendar mr-1"></i>{{$root.moment(colleaguesTaskTime).format('YYYY-MM-DD')}}
          </div>
          <div class="flex-1"></div>
          <div class="text-xs text-gray-600 hover:text-blue-500" @click="$router.push('/Colleague')">
            <i class="iconfont iconwo" style="font-size: 0.6rem"></i>
            选择同事
          </div>
        </div>

        <div class="text-gray-500 text-xs mt-3 border-t border-gray-100 p-2">
          已完成：3
          <span class="pl-3 text-xs">未完成：3</span>
        </div>


        <div class="flex flex-col p-2 relative rowBox" v-for="(row, i) in colleaguesTaskList" :key="'c'+i">
          <div class="flex">
            <span class="text-base font-bold text-gray-900">{{visitAim[row.visitAim]}}</span>
            <div class="flex-1"></div>
            <span class="text-xs  text-gray-600">{{$root.moment(row.taskTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <span class="text-base  text-gray-900">{{row.dealerName}}</span>
          <div class="text-sm text-gray-600 mt-1">{{row.deptName}} > {{row.positionName}} > {{row.userName}}</div>
          <img v-show="row.isFinish" class="absolute bottom-0 right-0 mr-2 w-16" src="../../assets/workbench/icon5.png" alt="">
        </div>


      </div>


      
      
    </div>


    <van-popup
      v-model="taskDateBox"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        title="请选择时间"
        :formatter="formatter"
        v-model="taskTime"
        type="date"
        @confirm="confirmTaskTime"
        @cancel="taskDateBox=false"
      />
    </van-popup>



  </div>
</template>

<script>
export default {
  name: 'Workbench',
  data() {
    return {
      taskDateBox: false,
      taskTime: new Date(this.$root.moment().format('YYYY-MM-DD')),
      myTaskTime: new Date(this.$root.moment().format('YYYY-MM-DD')), // 我的任务时间
      colleaguesTaskTime: new Date(this.$root.moment().format('YYYY-MM-DD')), // 同事任务时间
      
      briefingDate: {
        text: '本月',
        startTime: this.$root.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.$root.moment().format('YYYY-MM-DD HH:mm:ss')
      },
      // 请求参数
      params: {
        userType: 0,
        startTime: '2019-05-23',
        endTime: '2019-05-28',
        userGids: [
          "1111",
          "33333"
        ],
        deptGids: [
          "444433",
          "3332"
        ],
        pageNum: 1,
        pageSize: 20
      },
      // 简报信息
      briefing: {
        addDealerCount: 0,
        addContactsCount: 0,
        addVisitCount: 0,
        dealerChangeStateCount: 0
      },
      currentTaskStatus: 0,

      myTaskList:[],
      colleaguesTaskList:[],
      
      visitAim:['客情维护','首次拜访','沟通需求','签单','贷后跟进'],
    }
  },
  mounted(){
    if(localStorage.briefingDate){
      this.briefingDate =  JSON.parse(localStorage.briefingDate);
    }
    this.getBriefing()
    this.getTaskList()
  },
  watch: {
    currentTaskStatus(){
      // if(num){
      this.getTaskList()
      // }
    }
  },
  methods: {
    // 确定任务时间
    confirmTaskTime(){
      // 拼接请求参数
      // this.taskTime  任务时间
      // currentTaskStatus 任务类型 0我的任务 1同事任务
      // myTaskTime colleaguesTaskTime

      // 重新请求任务列表

      this.taskDateBox = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return `${value}日`;
    },
    // 获取任务列表
    getTaskList(){
      this.$ajax.workbench.taskList(this.params).then(res => {
        if(!res.code){
          this.currentTaskStatus ? (this.colleaguesTaskList = res.data.list) : (this.myTaskList = res.data.list)
        }
      })
    },
    // 获取简报信息
    getBriefing() {
      this.$ajax.workbench.getBriefing(this.params).then(res => {
        if(!res.code){
          this.briefing = res.data
        }
      })
    },
    logout(){
      this.$store.commit('setLoginState', false)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>
.Workbench{
  padding-bottom: 1000px;
  margin-bottom: -1000px;
}
.Workbench .van-search__content{
  background-color: #fff;
}
.tabCustomize::after{
  display: flex;
  width: 60%;
  border-bottom: 5px solid #fff;
  transform:scaleY(0.5);
  content:'';
}
.tabActive{
  color: #000;
}
.tabActive::after{
    border-bottom: 5px solid #FF9B02;
}
.rowBox:active{
  background-color: #f2f3f5;
}
</style>