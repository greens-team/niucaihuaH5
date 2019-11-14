<!-- 创建经销商页面 -->
<template>

  <div class="CreateDealer flex-1 flex flex-col">
    <van-nav-bar title="新建经销商" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right" @click="showNext = true">下一步</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-auto pr-4">
        <div class="relative formBar font-bold text-base p-3 pl-4">备案信息</div>
        <van-field
          v-model="$store.getters.NDparams.dealerName"
          required
          label="经销商名称"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NDparams.creditCode"
          label="统一社会信用代码"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="$store.getters.NDparams.establishTime"
          label="成立日期"
          placeholder="请填写信息"
          label-width="130"
        />
        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;">所属地区</div>
            <van-dropdown-menu class="flex-1 border-0 pr-3">
              <van-dropdown-item v-model="$store.getters.NDparams.rgnPrCd" :options="$store.state.dealer.provincesList" />
              <van-dropdown-item v-model="$store.getters.NDparams.rgnCyCd" :options="$store.state.dealer.citysList" />
              <van-dropdown-item v-model="$store.getters.NDparams.rgnArCd" :options="$store.state.dealer.areasList" />
            </van-dropdown-menu>
        </div>
        <van-field
          v-model="$store.getters.NDparams.address"
          label="详情地址"
          placeholder="请填写街道号码信息"
          label-width="130"
        />
        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;"> 公司归属</div>
          <van-dropdown-menu  class="border-0">
            <van-dropdown-item v-model="$store.getters.NDparams.ownerCd" :options="$store.getters.NDownerCdTypes" />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;"> 业务类型</div>
          <div  class="flex-1" @click="businessTypesShow = true">{{typeList | typeListFilter}}</div>
        </div>
        <van-popup
          v-model="businessTypesShow"
          position="bottom"
          :style="{ height: '40%'}">
          <van-nav-bar
            title="请选择业务类型"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="businessTypesShow = false;"
            @click-right="typeList = $store.state.newDealer.businessTypesValues; businessTypesShow = false;"
          />
          <div class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200" style="top:46px;">
            <van-checkbox-group v-model="$store.state.newDealer.businessTypesValues">
              <van-checkbox icon-size="16px" class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3" v-for="(r,i) in $store.getters.NDbusinessTypes" :key="i" :name="r">{{r.text}}</van-checkbox>
            </van-checkbox-group>
          </div>
        </van-popup>


        <div class="relative formBar font-bold text-base p-3 pl-4">基本信息</div>

        <!-- longitude -->
        <!-- <van-field
          v-model="$store.getters.NDparams.latitude"
          label="地理位置"
          @focus="$router.push('/map')"
          placeholder="请填写经纬度"
          label-width="130"
        /> -->

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;"> 地理位置</div>
          <div  class="flex-1" @click="$router.push('/map')">{{$store.getters.NDparams.latitude && $store.getters.NDparams.longitude ? ($store.getters.NDparams.longitude +','+ $store.getters.NDparams.latitude) : '选择地图位置'}}</div>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center">
          <div style="width:130px; color:#323233;"> 经销商分级</div>
          <van-dropdown-menu  class="border-0">
            <van-dropdown-item v-model="$store.getters.NDparams.level" :options="$store.getters.NDlevelList" />
          </van-dropdown-menu>
        </div>

        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;"> 负责人</div>
          <div  class="flex-1" @click="ownerUserGidsShow = true; ownerUserGidsType = 1; ownerUserGidsValus=[]">{{ownerUserGidsA | ownerUserGidsFilter}}</div>
        </div>
        <div class="flex border-b border-gray-200 ml-4 items-center pt-3 pb-3">
          <div style="width:130px; color:#323233;"> 参与人</div>
          <div  class="flex-1 " @click="ownerUserGidsShow = true; ownerUserGidsType = 2; ownerUserGidsValus=[]">{{ownerUserGidsB | ownerUserGidsFilter}}</div>
        </div>
        <van-popup
          v-model="ownerUserGidsShow"
          position="bottom"
          :style="{ height: '40%'}">
          <van-nav-bar
            title="请选择业务类型"
            left-text="取消"
            right-text="确定"
            left-arrow
            @click-left="ownerUserGidsShow = false;"
            @click-right="ownerUserGidsType == 1 ? (ownerUserGidsA = ownerUserGidsValus) : (ownerUserGidsB = ownerUserGidsValus); ownerUserGidsShow = false;"
          />
          <div class="absolute bottom-0 left-0 right-0 overflow-y-scroll border-t border-gray-200" style="top:46px;">
            <van-checkbox-group v-model="ownerUserGidsValus">
              <van-checkbox icon-size="16px" class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3" v-for="(r,i) in $store.state.dealer.colleagueDataList" :key="i" :name="r">{{r.refRlNm}}</van-checkbox>
            </van-checkbox-group>
          </div>
        </van-popup>
  
        <van-field
          v-model="$store.getters.NDparams.comment"
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

    <van-popup
      v-model="showNext"
      position="bottom"
    >
      <div class="bg-gray-200">
        <div @click="$router.push('/ContactsList')" class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer">新建联系人</div>
        <div class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer" @click="createDealer">直接新建经销商</div>
        <div class="text-center border-b border-gray-300 bg-white h-12 flex items-center justify-center cursor-pointer mt-3" @click="showNext=false">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'CreateDealer',
  data() {
    return {
      showNext: false,
      businessTypesShow: false,
      typeList: [],

      ownerUserGidsShow: false,
      ownerUserGidsValus: [],
      ownerUserGidsA: [],
      ownerUserGidsB: [],
      ownerUserGidsType: 1
    }
  },
  filters: {
    typeListFilter(data){
      let arr = [];
      data.map(r=>{
        arr.push(r.text)
      })
      return arr.length ? arr.toString() : '请选择类型'
    },
    ownerUserGidsFilter(data){
      let arr = [];
      data.map(r=>{
        arr.push(r.refRlNm)
      })
      return arr.length ? arr.toString() : '请选择负责人'
    }
  },
  mounted () {

    this.$store.dispatch('getProvinces').then(data=>{
      this.$store.commit('setParams', {
        rgnPrCd: this.$store.state.newDealer.params.rgnPrCd || data[0].value,
        province: this.$store.state.newDealer.params.province || data[0].text})
    })
    this.$store.dispatch('getColleague', {
      pageNum: 1,
      pageSize: 10,
      usrNM: '',
      rlNm: ''
    })
  },
  watch: {
    ownerUserGidsA(data){
      let vals=[];
      data.map(r=>{
        vals.push(r.id)
      })
      this.$store.state.newDealer.params.ownerUserGids = vals.toString()
    },
    ownerUserGidsB(data){
      let vals=[];
      data.map(r=>{
        vals.push(r.id)
      })
      this.$store.state.newDealer.params.followerUserGids = vals.toString()
    },
    typeList(data){
      let vals=[];
      data.map(r=>{
        vals.push(r.value)
      })
      this.$store.state.newDealer.params.chkBusTypCdList = vals.toString()
    },
    '$store.getters.NDparams.rgnPrCd'(code){
      this.$store.state.dealer.provincesList.some(r=>{
        if(r.value === code){
          this.$store.commit('setParams',{
            rgnPrCd: code,
            province: r.text}
          )
          return true;
        }
      })
      this.$store.dispatch('getCitys', code).then(data=>{
        this.$store.commit('setParams',{
          rgnCyCd: this.$store.state.newDealer.params.rgnCyCd || data[0].value,
          city: this.$store.state.newDealer.params.city || data[0].text})
      })
    },
    '$store.getters.NDparams.rgnCyCd'(code){
      this.$store.state.dealer.citysList.some(r=>{
        if(r.value === code){
          this.$store.commit('setParams',{
            rgnCyCd: code,
            city: r.text}
          )
          return true;
        }
      })
      this.$store.dispatch('getAreas', code).then(data=>{
        this.$store.commit('setParams',{
          rgnArCd: data[0].value,
          area: data[0].text})
      })
    },
    '$store.getters.NDparams.rgnArCd'(code){
      this.$store.state.dealer.areasList.some(r=>{
        if(r.value === code){
          this.$store.commit('setParams',{
            rgnArCd: this.$store.state.newDealer.params.rgnArCd || ode,
            area: this.$store.state.newDealer.params.area || r.text}
          )
          return true;
        }
      })
    }
  },
  methods: {
    createDealer () {
      this.$store.dispatch('addNewDealer').then(r=>{
        console.log(r, 222)
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>
</style>