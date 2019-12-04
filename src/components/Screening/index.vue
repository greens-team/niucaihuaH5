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
      :style="{ width: '85%', height: '100%' }">
      <div class="absolute inset-0 flex flex-col flex-1">
        <div class="flex-1 p-2 relative">
          <div class="absolute inset-0 overflow-y-scroll p-5">

            <div class="text-gray-700 font-bold">经营商名称</div>
            <div class="bg-gray-200">
              <van-field v-model="params.dealerName" style="background-color: inherit;" placeholder="请输入用户名" />
            </div>

            <div class="text-gray-700 font-bold mt-5">创建时间</div>
            <div class="flex justify-between text-center items-center text-gray-600">
              <div @click="showTime = !showTime; timeType=0;" class="bg-gray-200 p-2 flex-1">{{params.startTime ? $root.moment(params.startTime).format('YYYY-MM-DD') : '开始时间'}}</div>
              <div class="ml-2 mr-2">至</div>
              <div @click="showTime = !showTime; timeType=1;" class="bg-gray-200 p-2 flex-1">{{params.endTime ? $root.moment(params.endTime).format('YYYY-MM-DD') : '结束时间'}}</div>
            </div>

            <van-popup
              v-model="showTime"
              position="bottom"
              :style="{ height: '40%'}"
            >
              <van-datetime-picker
                title="请选择时间"
                :formatter="formatter"
                v-model="timeStr"
                type="date"
                @confirm="confirmTaskTime"
                @cancel="showTime=false"
              />
            </van-popup>

            <div class="text-gray-700 font-bold  mt-5">所属区域</div>
            <div class="flex flex-wrap text-center text-gray-600">
              <van-dropdown-menu class="text-gray-600 mr-1 pt-3 pb-3 pr-2 pl-2 flex-1" style="background-color: #edf2f7;  height: inherit; text-align:right;">
                <van-dropdown-item v-model="params.provinceVal" :options="$store.state.dealer.provincesList" />
              </van-dropdown-menu>
              <van-dropdown-menu v-if="$store.state.dealer.citysList.length" class="text-gray-600 mr-1 pt-3 pb-3 pr-2 pl-2 flex-1" style="background-color: #edf2f7;  height: inherit; text-align:right;">
                <van-dropdown-item v-model="params.cityVal" :options="$store.state.dealer.citysList" />
              </van-dropdown-menu>
              <van-dropdown-menu v-if="$store.state.dealer.areasList.length" class="text-gray-600 mr-1 pt-3 pb-3 pr-2 pl-2 flex-1" style="background-color: #edf2f7;  height: inherit; text-align:right;">
                <van-dropdown-item v-model="params.areaVal" :options="$store.state.dealer.areasList" />
              </van-dropdown-menu>
            </div>

            <!-- <div class="text-gray-700 font-bold  mt-5">经营品牌</div>
            <div class="flex flex-wrap justify-between text-center text-gray-600">
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
              <div class="p-2 bg-gray-200 w-20 mr-3 mb-1 mt-1">红岩</div>
            </div> -->

            <div class="text-gray-700 font-bold  mt-5">经销商分级</div>
            <div class="flex flex-wrap text-center text-gray-600">
              <div :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{cardStatus: params.level == 1}]" @click="params.level = params.level == 1 ? '' : 1">一级经销商</div>
              <div :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{cardStatus: params.level == 2}]" @click="params.level = params.level == 2 ? '' : 2">二级经销商</div>
              <div :class="['p-2 bg-gray-200 w-24 mr-1 mb-1 mt-1 flex-1',{cardStatus: params.level == 3}]" @click="params.level = params.level == 3 ? '' : 3">三级经销商</div>
            </div>

       

            <div class="flex justify-between items-center mt-5">
              <div class="text-gray-700 font-bold">负责人</div>
              <UserList title="选择负责人" :paramsVal="params.ownerUserGids" @setParams="val=>params.ownerUserGids = val" class="text-gray-600 ml-3 p-3 ellipsis" style="background-color: #edf2f7; width:70%; height: 39px; text-align:right;" />
            </div>

            <div class="flex items-center mt-5">
              <div class="text-gray-700 font-bold">未拜访天数</div>
              <div class="flex-1"></div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3 w-32" style="background-color: #edf2f7; height: inherit; text-align:right;">
                <van-dropdown-item v-model="params.notVisitConditions" :options="$store.state.dealer.conditions" />
              </van-dropdown-menu>
              <div class="bg-gray-200 w-24 ml-1">
                <van-field type="number" v-model="params.notVisitDays" @input="val=>!/^[0-9]+$/.test(val) && (this.params.notVisitDays = '')" style="background-color: inherit; height:39px; padding:0 10px; line-height: 39px;" placeholder="天数" />
              </div>
            </div>
            
            <div class="flex items-center mt-5">
              <div class="text-gray-700 font-bold">拜访次数</div>
              <div class="flex-1"></div>
              <van-dropdown-menu class="text-gray-600 ml-3 p-3 w-32" style="background-color: #edf2f7; height: inherit; text-align:right;">
                <van-dropdown-item v-model="params.visitConditions" :options="$store.state.dealer.conditions" />
              </van-dropdown-menu>
              <div class="bg-gray-200 w-24 ml-1">
                <van-field type="number" v-model="params.visitCount" @input="val=>!/^[0-9]+$/.test(val) && (this.params.visitCount = '')" style="background-color: inherit; height:39px; padding:0 10px; line-height: 39px;" placeholder="天数" />
              </div>
            </div>

            <div class="text-gray-700 font-bold  mt-5">关系健康度</div>
            <div class="flex flex-wrap justify-start text-center text-gray-600">
              <div v-for="(r,i) in $store.state.dealer.relationHealth" :key="i" 
                @click="params.relationHealth = params.relationHealth == r.id ? '' : r.id"
                :class="['p-2 cursor-pointer bg-gray-200 w-24 mr-1 mb-1', {cardStatus: r.id == params.relationHealth}]">
                {{r.text}}
              </div>
            </div>

          </div>
        </div>

        <div class="flex text-center">
          <div class="w-2/5 bg-gray-300 p-3 text-xl font-bold" @click="reset">重置</div>
          <div class="flex-1 bg-orange p-3 text-xl font-bold text-white" @click="finish">完成</div>
        </div>

      </div>

    </van-popup>
    
  </div>
