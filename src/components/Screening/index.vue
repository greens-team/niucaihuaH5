<!-- 经销商筛选组件 -->
<template>
<!--  -->
  <div class="Screening">
    <div @click="screeningShow = true" class="screeningText relative pr-3 cursor-pointer text-gray-800 hover:text-blue-500">筛选</div>
    <van-overlay :show="screeningShow" @click="screeningShow = false" />
    <van-popup
      v-model="screeningShow"
      :overlay="false"
      position="right"
      :style="{ width: '80%', height: '100%' }">
      <div class="absolute inset-0 flex flex-col flex-1">
        <div class="flex-1 p-2 relative">
          <div class="absolute inset-0 overflow-y-scroll p-5">

            <div class="text-gray-700 font-bold">经营商名称</div>
            <div class="bg-gray-200">
              <van-field v-model="value" style="background-color: inherit;" placeholder="请输入用户名" />
            </div>

            <div class="text-gray-700 font-bold mt-5">创建时间</div>
            <div class="flex justify-between text-center items-center text-gray-600">
              <div class="bg-gray-200 p-2 w-2/5">开始时间</div>
              <div>至</div>
              <div class="bg-gray-200 p-2 w-2/5">结束时间</div>
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">所属区域</div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3" style="background-color: #edf2f7; width:70%; height: inherit; text-align:right;">
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </div>

            <div class="text-gray-700 font-bold  mt-5">经营品牌</div>
            <div class="flex flex-wrap justify-between text-center text-gray-600">
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
            </div>

            <div class="text-gray-700 font-bold  mt-5">经销商分级</div>
            <div class="flex flex-wrap justify-between text-center text-gray-600">
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">一级经销商</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">二级经销商</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">三级经销商</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">四级经销商</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">五级经销商</div>
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">负责人</div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3" style="background-color: #edf2f7; width:70%; height: inherit; text-align:right;">
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">参与人</div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3" style="background-color: #edf2f7; width:70%; height: inherit; text-align:right;">
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </div>

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">未拜访天数</div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3" style="background-color: #edf2f7; width:70%; height: inherit; text-align:right;">
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </div>
            
            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">拜访次数</div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3" style="background-color: #edf2f7; width:70%; height: inherit; text-align:right;">
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </div>

            <div class="text-gray-700 font-bold  mt-5">是否在经销商附近打卡</div>
            <div class="flex flex-wrap justify-between text-center text-gray-600">
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">极差</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">差</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">一般</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">好</div>
              <div class="p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1">很好</div>
            </div>

          </div>
        </div>
        <div class="flex text-center">
          <div class="w-2/5 bg-gray-300 p-3 text-xl font-bold">重置</div>
          <div class="flex-1 bg-orange p-3 text-xl font-bold text-white" @click="hidden">完成</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Screening',
  data() {
    return {
      screeningShow: false,
      value: '',
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  methods: {
    hidden(){
      this.screeningShow = false
      this.$emit('onSearch', {})
    }
  }
}
</script>

<style scoped>
.screeningText::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: '';
}
.screeningText:hover::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -2px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    opacity: .8;
    content: '';
}
.bg-orange{
  background:linear-gradient(270deg,rgba(255,146,2,1) 0%,rgba(252,254,124,1) 100%);
}
.Screening /deep/ .van-dropdown-menu__item{
  padding-right: 5px;
  justify-content: flex-end;
}
.Screening /deep/ .van-dropdown-menu__item .van-ellipsis{
  color: #718096;
}
</style>