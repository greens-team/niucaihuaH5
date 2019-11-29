<!-- 意见反馈 -->
<template>
  <div class="feedBack flex-1 flex flex-col">
    <van-nav-bar title="意见反馈" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="submit">提交</div>
    </van-nav-bar>

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
            :name="1"
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
          type="input"
          clearable
          placeholder="请输入手机号"
        />

        <div class="flex emialUs mt-24">
          <p class="w-full text-center">
            <span style="color:#80848D">邮件联系我们：</span>
            <span style="color:#0885FF">liuyiwei@lionbridgecapital.cn</span>
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
      userPicArr: []
    };
  },
  methods: {
    deleteFile(file, detail) {
      for (let i = 0; i < this.userPicArr.length; i++) {
        if (file.file.name == this.userPicArr[i].name) {
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
      this.$store.dispatch("submitFeedBack");
      this.$router.go(-1);
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
</style>