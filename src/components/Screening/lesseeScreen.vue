<!-- 承租人筛选组件 -->
<template>
  <!--  -->
  <div class="Screening">
    <div
      @click="screeningShow = true"
      class="screeningText flex items-center pr-3 cursor-pointer text-gray-800 hover:text-blue-500"
    >
      <img class="order_icon" src="../../assets/dealer/select.png" alt />
      <span>筛选</span>
    </div>
    <van-overlay :show="screeningShow" @click="screeningShow = false" />
    <van-popup
      v-model="screeningShow"
      :overlay="false"
      position="right"
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="absolute inset-0 flex flex-col flex-1">
        <div class="flex-1 p-2 relative">
          <div class="absolute inset-0 overflow-y-scroll p-5">
            <div class="text-gray-700 font-bold">承租人名称</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.lesseeName"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">身份证号码</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.idcardNum"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">出生日期</div>
            <div class="flex justify-between items-center text-gray-600 mt-2">
              <div
                @click="showBirthdayTime = !showBirthdayTime; timeType=0; isShowBtnGroup = false;"
                class="bg-gray-200 flex-1 justify-center items-center flex"
                :style="{color: params.startBirthday ? '#252525' : '#80848d'}"
              >{{params.startBirthday ? $root.moment(params.startBirthday).format('YYYY-MM-DD') : '开始时间'}}</div>
              <div class="ml-2 mr-2">-</div>
              <div
                @click="showBirthdayTime = !showBirthdayTime; timeType=1; isShowBtnGroup = false;"
                :style="{color: params.endBirthday ? '#252525' : '#80848d'}"
                class="bg-gray-200 flex-1 justify-center items-center flex"
              >{{params.endBirthday ? $root.moment(params.endBirthday).format('YYYY-MM-DD') : '结束时间'}}</div>
            </div>

            <van-popup
              v-model="showBirthdayTime"
              position="bottom"
              :style="{ height: '40%'}"
              @click-overlay="closeOverlay"
            >
              <van-datetime-picker
                title="请选择时间"
                :formatter="formatter"
                v-model="birthdayTimeStr"
                :min-date="minDate"
                type="date"
                @confirm="confirmBirthdayTime"
                @cancel="showBirthdayTime=false;isShowBtnGroup=true;"
              />
            </van-popup>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">负责人</div>

              <div
                class="flex-1 ml-3 flex pl-1"
                @click="showUserDeptA = true;isShowBtnGroup=false;"
                style="background-color: #F8FAFB; height: 2.5rem; line-height: 2.5rem; padding-left:10px;"
              >
                <div
                  class="flex-1"
                  v-if="params.ownerUserGids.length"
                >{{params.ownerUserGids.map(r=>r.refRlNm|| r.ownerUserName).join(',')}}</div>
                <div class="flex-1" v-else style="color:rgba(69, 90, 100, 0.6)">请选择负责人</div>
              </div>
            </div>

            <UserDeptList
              class="userListDeptBox"
              v-if="showUserDeptA"
              :deptTree="false"
              @cancel="showUserDeptA=false;isShowBtnGroup=true;"
              @confirm="(data)=>{showUserDeptA = false, isShowBtnGroup=true,params.ownerUserGids = data.map(r=>{return {refRlNm:r.split('_')[0],id:r.split('_')[1]}})}"
              :memberList="params.ownerUserGids.map(r=>(r.refRlNm || r.ownerUserName) +'_'+(r.id || r.ownerUserGid))"
            />

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">参与人</div>

              <div
                class="flex-1 ml-3 flex pl-1"
                @click="showUserDeptB = true;isShowBtnGroup=false;"
                style="background-color: #F8FAFB; height: 2.5rem; line-height: 2.5rem; padding-left:10px;"
              >
                <div
                  class="flex-1"
                  v-if="params.followerUserGids.length"
                >{{params.followerUserGids.map(r=>r.refRlNm|| r.ownerUserName).join(',')}}</div>
                <div class="flex-1" v-else style="color:rgba(69, 90, 100, 0.6)">请选择参与人</div>
              </div>
            </div>

            <UserDeptList
              class="userListDeptBox"
              v-if="showUserDeptB"
              :deptTree="false"
              @cancel="showUserDeptB=false;isShowBtnGroup=true;"
              @confirm="(data)=>{showUserDeptB = false, isShowBtnGroup=true,params.followerUserGids = data.map(r=>{return {refRlNm:r.split('_')[0],id:r.split('_')[1]}})}"
              :memberList="params.followerUserGids.map(r=>(r.refRlNm || r.ownerUserName) +'_'+(r.id || r.ownerUserGid))"
            />

            <div class="text-gray-700 font-bold mt-5">客户类型</div>
            <div class="flex items-center mt-2">
              <div
                @click="lesseeTypeShow = !lesseeTypeShow;isShowBtnGroup=false;lesseeTypeRow=lesseeTypeRowArr.map(item => item)"
                class="bg-gray-200 flex-1 items-center flex px-3"
                :style="{color: params.lesseeType.length ? '#252525' : '#80848d'}"
              >{{params.lesseeType.length ? lesseeTypeNames.toString(): '请选择'}}</div>

              <van-popup
                v-model="lesseeTypeShow"
                position="bottom"
                :style="{ height: '30%'}"
                @click-overlay="closeOverlay"
                class="flex flex-col checkBoxGroup"
              >
                <van-nav-bar
                  title="请选择客户类型"
                  left-text="取消"
                  right-text="确定"
                  left-arrow
                  @click-left="lesseeTypeShow = false;isShowBtnGroup=true;"
                  @click-right="confirm"
                />
                <div class="flex-1 relative h-full">
                  <div class="absolute inset-0 overflow-y-auto">
                    <van-checkbox-group v-model="lesseeTypeRow">
                      <van-cell-group>
                        <van-cell
                          v-for="(r,i) in $store.state.lessee.lesseeTypeList"
                          :key="i"
                          :title="r.text"
                          clickable
                        >
                          <van-checkbox :name="r" slot="right-icon" />
                        </van-cell>
                      </van-cell-group>
                    </van-checkbox-group>
                  </div>
                </div>
              </van-popup>
            </div>

            <div class="text-gray-700 font-bold mt-5">性别</div>
            <div class="flex items-center mt-2">
              <div
                @click="genderShow = true;isShowBtnGroup=false;"
                class="bg-gray-200 flex-1 items-center flex px-3"
                :style="{color: selectGender ? '#252525' : '#80848d'}"
              >{{selectGender ? selectGender: '请选择'}}</div>

              <van-popup
                v-model="genderShow"
                position="bottom"
                :style="{ height: '40%'}"
                @click-overlay="closeOverlay"
                class="radioGroup"
              >
                <van-nav-bar
                  title="请选择性别"
                  left-text="取消"
                  right-text="确定"
                  left-arrow
                  @click-left="genderShow = false;isShowBtnGroup=true;"
                  @click-right="genderShow = false;selectGender = defultGender;isShowBtnGroup = true;params.gender = genderValus"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
                  style="top:46px;"
                >
                  <van-radio-group v-model="genderValus">
                    <van-cell-group>
                      <van-cell
                        :title="r.text"
                        clickable
                        @click="genderValus = r.value"
                        v-for="(r,i) in $store.state.lessee.genderList"
                        :key="i"
                      >
                        <van-radio slot="right-icon" :name="r.value" />
                      </van-cell>
                    </van-cell-group>
                  </van-radio-group>
                </div>
              </van-popup>
            </div>

            <div class="text-gray-700 font-bold mt-5">承租人状态</div>
            <div class="flex flex-wrap text-center text-gray-600">
              <div
                :class="['p-2 bg-gray-200 w-24 mr-2 mb-1 mt-2 flex-1',{lesseeStatus: params.lesseeStatus == 0}]"
                @click="params.lesseeStatus = 0"
              >全部</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-2 mb-1 mt-2 flex-1',{lesseeStatus: params.lesseeStatus == 1}]"
                @click="params.lesseeStatus = 1"
              >线索承租人</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-2 mb-1 mt-2 flex-1',{lesseeStatus: params.lesseeStatus == 2}]"
                @click="params.lesseeStatus = 2"
              >已出单</div>
            </div>

            <div class="text-gray-700 font-bold mt-5">手机号码</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.lesseePhone"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">户口所在地</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.domicilePlace"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">家庭住址</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.homeAddress"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">从业年限</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                v-model.trim="params.workingYears"
                type="number"
                pattern="[0-9]*"
                placeholder="请输入"
                οnpaste="return false;"
                @input="params.workingYears=params.workingYears.replace(/\D/g,'')"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">备注信息</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.comment"
                :rows="5"
                style="background-color: #F8FAFB; color: #252525;  padding:0; padding-left:10px;margin-bottom:1rem;"
                placeholder="请输入"
                type="textarea"
                maxlength="300"
              />
            </div>
          </div>
        </div>

        <div class="flex text-center" v-show="isShowBtnGroup">
          <div
            class="w-2/5 bg-gray-300 p-3 text-xl font-bold"
            style="background:#EFF1F3;color:#252525;"
            @click="reset"
          >重置</div>
          <div
            class="flex-1 bg-orange p-3 text-xl font-bold text-white"
            style="background-image: linear-gradient( to left, #FF9505, #FEC43A);"
            @click="finish"
          >完成</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import UserList from "@/components/UserList/index.vue";
