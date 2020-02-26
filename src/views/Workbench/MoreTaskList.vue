

 <!-- 承租人列表页 -->
<template>
  <div class="MoreTaskList flex-1 flex flex-col">
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
              v-model="$store.state.moreTask.dropDownValue"
              :options="$store.state.moreTask.dropDownType"
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
            v-show="$root.checkRole('TASK_CREATE')"
            @click="newTask = true"
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
          @input="(keyword)=>$store.dispatch('getMoreTaskList',{queryString: keyword, pageNum: 1})"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div v-if="homeSearch" slot="action"></div>
          <div
            v-else
            slot="action"
            @click="searchBar = false;$store.dispatch('getMoreTaskList',{queryString: '', pageNum: 1})"
          >取消</div>
        </van-search>
      </div>
    </div>
    <van-tabs
      v-model="$store.state.moreTask.listParams.taskType"
      line-width="36px"
      @click="$refs.swipe.swipeTo($store.state.moreTask.listParams.taskType)"
    >
      <van-tab
        v-for="(row,index) in $store.state.moreTask.taskType"
        :key="index"
        :title="row.name"
        :name="row.id"
      ></van-tab>
    </van-tabs>

    <div class="flex items-center justify-around" style="border-bottom:1px solid #f8f8f8;">
      <div style="position:relative;">
        <van-dropdown-menu>
          <van-dropdown-item
            @change="(num)=>$store.dispatch('getMoreTaskList',{orderType: num,pageNum:1})"
            v-model="$store.state.moreTask.listParams.orderType"
            :options="$store.state.moreTask.orderType"
          />
        </van-dropdown-menu>
        <img class="order_icon" src="../../assets/lessee/order.png" alt />
      </div>
      <Screening
        @onSearch="searchAll"
        :taskTypeValue="$store.state.moreTask.listParams.taskType"
        :ownerUserGidsValue="ownerUserGids"
        :followerUserGidsValue="followerUserGids"
      />
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll" ref="taskListBox">
        <van-swipe
          ref="swipe"
          :loop="false"
          :show-indicators="false"
          @change="(num)=>$store.dispatch('getMoreTaskList',{taskType: num,pageNum:1})"
        >
          <van-swipe-item
            v-for="(row,index) in $store.state.moreTask.taskType"
            :key="index"
            class="bg-white"
          >
            <div
              class="flex flex-col m-4 bg-white last_child relative"
              style="border-bottom:1px solid #f8f8f8;padding-bottom:1rem;"
              v-for="(r,i) in $store.state.moreTask.taskList"
              :key="i"
              @click="TaskDetail(r.gid)"
            >
              <div class="flex">
                <span class="text-lg font-bold text_ellipsis" style="color:#252525;">{{r.taskName}}</span>
                <van-tag round medium type="primary" class="text-sm mx-2">
                  {{
                  $store.state.moreTask.taskTypeArr[r.taskType-1] ? $store.state.moreTask.taskTypeArr[r.taskType-1].text : ''
                  }}
                </van-tag>
                <div class="flex-1"></div>
                <span
                  class="text-xs text-gray-600"
                >{{$root.moment(r.taskTime * 1000).format('YYYY-MM-DD HH:mm')}}</span>
              </div>
              <span class="text-base my-1" style="color:#484C55">{{r.dealerName}}</span>
              <div
                class="text-sm text-gray-600 mt-1"
                style="color:#80848d;"
              >{{r.ownerUserList.map(r=>r.refRlNm|| r.ownerUserName).join(',')}}</div>
              <img
                v-show="r.isFinish"
                class="absolute bottom-0 top-0 right-0 mr-2 w-16"
                src="../../assets/workbench/icon5.png"
                alt
              />
            </div>
          </van-swipe-item>
        </van-swipe>

        <p
          v-show="!$store.state.moreTask.taskList.length"
          class="text-center mt-10"
          style="color:#80848d"
        >没有筛选到相关的数据</p>
      </div>
    </div>
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
import Screening from "@/components/Screening/taskScreen";
export default {
  name: "MoreTaskList",
  components: {
    Screening
  },
  data() {
    return {
      searchBar: false,
      homeSearch: false,
      dropDown: false,
      newTask: false,
      followerUserGids: [],
      ownerUserGids: []
    };
  },
  watch: {
    "$store.state.moreTask.dropDownValue"() {
      this.$refs.taskListBox.scrollTop = 0;
    },
    "$store.state.moreTask.listParams.taskType"() {
      this.$refs.taskListBox.scrollTop = 0;
    }
  },
  created() {
    // 如果是全部 清空参数值
    if (this.$store.state.moreTask.dropDownValue == 0) {
      this.$store.commit("setEmptyParams");
    }
  },
  mounted() {
    this.$store.commit("setInitParams");
    this.$store.state.dealer.dropDownValue = 0;

    this.scrollLoad(this.$refs.taskListBox, resolve => {
      this.$store
        .dispatch("getMoreTaskList", {
          pageNum: this.$store.state.moreTask.listParams.pageNum + 1
        })
        .then(msg => {
          resolve(msg);
        });
    });

    this.$store.dispatch("getMoreTaskList", { pageNum: 1 });
  },
  methods: {
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
      // this.$store.commit("setEmptyParams");

      if (value == 0) {
        // 全部
        this.$store.dispatch("getMoreTaskList", {
          followerUserGids: [],
          ownerUserGids: [],
          pageNum: 1
        });
        this.followerUserGids = [];
        this.ownerUserGids = [];
      }
      if (value == 1) {
        // 我负责的
        this.$store.dispatch("getMoreTaskList", {
          followerUserGids: [],
          ownerUserGids: ownerUserGids,
          pageNum: 1
        });
        this.followerUserGids = [];
        this.ownerUserGids = ownerUserGids;
      }
      if (value == 2) {
        // 我参与的
        this.$store.dispatch("getMoreTaskList", {
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
      this.$refs.taskListBox.scrollTop = 0;
      this.$refs.swipe.swipeTo(data.taskType);

      this.$store.dispatch(
        "getMoreTaskList",
        Object.assign(data, { pageNum: 1 })
      );

      let userId = JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID;

      // 在筛选组件回显 负责人 参与人的 值
      this.ownerUserGids = data.ownerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });
      this.followerUserGids = data.followerUserGids.map(r => {
        return { id: r.id, refRlNm: r.refRlNm };
      });

      if (data.ownerUserGids.length != 0 && data.followerUserGids.length != 0) {
        this.$store.state.moreTask.dropDownValue = 0;
      }
      if (this.$store.state.moreTask.dropDownValue == 1) {
        if (
          !(
            data.ownerUserGids.length == 1 && data.ownerUserGids[0].id == userId
          )
        ) {
          this.$store.state.moreTask.dropDownValue = 0;
        }
      }
      if (this.$store.state.moreTask.dropDownValue == 2) {
        if (
          !(
            data.followerUserGids.length == 1 &&
            data.followerUserGids[0].id == userId
          )
        ) {
          this.$store.state.moreTask.dropDownValue = 0;
        }
      }
    }
  }
};
</script>

