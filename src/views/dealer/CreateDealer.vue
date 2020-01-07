<!-- 创建经销商页面 -->
<template>
  <div class="CreateDealer flex-1 flex flex-col">
    <!-- <van-nav-bar
      :title="$route.query.editor ? '编辑经销商' : '新建经销商'"
      left-text="取消"
      @click-left="$router.go(-1)"
      left-arrow
    >
      <div v-if="$route.query.editor" slot="right" @click="save">保存</div>
      <div v-else slot="right" @click="nextStep">下一步</div>
    </van-nav-bar>-->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="delmapsource(),$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">{{$route.query.editor ? '编辑经销商' : '新建经销商'}}</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div
          v-if="$route.query.editor"
          class="text-center"
          slot="right"
          style="font-size:1.143rem;"
          @click="()=>{delmapsource(),save()}"
        >保存</div>
        <div
          v-else
          slot="right"
          class="text-center"
          style="font-size:1.143rem;"
          @click="nextStep"
        >下一步</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold p-3 pl-4" style="font-size:1.143rem;">备案信息</div>
        <van-field
          v-model="$store.getters.NDparams.dealerName"
          required
          :disabled="recordStatus"
          label="经销商名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="30"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">经销商名称不能为空</div>
        <van-field
          v-model="$store.getters.NDparams.creditCode"
          label="统一社会信用代码"
          :disabled="recordStatus"
          placeholder="请填写信息"
          label-width="130"
        />

        <!-- <van-field
          v-model="$store.getters.NDparams.establishTime"
          label="成立日期"
          placeholder="请填写信息"
          label-width="130"
        />-->

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">成立日期</div>
          <div
            class="flex-1"
            @click="!recordStatus && (establishTimeShow = true)"
            :style="{color:$store.getters.NDparams.establishTime && !recordStatus ?'#252525':'rgba(69, 90, 100, 0.6)'}"
          >{{$store.getters.NDparams.establishTime ? $root.moment($store.getters.NDparams.establishTime * 1000).format('YYYY-MM-DD') : '请选择时间'}}</div>
        </div>

        <!-- 开始时间 -->
        <van-popup v-model="establishTimeShow" position="bottom" class="dateBox">
          <van-datetime-picker
            :min-date="minDate"
            @cancel="establishTimeShow=false"
            @confirm="establishTimeShow=false;$store.commit('setParams', {establishTime: timeStamp(currentDate) / 1000})"
            v-model="currentDate"
            :formatter="formatter"
            type="date"
          />
        </van-popup>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">所属地区</div>
          <van-dropdown-menu class="flex-1 border-0 pr-3">
            <van-dropdown-item
              :disabled="recordStatus"
              v-model="$store.state.newDealer.params.rgnPrCd"
              :options="$store.state.dealer.provincesList"
            />
            <van-dropdown-item
              :disabled="recordStatus"
              v-model="$store.state.newDealer.params.rgnCyCd"
              :options="$store.state.dealer.citysList"
            />
            <van-dropdown-item
              :disabled="recordStatus"
              v-if="$store.state.dealer.areasList.length"
              v-model="$store.state.newDealer.params.rgnArCd"
              :options="$store.state.dealer.areasList"
            />
          </van-dropdown-menu>
        </div>

        <van-field
          v-model="$store.state.newDealer.params.address"
          label="注册地址"
          :disabled="recordStatus"
          placeholder="请填写注册地址"
          label-width="130"
        />
        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">公司归属</div>
          <van-dropdown-menu :class="['border-0', {'zeroCss':!$store.getters.NDparams.ownerCd}]">
            <van-dropdown-item
              :disabled="recordStatus"
              v-model="$store.getters.NDparams.ownerCd"
              :options="$store.getters.NDownerCdTypes"
            />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">业务类型</div>
          <div
            class="flex-1"
            :style="{color: typeList.length && !recordStatus ? '#252525' : 'rgba(69, 90, 100, 0.6)'}"
            @click="!recordStatus && (businessTypesShow = true)"
          >{{typeList | typeListFilter}}</div>
        </div>

        <van-popup v-model="businessTypesShow" position="bottom" :style="{ height: '40%'}" class="checkBoxGroup">
          <van-nav-bar
            title="请选择业务类型"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="businessTypesShow = false;"
            @click-right="typeList = $store.state.newDealer.businessTypesValues; businessTypesShow = false;"
          />
          <div
            class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
            style="top:46px;"
          >
            <van-checkbox-group v-model="$store.state.newDealer.businessTypesValues">
              <van-checkbox
                icon-size="16px"
                class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3"
                v-for="(r,i) in $store.getters.NDbusinessTypes"
                :key="i"
                :name="r"
              >{{r.text}}</van-checkbox>
            </van-checkbox-group>
          </div>
        </van-popup>

        <div v-if="id">
          <!-- <div class="relative formBar font-bold text-base p-3 pl-4">法人信息</div> -->
          <van-field
            v-model="$store.state.newDealer.params.contactsName"
            label="法人名称"
            :disabled="recordStatus"
            placeholder="请输入法人姓名"
            label-width="130"
          />
          <van-field
            v-model="$store.state.newDealer.params.contactsPhone"
            label="法人电话"
            pattern="[0-9]*"
            :disabled="recordStatus"
            placeholder="请输入法人电话"
            label-width="130"
          />
          <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
            <div style="width:130px; color:#323233;">法人证件类型</div>
            <div
              class="flex-1"
              :style="{color:$store.state.newDealer.params.certTypCd && !recordStatus ?'#252525':'rgba(69, 90, 100, 0.6)'}"
              @click="!recordStatus && (certTypCdShow = true)"
            >{{$store.state.newDealer.params.certTypCd ? $store.state.record.certTypCd[$store.state.newDealer.params.certTypCd] : '请选择'}}</div>
          </div>
          <van-field
            v-model="$store.state.newDealer.params.certNo"
            :disabled="recordStatus"
            label="法人证件号"
            placeholder="请输入法人证件号"
            label-width="130"
          />

          <van-popup
            v-model="certTypCdShow"
            position="bottom"
            :style="{ height: '40%'}"
            class="radioGroup"
          >
            <van-nav-bar
              title="请选择法人证件类型"
              left-text="取消"
              right-text="确定"
              left-arrow
              @click-left="certTypCdShow = false"
              @click-right="certTypCdShow = false; $store.state.newDealer.params.certTypCd = certTypCdVal;"
            />
            <van-radio-group v-model="certTypCdVal" style="height: 100%;overflow: scroll;">
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
            </van-radio-group>
          </van-popup>

          <div></div>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">地理位置</div>
          <div
            class="flex-1"
            @click="!recordStatus && ($store.getters.NDparams.gid ? $router.push({path:'/map',query:{lng:$store.getters.NDparams.longitude,lat:$store.getters.NDparams.latitude,edit:true}}) : $router.push('/map'))"
            :style="{color:$store.getters.NDparams.locationName && !recordStatus ? '#252525' : 'rgba(69, 90, 100, 0.6)'}"
          >{{$store.getters.NDparams.locationName || '选择地图位置'}}</div>
        </div>

        <div class="relative formBar font-bold p-3 pl-4" style="font-size:1.143rem;">基本信息</div>

        <!-- longitude -->
        <!-- <van-field
          v-model="$store.getters.NDparams.latitude"
          label="地理位置"
          @focus="$router.push('/map')"
          placeholder="请填写经纬度"
          label-width="130"
        />-->

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">经销商分级</div>
          <van-dropdown-menu :class="['border-0', {'zeroCss':!$store.getters.NDparams.level}]">
            <van-dropdown-item
              v-model="$store.getters.NDparams.level"
              :options="$store.getters.NDlevelList"
            />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-2 items-center pt-3 pb-3">
          <span class="text-red-500">*</span>
          <div style="width:130px; color:#323233;">负责人</div>
          <UserList
            title="选择负责人"
            :paramsVal="ownerUserGidsA"
            @setParams="val=>{$store.state.newDealer.params.ownerUserList = val, ownerUserGidsA = val}"
            class="flex-1"
          />
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">参与人</div>
          <UserList
            title="选择参与人"
            :paramsVal="ownerUserGidsB"
            @setParams="val=>{$store.state.newDealer.params.followerUserList=val,ownerUserGidsB = val}"
            class="flex-1"
          />
        </div>

        <van-field
          v-model="$store.getters.NDparams.comment"
          :rows="5"
          autosize
          type="textarea"
          maxlength="150"
          label="备注信息"
          placeholder="请输入备注信息"
          label-width="130"
          show-word-limit
        />
        <div></div>
      </div>
    </div>

    <!-- <van-popup v-model="showNext" position="bottom">
      <div class="bg-gray-200">
        <div
          @click="goContactsList"
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
        >新建联系人</div>
        <div
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
          @click="createDealer"
        >直接新建经销商</div>
        <div
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer mt-3"
          @click="showNext=false"
        >取消</div>
      </div>
    </van-popup>-->

    <van-popup v-model="showNext" position="bottom">
      <div class="bg-gray-200">
        <div
          @click="goContactsList"
          class="text-center font-bold text-xl border-b border-gray-300 bg-white h-16 flex items-center justify-center cursor-pointer"
          style="color:#FF9B02"
        >新建联系人</div>
        <div
          class="text-center font-bold text-xl bg-white h-16 flex items-center justify-center cursor-pointer"
          style="color:#FF9B02"
          @click="createDealer"
        >直接新建经销商</div>
        <div
          class="text-center bg-white h-16 text-xl flex items-center justify-center cursor-pointer mt-3"
          @click="showNext=false"
        >取 消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import UserList from "@/components/UserList/index.vue";
