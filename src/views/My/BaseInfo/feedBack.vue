<!-- 意见反馈 -->
<template>
  <div class="feedBack">
    <van-nav-bar title="意见反馈" left-text @click-left="$router.go(-1)" left-arrow>
      <span slot="right" class="w-5" @click="$store.dispatch('submitFeedBack');$router.go(-1)">提交</span>
    </van-nav-bar>

    <div class="rounded-lg">
      <div class="flex-1 flex flex-col">
        <div>
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
            :rows="5"
            autosize
            type="textarea"
            maxlength="500"
            placeholder="简要描述您对产品功能的建议和问题，我们根据您的反馈更好的优化"
          />
        </div>
        <div>
          <div class="py-3 px-4 flex justify-between" style="background:#F8FAFB">
            <span style="color:#484C55">图片（可提供问题图片）</span>
            <span style="color:#C4C6CC">{{fileList.length}}/10</span>
          </div>

          <div class="py-3 px-4 flex justify-between bg-white">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="10" />
          </div>
        </div>
        <div>
          <div class="py-3 px-4 flex justify-between" style="background:#F8FAFB">
            <span style="color:#484C55">联系电话</span>
          </div>
          <van-field v-model="$store.state.my.submitParams.phone" type="input" clearable placeholder="请输入手机号" />
        </div>
      </div>
      <div class="emialUs">
        <p>
          <span style="color:#80848D">邮件联系我们：</span>
          <span style="color:#0885FF">liuyiwei@lionbridgecapital.cn</span>
        </p>
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
      fileList: [],
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file.name)
    },
    inputTotal(keyword) {
      this.wordTotal = this.$store.state.my.submitParams.content.length;
    },

  }
};
</script>
<style scoped>
.feedBack {
  background: #f8fafb;
  height: 100%;
  position: relative;
}
.emialUs {
  text-align: center;
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 1%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
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
  color: #F42929;
}
</style>