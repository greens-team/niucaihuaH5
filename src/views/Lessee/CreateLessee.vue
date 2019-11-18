<!-- 创建承租人页面 -->
<template>
  <div class="CreateLessee flex-1 flex flex-col">
    <van-nav-bar title="新建承租人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="showNext = true">下一步</div>
    </van-nav-bar>
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="$store.getters.NLparams.lesseeName"
          required
          label="承租人名称"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NLparams.idcardNum"
          label="身份证件号"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NLparams.birthday"
          label="出生日期"
          placeholder="请填写信息"
          label-width="130"
        />

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">性别</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.getters.NLparams.marry"
              :options="$store.getters.NLmarryList"
            />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">客户类型</div>
          <van-dropdown-menu class="border-0">
            <van-dropdown-item
              v-model="$store.getters.NLparams.lesseeType"
              :options="$store.getters.NLlesseeTypeList"
            />
          </van-dropdown-menu>
        </div>

        <van-field
          v-model="$store.getters.NLparams.lesseePhone"
          label="手机号"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NLparams.domicilePlace"
          label="户口所在地"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NLparams.homeAddress"
          label="家庭住址"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NLparams.workingYears"
          label="从业年限"
          placeholder="请填写信息"
          label-width="130"
        />

        <van-field
          v-model="$store.getters.NLparams.comment"
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
  name: "CreateLessee",
  data() {
    return {
      showNext: false
    };
  },
  filters: {},
  watch: {}
};
</script>