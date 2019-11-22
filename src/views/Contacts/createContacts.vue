<!-- 创建联系人页面 -->
<template>
  <div class="CreateCompetitor flex-1 flex flex-col">
    <van-nav-bar title="新建联系人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createContacts">保存</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsName"
          required
          label="联系人名称"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsPhone"
          required
          label="电话"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.contacts.createContactsParams.weichatNum"
          label="微信号"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.state.contacts.createContactsParams.comment"
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
  name: "CreateContacts",
  data() {
    return {};
  },
  methods: {
    createContacts() {
      if (!this.$store.state.contacts.createContactsParams.contactsName) {
        this.$dialog.alert({
          message: "联系人不能为空"
        });
      } else if (
        !this.$store.state.contacts.createContactsParams.contactsPhone
      ) {
        this.$dialog.alert({
          message: "联系人电话不能为空"
        });
      } else {
        this.$store.dispatch("createContacts").then(r => {
          this.$router.go(-1);
        });
      }
    }
  }
};
</script>