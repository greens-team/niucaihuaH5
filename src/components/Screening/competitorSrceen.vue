<!-- 竞争对手筛选组件 -->
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
            <div class="text-gray-700 font-bold">竞争对手名称</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model.trim="params.competorName"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入用户名"
              />
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">负责人</div>
              <div
                class="flex-1 ml-3 flex pl-1"
                @click="showUserDeptA = true"
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
              @cancel="showUserDeptA=false"
              @confirm="(data)=>{showUserDeptA = false, params.ownerUserGids = data.map(r=>{return {refRlNm:r.split('_')[0],id:r.split('_')[1]}})}"
              :memberList="params.ownerUserGids.map(r=>(r.refRlNm || r.ownerUserName) +'_'+(r.id || r.ownerUserGid))"
            />

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">参与人</div>

              <div
                class="flex-1 ml-3 flex pl-1"
                @click="showUserDeptB = true"
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
              @cancel="showUserDeptB=false"
              @confirm="(data)=>{showUserDeptB = false, params.followerUserGids = data.map(r=>{return {refRlNm:r.split('_')[0],id:r.split('_')[1]}})}"
              :memberList="params.followerUserGids.map(r=>(r.refRlNm || r.ownerUserName) +'_'+(r.id || r.ownerUserGid))"
            />

            <div class="text-gray-700 font-bold mt-5">竞对类型</div>
            <div class="flex flex-wrap text-center text-gray-600 mt-2">
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.competorType == 0}]"
                @click="params.competorType = 0"
              >全部</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.competorType == 1}]"
                @click="params.competorType = 1"
              >第三方</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.competorType == 2}]"
                @click="params.competorType = 2"
              >厂商金融</div>

              <!-- <div
                v-for="(r,i) of followStatusVal"
                :key="i"
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus:params.followStatus.includes(i+1)}]"
                @click="changefollowStatus(i+1)"
              >{{r}}</div>-->
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

        <div class="flex text-center">
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
  data() {
    return {
      showUserDeptA: false,
      showUserDeptB: false,
      screeningShow: false,
      params: {
        competorName: "",
        competorType: 0,
        ownerUserGids: [],
        followerUserGids: [], // 参与人id
        comment: ""
      }
    };
  },
  mounted() {},
  watch: {
    screeningShow(val) {
      this.params.competorType = this.competorTypeValue;
      if (val) {
        this.showUserDeptA = false;
        this.showUserDeptB = false;
      }
    }
  },
  props: ["competorTypeValue"],
  methods: {
    setParams(val) {
      this.params.ownerUserGids = val;
    },
    finish() {
      this.screeningShow = false;
      this.$emit("onSearch", this.params);
    },
    // 重置
    reset() {
      this.params = {
        competorName: "",
        competorType: 0,
        ownerUserGids: [],
        followerUserGids: [], // 参与人id
        comment: ""
      };
      // this.finish();
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

.cardStatus {
  background-color: #fff2e6;
  position: relative;
  color: #ff9b02;
}
.cardStatus::after {
  position: absolute;
  right: 0;
  bottom: 0;
  border: 6px solid;
  border-color: transparent #ff9b02 #ff9b02 transparent;
  content: "";
}

.businessCardStatus {
  background-color: #fff2e6;
  position: relative;
  color: #ff9b02;
}
.businessCardStatus::after {
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
</style>