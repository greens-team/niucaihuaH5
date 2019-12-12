/**
 * index.vue           工作台模块首页
 * Colleague.vue       选择同事及组织页面
 * RecentVisit.vue     最近访问
 * WorkbenchSearch.vue 工作台搜索页面
 */

<!-- 工作台模块首页 -->
<template>
  <div class="Workbench bg-white overflow-hidden">
    <!-- 搜索 -->
    <div class="flex items-center pr-3 pl-3">
      <!-- <i class="iconfont icontixing" style="font-size: 20px;"></i> -->
      <!-- <van-search @focus="$router.push({name:'DealerManage',query:{search:true}})" class="flex-1 -ml-1 -mr-1" background="inherit" placeholder="请输入搜索内容" shape="round" /> -->
      <van-search
        @focus="goWorkbenchSearch"
        class="flex-1 -ml-1 -mr-1"
        background="inherit"
        placeholder="请输入搜索内容"
        shape="round"
      />
      <i
        @click="logout"
        class="iconfont icongongzuotai-tupianshangchuan-guanbi"
        style="font-size:20px;"
      ></i>
    </div>

    <!-- 销售简报 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 p-2 rounded-lg shadowaa">
      <div class="flex p-1 items-center justify-center">
        <div class="font-bold" style="font-size:1.143rem;">销售简报</div>
        <div class="flex-1"></div>
        <div
          class="flex items-center text-base text-gray-600 hover:text-blue-500 ellipsis"
          @click="$router.push({name:'Colleague', params: Object.assign({},$store.state.workbench.briefingColleagues,{type: 'briefing'})})"
        >
          <img
            style="display:inline-block;width:1.286rem;height:1.286rem;"
            src="../../assets/workbench/my.png"
            alt
          />
          <!-- <i class="iconfont iconwo" style="font-size: 0.6rem"></i> -->
          <span
            v-if="$store.state.workbench.briefingColleagues.userGids.concat($store.state.workbench.briefingColleagues.deptGids).toString()"
            class="text-xs"
            style="color: #80848D;"
          >
            <span
              class="text-xs"
              v-for="(r,i) in $store.state.workbench.briefingColleagues.userGids"
              :key="i"
            >
              <span v-if="i">,</span>
              {{r.split(',')[0]}}
            </span>
            <span
              class="text-xs"
              v-for="(r,i) in $store.state.workbench.briefingColleagues.deptGids"
              :key="'a'+i"
            >
              <span v-if="!i && $store.state.workbench.briefingColleagues.userGids.length">,</span>
              <span v-if="i">,</span>
              {{r.split(',')[0]}}
            </span>
          </span>
          <span v-else class="text-xs" style="color: #80848D;">选择同事</span>
        </div>
        <div class="text-xs pl-2 pr-2" style="color: #80848D;">|</div>
        <!-- $root.moment(formatterSalesKitDate).format('YYYY-MM-DD') -->
        <div
          class="flex items-center justify-center hover:text-blue-500"
          style="color: #80848D;"
          @click="$router.push({name:'DateRange', params: $store.state.workbench.briefingDate})"
        >
          <!-- <i class="iconfont iconcalendar mr-1"></i> -->
          <img
            style="display:inline-block;width:1.286rem;height:1.286rem;"
            src="../../assets/workbench/calendar.png"
            alt
          />
          <div
            v-if="$store.state.workbench.briefingDate.text"
            class="text-xs"
          >{{$store.state.workbench.briefingDate.text}}</div>
          <div v-else style="font-size:.5rem; line-height:.8rem;">
            {{$root.moment($store.state.workbench.briefingDate.startTime).format('YYYY-MM-DD')}}
            <br />
            {{$root.moment($store.state.workbench.briefingDate.endTime).format('YYYY-MM-DD')}}
          </div>
        </div>
      </div>

      <div class="flex p-1 pt-2 justify-between">
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addDealerCount}}</span>个
          <br />新增经销商
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addContactsCount}}</span>个
          <br />新增联系人
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.addVisitCount}}</span>个
          <br />新增拜访
        </div>
        <div class="text-center text-gray-800 text-sm">
          <span class="text-base font-bold">{{briefing.dealerChangeStateCount}}</span>个
          <br />阶段变化经销商
        </div>
      </div>
    </div>

    <!-- <van-uploader :after-read="afterRead" /> -->

    <!-- 快速入口 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 p-2 rounded-lg shadowaa">
      <div class="flex p-1">
        <div class="font-bold" style="font-size:1.143rem;">快速入口</div>
      </div>

      <div class="flex p-1 pt-2 justify-between">
        <div
          class="text-center text-gray-800"
          @click="$root.checkRole('DEALER_SELECT','tipText') && $router.push('/DealerManage')"
        >
          <img src="../../assets/workbench/icon1.png" alt class="w-10 m-auto mb-1" />
          <div class="text-sm">经销商管理</div>
        </div>
        <div
          class="text-center text-gray-800"
          @click="$root.checkRole('TASK_CREATE','tipText') && $router.push({name:'CreateTask',query:{taskType:1,editor: true}})"
        >
          <img src="../../assets/workbench/icon2.png" alt class="w-10 m-auto mb-1" />
          <div class="text-sm">新建拜访</div>
        </div>
        <div
          class="text-center text-gray-800"
          @click="$root.checkRole('TASK_CREATE','tipText') && $router.push({name:'CreateTask',query:{taskType:2,editor: true}})"
        >
          <img src="../../assets/workbench/icon3.png" alt class="w-10 m-auto mb-1" />
          <div class="text-sm">新建任务</div>
        </div>
        <div class="text-center text-gray-800" @click="$router.push('/RecentVisit')">
          <img src="../../assets/workbench/icon4.png" alt class="w-10 m-auto mb-1" />
          <div class="text-sm">最近访问</div>
        </div>
      </div>
    </div>

    <!-- 我的任务 同事任务 -->
    <div class="flex flex-col bg-white mb-3 ml-4 mr-4 pt-2 pb-2 rounded-lg shadowaa">
      <div class="flex p-1 border-gray-200 pl-2 pr-2" swipeable>
        <div
          :class="['font-bold gray tabCustomize flex flex-col justify-center items-center cursor-pointer', {tabActive: !$store.state.workbench.workbenchTaskStatus}]"
          @click="$refs.swipe.swipeTo(0);$store.commit('setWorkbenchTaskStatus', 0);"
        >我的任务</div>
        <div
          :class="['font-bold relative ml-4 gray tabCustomize flex flex-col justify-center items-center cursor-pointer', {tabActive: $store.state.workbench.workbenchTaskStatus}]"
          @click="$refs.swipe.swipeTo(1);$store.commit('setWorkbenchTaskStatus', 1);"
        >
          全部任务
          <!-- <div  class="absolute" style="top: 0.1rem; right:-1.3rem">
            <van-icon name="arrow-down" />
          </div>-->
        </div>
        <div class="flex-1"></div>
        <van-icon
          v-show="$root.checkRole('TASK_CREATE')"
          size="20px"
          name="plus"
          @click="newTask = true"
        />
      </div>

      <van-swipe
        ref="swipe"
        :loop="false"
        :show-indicators="false"
        @change="changeWorkbenchTaskStatus"
      >
        <van-swipe-item class="bg-white">
          <!-- 我的任务列表 -->
          <div>
            <!-- <CalendarControl /> -->
            <div class="flex mt-2 justify-center items-center pl-2 pr-2 pb-1">
              <div
                class="text-sm text-gray-700 flex justify-center items-center"
                @click="taskDateBox= true;"
              >
                <!-- <i class="iconfont iconcalendar mr-1"></i> -->
                <img
                  style="display:inline-block;width:1.286rem;height:1.286rem;"
                  src="../../assets/workbench/calendar.png"
                  alt
                />
                {{$root.moment($store.state.workbench.myTaskTime).format('YYYY-MM-DD')}}
              </div>
              <div class="flex-1"></div>
              <!-- <div class="text-xs text-gray-600 hover:text-blue-500" @click="$router.push('/Colleague')">
                  <i class="iconfont iconwo" style="font-size: 0.6rem"></i>
                  选择同事
              </div>-->
            </div>
            <!-- <div class="text-gray-500 text-xs mt-3 border-t border-gray-100  p-2">
                已完成：3
                <span class="pl-3 text-xs">未完成：3</span>
            </div>-->
            <div
              class="flex flex-col p-2 relative rowBox"
              v-for="(row, i) in $store.state.workbench.myTaskList"
              :key="'t'+i"
              @click="TaskDetail(row.gid)"
            >
              <div class="flex">
                <span class="text-base font-bold text-gray-900 text_ellipsis">{{row.taskName}}</span>
                <div class="flex-1"></div>
                <span
                  class="text-xs text-gray-600"
                >{{$root.moment(row.taskTime * 1000).format('YYYY-MM-DD HH:mm')}}</span>
              </div>
              <span class="text-base text-gray-900">{{row.dealerName}}</span>
              <!-- {{row.positionName}} > -->
              <div class="text-sm text-gray-600 mt-1">{{row.deptName}} > {{row.userName}}</div>
              <img
                v-show="row.isFinish"
                class="absolute bottom-0 right-0 mr-2 w-16"
                src="../../assets/workbench/icon5.png"
                alt
              />
            </div>
          </div>

          <div
            class="flex justify-center items-center text-center"
            style="height:20rem;margin-top:-4rem;"
            v-show="isShowNoData_my"
          >
            <div>
              <img
                src="../../assets/workbench/no_data.png"
                style=" width: 7.85rem;height: 7.85rem;margin: 0 auto;"
                alt="暂无数据"
              />
              <p style="color:#484C55;font-weight:bold">暂无数据</p>
              <p style="color:#80848D">暂时还没有数据呢～</p>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="bg-white">
          <!-- 同事任务列表 -->
          <div>
            <div class="flex mt-2 justify-center items-center pl-2 pr-2 pb-1">
              <div
                class="text-sm text-gray-700 flex justify-center items-center"
                @click="taskDateBox= true;"
              >
                <!-- <i class="iconfont iconcalendar mr-1"></i> -->
                <img
                  style="display:inline-block;width:1.286rem;height:1.286rem;"
                  src="../../assets/workbench/calendar.png"
                  alt
                />
                {{$root.moment($store.state.workbench.colleaguesTaskTime).format('YYYY-MM-DD')}}
              </div>
              <div class="flex-1"></div>
              <div
                class="text-xs hover:text-blue-500 ellipsis flex items-center"
                @click="$router.push({name:'Colleague', params: Object.assign({},$store.state.workbench.taskColleagues,{type: 'task'})})"
              >
                <!-- <i class="iconfont iconwo" style="font-size: 0.6rem"></i> -->
                <img
                  style="display:inline-block;width:1.286rem;height:1.286rem;"
                  src="../../assets/workbench/my.png"
                  alt
                />
                <span
                  v-if="$store.state.workbench.taskColleagues.userGids.concat($store.state.workbench.taskColleagues.deptGids).toString()"
                  class="text-xs"
                >
                  <span
                    class="text-xs"
                    v-for="(r,i) in $store.state.workbench.taskColleagues.userGids"
                    :key="i"
                  >
                    <span v-if="i">,</span>
                    {{r.split(',')[0]}}
                  </span>
                  <span
                    class="text-xs"
                    v-for="(r,i) in $store.state.workbench.taskColleagues.deptGids"
                    :key="'a'+i"
                  >
                    <span v-if="!i && $store.state.workbench.taskColleagues.userGids.length">,</span>
                    <span v-if="i">,</span>
                    {{r.split(',')[0]}}
                  </span>
                </span>
                <span v-else class="text-xs" style="color: #80848D;">选择同事</span>
              </div>
            </div>
            <!-- <div class="text-gray-500 text-xs mt-3 border-t border-gray-100 p-2">
                已完成：3
                <span class="pl-3 text-xs">未完成：3</span>
            </div>-->
            <div
              class="flex flex-col p-2 relative rowBox"
              v-for="(row, i) in $store.state.workbench.colleaguesTaskList"
              :key="'c'+i"
              @click="TaskDetail(row.gid)"
            >
              <div class="flex">
                <span class="text-base font-bold text-gray-900 text_ellipsis">{{row.taskName}}</span>
                <div class="flex-1"></div>
                <span
                  class="text-xs"
                  style="color: #80848D;"
                >{{$root.moment(row.taskTime * 1000).format('YYYY-MM-DD HH:mm')}}</span>
              </div>
              <span class="text-base text-gray-900">{{row.dealerName}}</span>
              <!-- {{row.positionName}} >  -->
              <div class="text-sm mt-1" style="color: #80848D;">{{row.deptName}} > {{row.userName}}</div>
              <img
                v-show="row.isFinish"
                class="absolute bottom-0 right-0 mr-2 w-16"
                src="../../assets/workbench/icon5.png"
                alt
              />
            </div>
          </div>
          <div
            class="flex justify-center items-center text-center"
            style="height:20rem;margin-top:-4rem;"
            v-show="isShowNoData_other"
          >
            <div>
              <img
                src="../../assets/workbench/no_data.png"
                style=" width: 7.85rem;height: 7.85rem;margin: 0 auto;"
                alt="暂无数据"
              />
              <p style="color:#484C55;font-weight:bold">暂无数据</p>
              <p style="color:#80848D">暂时还没有数据呢～</p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-popup v-model="taskDateBox" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        title="请选择时间"
        :formatter="formatter"
        v-model="taskTime"
        type="date"
        @confirm="confirmTaskTime"
        @cancel="taskDateBox=false"
      />
    </van-popup>

    <van-popup v-model="newTask" position="bottom">
      <div class="bg-gray-200">
        <div
          @click="$router.push({name:'CreateTask',query:{taskType:1,editor: true}})"
          class="text-center font-bold text-xl border-b border-gray-300 bg-white h-16 flex items-center justify-center cursor-pointer"
          style="color:#FF9B02"
        >经销商拜访</div>
        <div
          class="text-center border-b border-gray-300 font-bold text-xl bg-white h-16 flex items-center justify-center cursor-pointer"
          style="color:#FF9B02"
          @click="$router.push({name:'CreateTask',query:{taskType:2,editor: true}})"
        >任务事项</div>
        <div
          class="text-center border-gray-300 bg-white h-16 text-xl flex items-center justify-center cursor-pointer mt-3"
          @click="newTask=false"
        >取 消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import CalendarControl from '@/components/CalendarControl'