<style scoped>
.MoreTaskList /deep/.van-tabs__line {
  width: 34px !important;
  border-radius: 6px;
  margin-top: 0.3rem;
  background-color: #ff9505;
  height: 4px;
}
.MoreTaskList /deep/ .van-hairline--top-bottom::after,
.MoreTaskList /deep/ .van-hairline-unset--top-bottom::after {
  border: 0;
}
.MoreTaskList /deep/ .van-tab--active span {
  font-size: 1.2rem;
}
.MoreTaskList /deep/ [class*="van-hairline"]::after {
  position: static;
}

.MoreTaskList /deep/ .van-cell {
  display: flex;
  align-items: center;
}
.MoreTaskList /deep/ [class*="van-hairline"]::after {
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
.MoreTaskList /deep/ .van-dropdown-menu__title::after {
  opacity: 0;
}
.MoreTaskList /deep/ .van-dropdown-menu__title {
  padding: 0 25px;
  color: #80848d;
}
.MoreTaskList /deep/ .van-dropdown-item__option--active,
.MoreTaskList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.MoreTaskList /deep/ .van-dropdown-item__option--active,
.MoreTaskList
  /deep/
  .van-dropdown-item__option--active
  .van-dropdown-item__icon {
  color: #ff9b02;
}
.MoreTaskList /deep/ .van-hairline--top-bottom::after,
.MoreTaskList /deep/ .van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.last_child:last-child {
  border-bottom: 0px !important;
}
.MoreTaskList /deep/ .van-search {
  padding: 10px 0px;
}
.MoreTaskList /deep/ .van-search__action {
  padding: 0 0 0 8px;
}
.MoreTaskList /deep/ .van-tag--primary {
  background: #fff;
  border: 1px solid #0885ff;
}
.MoreTaskList /deep/ .van-tag {
  color: #0885ff;
  justify-content: center;
  width: 2.8rem;
  height: 1.5rem;
}
.text_ellipsis {
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 顶部下拉筛选 */
.dropdown_icon {
  width: 1.286rem;
  height: 1.286rem;
  position: absolute;
  top: 16px;
  right: 0;
}
.MoreTaskList /deep/ .titleDropdown .van-dropdown-menu__item {
  z-index: 1;
}
.MoreTaskList /deep/ .titleDropdown .van-dropdown-menu__title {
  padding: 0 25px 0 0;
  color: #252525;
  line-height: normal;
}
.MoreTaskList /deep/ .titleDropdown .van-dropdown-menu__title .van-ellipsis {
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
.MoreTaskList
  /deep/
  .titleDropdown
  .van-dropdown-item__option.van-dropdown-item__option--active {
  color: #ff9b02;
}
.MoreTaskList /deep/ .titleDropdown .van-dropdown-item__option {
  /* justify-content: center; */
  text-align: center;
  color: #252525;
}
.MoreTaskList
  /deep/
  .titleDropdown
  .van-dropdown-item__option
  .van-cell__title
  span {
  font-size: 1.143rem;
}
.MoreTaskList
  /deep/
  .titleDropdown
  .van-dropdown-item__option--active
  .van-cell__value {
  flex: none;
}
.MoreTaskList /deep/ .titleDropdown .van-icon-success:before {
  display: none;
}
</style>
