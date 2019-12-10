<!-- 创建合作竞对页面 -->
<template>
  <div class="CreateCompetitor flex-1 flex flex-col">
    <!-- <van-nav-bar title="新建竞争对手" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="createCompetitor">保存</div>
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
      <span class="text-center font-bold bar_title">新建竞争对手</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" class="text-center text-base" @click="createCompetitor">保存</div>
      </div>
    </div>

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
        <div class="checkContent" v-show="isShowErrorNameMsg">竞争对手名称不能为空</div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;">竞对类型</div>
          <div
            class="flex-1"
            @click="competorTypeShow = true;"
            :style="{color:selectCompetorType?'#252525':'rgba(69, 90, 100, 0.6)'}"
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

        <div
          class="flex ml-4 items-center pt-3 pb-3"
          style="border-bottom:1px solid #ededee; margin-left:1rem;"
        >
          <div style="width:130px; color:#323233;">负责人</div>
          <UserList
            title="选择负责人"
            :paramsVal="ownerUserGids"
            @setParams="val=>ownerUserGids = val"
            soltCon="true"
            :style="{color:ownerUserGids.length?'#252525':'rgba(69, 90, 100, 0.6)'}"
          >{{mainUserGidsFun(ownerUserGids)}}</UserList>
        </div>

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
import UserList from "@/components/UserList/index.vue";
export default {
  name: "CreateCompetitor",
  components: {
    UserList
  },
  data() {
    return {
      competorTypeShow: false,
      competorStatusValus: null,
      defultCompetorType: "",
      selectCompetorType: "",

      //校验
      isShowErrorNameMsg: false,

      ownerUserGids: [],
      followerUserGids: []
    };
  },
  watch: {
    competorStatusValus(type) {
      this.defultCompetorType = this.$store.state.competitor.competorStatus[
        type - 1
      ].text;
    }
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

    this.followerUserGids = [
      {
        refRlNm: "请选择参与人"
      }
    ];
  },
  methods: {
    // 过滤负责信息 展示负责人姓名 及 给参数赋值
    mainUserGidsFun(vals) {
      let data = [];
      vals.map(r => {
        data.push(r.id);
      });
      this.$store.state.competitor.addParams.ownerUserGids = data.toString();
      return vals
        .map(r => {
          return String(r.refRlNm);
        })
        .toString();
    },

    //参与人
    mainFollowerUserGidsFun(vals) {
      let data = [];
      vals.map(r => {
        data.push(r.id);
      });
      this.$store.state.competitor.addParams.followerUserGids = data.toString();
      return vals
        .map(r => {
          return String(r.refRlNm);
        })
        .toString();
    },
    createCompetitor() {
      this.$store.state.competitor.addParams.ownerUserGids = this.$store.state.competitor.addParams.ownerUserGids.split(
        ","
      );
      this.$store.state.competitor.addParams.followerUserGids = this.$store.state.competitor.addParams.followerUserGids.split(
        ","
      );
      if (this.$store.state.competitor.addParams.followerUserGids[0] == "") {
        this.$store.state.competitor.addParams.followerUserGids = [];
      }
      console.log(this.$store.state.competitor.addParams.ownerUserGids);
      console.log(this.$store.state.competitor.addParams.followerUserGids);
      this.checkErrorMsg();
      if (!this.isShowErrorNameMsg) {
        this.$store
          .dispatch("addCompetitor", { competorType: this.competorStatusValus })
          .then(res => {
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
      let competitorName = this.$store.state.competitor.addParams.competorName.trim();
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
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>