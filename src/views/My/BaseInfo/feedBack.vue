<!-- 意见反馈 -->
<template>
  <div class="feedBack flex-1 flex flex-col">
    <!-- <van-nav-bar title="意见反馈" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="submit">提交</div>
    </van-nav-bar>-->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-medium bar_title">意见反馈</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" class="text-center" style="font-size:1.143rem;" @click="submit">保存</div>
      </div>
    </div>

    <div class="flex-1 relative h-full">
      <div class="absolute inset-0 overflow-y-scroll">
        <div class="py-3 px-4 flex justify-between" style="background:#F8FAFB">
          <span style="color:#484C55">问题和意见</span>
          <span style="color:#C4C6CC">
            您还可以输入
            <span style="color:#f42929">{{500-wordTotal}}</span>
            个字
          </span>
        </div>

        <van-field
          @input="inputTotal()"
          v-model="$store.state.my.submitParams.content"
          :rows="8"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="简要描述您对产品功能的建议和问题，我们根据您的反馈更好的优化"
        />

        <div class="py-3 px-4 flex justify-between" style="background:#F8FAFB">
          <span style="color:#484C55">图片（可提供问题图片）</span>
          <span style="color:#C4C6CC">{{pictureVal.length}}/10</span>
        </div>

        <div class="py-3 px-3 flex justify-between bg-white">
          <van-uploader
            :after-read="(file, name) => uploadFile(file, fileCallback, 0, true)"
            :before-read="file => uploadFile(file,true)"
            @delete="deleteFile"
            v-model="pictureVal"
            multiple
            :max-count="10"
          />
        </div>

        <div class="py-3 px-4 flex justify-between" style="background:#F8FAFB">
          <span style="color:#484C55">联系电话</span>
        </div>
        <van-field
          v-model="$store.state.my.submitParams.phone"
          label="手机号"
          placeholder="请输入手机号"
          label-width="130"
          type="number"
          pattern='[0-9]*'
          clearable
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorPhoneMsg">请输入正确的11位数字手机号码</div>

        <div class="flex emialUs mt-24">
          <p class="w-full text-center">
            <span style="color:#80848D;font-size:.75rem;">有问题也可发送邮件给我们：</span>
            <span style="color:#0885FF;font-size:.75rem;">liuyiwei@lionbridgecapital.cn</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Feedback",
  data() {
    return {
      wordTotal: 0,
      pictureVal: [],
      userPicArr: [],
      isShowErrorPhoneMsg: false
    };
  },
  mounted() {
    this.initParamsEmpty();
  },
  methods: {
    initParamsEmpty() {
      this.$store.commit("setParamsEmpty");
    },
    deleteFile(file, detail) {
      for (let i = 0; i < this.userPicArr.length; i++) {
        if (file.file.name == this.userPicArr[i].name && detail.index == i) {
          this.$store.state.my.submitParams.pics = this.$store.state.my.submitParams.pics.replace(
            this.userPicArr[i].path + ",",
            ""
          );
          this.userPicArr.splice(i, 1);
          break;
        }
      }
    },
    fileCallback(fileUrl) {
      this.$store.state.my.submitParams.pics += fileUrl.path + ",";
      this.userPicArr.push(fileUrl);
    },
    inputTotal(keyword) {
      this.wordTotal = this.$store.state.my.submitParams.content.length;
    },
    submit() {
      let userPicStr = "";
      userPicStr = this.$store.state.my.submitParams.pics;
      userPicStr = userPicStr.substring(0, userPicStr.length - 1);
      this.$store.state.my.submitParams.pics = userPicStr;
      this.checkErrorMsg();
      if (!this.isShowErrorPhoneMsg) {
        this.$store.dispatch("submitFeedBack").then(r => {
          this.$router.go(-1);
        });
      }
    },

    checkErrorMsg() {
      //手机号校验
      let phone = this.$store.state.my.submitParams.phone;
      let regPhone = /^1[3456789]\d{9}$/;
      this.isShowErrorPhoneMsg = this.check(phone, regPhone);
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
.feedBack {
  background: #f7f8f9;
  height: 100%;
  position: relative;
}
.emialUs {
  width: 100%;
}
.feedBack /deep/ .van-uploader__upload {
  border: 1px solid #d0d0d1;
}
.feedBack /deep/ textarea::-webkit-input-placeholder {
  color: #c4c6cc;
}
.feedBack /deep/ textarea::-moz-input-placeholder {
  color: #c4c6cc;
}
.feedBack /deep/ textarea::-ms-input-placeholder {
  color: #c4c6cc;
}
.feedBack /deep/ .van-uploader__preview-delete {
  color: #f42929;
}
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
</style>