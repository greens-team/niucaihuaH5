<!-- 创建承租人页面 -->
<template>
  <div class="CreateLessee flex-1 flex flex-col">
    <van-nav-bar title="新建承租人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createLessee">保存</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.lessee.addParams.lesseeName"
          required
          label="承租人名称"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.addParams.idcardNum"
          label="身份证件号"
          placeholder="请填写信息"
          label-width="130"
        />

        <div class="date-time-input-wrap">
          <van-field
            label="出生日期"
            label-width="130"
            v-model="birthday"
            placeholder="选择时间"
            readonly="readonly"
            @click="taskTimeShow = true"
          />
          <van-popup v-model="taskTimeShow" position="bottom" :overlay="true">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              @cancel="taskTimeShow = false"
              @confirm="getBirthdayTime();"
            />
          </van-popup>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">性别</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.state.lessee.addParams.gender"
              :options="$store.state.lessee.genderList"
            />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">客户类型</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.state.lessee.addParams.lesseeType"
              :options="$store.state.lessee.lesseeTypeList"
            />
          </van-dropdown-menu>
        </div>

        <van-field
          v-model="$store.state.lessee.addParams.lesseePhone"
          label="手机号"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.addParams.domicilePlace"
          label="户口所在地"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.addParams.homeAddress"
          label="家庭住址"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.lessee.addParams.workingYears"
          label="从业年限"
          placeholder="请填写信息"
          label-width="130"
        />

        <van-field
          v-model="$store.state.lessee.addParams.comment"
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
  name: "CreateLessee",
  data() {
    return {
      showNext: false,
      taskTimeShow: false,
      currentDate: new Date(),
      birthday: "",
      minDate: new Date(1970, 10, 1)
    };
  },
  mounted() {
    this.setBirthday();
  },
  methods: {
    setBirthday() {
      this.birthday = this.$root.moment( new Date().getTime()).format("YYYY-MM-DD");
    },
    createLessee() {
      if (!this.$store.state.lessee.addParams.lesseeName) {
        this.$dialog.alert({
          message: "承租人名称不能为空"
        });
      } else {
        this.$store.dispatch("addLessee").then(r => {
          this.$router.go(-1);
        });
      }
    },
    getBirthdayTime() {
      this.taskTimeShow = false;
      let birthdayTime = this.$root
        .moment(this.$root.timeStamp(this.currentDate))
        .format("YYYY-MM-DD");
      this.birthday = birthdayTime;
      this.$store.state.lessee.addParams.birthday = this.$root.timeStamp(
        this.currentDate
      )/1000;
    }
  }
};
</script>