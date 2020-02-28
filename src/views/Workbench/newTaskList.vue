
<!-- 新增拜访记录 -->
<template>
  <div class="flex-1 flex flex-col bg-white">
    <div class="flex flex-col">
      <div class="flex-1 items-center pl-4 pr-4 flex">
        <div class="flex-1 flex">
          <div
            @click="$router.go(-1)"
            class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
          >
            <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
          </div>
        </div>
        <span class="text-center font-bold bar_title">新增拜访</span>
        <div class="flex-1 items-center flex text-xl"></div>
      </div>
    </div>

    <div class="border-b border-gray-200 flex items-center justify-around"></div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="taskListBox">
        <div
          class="flex flex-col p-4 border-b border-gray-200 relative"
          v-for="(row, i) in $store.state.workbench.newMyTasklist"
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

      <p
          v-show="!$store.state.workbench.newMyTasklist.length"
          class="text-center mt-10"
          style="color:#80848d"
        >没有筛选到相关的数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "myTaskList",
  // created() {
  //   this.$store.commit("setInitParams");
  // },
  data() {
    return {};
  },
  mounted() {
    let startTime = Number(this.$route.query.startTime);
    let endTime = Number(this.$route.query.endTime);
    let userType = Number(this.$route.query.userType);
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

    this.scrollLoad(this.$refs.taskListBox, resolve => {
      this.$store
        .dispatch("newTaskList", {
          pageNum: this.$store.state.workbench.newTaskParams.pageNum + 1,
          startTime: startTime,
          endTime: endTime,
          userGids: userGids,
          deptGids: deptGids,
          userType: userType,
          onlyWrite: false,
          taskType: 1
        })
        .then(msg => {
          resolve(msg);
        });
    });
    this.$store.dispatch("newTaskList", {
      pageNum: 1,
      startTime: startTime,
      endTime: endTime,
      userGids: userGids,
      deptGids: deptGids,
      userType: userType,
      onlyWrite: false,
      taskType: 1
    });
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        mask: true,
        message: "加载中..."
      });
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
    }
  }
};
</script>

<style scoped>
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>