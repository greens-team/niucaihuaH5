<!-- 编辑联系人页面 -->
<template>
  <div class="CreateLessee flex-1 flex flex-col">
    <van-nav-bar title="编辑联系人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="editContacts">保存</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.contacts.editContactsParams.contactsName"
          required
          label="联系人姓名"
          placeholder="请填写信息"
          label-width="130"
          maxlength="10"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">联系人名称不能为空</div>
        <van-field
          v-model="$store.state.contacts.editContactsParams.contactsPhone"
          label="手机号"
          placeholder="请填写信息"
          label-width="130"
          type="number"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorPhoneMsg">请输入正确的11位数字手机号码</div>
        <van-field
          v-model="$store.state.contacts.editContactsParams.weichatNum"
          label="微信号"
          placeholder="请填写信息"
          label-width="130"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorChatMsg">请输入正确的微信号</div>
        <van-field
          v-model="$store.state.contacts.editContactsParams.comment"
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
  name: "editContacts",
  data() {
    return {
      isShowErrorPhoneMsg: false,
      isShowErrorNameMsg: false,
      isShowErrorChatMsg: false
    };
  },
  mounted() {},
  methods: {
    editContacts() {
      this.checkErrorMsg();
      if (
        !this.isShowErrorPhoneMsg &&
        !this.isShowErrorNameMsg &&
        !this.isShowErrorChatMsg
      ) {
        this.$store.dispatch("editContacts").then(r => {
          this.$router.go(-1);
        });
      }
    },

    checkErrorMsg() {
      //名称不能为空
      let contactsName = this.$store.state.contacts.editContactsParams
        .contactsName;
      if (contactsName == "") {
        this.isShowErrorNameMsg = true;
      } else {
        this.isShowErrorNameMsg = false;
      }

      //手机号校验
      let phone = this.$store.state.contacts.editContactsParams.contactsPhone;
      let regPhone = /^1[3456789]\d{9}$/;
      this.isShowErrorPhoneMsg = this.check(phone, regPhone);

      //微信号仅支持6-20个字母、数字、下划线和减号；必须以字母开头（字母不区分大小写）；不支持设置中文
      let contactsChat = this.$store.state.contacts.editContactsParams
        .weichatNum;
      let regChat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
      this.isShowErrorChatMsg = this.check(contactsChat, regChat);
    },

    //用于判断正则和非空
    check(value, reg) {
      if (value.length > 0 && !reg.test(value)) {
        return true;
      }
      return false;
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