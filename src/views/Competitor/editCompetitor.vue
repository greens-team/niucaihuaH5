<!-- 编辑竞争对手页面 -->
<template>
  <div class="CreateLessee flex-1 flex flex-col">
    <van-nav-bar title="编辑竞争对手" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="editCompetitor">保存</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.competitor.editParams.competorName"
          required
          label="合作竞对名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="50"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">合作竞对名称不能为空</div>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">竞对类型</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.state.competitor.editParams.competorType"
              :options="$store.state.competitor.competorStatus"
            />
          </van-dropdown-menu>
        </div>
        <van-field
          v-model="$store.state.competitor.editParams.comment"
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
  name: "editCompetitor",
  data() {
    return {
      isShowErrorNameMsg: false
    };
  },
  mounted() {},
  methods: {
    editCompetitor() {
      this.checkErrorMsg();
      if (!this.isShowErrorNameMsg) {
        this.$store.dispatch("editCompetitor").then(r => {
          this.$router.go(-1);
        });
      }
    },
    checkErrorMsg() {
      //名称不能为空
      let competitorName = this.$store.state.competitor.editParams.competorName;
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
.checkContent {
  background: #f7f8f9;
  padding: 10px 16px;
  color: #f42929;
}
</style>