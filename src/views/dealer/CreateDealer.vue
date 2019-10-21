<template>
<!--  -->
  <div class="CreateDealer flex-1 flex flex-col">
    <van-nav-bar title="新建经销商" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="showNext = true">下一步</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">备案信息</div>
        <van-field
          v-model="username"
          required
          label="经销商名称"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="统一社会信用代码"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="成立日期"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          required
          label="所属地区"
          placeholder="点击选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="业务类型"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="地理位置"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="日查征信次数"
          placeholder="请填写信息"
          label-width="130"
        />

        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>
        <van-field
          v-model="username"
          label="经销商分级"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="业务状态"
          placeholder="线索入库"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="经销品牌"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="经销车型"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          required
          label="负责人"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="参与人"
          placeholder="请选择"
          label-width="130"
        />

        <div class="relative formBar font-bold text-base p-3 pl-4">运营数据</div>
        <van-field
          v-model="username"
          label="近期热销车型"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="合作竞对"
          placeholder="线索入库"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="本月预计合作数"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="狮桥开拓策略"
          type="textarea"
          :autosize="{ maxHeight: 200, minHeight: 200 }"
          placeholder="请选择"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="本月狮桥分查询量"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="本月预计投放额"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="本月销售数"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="本月合作数"
          placeholder="请选择"
          label-width="130"
        />
      </div>
    </div>

    <van-popup
      v-model="showNext"
      position="bottom"
    >
      <div class="bg-gray-200">
        <div @click="$router.push('/NewContacts')" class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer">新建联系人</div>
        <div class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer">直接新建经销商</div>
        <div class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer mt-3">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'CreateDealer',
  data() {
    return {
      username: '',
      showNext: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>