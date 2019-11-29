<!-- 创建合作竞对页面 -->
<template>
  <div class="CreateCompetitor flex-1 flex flex-col">
    <van-nav-bar title="新建竞争对手" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createCompetitor">保存</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.competitor.addParams.competorName"
          required
          label="合作竞对名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="30"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">合作竞对名称不能为空</div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">竞对类型</div>
          <div
            class="flex-1"
            @click="competorTypeShow = true;"
          >{{selectCompetorType ? selectCompetorType : '请选择类型'}}</div>
        </div>
        <van-popup v-model="competorTypeShow" position="bottom" :style="{ height: '40%'}">
          <van-nav-bar
            title="竞对类型"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="competorTypeShow = false;"
            @click-right="competorTypeShow = false;selectCompetorType = defultCompetorType"
          />
          <div
            class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200"
            style="top:46px;"
          >
            <van-radio-group v-model="competorStatusValus">
              <van-radio
                icon-size="16px"
                class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3"
                v-for="(r,i) in $store.state.competitor.competorStatus"
                :key="i"
                :name="r.value"
              >{{r.text}}</van-radio>
            </van-radio-group>
          </div>
        </van-popup>

        <van-field
          v-model="$store.state.competitor.addParams.comment"
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
  name: "CreateCompetitor",
  data() {
    return {
      competorTypeShow: false,
      competorStatusValus: 1,
      defultCompetorType: "第三方",
      selectCompetorType: "",

      //校验
      isShowErrorNameMsg: false
    };
  },
  watch: {
    competorStatusValus(type) {
      this.defultCompetorType = this.$store.state.competitor.competorStatus[
        type - 1
      ].text;
    }
  },
  methods: {
    createCompetitor() {
      this.checkErrorMsg();
      if (!this.isShowErrorNameMsg) {
        this.$store
          .dispatch("addCompetitor", { competorType: this.competorStatusValus })
          .then(r => {
            this.$router.go(-1);
          });
      }
    },
    checkErrorMsg() {
      //名称不能为空
      let competitorName = this.$store.state.competitor.addParams.competorName;
      if (competitorName == "") {
        this.isShowErrorNameMsg = true;
      } else {
        this.isShowErrorNameMsg = false;
      }
    }
  }
};
</script>
<style scoped>
.CreateCompetitor /deep/ .van-cell:not(:last-child)::after {
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
</style>