export default {
  name: "CreateDealer",
  components: {
    UserList
  },
  data() {
    return {
      minDate: new Date(1899, 12, 1),
      showNext: false,
      businessTypesShow: false,
      typeList: [],

      ownerUserGidsA: [],
      ownerUserGidsB: [],

      currentDate: new Date(),
      establishTimeShow: false,

      initCount: 0,

      id: "",
      certTypCdShow: false,
      certTypCdVal: "",
      existLegal: false, //法人是否存在
      isShowErrorNameMsg: false,

      recordStatus: false
    };
  },

  filters: {
    typeListFilter(data) {
      let arr = [];
      data.map(r => {
        arr.push(r.text);
      });
      return arr.length ? arr.toString() : "请选择类型";
    }
  },
  mounted() {
    // console.log(this.$store.state.newDealer.params.chkBusTypCdList,this.$store.state.newDealer.businessTypesValues, 998877)
    this.recordStatus = !!this.$store.getters.NDparams.recordStatus;
    // this.$store.commit('setNewDealerParams')

    if (!this.$store.state.newDealer.params.chkBusTypCdList) {
      this.$store.state.newDealer.businessTypesValues = [];
    }
    this.typeList = this.$store.state.newDealer.params.chkBusTypCdList
      ? this.$store.state.newDealer.businessTypesValues
      : [];

    // 从地图页面回来时 回显地理位置
    let mapInfo = {
      locationName: "",
      longitude: "",
      latitude: ""
    };

    if (this.$store.getters.NDparams.locationName) {
      mapInfo.locationName = this.$store.getters.NDparams.locationName;
      mapInfo.longitude = this.$store.getters.NDparams.longitude;
      mapInfo.latitude = this.$store.getters.NDparams.latitude;
    }

    this.$store.state.newDealer.params.ownerUserList = this.$store.state
      .newDealer.params.ownerUserList || [
      {
        id: JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID,
        refRlNm: JSON.parse(sessionStorage.userInfo).EMPLOYEE_NAME
      }
    ];
    // 负责人默认为当前登录用户
    this.ownerUserGidsA = this.$store.state.newDealer.params.ownerUserList;
    this.ownerUserGidsB =
      this.$store.state.newDealer.params.followerUserList || [];

    this.id = this.$route.query.id || "";
    if (this.$route.query.id && !sessionStorage.mapsource) {
      this.$store.dispatch("getinfo", this.id).then(() => {
        this.$store.commit("setNewDealerParams");

        mapInfo.locationName &&
          (this.$store.state.dealerInfo.baseInfo.locationName =
            mapInfo.locationName);
        mapInfo.longitude &&
          (this.$store.state.dealerInfo.baseInfo.longitude = mapInfo.longitude);
        mapInfo.latitude &&
          (this.$store.state.dealerInfo.baseInfo.latitude = mapInfo.latitude);

        this.$store.commit("setParams", this.$store.state.dealerInfo.baseInfo);

        this.existLegal = this.$store.state.newDealer.params.contactsName
          ? true
          : false;

        this.$store.commit("setParams", {
          rgnPrCd: this.$store.state.newDealer.params.rgnPrCd,
          province: this.$store.state.newDealer.params.province
        });
        if (this.$route.query.editor) {
          // 从详情页面 到 编辑信息时
          this.initCount++;
          this.getCity(this.$store.state.newDealer.params.rgnPrCd);
        }

        this.typeList = this.$store.state.newDealer.businessTypesValues || [];
        this.typeList = this.$store.getters.NDbusinessTypes.filter(r => {
          return this.$store.state.newDealer.params.chkBusTypCdList.includes(
            r.value
          );
        });

        // 回显赋值
        this.ownerUserGidsA = this.$store.state.newDealer.params.ownerUserList;
        this.ownerUserGidsB = this.$store.state.newDealer.params.followerUserList;
      });
    }

    //  this.typeList = this.$store.getters.NDbusinessTypes.filter(r=>{
    //       return this.$store.state.newDealer.params.chkBusTypCdList.includes(r.value)
    //     })

    this.$store.dispatch("getProvinces").then(data => {
      this.$store.commit("setParams", {
        rgnPrCd: this.$store.state.newDealer.params.rgnPrCd || data[0].value,
        province: this.$store.state.newDealer.params.province || data[0].text
      });
    });
  },
  watch: {
    ownerUserGidsA(data) {
      console.log(data);
      let vals = [];
      data.map(r => {
        vals.push(r.ownerUserGid || r.id);
      });
      this.$store.state.newDealer.params.ownerUserGids = vals.toString();
    },
    ownerUserGidsB(data) {
      let vals = [];
      data.map(r => {
        vals.push(r.ownerUserGid || r.id);
      });
      this.$store.state.newDealer.params.followerUserGids = vals.toString();
    },
    typeList(data) {
      let vals = [];
      data.map(r => {
        vals.push(r.value);
      });
      this.$store.state.newDealer.params.chkBusTypCdList = vals.toString();
    },
    "$store.state.newDealer.params.rgnPrCd"(code) {
      this.initCount++;
      code && this.getCity(code);
    },
    "$store.state.newDealer.params.rgnCyCd"(code) {
      this.initCount++;
      code && this.getArea(code);
    },
    "$store.state.newDealer.params.rgnArCd"(code) {
      this.$store.state.dealer.areasList.length &&
        this.$store.state.dealer.areasList.some(r => {
          if (r.value === code) {
            this.$store.commit("setParams", {
              rgnArCd: code, //this.$store.state.newDealer.params.rgnArCd ||
              area: r.text //this.$store.state.newDealer.params.area ||
            });
            return true;
          }
        });
    }
  },
  methods: {
    delmapsource() {
      sessionStorage.mapsource && delete sessionStorage.mapsource;
    },
    getArea(code) {
      this.$store.state.dealer.citysList.some(r => {
        if (r.value === code) {
          this.$store.commit("setParams", {
            rgnCyCd: code,
            city: r.text
          });
          return true;
        }
      });
      console.log(this.$store.state.dealer.areasList, 111);

      this.$store.dispatch("getAreas", code).then(data => {
        this.$store.state.dealer.areasList.shift();
        // if(data.length && this.initCount == 1 && this.$store.state.newDealer.params.rgnArCd){
        //   this.$store.commit("setParams", {
        //     rgnArCd: this.$store.state.newDealer.params.rgnArCd,
        //     area: this.$store.state.newDealer.params.area
        //   })
        //   return true
        // }
        // if(data.length && this.initCount == 1 && !this.$store.state.newDealer.params.rgnArCd){
        //   this.$store.commit("setParams", {
        //     rgnArCd: data[1].value,
        //     area: data[1].text
        //   })
        //   return true
        // }

        // this.$store.commit("setParams", {
        //     rgnArCd: '',
        //     area: ''
        //   })

        // this.$store.commit("setParams", {
        //   rgnArCd: data.length && this.initCount == 1 && this.$store.state.newDealer.params.rgnArCd ?  data[1].value : '',
        //   area: data.length && this.initCount == 1 && this.$store.state.newDealer.params.area ? data[1].text : ''
        // })

        // this.$store.commit("setParams", {
        //   rgnArCd:
        //     data.length &&
        //     this.$store.state.newDealer.params.rgnArCd &&
        //     this.initCount == 1
        //       ? this.$store.state.newDealer.params.rgnArCd
        //       : data[0]
        //       ? data[0].value
        //       : "",
        //   area:
        //     data.length &&
        //     this.$store.state.newDealer.params.area &&
        //     this.initCount == 1
        //       ? this.$store.state.newDealer.params.area
        //       : data[0]
        //       ? data[0].text
        //       : ""
        // });

        if (this.initCount == 1) {
          data.length &&
            this.$store.commit("setParams", {
              rgnArCd: this.$store.state.newDealer.params.rgnArCd,
              area: this.$store.state.newDealer.params.area
            });
          return;
        }
        data.length &&
          this.$store.commit("setParams", {
            rgnArCd: data[0].value,
            area: data[0].text
          });
        if (!data.length) {
          this.$store.commit("setParams", {
            rgnArCd: "",
            area: ""
          });
        }
      });
    },
    getCity(code) {
      this.$store.state.dealer.provincesList.some(r => {
        if (r.value === code) {
          this.$store.commit("setParams", {
            rgnPrCd: code,
            province: r.text
          });
          return true;
        }
      });
      this.$store.dispatch("getCitys", code).then(data => {
        this.$store.commit("setParams", {
          rgnCyCd:
            this.$store.state.newDealer.params.rgnCyCd && this.initCount == 1
              ? this.$store.state.newDealer.params.rgnCyCd
              : data[0].value,
          city:
            this.$store.state.newDealer.params.city && this.initCount == 1
              ? this.$store.state.newDealer.params.city
              : data[0].text
        });

        if (this.$route.query.editor && this.initCount == 1) {
          // 从详情页面 到 编辑信息时
          this.getArea(this.$store.state.newDealer.params.rgnCyCd);
        }
      });
    },
    nextStep() {
      if (
        !this.$store.state.newDealer.params.dealerName ||
        !this.$store.state.newDealer.params.ownerUserList.length
      ) {
        this.isShowErrorNameMsg = true;
      } else {
        this.showNext = true;
      }
    },
    goContactsList() {
      this.$router.push("/ContactsList");
    },
    createDealer() {
      this.$store.dispatch("addCreateDealer").then(r => {
        this.$toast("创建成功")
        this.$router.go(-1);
      });
    },
    save() {
      if (this.delaySend()) {
        return;
      }
      let legalParams = this.$store.state.newDealer.params;
      legalParams.dealerGid = this.id;
      if (
        legalParams.contactsName ||
        legalParams.contactsPhone ||
        legalParams.certTypCd ||
        legalParams.certNo
      ) {
        if (
          legalParams.contactsName &&
          legalParams.contactsPhone &&
          legalParams.certTypCd &&
          legalParams.certNo
        ) {
          !this.recordStatus &&
            this.$store.dispatch(
              this.existLegal ? "editlegal" : "addlegal",
              legalParams
            );
        } else {
          this.$dialog.alert({
            message: "法人信息不全"
          });
          return;
        }
      }
      let pars = Object.assign({}, this.$store.state.newDealer.params, {
        ownerUserGids: this.$store.state.newDealer.params.ownerUserGids
          ? this.$store.state.newDealer.params.ownerUserGids
              .split(",")
              .map(r => {
                return String(r);
              })
          : [],
        followerUserGids: this.$store.state.newDealer.params.followerUserGids
          ? this.$store.state.newDealer.params.followerUserGids
              .split(",")
              .map(r => {
                return String(r);
              })
          : []
      });

      this.checkErrorMsg();
      if (!this.isShowErrorNameMsg) {
        this.$store.dispatch("editDealer", pars).then(r => {
          this.$toast('编辑成功')
          this.$router.go(-1);
        });
      }
    },

    checkErrorMsg() {
      //名称不能为空
      let dealerName = this.$store.state.newDealer.params.dealerName.trim();
      if (dealerName == "") {
        this.isShowErrorNameMsg = true;
      } else {
        this.isShowErrorNameMsg = false;
      }
    }
  }
};
</script>

<style scoped>
.checkContent {
  background: #f7f8f9;
  padding: 10px 16px;
  color: #f42929;
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
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

.dateBox /deep/ .van-picker__cancel,
.dateBox /deep/ .van-picker__confirm {
  color: #ff9b02;
  font-size: 1.143rem;
}
.dateBox /deep/ .van-picker__toolbar {
  border-bottom: 1px solid #ededee;
}
.dateBox /deep/ .van-picker-column__item.van-picker-column__item--selected {
  color: #252525;
  font-size: 1.286rem;
}

.CreateDealer /deep/ .van-dropdown-menu__title{
	padding: 0 8px 0 0;
}
.zeroCss /deep/ .van-dropdown-menu__title{
	color: rgba(69, 90, 100, 0.6);
}

</style>