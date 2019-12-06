 <!-- 拜访任务详情 -->
<template>
  <div class="taskDetails flex flex-1 flex-col">
    <van-nav-bar
      :title="$route.query.taskType == 1 ?'经销商拜访' : '任务事项'"
      left-text="返回"
      @click-left="$router.go(-1)"
      left-arrow
    >
      <div
        @click="editorFun"
        v-if="taskStatus == 2 && $store.state.task.addEditTaskParams.taskType == 1"
        slot="right"
      >编辑</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4 mt-2">拜访安排</div>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">主题</span>
          </template>
          <template slot="default">
            <p class="p5 text-gray-800">{{$store.state.task.addEditTaskParams.taskName}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">类型</span>
          </template>
          <template slot="default">
            <p
              class="p5  text-gray-800"
            >{{taskTypeOption[$store.state.task.addEditTaskParams.taskType-1] ? taskTypeOption[$store.state.task.addEditTaskParams.taskType-1].text : ''}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">时间</span>
          </template>
          <template slot="default">
            <p
              class="p5  text-gray-800"
            >{{$store.state.task.addEditTaskParams.taskTime ? $root.moment($store.state.task.addEditTaskParams.taskTime*1000).format('YYYY-MM-DD HH:mm') : '请选择时间'}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">提醒</span>
          </template>
          <template slot="default">
            <p class="p5  text-gray-800">{{alarmTimeText || '请选择提醒时间'}}</p>
          </template>
        </van-cell>

        <van-cell clickable v-if="$store.state.task.addEditTaskParams.taskType == 1">
          <template slot="title">
            <span class="custom-title">相关经销商</span>
          </template>
          <template slot="default">
            <p class="p5  text-gray-800">{{dealerName || '请选择相关经销商'}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">创建人</span>
          </template>
          <template slot="default">
            <p class="p5  text-gray-800">{{$store.state.task.addEditTaskParams.createUserName}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">拜访人</span>
          </template>
          <template slot="default">
            <p :class="['p5',{'text-gray-800':mainUserGids.length}]">{{mainUserGidsFun(mainUserGids, 'refRlNm', 0)}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">协访人</span>
          </template>
          <template slot="default">
            <p :class="['p5',{'text-gray-800':otherUserGids.length}]">{{mainUserGidsFun(otherUserGids, 'refRlNm', 1)}}</p>
          </template>
        </van-cell>

        <van-cell clickable v-if="$store.state.task.addEditTaskParams.taskType == 1">
          <template slot="title">
            <span class="custom-title">拜访目的</span>
          </template>
          <template slot="default">
            <p :class="['p5',{'text-gray-800':visitAimText}]">{{visitAimText || '请选择拜访目的'}}</p>
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">备注</span>
          </template>
          <template slot="default">
            <p :class="['p5',{'text-gray-800':$store.state.task.addEditTaskParams.comment}]">{{$store.state.task.addEditTaskParams.comment || '-'}}</p>
          </template>
        </van-cell>


        <div v-if="$store.state.task.addEditTaskParams.clockinPlaceAddress" class="bg-gray-100 pt-2 pb-1">
          <div class="relative formBar font-bold text-base p-3 pl-4 mt-2 bg-white">打卡位置</div>
          <div class="flex items-center bg-white pl-5 pr-5 pt-2 pb-2 bg-white" @click="$router.push({name:'Map', query:{lng:$store.state.task.addEditTaskParams.longitude, lat:$store.state.task.addEditTaskParams.latitude}})">
            <div class="flex-1">
              <span class="text-blue-500">{{$store.state.task.addEditTaskParams.clockinPlaceAddress}}</span>
            </div>
          </div>
        </div>

        <div
          v-if="$store.state.task.addEditTaskParams.clockinPlaceAddress && !$store.state.task.addEditTaskParams.isInClockinRange"
          class="bg-gray-100 text-red-500 pl-5 pt-1 text-sm"
        >
          打卡点不在经销商附近
        </div>

        <div v-if="$store.state.task.addEditTaskParams.clockinPlaceAddress && $store.state.task.addEditTaskParams.locationName" class="bg-gray-100 pt-1 pb-4">
          <div class="relative formBar font-bold text-base p-3 pl-4 mt-2 bg-white">经销商位置</div>
          <div class="flex items-center bg-white pl-5 pr-5 pt-2 pb-2 bg-white" @click="$router.push({name:'Map', query:{lng:$store.state.task.addEditTaskParams.dealerLongitude ,lat: $store.state.task.addEditTaskParams.dealerLatitud}})">
            <div class="flex-1">
              <span class="text-blue-500">{{$store.state.task.addEditTaskParams.locationName}}</span>
            </div>
          </div>
        </div>

        <div v-if="$store.state.task.addEditTaskParams.dealerDes">
          <div class="relative formBar font-bold text-base p-3 pl-4 mt-2">拜访记录</div>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">近期运营情况</span>
            </template>
            <template slot="default">
              <p class="p5  text-gray-800">{{$store.state.task.addEditTaskParams.dealerDes}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">狮桥意向单量</span>
            </template>
            <template slot="default">
              <p
                :class="['p5',  {'text-gray-800': $store.state.task.addEditTaskParams.lbPreOrderCount != null}]"
              >{{$store.state.task.addEditTaskParams.lbPreOrderCount == null ? '未填写' : $store.state.task.addEditTaskParams.lbPreOrderCount}}</p>
            </template>
          </van-cell>

          <template v-if="$store.state.task.addEditTaskParams.lesseeList">
            <div v-for="(r,i) in $store.state.task.addEditTaskParams.lesseeList" :key="i+'bb'">
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">意向承租人</span>
                </template>
                <template slot="default">
                  <p class="p5  text-gray-800">{{r.lesseeName}}</p>
                </template>
              </van-cell>
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">备注</span>
                </template>
                <template slot="default">
                  <p :class="['p5',  {'text-gray-800': r.lesseeComment}]">{{r.lesseeComment ? r.lesseeComment : '-'}}</p>
                </template>
              </van-cell>
              <div></div>
            </div>
          </template>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">竞对单量</span>
            </template>
            <template slot="default">
              <p
                :class="['p5',{'text-gray-800': $store.state.task.addEditTaskParams.competitorOrderCount != null}]"
              >{{$store.state.task.addEditTaskParams.competitorOrderCount == null ? '未填写' : $store.state.task.addEditTaskParams.competitorOrderCount}}</p>
            </template>
          </van-cell>

          <template v-if="$store.state.task.addEditTaskParams.competitorList">
            <div v-for="(r,i) in $store.state.task.addEditTaskParams.competitorList" :key="i+'aa'">
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">竞对名称</span>
                </template>
                <template slot="default">
                  <p class="p5  text-gray-800">{{r.competorName}}</p>
                </template>
              </van-cell>
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">竞对政策</span>
                </template>
                <template slot="default">
                  <p :class="['p5', {'text-gray-800' : r.racePolicy}]">{{r.racePolicy ? r.racePolicy : '-'}}</p>
                </template>
              </van-cell>
              <div></div>
            </div>
          </template>

          <van-cell clickable v-if="picUrl">
            <template slot="title">
              <span class="custom-title">图片</span>
            </template>
            <template slot="default">
              <p class="p5  text-gray-800">
                <img :src="picUrl" alt />
              </p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">备注</span>
            </template>
            <template slot="default">
              <p
                :class="['p5',{'text-gray-800': $store.state.task.addEditTaskParams.visitComment}]"
              >{{$store.state.task.addEditTaskParams.visitComment ? $store.state.task.addEditTaskParams.visitComment : '-'}}</p>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskDetails",
  components: {},
  data() {
    return {
      taskTypeOption: [
        { text: "经销商拜访", value: 1 },
        { text: "任务事项", value: 2 }
      ],

      alarmTimeText: "",
      alarmTimeOption: [
        { text: "准时", value: 0 },
        { text: "不提醒", value: "" },
        { text: "提前15分钟", value: 15 * 60 * 1000 },
        { text: "提前30分钟", value: 30 * 60 * 1000 },
        { text: "提前1小时", value: 60 * 60 * 1000 },
        { text: "提前2小时", value: 60 * 60 * 1000 * 2 },
        { text: "提前6小时", value: 60 * 60 * 1000 * 6 },
        { text: "1天前", value: 24 * 60 * 60 * 1000 }
      ],

      dealerName: "",

      mainUserGids: [],
      otherUserGids: [],

      visitAimTypes: [
        { text: "客情维护", id: 0 },
        { text: "首次拜访", id: 1 },
        { text: "沟通需求", id: 2 },
        { text: "签单", id: 3 },
        { text: "贷后跟进", id: 4 }
      ],
      visitAimText: "",

      taskId: "",

      taskStatus: null,
      picUrl: ""
    };
  },
  mounted() {
    this.$store.commit("setAddEditTaskParams");

    this.$route.query.gid && (this.taskId = this.$route.query.gid);

    if (this.taskId) {
      this.$store.dispatch("getTaskInfo", this.taskId).then(() => {
        this.$store.commit(
          "setAddEditTaskParams",
          this.$store.state.task.taskInfo
        );
        this.taskStatus = this.$store.state.task.taskInfo.taskStatus;

        // 回显 提醒分钟的值
        if (this.$store.state.task.addEditTaskParams.alarmTime == null) {
          this.alarmTimeText = this.alarmTimeOption[1].text;
        } else {
          let ms =
            this.$store.state.task.addEditTaskParams.taskTime * 1000 -
            this.$store.state.task.addEditTaskParams.alarmTime * 1000;
          this.alarmTimeOption.some(r => {
            if (r.value == ms) {
              this.alarmTimeText = r.text;
              return true;
            }
          });
        }

        this.$store.state.task.addEditTaskParams.pics && (this.picUrl =
          window.picServer + this.$store.state.task.addEditTaskParams.pics);

        // 回显 相关经销商的值
        this.dealerName = this.$store.state.task.addEditTaskParams.dealerName;

        //回显 拜访人 mainUserNames
        // mainUserNames

        this.mainUserGids = this.$store.state.task.addEditTaskParams
          .mainUserNames
          ? this.$store.state.task.addEditTaskParams.mainUserNames.map(r => {
              return r
                ? {
                    id: r.modelGid,
                    refRlNm: r.modelName
                  }
                : "";
            })
          : [];

        //回显 协访人 otherUserNames
        this.otherUserGids = this.$store.state.task.addEditTaskParams
          .otherUserNames
          ? this.$store.state.task.addEditTaskParams.otherUserNames.map(r => {
              return r
                ? {
                    id: r.modelGid,
                    refRlNm: r.modelName
                  }
                : "";
            })
          : [];

        // 回显 visitAim
        this.visitAimTypes.some(r => {
          if (r.id == this.$store.state.task.addEditTaskParams.visitAim) {
            this.visitAimText = r.text;
            return true;
          }
        });
      });
    }
  },
  methods: {
    editorFun() {
      this.$router.push({ name: "VisitRecord", query: { id: this.taskId } });
    },
    mainUserGidsFun(vals, key, userType) {
      console.log(vals, key, userType);
      if (!vals.length && key == "refRlNm" && !userType) {
        return "请选择拜访人";
      }
      if (!vals.length && key == "refRlNm" && userType) {
        return "请选择协访人";
      }
      return vals
        .map(r => {
          return r[key];
        })
        .toString();
    }
  }
};
</script>

<style scoped>
.taskDetails /deep/ .van-cell {
  padding: 5px 5px 5px 10px;
  /* background-color: inherit; */
}
.taskDetails /deep/ .van-cell__title {
  padding: 5px;
}
.p5 {
  padding: 5px 5px 5px 10px;
}
.taskDetails /deep/ .van-cell__title {
  width: 120px;
  flex: inherit;
}
.taskDetails /deep/ .van-cell__value {
  text-align: inherit;
}
</style>