import UserDeptList from "@/components/UserDeptList";
export default {
  name: "Screening",
  components: {
    UserList,
    UserDeptList
  },
  props: ["lesseeStatusValue", "followerUserGidsValue", "ownerUserGidsValue"],
  data() {
    return {
      showUserDeptA: false,
      showUserDeptB: false,
      screeningShow: false,
      isShowBtnGroup: true,
      params: {
        lesseeName: "",
        idcardNum: "",
        endBirthday: "",
        startBirthday: "",
        lesseeStatus: 0,
        gender: "",
        followerUserGids: [],
        ownerUserGids: [],
        lesseeType: [],
        lesseePhone: "",
        domicilePlace: "",
        homeAddress: "",
        workingYears: "",
        comment: ""
      },

      // 出生日期
      timeType: 0,
      showBirthdayTime: false,
      birthdayTimeStr: new Date(this.$root.moment().format("YYYY-MM-DD")),
      minDate: new Date(1899, 12, 1),

      lesseeTypeShow: false,
      lesseeTypeRow: [],
      lesseeTypeNames: [],
      lesseeTypeRowArr: [],

      genderShow: false,
      genderValus: "",
      defultGender: "",
      selectGender: ""
    };
  },
  mounted() {},
  watch: {
    screeningShow(val) {
      this.params.lesseeStatus = this.lesseeStatusValue;
      this.params.followerUserGids = this.followerUserGidsValue;
      this.params.ownerUserGids = this.ownerUserGidsValue;
      if (val) {
        this.showUserDeptA = false;
        this.showUserDeptB = false;
      }
    },
    genderValus(type) {
      if (typeof type != "string") {
        this.defultGender = this.$store.state.lessee.genderList[type].text;
      }
    }
  },
  methods: {
    setParams(val) {
      this.params.ownerUserGids = val;
    },
    finish() {
      this.screeningShow = false;
      // this.params.comment = this.params.comment.trim()
      this.$emit("onSearch", this.params);
    },
    closeOverlay() {
      this.isShowBtnGroup = true; // 点击遮罩层时显示按钮
    },
    // 重置
    reset() {
      this.params = {
        lesseeName: "",
        idcardNum: "",
        endBirthday: "",
        startBirthday: "",
        gender: "",
        followerUserGids: [],
        ownerUserGids: [],
        lesseeType: [],
        lesseePhone: "",
        domicilePlace: "",
        homeAddress: "",
        workingYears: "",
        comment: "",
        lesseeStatus: 0
      };
      this.lesseeTypeRowArr = [];
      this.selectGender = "";
      this.genderValus = "";
      // this.finish();
    },

    // 出生日期确认
    confirmBirthdayTime() {
      this.isShowBtnGroup = true;
      let timeStr = !this.timeType
        ? this.$root
            .moment(this.birthdayTimeStr)
            .startOf("day")
            .valueOf()
        : this.$root
            .moment(this.birthdayTimeStr)
            .endOf("day")
            .valueOf();
      !this.timeType
        ? new Date(
            this.$root.moment(timeStr).format("YYYY-MM-DD 00:00:00")
          ).getTime()
        : new Date(
            this.$root.moment(timeStr).format("YYYY-MM-DD 23:59:59")
          ).getTime();
      if (
        !this.timeType &&
        this.params.endBirthday &&
        timeStr > this.params.endBirthday
      ) {
        this.$toast("开始时间要小于结束时间");
        return;
      }
      if (
        this.timeType &&
        this.params.startBirthday &&
        timeStr < this.params.startBirthday
      ) {
        this.$toast("结束时间要大于开始时间");
        return;
      }
      this.timeType
        ? (this.params.endBirthday = timeStr)
        : (this.params.startBirthday = timeStr);
      this.showBirthdayTime = false;
    },

    confirm() {
      this.lesseeTypeShow = false;
      this.isShowBtnGroup = true;

      this.params.lesseeType = this.lesseeTypeRow.map(r => r.value);
      this.lesseeTypeNames = this.lesseeTypeRow.map(r => r.text);
      this.lesseeTypeRowArr = this.lesseeTypeRow.map(item => item);
    }
  }
};
</script>

