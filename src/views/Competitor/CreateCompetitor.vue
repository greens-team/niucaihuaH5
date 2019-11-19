<!-- 创建合作竞对页面 -->
<template>
  <div class="CreateCompetitor flex-1 flex flex-col">
    <van-nav-bar title="新建竞争对手" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createCompetitor">下一步</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.competitor.addParams.competorName"
          required
          label="合作竞对名称"
          placeholder="请填写信息"
          label-width="130"
        />

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">竞对类型</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.state.competitor.addParams.competorType"
              :options="$store.state.competitor.competorStatus"
            />
          </van-dropdown-menu>
        </div>
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
    return {};
  },
  methods: {
    createCompetitor() {
      this.$store.dispatch("addCompetitor").then(r => {
        this.$router.go(-1);
      });
    }
  }
};
</script>