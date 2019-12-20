 <!-- 提交备案信息 -->
<template>
  <div class="recordSubmit flex flex-1 flex-col bg-gray-100">
    <van-nav-bar
      title="备案信息"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">
        <div class="bg-white">
          <div class="relative formBar font-bold text-base p-2 pl-4">请上传身份证件及营业执照图片</div>
          <div class="p-10 flex items-center justify-between">
            <div class="items-center flex flex-col justify-center">
              <van-uploader :after-read="file => uploadFile(file, (fileUrl)=>info.idcardFrontPic = fileUrl, 1)" :before-read="file => uploadFile(file,true)" v-model="idcardFrontPicVal" :max-count="1"/>
              <p class="text-sm text-gray-500 mr-3">身份证正面</p>
            </div>
            <div class="items-center flex flex-col justify-center">
              <van-uploader :after-read="file => uploadFile(file, (fileUrl)=>info.idcardBackPic = fileUrl, 1)" :before-read="file => uploadFile(file,true)" v-model="idcardBackPicVal" :max-count="1"/>
              <p class="text-sm text-gray-500 mr-3">身份证反面</p>
            </div>
            <div class="items-center flex flex-col justify-center">
              <van-uploader :after-read="file => uploadFile(file, (fileUrl)=>info.licensePic = fileUrl, 1)" :before-read="file => uploadFile(file,true)" v-model="licensePicVal" :max-count="1"/>
              <p class="text-sm text-gray-500 mr-3">营业执照</p>
            </div>

          </div>
        </div>
        <div class="relative formBar font-bold text-base p-3 pl-4">备案信息数据</div>

        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">经销商名称</div>
          <div>{{info.dealerName}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">统一社会信用代码</div>
          <div>{{info.creditCode}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">公司归属</div>
          {{$store.state.newDealer.ownerCdTypes[info.ownerCd-1] ? $store.state.newDealer.ownerCdTypes[info.ownerCd-1].text : '无'}}
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">省市区</div>
          <div>{{info.geoLocation}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">注册地址</div>
          <div>{{info.address}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">业务类型</div>
          <div>{{businessTypes(info.chkBusTypCdList)}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">成立时间</div>
          <div>{{$root.moment(info.establishTime*1000).format('YYYY-MM-DD')}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">供应商属性</div>
          <div>{{$store.state.newDealer.splAttrCd[info.splAttrCd-1] ? $store.state.newDealer.splAttrCd[info.splAttrCd-1].text : '无'}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">法人姓名</div>
          <div>{{info.contactsName}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">手机号码</div>
          <div>{{info.contactsPhone}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">证件类型</div>
          <div>{{$store.state.record.certTypCd[info.certTypCd]}}</div>
        </div>
        <div class="border-b border-gray-200 pt-3 pb-3 ml-5 mr-5">
          <div class="text-sm text-gray-500">证件号码</div>
          <div>{{info.certNo}}</div>
        </div>

      </div>
    </div>
    <div class="bglinear text-white font-bold text-xl p-2 text-center m-3 rounded" @click="recordSubmit">提交备案</div>
  </div>
</template>

<script>
export default {
  name: 'recordSubmit',
  data() {
    return {
      info: {},
      idcardFrontPicVal: [],
      idcardBackPicVal: [],
      licensePicVal: []
    }
  },
  watch: {
    'info.idcardFrontPic'(url){
      sessionStorage.record = JSON.stringify(this.info)
    },
    'info.idcardBackPic'(url){
      sessionStorage.record = JSON.stringify(this.info)
    },
    'info.licensePic'(url){
      sessionStorage.record = JSON.stringify(this.info)
    }
  },
  mounted() {
    this.info = JSON.parse(sessionStorage.record)
    if(this.info.idcardFrontPic){
      this.idcardFrontPicVal = [{url: window.picServer + this.info.idcardFrontPic}]
      this.idcardBackPicVal = [{url: window.picServer + this.info.idcardBackPic}]
      this.licensePicVal = [{url: window.picServer + this.info.licensePic}]
    }
  },
  methods: {
    businessTypes(data){
      if(data){
        return this.$store.state.newDealer.businessTypes.filter(r=>{
          if(data.includes(r.value)){
            return r.text
          }
        }).map(r=>{
          return r.text
        }).toString()
      }else{
        return '无'
      }
    },
    deleteFile(file, key){
      console.log(key)
    },
    recordSubmit(){
      if(this.delaySend()){
        return
      }
      if(this.idcardFrontPicVal.length && this.idcardBackPicVal.length && this.licensePicVal.length){
        this.$store.dispatch('recordSubmit', Object.assign({},this.info,{
          dealerGid: this.$route.query.id,
          splAttrCd: 2,
          rlTypCd: 1
        })).then(res=>{
          this.$dialog.alert({
            message: '备案提交成功'
          }).then(() => {
            this.$router.go(-2)
          })
        })
      }else{
        this.$dialog.alert({
          message: '请上传身份证证件及营业执照图片'
        })
      }
    }
  }
}
</script>

<style scoped>
.bglinear{
  background:linear-gradient(225deg,rgba(255,149,5,1) 0%,rgba(254,196,58,1) 100%);
}
</style>