<style scoped>
.screeningText::after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -5px;
  border: 3px solid;
  /* border-color: transparent transparent currentColor currentColor; */
  /* -webkit-transform: rotate(-45deg); */
  /* transform: rotate(-45deg); */
  /* opacity: .8; */
  /* content: ''; */
}
.screeningText:hover::after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -2px;
  border: 3px solid;
  border-color: transparent transparent currentColor currentColor;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  opacity: 0.8;
  content: "";
}
.bg-orange {
  background: linear-gradient(
    270deg,
    rgba(255, 146, 2, 1) 0%,
    rgba(252, 254, 124, 1) 100%
  );
}

.Screening /deep/ .van-dropdown-menu__item {
  -webkit-justify-content: left;
  justify-content: left;
}

.lesseeStatus {
  background-color: #fff2e6 !important;
  position: relative;
  color: #ff9b02 !important;
}
.lesseeStatus::after {
  position: absolute;
  right: 0;
  bottom: 0;
  border: 6px solid;
  border-color: transparent #ff9b02 #ff9b02 transparent;
  content: "";
}

.Screening /deep/ .van-picker__cancel,
.Screening /deep/ .van-picker__confirm {
  color: #ff9b02;
  font-size: 1.143rem;
}

.Screening /deep/ .van-picker__toolbar {
  display: -webkit-box !important;
}
.Screening /deep/ .van-picker__frame,
.van-picker__loading .van-loading {
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Screening /deep/ .screeningText {
  color: #80848d;
}
.order_icon {
  width: 1.286rem;
  height: 1.286rem;
  display: inline-block;
  margin-right: 0.3rem;
}

.Screening .bg-gray-200 {
  background: #f8fafb;
  height: 2.5rem;
}
.Screening .text-gray-700 {
  color: #252525;
}
.DealerManage .Screening /deep/ .van-dropdown-menu__title {
  padding: 0;
  color: inherit;
}

.Screening /deep/ input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #80848d;
  font-size: 14px;
}

