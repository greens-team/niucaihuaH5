<!-- 日期范围范围 -->
<template>
  <div class="DateRange">
    <!--     
    <van-nav-bar
      title="选择时间段"
      left-text="取消"
      right-text="重置"
      @click-left="cancel"
      @click-right="reset"
    />-->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600">
          <div
            slot="left"
            class="text-center"
            style="font-size:1.143rem;color:#1989fa;"
            @click="cancel"
          >取消</div>
        </div>
      </div>
      <span class="text-center font-bold bar_title">选择时间段</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div
          slot="right"
          class="text-center"
          style="font-size:1.143rem;color:#1989fa;"
          @click="reset"
        >重置</div>
      </div>
    </div>

    <div class="p-6 pt-3 pb-3">
      <div class="flex justify-between p-2">
        <div class="text-gray-600">天</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '今天'}]"
          @click="setTimeText('今天')"
        >今天</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '昨天'}]"
          @click="setTimeText('昨天')"
        >昨天</div>
      </div>
      <div class="flex justify-between p-2">
        <div class="text-gray-600">周</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '本周'}]"
          @click="setTimeText('本周')"
        >本周</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '上周'}]"
          @click="setTimeText('上周')"
        >上周</div>
      </div>
      <div class="flex justify-between p-2">
        <div class="text-gray-600">月</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '本月'}]"
          @click="setTimeText('本月')"
        >本月</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '上月'}]"
          @click="setTimeText('上月')"
        >上月</div>
      </div>
      <div class="flex justify-between p-2">
        <div class="text-gray-600">季</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '本季度'}]"
          @click="setTimeText('本季度')"
        >本季度</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '上一季度'}]"
          @click="setTimeText('上一季度')"
        >上一季度</div>
      </div>
      <div class="flex justify-between p-2">
        <div class="text-gray-600">年</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '本年度'}]"
          @click="setTimeText('本年度')"
        >本年度</div>
        <div
          :class="['w-20 p-1 text-center rounded',{bgLinear: selected == '上一年度'}]"
          @click="setTimeText('上一年度')"
        >上一年度</div>
      </div>
    </div>

    <div
      @click="showDateBox=true"
      class="flex justify-between items-center border-t-8 border-b-8 border-gray-100 p-2 pl-6 pr-6"
    >
      <div class="leading-tight">
        <div v-if="$route.params.text">
          自定义
          <br />
          <span class="text-xs" style="color:#80848d">请选择时间段</span>
        </div>

        <div v-else>
          自定义
          <br />

          <span
            class="text-xs"
            style="color:#80848d"
          >{{$root.moment($route.params.startTime).format('YYYY-MM-DD')}} ~ {{$root.moment($route.params.endTime).format('YYYY-MM-DD') }}</span>
        </div>
      </div>
      <van-icon name="arrow" class="text-gray-500" />
    </div>

    <!-- 任务时间选择 -->
    <van-popup
      v-model="showDateBox"
      position="bottom"
      :style="{ height: '320px' }"
      class="dateRange"
    >
      <van-nav-bar
        title="选择时间段"
        left-text="取消"
        right-text="确定"
        @click-left="showDateBox=false"
        @click-right="setTime"
      />

      <div>
        <div
          @click="()=>{showStartTime=true,showEndTime=false}"
          class="flex p-3 pt-3 pb-3 items-center justify-center"
          style="color:#252525;font-size:1rem;"
        >
          开始时间
          <div class="flex-1"></div>
          {{$root.moment(params.startTime).format('YYYY-MM-DD')}}
          <van-icon name="arrow" class="text-gray-400 pl-2" />
        </div>

        <van-datetime-picker
          :visible-item-count="3"
          v-show="showStartTime"
          :formatter="formatter"
          :show-toolbar="false"
          v-model="params.startTime"
          type="date"
        />
      </div>

      <div style="border-top:1px solid #f6f6f6">
        <div
          @click="()=>{showStartTime=false,showEndTime=true}"
          class="flex p-3 pt-3 pb-3 items-center justify-center"
          style="color:#252525;font-size:1rem;"
        >
          结束时间
          <div class="flex-1"></div>
          {{$root.moment(params.endTime).format('YYYY-MM-DD')}}
          <van-icon name="arrow" class="text-gray-400 pl-2" />
        </div>

        <van-datetime-picker
          :visible-item-count="3"
          v-show="showEndTime"
          :formatter="formatter"
          :show-toolbar="false"
          v-model="params.endTime"
          type="date"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "DateRange",
  created() {},
  data() {
    return {
      selected: "今天",
      showDateBox: false,
      showStartTime: true,
      showEndTime: false,
      params: {
        startTime: new Date(),
        endTime: new Date()
      }
    };
  },
  mounted() {
    this.selected = this.$route.params.text;
    // this.params.startTime = this.$route.params.startTime
    // this.params.endTime = this.$route.params.endTime
  },
  methods: {
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return `${value}日`;
    },
    cancel() {
      this.$store.commit("setBriefingDate", this.$route.params);
      this.$router.go(-1);
    },
    reset() {
      this.$store.commit("setBriefingDate", {
        text: "本月",
        startTime: this.$root
          .moment()
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.$root
          .moment()
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss")
      });
      this.$router.go(-1);
    },
    setTime() {
      let params = {
        text: "",
        startTime: this.$root
          .moment(this.params.startTime)
          .startOf("Day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.$root
          .moment(this.params.endTime)
          .endOf("Day")
          .format("YYYY-MM-DD HH:mm:ss")
      };
      if (params.startTime > params.endTime) {
        this.$dialog.alert({
          message: "开始时间不能晚于结束时间"
        });
        return;
      }
      this.$store.commit("setBriefingDate", params);
      this.$router.go(-1);
    },
    setTimeText(selected) {
      this.selected = selected;
      let time = {
        startTime: "",
        endTime: ""
      };
      switch (selected) {
        case "今天":
          time = {
            startTime: this.$root
              .moment()
              .startOf("day")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "昨天":
          time = {
            startTime: this.$root
              .moment()
              .day(this.$root.moment().day() - 1)
              .startOf("day")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .day(this.$root.moment().day() - 1)
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "本周":
          time = {
            startTime: this.$root
              .moment()
              .startOf("week")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "上周":
          time = {
            startTime: this.$root
              .moment()
              .week(this.$root.moment().week() - 1)
              .startOf("week")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .week(this.$root.moment().week() - 1)
              .endOf("week")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "本月":
          time = {
            startTime: this.$root
              .moment()
              .startOf("month")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "上月":
          time = {
            startTime: this.$root
              .moment()
              .month(this.$root.moment().month() - 1)
              .startOf("month")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .month(this.$root.moment().month() - 1)
              .endOf("month")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "本季度":
          time = {
            startTime: this.$root
              .moment()
              .startOf("quarter")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "上一季度":
          time = {
            startTime: this.$root
              .moment()
              .quarter(this.$root.moment().quarter() - 1)
              .startOf("quarter")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .quarter(this.$root.moment().quarter() - 1)
              .endOf("quarter")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "本年度":
          time = {
            startTime: this.$root
              .moment()
              .startOf("year")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
        case "上一年度":
          time = {
            startTime: this.$root
              .moment()
              .year(this.$root.moment().year() - 1)
              .startOf("year")
              .format("YYYY-MM-DD HH:mm:ss"),
            endTime: this.$root
              .moment()
              .year(this.$root.moment().year() - 1)
              .endOf("year")
              .format("YYYY-MM-DD HH:mm:ss")
          };
          break;
      }
      this.$store.commit("setBriefingDate", {
        text: selected,
        startTime: time.startTime,
        endTime: time.endTime
      });
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.bgLinear {
  background: linear-gradient(
    225deg,
    rgba(255, 155, 2, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
}
.bar_title {
  font-size: 1.286rem;
}
.dateRange /deep/ .van-picker-column__item.van-picker-column__item--selected {
  color: #252525;
  font-size: 1.286rem;
}
.dateRange /deep/ .van-nav-bar__text {
  color: #ff9b02;
  font-size: 1.143rem;
}
.dateRange /deep/ [class*="van-hairline"]::after {
  border-bottom: 1px solid rgb(232, 232, 232);
  border-top: 1px solid rgb(232, 232, 232);
}
</style> 