</template>

<script>
import UserList from '@/components/UserList/index.vue'
export default {
  name: 'Screening',
  components: {
    UserList
  },
  data() {
    return {
      screeningShow: false,
      params: {
        dealerName: '',
        startTime: '',
        endTime: '',
        relationHealth: '',
        notVisitDays: '',
        visitCount: '',
        notVisitConditions: 1,
        visitConditions: 1,
        level: '',
        ownerUserGids: [],
        area: '',
        areaVal: '',
        city: '',
        cityVal: '',
        province: '',
        provinceVal: '',
      },
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],

      showTime: false,
      timeStr: new Date(this.$root.moment().format('YYYY-MM-DD')),
      timeType: 0,
    }
  },
  filters: {
    fiterUser(data){
      if(!data.length){
        return '请选择负责人'
      }
      let arr = []
      data.map(r=>{
        arr.push(r.refRlNm)
      })
      return arr.toString()
    }
  },
  mounted() {
  },
  watch: {
    screeningShow (val) {
      if(val){
        !this.params.provinceVal && this.$store.dispatch('getProvinces').then(data=>{
          this.$store.state.dealer.provincesList.unshift({
            text: '请选择省份',
            value: ''
          })
          this.$store.state.dealer.citysList = []
          this.$store.state.dealer.areasList = []
          this.params.area = ''
          this.params.city = '' 
          this.params.areaVal = ''
          this.params.cityVal = '' 
        })
      }
    },
    'params.provinceVal' (val) {
      if (val) {
        this.$store.dispatch('getCitys', val).then(data=>{
          this.$store.state.dealer.citysList && this.$store.state.dealer.citysList.unshift({
            text: '请选择市区',
            value: ''
          })
        })
        this.$store.state.dealer.provincesList.some(r=>{
          if(r.value == val){
            this.params.province = r.text
            return true
          }
        })
      }else{
        this.$store.state.dealer.citysList = []
      }
      this.$store.state.dealer.areasList = []
      this.params.city = '' 
      this.params.cityVal = '' 
      this.params.area = ''
      this.params.areaVal = ''
    },
    'params.cityVal' (val) {
      if (val) {
        this.$store.dispatch('getAreas', val).then(data=>{
          this.$store.state.dealer.areasList.length && this.$store.state.dealer.areasList.unshift({
            text: '请选择县',
            value: ''
          })
        })
        this.$store.state.dealer.citysList.some(r=>{
          if(r.value == val){
            this.params.city = r.text
            return true
          }
        })
      }else{
        this.$store.state.dealer.areasList = []
      }
      this.params.area = ''
      this.params.areaVal = ''
    },
    'params.areaVal'(val) {
      if(val){
        this.$store.state.dealer.areasList.some(r=>{
          if(r.value == val){
            this.params.area = r.text
            return true
          }
        })
      }else{
        this.params.area = ''
      }
    }
  },
  methods: {
    setParams(val){this.params.ownerUserGids = val},
    finish () {
      this.screeningShow = false
      this.$emit('onSearch', this.params)
    },
    // 确定时间
    confirmTaskTime(){
      let timeStr = !this.timeType ? new Date(this.$root.moment(this.timeStr).format('YYYY-MM-DD 00:00:00')).getTime() : new Date(this.$root.moment(this.timeStr).format('YYYY-MM-DD 23:59:59')).getTime()

      !this.timeType ? new Date(this.$root.moment(timeStr).format('YYYY-MM-DD 00:00:00')).getTime() : new Date(this.$root.moment(timeStr).format('YYYY-MM-DD 23:59:59')).getTime()
      if (!this.timeType && this.params.endTime && timeStr > this.params.endTime ) {
        this.$notify({ type: 'warning', message: '开始时间要小于结束时间' })
        return
      }
      if (this.timeType && this.params.startTime && timeStr < this.params.startTime) {
        this.$notify({ type: 'warning', message: '结束时间要大于开始时间' })
        return
      }
      this.timeType ? (this.params.endTime = timeStr) : (this.params.startTime = timeStr)
      this.showTime = false;
    },
    // 重置
    reset(){
      this.params = {
        dealerName: '',
        startTime: '',
        endTime: '',
        relationHealth: '',
        notVisitDays: '',
        visitCount: '',
        notVisitConditions: 1,
        visitConditions: 1,
        level: '',
        ownerUserGids: [],
        area: '',
        areaVal: '',
        city: '',
        cityVal: '',
        province: '',
        provinceVal: '',
      }
      this.finish()
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
.cardStatus{
  background-color: #FFF2E6;
  position: relative;
  color: #FF9B02;
}
.cardStatus::after{
  position: absolute;
  right: 0;
  bottom:0;
  border: 6px solid;
  border-color:   transparent  #FF9B02 #FF9B02 transparent;
  content: '';
}

.Screening /deep/ .van-picker__toolbar{
  display: -webkit-box !important;
}
.Screening /deep/ .van-picker__frame, .van-picker__loading .van-loading{
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
}

.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>