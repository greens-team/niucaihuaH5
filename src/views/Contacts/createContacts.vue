<!-- 创建联系人页面 -->
<template>
  <div class="CreateContacts flex-1 flex flex-col">
    <!-- <van-nav-bar title="新建联系人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createContacts">保存</div>
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
      <span class="text-center font-bold bar_title">新建联系人</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" class="text-center text-base" @click="createContacts">保存</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsName"
          required
          label="联系人名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="30"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">联系人名称不能为空</div>
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsPhone"
          label="手机号"
          placeholder="请填写信息"
          label-width="130"
          type="number"
          pattern="[0-9]*"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorPhoneMsg">请输入正确的11位数字手机号码</div>

        <div
          class="flex ml-4 items-center pt-3 pb-3"
          style="border-bottom:1px solid #ededee; margin-left:1rem;position:relative;"
        >
          <div class="ownerUser" style="width:130px; color:#323233;">负责人</div>
          <UserList
            title="选择负责人"
            :paramsVal="ownerUserGids"
            @setParams="getOwnerUserList"
            soltCon="true"
            :style="{color:ownerUserGids.length?'#252525':'rgba(69, 90, 100, 0.6)'}"
          >{{mainUserGidsFun(ownerUserGids)}}</UserList>
        </div>
        <div class="checkContent" v-show="isShowErrorOwnerMsg">负责人不能为空</div>

        <div
          class="flex ml-4 items-center pt-3 pb-3"
          style="border-bottom:1px solid #ededee; margin-left:1rem;"
        >
          <div style="width:130px; color:#323233;">参与人</div>
          <UserList
            title="选择参与人"
            :paramsVal="followerUserGids"
            @setParams="val=>followerUserGids = val"
            :style="{color:mainFollowerUserGidsFun(followerUserGids) != '请选择参与人' ?'#252525':'rgba(69, 90, 100, 0.6)'}"
            soltCon="true"
          >{{mainFollowerUserGidsFun(followerUserGids)}}</UserList>
        </div>

        <van-field
          v-model="$store.state.contacts.createContactsParams.weichatNum"
          label="微信号"
          placeholder="请填写信息"
          label-width="130"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorChatMsg">请输入正确的微信号</div>
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
import UserList from "@/components/UserList/index.vue";
export default {
  name: "CreateContacts",
  components: {
    UserList
  },
  data() {
    return {
      isShowErrorPhoneMsg: false,
      isShowErrorNameMsg: false,
      isShowErrorChatMsg: false,
      isShowErrorOwnerMsg: false,

      ownerUserGids: [],
      followerUserGids: []
    };
  },
  mounted() {
    // 获取当前用户为负责人
    this.userInfo = JSON.parse(sessionStorage.userInfo);
    this.ownerUserGids = [
      {
        id: this.userInfo.EMPLOYEE_ID,
        refRlNm: this.userInfo.EMPLOYEE_NAME
      }
    ];
  },
  methods: {
    getOwnerUserList(val) {
      this.ownerUserGids = val;
      val.length
        ? (this.isShowErrorOwnerMsg = false)
        : (this.isShowErrorOwnerMsg = true);
    },
    // 过滤负责信息 展示负责人姓名 及 给参数赋值
    mainUserGidsFun(vals) {
      let data = [];
      vals.map(r => {
        data.push(r.id || r.ownerUserGid);
      });
      this.$store.state.contacts.createContactsParams.ownerUserGids = data.toString();
      return vals.length
        ? vals
            .map(r => {
              return String(r.refRlNm || r.ownerUserName);
            })
            .toString()
        : "请选择负责人";
    },

    //参与人
    mainFollowerUserGidsFun(vals) {
      let data = [];
      vals.map(r => {
        data.push(r.id || r.ownerUserGid);
      });
      this.$store.state.contacts.createContactsParams.followerUserGids = data.toString();
      return vals.length
        ? vals
            .map(r => {
              return String(r.refRlNm || r.ownerUserName);
            })
            .toString()
        : "请选择参与人";
    },
    createContacts() {
      let ownerUserData = this.$store.state.contacts.createContactsParams
        .ownerUserGids;
      ownerUserData.length
        ? (ownerUserData = ownerUserData.split(","))
        : (ownerUserData = []);
      this.$store.state.contacts.createContactsParams.ownerUserGids = ownerUserData;

      let followerUserData = this.$store.state.contacts.createContactsParams
        .followerUserGids;
      followerUserData.length
        ? (followerUserData = followerUserData.split(","))
        : (followerUserData = []);
      this.$store.state.contacts.createContactsParams.followerUserGids = followerUserData;

      this.checkErrorMsg();
      if (
        !this.isShowErrorPhoneMsg &&
        !this.isShowErrorNameMsg &&
        !this.isShowErrorChatMsg &&
        !this.isShowErrorOwnerMsg
      ) {
        this.$store.dispatch("createContacts").then(res => {
          this.$dialog
            .alert({
              message: "操作成功"
            })
            .then(() => {
              this.$router.go(-1);
            });
        });
      }
    },
    checkErrorMsg() {
      //名称不能为空
      let contactsName = this.$store.state.contacts.createContactsParams.contactsName.trim();
      if (contactsName == "") {
        this.isShowErrorNameMsg = true;
      } else {
        this.isShowErrorNameMsg = false;
      }

      //手机号校验
      let phone = this.$store.state.contacts.createContactsParams.contactsPhone;
      let regPhone = /^1[3456789]\d{9}$/;
      this.isShowErrorPhoneMsg = this.check(phone, regPhone);

      //微信号仅支持6-20个字母、数字、下划线和减号；必须以字母开头（字母不区分大小写）；不支持设置中文
      let contactsChat = this.$store.state.contacts.createContactsParams
        .weichatNum;
      let regChat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
      this.isShowErrorChatMsg = this.check(contactsChat, regChat);
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
.CreateContacts /deep/ .van-cell:not(:last-child)::after {
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
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
.CreateContacts /deep/ .van-cell--required::before {
  position: absolute;
  left: 8px;
  color: #ee0a24;
  font-size: 14px;
  content: "*";
  top: 13px;
}
.ownerUser::before {
  position: absolute;
  left: -7px;
  color: #ee0a24;
  font-size: 14px;
  content: "*";
  top: 13px;
}
</style>