<!-- 编辑竞争对手页面 -->
<template>
  <div class="CreateLessee flex-1 flex flex-col">
    <!-- <van-nav-bar title="编辑竞争对手" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="editCompetitor">保存</div>
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
      <span class="text-center font-bold bar_title">编辑竞争对手</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
        <div slot="right" class="text-center text-base" @click="editCompetitor">保存</div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.state.competitor.editParams.competorName"
          required
          label="合作竞对名称"
          placeholder="请填写信息"
          label-width="130"
          maxlength="30"
          @blur="checkErrorMsg"
        />
        <div class="checkContent" v-show="isShowErrorNameMsg">合作竞对名称不能为空</div>

        <!-- <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">竞对类型</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.state.competitor.editParams.competorType"
              :options="$store.state.competitor.competorStatus"
            />
          </van-dropdown-menu>
        </div>-->

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
      isShowErrorNameMsg: false,

      competorTypeShow: false,
      competorStatusValus: 1,
      defultCompetorType: "第三方",
      selectCompetorType: ""
    };
  },
  watch: {
    competorStatusValus(type) {
      if (type != 0) {
        this.defultCompetorType = this.$store.state.competitor.competorStatus[
          type - 1
        ].text;
      }
    }
  },
  mounted() {
    //竞对类型默认显示
    this.competorStatusValus = this.$store.state.competitor.info.competorType;
    console.log()
    if (this.competorStatusValus != 0) {
      this.selectCompetorType = this.$store.state.competitor.competorStatus[
        this.competorStatusValus -1
      ].text;
    }
  },
  methods: {
    editCompetitor() {
      this.checkErrorMsg();
      if (!this.isShowErrorNameMsg) {
        this.$store.dispatch("editCompetitor",{competorType: this.competorStatusValus}).then(r => {
          this.$router.go(-1);
        });
      }
    },
    checkErrorMsg() {
      //名称不能为空
      let competitorName = this.$store.state.competitor.editParams.competorName.trim();
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
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>