export default {
  name: "Workbench",
  components: {
    // CalendarControl
  },
  data() {
    return {
      taskDateBox: false,
      taskTime: new Date(this.$root.moment().format("YYYY-MM-DD")),

      // 简报信息
      briefing: {
        addDealerCount: 0,
        addContactsCount: 0,
        addVisitCount: 0,
        dealerChangeStateCount: 0
      },

      newTask: false,
      isShowNoData_other: true,
      isShowNoData_my: true
    };
  },
  mounted() {
    // 滚动加载
    this.scrollLoad(document.getElementById("taskListBox"), resolve => {
      if (this.$store.state.workbench.workbenchTaskStatus) {
        this.$store.state.workbench.colleaguesTaskPageNum++;
      } else {
        this.$store.state.workbench.myTaskPageNum++;
      }
      this.$store.dispatch("getTaskList").then(msg => {
        resolve(msg);
      });
    });

    delete sessionStorage.localMap;
    this.$refs.swipe.swipeTo(this.$store.state.workbench.workbenchTaskStatus);
    this.getBriefing();
    this.$store.dispatch("getTaskList", { pageNum: 1 }).then(msg => {
      if (!this.$store.state.workbench.myTaskList) {
        this.isShowNoData_my = true;
      } else {
        this.isShowNoData_my = false;
      }
    });
  },
  watch: {
    "$store.state.workbench.workbenchTaskStatus"() {
      this.$store.dispatch("getTaskList", { pageNum: 1 }).then(res => {
        if (!this.$store.state.workbench.colleaguesTaskList) {
          this.isShowNoData_other = true;
        } else {
          this.isShowNoData_other = false;
        }

        if (!this.$store.state.workbench.myTaskList) {
          this.isShowNoData_my = true;
        } else {
          this.isShowNoData_my = false;
        }
      });
    }
  },
  methods: {
    changeWorkbenchTaskStatus(index) {
      this.$store.commit("setWorkbenchTaskStatus", index);
      // console.log(this.$store.state.workbench.colleaguesTaskList)
    },
    // 确定任务时间
    confirmTaskTime() {
      // 重新请求任务列表
      this.$store.state.workbench.workbenchTaskStatus
        ? this.$store.commit("setColleaguesTaskTime", this.taskTime)
        : this.$store.commit("setMyTaskTime", this.taskTime);
      this.taskDateBox = false;
      this.$store.dispatch("getTaskList", { pageNum: 1 });
    },
    // 获取简报信息
    getBriefing() {
      let userGids = [];
      this.$store.state.workbench.briefingColleagues.userGids.map(r => {
        userGids.push(r.split(",")[1]);
      });
      let deptGids = [];
      this.$store.state.workbench.briefingColleagues.deptGids.map(r => {
        deptGids.push(r.split(",")[1]);
      });
      this.$ajax.workbench
        .getBriefing({
          startTime:
            this.timeStamp(this.$store.state.workbench.briefingDate.startTime) /
            1000,
          endTime:
            this.timeStamp(this.$store.state.workbench.briefingDate.endTime) /
            1000,
          userGids: userGids,
          deptGids: deptGids,
          userType: this.$store.state.workbench.briefingColleagues.userType
        })
        .then(res => {
          if (!res.code) {
            this.briefing = res.data;
          }
        });
    },
    logout() {
      // this.$store.commit('setLoginState', false)
      // this.$router.go(0)
      this.userAgent(
        () => {
          // 返回原生页面
          let params = { selector: "navigationGoBack", type: "LBHiOSApp" };
          let resultjson = prompt(JSON.stringify(params));
          delete sessionStorage.Authorization;
        },
        () => {
          HelperNativeInterface.navigationGoBack();
          delete sessionStorage.Authorization;
        }
      );
    },
    TaskDetail(id) {
      this.$store.dispatch("getTaskInfo", id).then(() => {
        let taskType = this.$store.state.task.taskInfo.taskType; // 1 经销商拜访 2 任务事项
        // console.log(taskType,"type")
        let visitType = this.$store.state.task.taskInfo.visitType; // 0 正常流程 1 直接完成
        let taskStatus = this.$store.state.task.taskInfo.taskStatus; // 0 创建完成 1 打卡完成或者手动标记完成 2 记录完成即任务结束完成
        let gid = this.$store.state.task.taskInfo.gid;

        //跳转到详情
        if (taskStatus == 2) {
          this.$router.push({
            name: "TaskDetail",
            query: { gid: id, taskType: taskType }
          });
        } else {
          this.$router.push({
            name: "CreateTask",
            query: { taskType: taskType, editor: true, gid: gid }
          });
        }
      });
      // $router.push({name:'TaskDetail',query:{id: row.gid}})
    },
    goWorkbenchSearch() {
      delete sessionStorage.globalSearchVal;
      this.$router.push({ name: "WorkbenchSearch" });
    }
  }
};
</script>

<style scoped>
.shadowaa {
  box-shadow: 0 0px 12px 0px rgba(0, 0, 0, 0.1) !important;
}
.Workbench {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
}
.Workbench .van-search__content {
  background-color: #f5f5f5;
}
.tabCustomize {
  font-size: 1.143rem;
}
.tabCustomize::after {
  display: flex;
  width: 34px;
  border-bottom: 8px solid #fff;
  transform: scaleY(0.5);
  content: "";
  font-size: 1.143rem;
}
.tabActive.gray {
  color: #000;
}
.tabActive::after {
  border-bottom: 8px solid #ff9505;
  border-radius: 3px;
  /* margin-top: 0.3rem; */
}
.rowBox:active {
  background-color: #f2f3f5;
}

.ellipsis {
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text_ellipsis {
  width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gray {
  color: #80848d;
}
</style>