.Screening /deep/ input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #80848d;
  font-size: 14px;
}

.Screening /deep/ input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #80848d;
  font-size: 14px;
}

.Screening /deep/ input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #80848d;
  font-size: 14px;
}

.Screening /deep/ .van-field__control {
  color: #252525;
}
.userListDeptBox /deep/ .topB {
  border-top: 1px solid #eee;
}

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

.radioGroup /deep/ .van-radio__icon--checked .van-icon {
  background-color: transparent;
  border-color: transparent;
  color: #ff9b02;
  font-size: 1.5rem;
}
.radioGroup /deep/ .van-radio__icon .van-icon {
  border: 0px;
  width: 1.5rem;
  height: 1.5rem;
}
.radioGroup /deep/ .van-radio__icon {
  font-size: 1.5rem;
}
.radioGroup /deep/ .van-icon-success:before {
  font-size: 1.5rem;
}
.radioGroup /deep/ .van-nav-bar__text {
  color: #ff9b02;
  font-size: 1.143rem;
}
.radioGroup /deep/ .van-nav-bar .van-icon {
  color: #ff9b02;
  font-size: 1.143rem;
  display: none;
}
.radioGroup /deep/ .van-nav-bar__arrow + .van-nav-bar__text {
  margin-left: -25px;
}
</style>