<!-- 经销商筛选组件 -->
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
            <div class="text-gray-700 font-bold">经营商名称</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.dealerName"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入用户名"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">创建时间</div>
            <div class="flex justify-between items-center text-gray-600 mt-2">
              <div
                @click="showTime = !showTime; timeType=0;"
                class="bg-gray-200 flex-1 justify-center items-center flex"
                :style="{color: params.startTime ? '#252525' : '#80848d'}"
              >{{params.startTime ? $root.moment(params.startTime).format('YYYY-MM-DD') : '开始时间'}}</div>
              <div class="ml-2 mr-2">-</div>
              <div
                @click="showTime = !showTime; timeType=1;"
                :style="{color: params.endTime ? '#252525' : '#80848d'}"
                class="bg-gray-200 flex-1 justify-center items-center flex"
              >{{params.endTime ? $root.moment(params.endTime).format('YYYY-MM-DD') : '结束时间'}}</div>
            </div>

            <van-popup v-model="showTime" position="bottom" :style="{ height: '40%'}">
              <van-datetime-picker
                title="请选择时间"
                :formatter="formatter"
                v-model="timeStr"
                type="date"
                @confirm="confirmTaskTime"
                @cancel="showTime=false"
              />
            </van-popup>

            <div class="text-gray-700 font-bold mt-5">所属区域</div>
            <div class="flex flex-wrap mt-2">
              <van-dropdown-menu
                class="mr-1 flex-1"
                :style="{color: params.provinceVal ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.provinceVal"
                  :options="$store.state.dealer.provincesList"
                />
              </van-dropdown-menu>
              <van-dropdown-menu
                v-if="$store.state.dealer.citysList.length"
                class="text-gray-600 mr-1 flex-1"
                :style="{color: params.cityVal ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.cityVal"
                  :options="$store.state.dealer.citysList"
                />
              </van-dropdown-menu>
              <van-dropdown-menu
                v-if="$store.state.dealer.areasList.length"
                class="text-gray-600 mr-1 flex-1"
                :style="{color: params.areaVal ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.areaVal"
                  :options="$store.state.dealer.areasList"
                />
              </van-dropdown-menu>
            </div>

            <div class="text-gray-700 font-bold mt-5">经销商分级</div>
            <div class="flex flex-wrap text-center text-gray-600 mt-2">
              <div
                v-for="(r,i) of levelValue"
                :key="i"
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{cardStatus:params.level.includes(i+1)}]"
                @click="changeStatus(i+1)"
              >{{r}}</div>
              <!-- <div :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{cardStatus: params.level == 3}]" @click="params.level = params.level == 3 ? '' : 3">三级经销商</div> -->
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">负责人</div>
              <!-- {{params.ownerUserGids}} -->
              <!-- <UserList
                title="选择负责人"
                :paramsVal="params.ownerUserGids"
                @setParams="val=>params.ownerUserGids = val"
                class="text-gray-600  ellipsis flex-1 ml-3"
                style="background-color: #F8FAFB; height: 2.5rem; line-height: 2.5rem; padding-left:10px;"
              />-->

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

            <div class="text-gray-700 font-bold mt-5">未拜访天数</div>
            <div class="flex items-center mt-2">
              <van-dropdown-menu
                class="text-gray-600 flex-1"
                :style="{color: params.notVisitConditions ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.notVisitConditions"
                  :options="$store.state.dealer.conditions"
                />
              </van-dropdown-menu>
              <div class="bg-gray-200 flex-1 ml-1">
                <van-field
                  type="number"
                  v-model="params.notVisitDays"
                  pattern="[0-9]*"
                  @input="val=>!/^[0-9]+$/.test(val) && (this.params.notVisitDays = '')"
                  style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                  placeholder="天数"
                />
              </div>
            </div>

            <div class="text-gray-700 font-bold mt-5">拜访次数</div>
            <div class="flex items-center mt-2">
              <!-- <div class="flex-1"></div> -->
              <van-dropdown-menu
                class="text-gray-600 flex-1"
                :style="{color: params.visitConditions ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.visitConditions"
                  :options="$store.state.dealer.conditions"
                />
              </van-dropdown-menu>
              <div class="bg-gray-200 flex-1 ml-1">
                <van-field
                  type="number"
                  v-model="params.visitCount"
                  pattern="[0-9]*"
                  @input="val=>!/^[0-9]+$/.test(val) && (this.params.visitCount = '')"
                  style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                  placeholder="次数"
                />
              </div>
            </div>

            <div class="text-gray-700 font-bold mt-5">公司归属</div>
            <div class="flex items-center mt-2">
              <!-- <van-dropdown-menu
                class="text-gray-600 flex-1"
                :style="{color: params.ownerCd ? '#252525' : '#80848d', backgroundColor: '#F8FAFB',  height: '2.5rem', paddingLeft:'10px'}"
              >
                <van-dropdown-item
                  v-model="params.ownerCd"
                  :options="$store.state.dealer.ownerCdTypes"
                />
              </van-dropdown-menu>-->
              <div
                @click="ownerCdShow = !ownerCdShow"
                class="bg-gray-200 flex-1 items-center flex px-3"
                :style="{color: params.ownerCd.length ? '#252525' : '#80848d'}"
              >{{params.ownerCd.length ? params.ownerCd.map(r=>$store.state.dealer.ownerCdTypes[r]).join(',') : '请选择'}}</div>

              <van-popup
                v-model="ownerCdShow"
                position="bottom"
                :style="{ height: '30%'}"
                class="flex flex-col checkBoxGroup"
              >
                <van-nav-bar
                  title="请选择公司归属"
                  left-text="取消"
                  right-text="确定"
                  left-arrow
                  @click-left="ownerCdShow = false"
                  @click-right="ownerCdShow = false"
                />

                <van-checkbox-group v-model="params.ownerCd" style="height: 100%;overflow: scroll;">
                  <van-cell-group>
                    <van-cell
                      v-for="(r,i) in $store.state.dealer.ownerCdTypes"
                      :key="i"
                      :title="r"
                      clickable
                    >
                      <van-checkbox :name="i" slot="right-icon" />
                    </van-cell>
                  </van-cell-group>
                </van-checkbox-group>
              </van-popup>
            </div>

            <div class="text-gray-700 font-bold mt-5">法人姓名</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.contactsName"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">统一社会信用代码</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.creditCode"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">注册地址</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.address"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">业务类型</div>
            <div class="flex flex-wrap text-center text-gray-600 mt-2">
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.followStatus == 0}]"
                @click="params.followStatus = 0"
              >全部</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.followStatus == 1}]"
                @click="params.followStatus = 1"
              >线索入库</div>
              <div
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus: params.followStatus == 2}]"
                @click="params.followStatus = 2"
              >合作中</div>

              <!-- <div
                v-for="(r,i) of followStatusVal"
                :key="i"
                :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{businessCardStatus:params.followStatus.includes(i+1)}]"
                @click="changefollowStatus(i+1)"
              >{{r}}</div>-->
            </div>

            <!-- 时间段 -->
            <div class="text-gray-700 font-bold mt-5">成立日期</div>
            <div class="flex justify-between items-center text-gray-600 mt-2">
              <div
                @click="showEstablishTime = !showEstablishTime; establishTimeType=0;"
                class="bg-gray-200 flex-1 justify-center items-center flex"
                :style="{color: params.startEstablishTime ? '#252525' : '#80848d'}"
              >{{params.startEstablishTime ? $root.moment(params.startEstablishTime).format('YYYY-MM-DD') : '开始时间'}}</div>
              <div class="ml-2 mr-2">-</div>
              <div
                @click="showEstablishTime = !showEstablishTime; establishTimeType=1;"
                :style="{color: params.endEstablishTime ? '#252525' : '#80848d'}"
                class="bg-gray-200 flex-1 justify-center items-center flex"
              >{{params.endEstablishTime ? $root.moment(params.endEstablishTime).format('YYYY-MM-DD') : '结束时间'}}</div>
            </div>

            <van-popup v-model="showEstablishTime" position="bottom" :style="{ height: '40%'}">
              <van-datetime-picker
                title="请选择时间"
                :formatter="formatter"
                v-model="establishTimeStr"
                type="date"
                @confirm="confirmEstablishTime"
                @cancel="showEstablishTime=false"
              />
            </van-popup>

            <!-- 一个时间点 -->
            <!-- <div class="flex justify-between items-center text-gray-600 mt-2">
              <div
                @click="showEstablishTime = !showEstablishTime; timeType=2;"
                class="bg-gray-200 flex-1 items-center flex px-3"
                :style="{color: params.establishTime ? '#252525' : '#80848d'}"
              >{{params.establishTime ? $root.moment(params.establishTime).format('YYYY-MM-DD') : '请选择'}}</div>
            </div>

            <van-popup v-model="showEstablishTime" position="bottom" :style="{ height: '40%'}">
              <van-datetime-picker
                title="请选择时间"
                :formatter="formatter"
                v-model="establishTimeStr"
                type="date"
                @confirm="confirmEstablishTime"
                @cancel="showEstablishTime=false"
              />
            </van-popup>-->

            <div class="text-gray-700 font-bold mt-5">证件类型</div>
            <div class="flex justify-between items-center text-gray-600 mt-2">
              <div
                @click="certTypCdShow = !certTypCdShow"
                class="bg-gray-200 flex-1 items-center flex px-3"
                :style="{color: params.certTypCd.length ? '#252525' : '#80848d'}"
              >{{params.certTypCd.length ? params.certTypCd.map(r=>$store.state.record.certTypCd[r]).join(',') : '请选择'}}</div>
            </div>
            <van-popup
              v-model="certTypCdShow"
              position="bottom"
              :style="{ height: '40%'}"
              class="flex flex-col checkBoxGroup"
            >
              <van-nav-bar
                title="请选择法人证件类型"
                left-text="取消"
                right-text="确定"
                left-arrow
                @click-left="certTypCdShow = false"
                @click-right="certTypCdShow = false;"
              />
              <!-- <van-radio-group v-model="certTypCdVal" style="height: 100%;overflow: scroll;">
                <van-cell-group>
                  <van-cell
                    v-for="(r,i) in $store.state.record.certTypCd"
                    :key="i"
                    :title="r"
                    clickable
                    @click="certTypCdVal = i"
                  >
                    <van-radio slot="right-icon" :name="i" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>-->

              <div class="flex-1 relative h-full">
                <div class="absolute inset-0 overflow-y-auto">
                  <van-checkbox-group
                    v-model="params.certTypCd"
                    style="height: 100%;overflow: scroll;"
                  >
                    <van-cell-group>
                      <van-cell
                        v-for="(r,i) in $store.state.record.certTypCd"
                        :key="i"
                        :title="r"
                        clickable
                      >
                        <van-checkbox :name="i" slot="right-icon" />
                      </van-cell>
                    </van-cell-group>
                  </van-checkbox-group>
                </div>
              </div>
            </van-popup>

            <div class="text-gray-700 font-bold mt-5">证件号码</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.certNo"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">手机号码</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.contactsPhone"
                style="background-color: #F8FAFB; color: #252525; height: 2.5rem; padding:0; line-height: 2.5rem; padding-left:10px;"
                placeholder="请输入"
              />
            </div>

            <div class="text-gray-700 font-bold mt-5">备注信息</div>
            <div class="bg-gray-200 mt-2">
              <van-field
                v-model="params.comment"
                :rows="5"
                style="background-color: #F8FAFB; color: #252525;  padding:0; padding-left:10px;margin-bottom:1rem;"
                placeholder="请输入"
                type="textarea"
                maxlength="300"
              />
            </div>

            <!-- <div class="text-gray-700 font-bold  mt-5">关系健康度</div>
            <div class="flex flex-wrap justify-start text-center text-gray-600">
              <div v-for="(r,i) in $store.state.dealer.relationHealth" :key="i" 
                @click="params.relationHealth = params.relationHealth == r.id ? '' : r.id"
                :class="['p-2 cursor-pointer bg-gray-200 w-24 mr-1 mb-1', {cardStatus: r.id == params.relationHealth}]">
                {{r.text}}
              </div>
            </div>-->
          </div>
        </div>

        <div class="flex text-center z-auto">
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
  props: ["followStatusValue"],
  data() {
    return {
      showUserDeptA: false,
      showUserDeptB: false,
      screeningShow: false,
      params: {
        dealerName: "",
        startTime: "",
        endTime: "",
        relationHealth: "",
        notVisitDays: "",
        visitCount: "",
        notVisitConditions: 0,
        visitConditions: 0,
        level: [],
        ownerUserGids: [],
        area: "",
        areaVal: "",
        city: "",
        cityVal: "",
        province: "",
        provinceVal: "",
        followerUserGids: [], // 参与人id
        ownerCd: [], // 公司归属（ 1自有 2 第三方）
        contactsName: "", // 法人姓名
        creditCode: "", // 统一社会社会信用代码
        address: "", // 详细地址
        followStatus: 0, // 业务类型
        startEstablishTime: "", // 成立日期
        endEstablishTime: "",
        certTypCd: [], // 法人证件类型
        certNo: "", // 证件号码
        contactsPhone: "", //手机号码
        comment: ""
      },
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],

      showTime: false,
      timeStr: new Date(this.$root.moment().format("YYYY-MM-DD")),
      timeType: 0,

      //成立日期
      establishTimeType: 0,
      showEstablishTime: false,
      establishTimeStr: new Date(this.$root.moment().format("YYYY-MM-DD")),

      certTypCdShow: false,
      ownerCdShow: false,
      certTypCdVal: [],
      levelValue: ["一级经销商", "二级经销商"]
      // followStatusVal: ["线索入库", "合作中"]
    };
  },
  filters: {
    fiterUser(data) {
      if (!data.length) {
        return "请选择负责人";
      }
      let arr = [];
      data.map(r => {
        arr.push(r.refRlNm);
      });
      return arr.toString();
    }
  },
  mounted() {},
  watch: {
    screeningShow(val) {
      this.params.followStatus = this.followStatusValue;
      if (val) {
        this.showUserDeptA = false;
        this.showUserDeptB = false;
        !this.params.provinceVal &&
          this.$store.dispatch("getProvinces").then(data => {
            this.$store.state.dealer.provincesList.unshift({
              text: "请选择省份",
              value: ""
            });
            this.$store.state.dealer.citysList = [];
            this.$store.state.dealer.areasList = [];
            this.params.area = "";
            this.params.city = "";
            this.params.areaVal = "";
            this.params.cityVal = "";
          });
      }
    },
    "params.provinceVal"(val) {
      if (val) {
        this.$store.dispatch("getCitys", val).then(data => {
          this.$store.state.dealer.citysList &&
            this.$store.state.dealer.citysList.unshift({
              text: "请选择市区",
              value: ""
            });
        });
        this.$store.state.dealer.provincesList.some(r => {
          if (r.value == val) {
            this.params.province = r.text;
            return true;
          }
        });
      } else {
        this.$store.state.dealer.citysList = [];
      }
      this.$store.state.dealer.areasList = [];
      this.params.city = "";
      this.params.cityVal = "";
      this.params.area = "";
      this.params.areaVal = "";
    },
    "params.cityVal"(val) {
      if (val) {
        this.$store.dispatch("getAreas", val).then(data => {
          this.$store.state.dealer.areasList.length &&
            (this.$store.state.dealer.areasList[0].text = "请选择县");
        });
        this.$store.state.dealer.citysList.some(r => {
          if (r.value == val) {
            this.params.city = r.text;
            return true;
          }
        });
      } else {
        this.$store.state.dealer.areasList = [];
      }
      this.params.area = "";
      this.params.areaVal = "";
    },
    "params.areaVal"(val) {
      if (val) {
        this.$store.state.dealer.areasList.some(r => {
          if (r.value == val) {
            this.params.area = r.text;
            return true;
          }
        });
      } else {
        this.params.area = "";
      }
    }
  },
  methods: {
    setParams(val) {
      this.params.ownerUserGids = val;
    },
    finish() {
      this.screeningShow = false;
      this.$emit("onSearch", this.params);
    },
    // 确定时间
    confirmTaskTime() {
      let timeStr = !this.timeType
        ? this.$root
            .moment(this.timeStr)
            .startOf("day")
            .valueOf()
        : this.$root
            .moment(this.timeStr)
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
        this.params.endTime &&
        timeStr > this.params.endTime
      ) {
        this.$toast("开始时间要小于结束时间");
        // this.$notify({ type: "warning", message: "开始时间要小于结束时间" });
        return;
      }
      if (
        this.timeType &&
        this.params.startTime &&
        timeStr < this.params.startTime
      ) {
        this.$toast("结束时间要大于开始时间");
        // this.$notify({ type: "warning", message: "结束时间要大于开始时间" });
        return;
      }
      this.timeType
        ? (this.params.endTime = timeStr)
        : (this.params.startTime = timeStr);
      this.showTime = false;
    },
    // 重置
    reset() {
      this.params = {
        dealerName: "",
        startTime: "",
        endTime: "",
        relationHealth: "",
        notVisitDays: "",
        visitCount: "",
        notVisitConditions: 0,
        visitConditions: 0,
        level: [],
        ownerUserGids: [],
        area: "",
        areaVal: "",
        city: "",
        cityVal: "",
        province: "",
        provinceVal: "",

        followerUserGids: [], // 参与人id
        ownerCd: [], // 公司归属（ 1自有 2 第三方）
        contactsName: "", // 法人姓名
        creditCode: "", // 统一社会社会信用代码
        address: "", // 详细地址
        followStatus: 0, // 业务类型
        startEstablishTime: "", // 成立日期
        endEstablishTime: "",
        certTypCd: [], // 法人证件类型
        certNo: "", // 证件号码
        contactsPhone: "", //手机号码
        comment: ""
      };
      // this.finish();
    },

    // 成立时间确认
    // confirmEstablishTime() {
    //   if (this.timeType == 2) {
    //     this.params.establishTime = this.$root
    //       .moment(this.establishTimeStr)
    //       .startOf("day")
    //       .valueOf();
    //   }
    //   this.showEstablishTime = false;
    // },
    //经销商分级
    changeStatus(i) {
      if (this.params.level.includes(i)) {
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        //filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
        // this.params.level = this.params.level.filter(function(ele) {
        //   return ele != i;
        // });
        this.params.level = this.params.level.filter(ele => ele != i);
      } else {
        this.params.level.push(i);
      }
    },
    // 业务类型
    // changefollowStatus(i) {
    //   if (this.params.followStatus.includes(i)) {
    //     this.params.followStatus = this.params.followStatus.filter(
    //       ele => ele != i
    //     );
    //   } else {
    //     this.params.followStatus.push(i);
    //   }
    //   console.log(this.params.followStatus, "follow");
    // },
    confirmEstablishTime() {
      let timeStr = !this.establishTimeType
        ? this.$root
            .moment(this.establishTimeStr)
            .startOf("day")
            .valueOf()
        : this.$root
            .moment(this.establishTimeStr)
            .endOf("day")
            .valueOf();
      !this.establishTimeType
        ? new Date(
            this.$root.moment(timeStr).format("YYYY-MM-DD 00:00:00")
          ).getTime()
        : new Date(
            this.$root.moment(timeStr).format("YYYY-MM-DD 23:59:59")
          ).getTime();
      if (
        !this.establishTimeType &&
        this.params.endEstablishTime &&
        timeStr > this.params.endEstablishTime
      ) {
        this.$toast("开始时间要小于结束时间");
        // this.$notify({ type: "warning", message: "开始时间要小于结束时间" });
        return;
      }
      if (
        this.establishTimeType &&
        this.params.startEstablishTime &&
        timeStr < this.params.startEstablishTime
      ) {
        this.$toast("结束时间要大于开始时间");
        // this.$notify({ type: "warning", message: "结束时间要大于开始时间" });
        return;
      }
      this.establishTimeType
        ? (this.params.endEstablishTime = timeStr)
        : (this.params.startEstablishTime = timeStr);
      this.showEstablishTime = false;
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