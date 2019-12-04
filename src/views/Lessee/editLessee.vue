<!-- 编辑承租人页面 -->
<template>
  <div class="editLessee flex-1 flex flex-col">
    <!-- <van-nav-bar title="编辑承租人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="editLessee">保存</div>
    </van-nav-bar>-->
    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-medium bar_title">编辑承租人</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" class="text-center text-base" @click="editLessee">保存</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.lessee.editParams.lesseeName"
          required
          label="承租人名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="30"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">承租人名称不能为空</div>
        <van-field
          v-model="$store.state.lessee.editParams.idcardNum"
          label="身份证件号"
          placeholder="请填写信息"
          label-width="130"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorIdCardMsg">请输入正确的15位或者18位身份证件号</div>
        <div class="flex ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">出生日期</div>
          <div
            style="color:#252525"
            class="flex-1"
            @click="birthdayTimeShow = true;"
          >{{ birthday ? birthday : '请选择日期'}}</div>
        </div>

        <div
          class="date-time-input-wrap"
          style="border-bottom:1px solid #ededee; margin-left:1rem;"
        >
          <van-popup v-model="birthdayTimeShow" position="bottom" :overlay="true">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              @cancel="birthdayTimeShow = false"
              @confirm="getBirthdayTime();"
            />
          </van-popup>
        </div>
        <div class="border_line flex ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#252525;">承租人状态</div>
          <div
            class="flex-1"
            style="color:#252525"
            @click="lesseeStatusShow = true;"
          >{{selectLesseeStatus ? selectLesseeStatus : '请选择状态'}}</div>
        </div>
        <van-popup v-model="lesseeStatusShow" position="bottom" :style="{ height: '40%'}">
          <van-nav-bar
            title="承租人状态"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="lesseeStatusShow = false;"
            @click-right="lesseeStatusShow = false;selectLesseeStatus = defultLesseeStatus"
          />
          <div
            class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
            style="top:46px;"
          >
            <van-radio-group v-model="lesseeStatusValus">
              <van-radio
                icon-size="16px"
                class="ml-5 mr-5 pt-3 pb-3"
                v-for="(r,i) in $store.state.lessee.status"
                :key="i"
                :name="r.value"
              >{{r.text}}</van-radio>
            </van-radio-group>
          </div>
        </van-popup>

        <div class="border_line flex ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#252525;">客户类型</div>
          <div
            class="flex-1"
            style="color:#252525"
            @click="lesseeTypeShow = true;"
          >{{selectLesseeType ? selectLesseeType : '请选择类型'}}</div>
        </div>
        <van-popup v-model="lesseeTypeShow" position="bottom" :style="{ height: '40%'}">
          <van-nav-bar
            title="客户类型"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="lesseeTypeShow = false;"
            @click-right="lesseeTypeShow = false;selectLesseeType = defultLesseeType"
          />
          <div
            class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
            style="top:46px;"
          >
            <van-radio-group v-model="lesseeTypeValus">
              <van-radio
                icon-size="16px"
                class="ml-5 mr-5 pt-3 pb-3"
                v-for="(r,i) in $store.state.lessee.lesseeTypeList"
                :key="i"
                :name="r.value"
              >{{r.text}}</van-radio>
            </van-radio-group>
          </div>
        </van-popup>

        <div class="border_line flex ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#252525;">性别</div>
          <div
            style="color:#252525"
            class="flex-1"
            @click="genderShow = true;"
          >{{selectGender ? selectGender : '请选择性别'}}</div>
        </div>
        <van-popup v-model="genderShow" position="bottom" :style="{ height: '40%'}">
          <van-nav-bar
            title="性别"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="genderShow = false;"
            @click-right="genderShow = false;selectGender = defultGender"
          />
          <div
            class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
            style="top:46px;"
          >
            <van-radio-group v-model="genderValus">
              <van-radio
                icon-size="16px"
                class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3"
                v-for="(r,i) in $store.state.lessee.genderList"
                :key="i"
                :name="r.value"
              >{{r.text}}</van-radio>
            </van-radio-group>
          </div>
        </van-popup>

        <van-field
          v-model="$store.state.lessee.editParams.lesseePhone"
          label="手机号"
          placeholder="请填写信息"
          label-width="130"
          type="number"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorPhoneMsg">请输入正确的11位数字手机号码</div>
        <van-field
          v-model="$store.state.lessee.editParams.domicilePlace"
          label="户口所在地"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.editParams.homeAddress"
          label="家庭住址"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.editParams.workingYears"
          label="从业年限"
          placeholder="请填写信息"
          label-width="130"
        />

        <div>
          <div class="py-3 px-4 flex justify-between">
            <span style="color:#484C55">照片</span>
            <span style="color:#C4C6CC">{{pictureVal.length}}/4</span>
          </div>

          <div class="py-3 px-3 flex justify-between bg-white">
            <van-uploader
              :after-read="(file, name) => uploadFile(file, fileCallback, 0, true)"
              :before-read="file => uploadFile(file,true)"
              @delete="deleteFile"
              v-model="pictureVal"
              multiple
              :max-count="4"
            />
          </div>
        </div>
        <div>
          <div class="py-3 px-4 flex justify-between">
            <span style="color:#484C55">上传法人身份证件照片</span>
          </div>

          <div class="py-3 px-3 flex bg-white">
            <van-uploader
              :after-read="file => uploadFile(file, (fileUrl)=>$store.state.lessee.editParams.idcardFrontPic = fileUrl, 0)"
              :before-read="file => uploadFile(file,true)"
              v-model="idcardFrontPicVal"
              @delete="file => $store.state.lessee.editParams.idcardFrontPic = ''"
              :max-count="1"
            />
            <van-uploader
              :after-read="file => uploadFile(file, (fileUrl)=>$store.state.lessee.editParams.idcardBackPic = fileUrl, 0)"
              :before-read="file => uploadFile(file,true)"
              v-model="idcardBackPicVal"
              @delete="file => $store.state.lessee.editParams.idcardBackPic = ''"
              :max-count="1"
            />
          </div>
        </div>

        <van-field
          v-model="$store.state.lessee.editParams.comment"
          :rows="5"
          autosize
          type="textarea"
          maxlength="150"
          label="备注信息"
          placeholder="请输入备注信息"
          label-width="130"
          show-word-limit
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "editLessee",
  data() {
    return {
      birthdayTimeShow: false,
      currentDate: new Date(),
      birthday: "",
      minDate: new Date(1899, 12, 1),

      genderShow: false,
      genderValus: 0,
      defultGender: "男",
      selectGender: "",

      lesseeTypeShow: false,
      lesseeTypeValus: 0,
      defultLesseeType: "自然人",
      selectLesseeType: "",

      lesseeStatusShow: false,
      lesseeStatusValus: 1,
      defultLesseeStatus: "线索承租人",
      selectLesseeStatus: "",

      //校验
      isShowErrorPhoneMsg: false,
      isShowErrorNameMsg: false,
      isShowErrorIdCardMsg: false,

      idcardFrontPicVal: [],
      idcardBackPicVal: [],
      pictureVal: [],
      userPicArr: []
    };
  },
  watch: {
    genderValus(type) {
      this.defultGender = this.$store.state.lessee.genderList[type].text;
    },
    lesseeTypeValus(type) {
      this.defultLesseeType = this.$store.state.lessee.lesseeTypeList[
        type
      ].text;
    },
    lesseeStatusValus(type) {
      this.defultLesseeStatus = this.$store.state.lessee.status[type - 1].text;
    }
  },
  mounted() {
    this.getInitParams();
  },

  methods: {
    deleteFile(file, detail) {
      //编辑页面默认删除图片获取到的file和删除再上传获取的file不是同一个，所以需要分开判断
      if (file.url) {
        let currentPath = "";
        if (file.url !== null || file.url !== "") {
          const str = file.url.split("http://");
          const index = str[1].indexOf("/") + 1;
          currentPath = str[1].substring(index);
        }
        this.$store.state.lessee.editParams.userPic = this.$store.state.lessee.editParams.userPic.replace(
          currentPath + ",",
          ""
        );
      } else {
        for (let i = 0; i < this.userPicArr.length; i++) {
          if (file.file.name == this.userPicArr[i].name && detail.index == i) {
            this.$store.state.lessee.editParams.userPic = this.$store.state.lessee.editParams.userPic.replace(
              this.userPicArr[i].path + ",",
              ""
            );
            this.userPicArr.splice(i, 1);
            break;
          }
        }
      }
    },
    fileCallback(fileUrl) {
      this.$store.state.lessee.editParams.userPic += fileUrl.path + ",";
      this.userPicArr.push(fileUrl);
    },
    getInitParams() {
      let birthday = this.$store.state.lessee.info.birthday;
      if (birthday == null) {
        this.birthday = birthday;
      } else {
        this.birthday = this.$root.moment(birthday * 1000).format("YYYY-MM-DD");
      }

      //性别的默认显示
      this.genderValus = this.$store.state.lessee.info.gender;
      this.selectGender = this.$store.state.lessee.genderList[
        this.genderValus
      ].text;

      //客户类型的默认显示
      this.lesseeTypeValus = this.$store.state.lessee.info.lesseeType;
      this.selectLesseeType = this.$store.state.lessee.lesseeTypeList[
        this.lesseeTypeValus
      ].text;

      //承租人状态的默认显示
      this.lesseeStatusValus = this.$store.state.lessee.info.lesseeStatus;
      this.selectLesseeStatus = this.$store.state.lessee.status[
        this.lesseeStatusValus - 1
      ].text;

      if (this.$store.state.lessee.info.idcardFrontPic) {
        this.idcardFrontPicVal = [
          {
            url: window.picServer + this.$store.state.lessee.info.idcardFrontPic
          }
        ];
      }
      if (this.$store.state.lessee.info.idcardBackPic) {
        this.idcardBackPicVal = [
          {
            url: window.picServer + this.$store.state.lessee.info.idcardBackPic
          }
        ];
      }
      if (this.$store.state.lessee.info.userPic) {
        this.$store.state.lessee.editParams.userPic =
          this.$store.state.lessee.info.userPic + ",";
        let userPics = this.$store.state.lessee.info.userPic.split(",");
        this.userPicArr = userPics;
        for (let i = 0; i < userPics.length; i++) {
          this.pictureVal.push({ url: window.picServer + userPics[i] });
        }
      }
    },
    getBirthdayTime() {
      this.birthdayTimeShow = false;
      let birthdayTime = this.$root
        .moment(this.$root.timeStamp(this.currentDate))
        .format("YYYY-MM-DD");
      this.birthday = birthdayTime;
      this.$store.state.lessee.editParams.birthday =
        this.$root.timeStamp(this.currentDate) / 1000;
    },
    editLessee() {
      let userPicStr = "";
      userPicStr = this.$store.state.lessee.editParams.userPic;
      if (userPicStr) {
        userPicStr = userPicStr.substring(0, userPicStr.length - 1);
      }

      this.$store.state.lessee.editParams.userPic = userPicStr;
      this.checkErrorMsg();
      if (
        !this.isShowErrorPhoneMsg &&
        !this.isShowErrorNameMsg &&
        !this.isShowErrorIdCardMsg
      ) {
        this.$store
          .dispatch("editLessee", {
            gender: this.genderValus,
            lesseeType: this.lesseeTypeValus,
            lesseeStatus: this.lesseeStatusValus
          })
          .then(r => {
            this.$router.go(-1);
          });
      }
    },

    checkErrorMsg() {
      //名称不能为空
      let lesseeName = this.$store.state.lessee.editParams.lesseeName.trim();
      if (lesseeName == "") {
        this.isShowErrorNameMsg = true;
      } else {
        this.isShowErrorNameMsg = false;
      }

      //手机号校验
      let phone = this.$store.state.lessee.editParams.lesseePhone;
      let regPhone = /^1[3456789]\d{9}$/;
      this.isShowErrorPhoneMsg = this.check(phone, regPhone);

      //身份证校验
      //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let idCard = this.$store.state.lessee.editParams.idcardNum;
      let regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      this.isShowErrorIdCardMsg = this.check(idCard, regIdCard);
    },

    //用于判断正则和非空
    check(value, reg) {
      if (value != null) {
        if (value.length > 0 && !reg.test(value)) {
          return true;
        }
        return false;
      }
    }
  }
};
</script>
<style scoped>
.date-time-input-wrap /deep/ .van-cell.van-field {
  padding-left: 0px;
}
.editLessee .date-time-input-wrap /deep/ .van-cell:not(:last-child)::after {
  border-bottom: 0px solid #ededee;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}

.editLessee /deep/ .van-cell:not(:last-child)::after {
  border-bottom: 1px solid #ededee;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}
.border_line {
  border-bottom: 1px solid #ededee;
}
.checkContent {
  background: #f7f8f9;
  padding: 10px 16px;
  color: #f42929;
}
.editLessee /deep/ .van-uploader__preview-delete {
  color: #f42929;
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>