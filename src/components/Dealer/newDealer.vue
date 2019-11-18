<!-- 新建经销商  -->
<template>
  <div class="selectedListLessee flex flex-1 flex-col">
    <van-nav-bar
      title="新建经销商"
      left-text="返回"
      @click-left="$store.state.dealer.selectedUserGids = $store.state.dealer.confirmUserGids; $router.go(-1)"
      left-arrow
    >
      <div slot="right" @click="showNext = true;">确定</div>
    </van-nav-bar>
    <div class="pr-4 mt-2 bg-white flex-1">
        <div class="relative formBar font-bold text-base p-3 pl-4">经销商</div>
        <van-field
          required
          label="经销商名称"
          placeholder="经销商名称"
          label-width="130"
        />
        <van-field
        required
          label="所属地区"
          placeholder="所属地区"
          label-width="130"
        />
        <van-field
          label="职务"
          placeholder="职务"
          label-width="130"
        />

    </div>
    <van-popup v-model="showNext" position="bottom">
      <div class="bg-gray-200">
        <div
          style="color:#ff9b02"
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
        >新建经销商</div>
        <div
          style="color:#ff9b02"
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer"
        >新建并关联经销商</div>
        <div
          class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer mt-1"
          @click="showNext=false"
        >取消</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "newDealer",
  data() {
    return {
      showNext: false
    };
  }
};
</script>