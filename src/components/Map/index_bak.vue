<!-- 嵌套部门循环组件 -->
<template>
  <div class="flex-1 flex flex-col">

    <van-nav-bar
      :title="$route.query.clockIn?'签到打卡':'选择地图位置'"
      left-text="返回"
      :right-text="$route.query.lng ? '' : '确定'"
      @click-left="setSource(),$router.go(-1)"
      @click-right="setLocation"
    />

    <div v-if="!$route.query.lng">
      
        <div class="p-1 text-sm text-gray-500 pl-3 text-center bg-gray-100">拖动地图上的红色图标，可选择地址</div>
        
        <van-radio-group v-model="addressValue">
          <van-radio v-for="(r,i) in addressList" :key="i" icon-size="15px" :name="r.value" class=" text-sm p-2 border-b border-gray-200"><span class="ellipsis">{{r.text}}</span></van-radio>
        </van-radio-group>

    </div>

      <label>地址：<input v-model="keyword"></label>
    <baidu-map class="flex-1  map" :center="center" :zoom="zoom"  @ready="handler"> 
      <bm-local-search :keyword="keyword" :auto-viewport="true"  zoom="30"></bm-local-search>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker :position="center" :dragging="true" @dragend="dragend"></bm-marker>
    </baidu-map>

  </div>
</template>

<script>
// import {BmlMarkerClusterer, BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
export default {
  name: 'Map',
  data() {
    return {
      center: '',
      zoom: 18,
      addressList: [],
      addressValue: '',
      BMap: '',
      keyword:'',
    }
  },
  watch: {
    keyword(){
      console.log(this.center)
    }
  },
  components: {
    // BmlMarkerClusterer
  },
  methods: {
    // 获取位置列表
    dragend(event){
      let _this = this
      var map = new this.BMap.Map("allmap");
      var point = new this.BMap.Point(event.point.lng,event.point.lat);
      var gc = new this.BMap.Geocoder();
      gc.getLocation(point, function(rs){
        // _this.center = point;
        var addComp = rs.addressComponents;
        let lngLatText = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        console.log(lngLatText)
        _this.addressList = []
        _this.addressList.push({
          text: lngLatText.replace(/,|\s/g, ''),
          value: JSON.stringify(point)
        })
        rs.surroundingPois.map(r=>{
          _this.addressList.push({
            text:( r.title+' '+r.address).replace(/,|\s/g, ''),
            value: JSON.stringify(r.point)
          })
        })
      });
    },
    setSource(){
      // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据
      sessionStorage.mapsource="true"
    },
    setLocation(){
      this.setSource() // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据

      // addressValue 包含：经度、纬度、详细地址
      if(this.addressValue){
        let o = JSON.parse(this.addressValue)
        // 赋值给NDparams 经纬度
        this.$store.getters.NDparams.longitude =  String(o.lng).split('.')[1].length > 6 ? o.lng.toFixed(6) : o.lng
        this.$store.getters.NDparams.latitude = String(o.lat).split('.')[1].length > 6 ? o.lat.toFixed(6) : o.lat
        let address = ''
        this.addressList.some(r=>{
          if(r.value == this.addressValue){
            address = r.text
          }
        })
        // 赋值给NDparams 地理位置
        this.$store.getters.NDparams.locationName = address

        //打卡是否在范围内
        if(this.$route.query.id && this.$route.query.clockIn){
          //打卡是否在范围内
          this.$store.dispatch('clockincheck',{
            gid: this.$route.query.id,
            longitude: this.$store.getters.NDparams.longitude,
            latitude: this.$store.getters.NDparams.latitude
          }).then(res=>{
            this.$dialog.confirm({
              message: res.data ? '你在打卡范围内' : '你不在打卡范围内',
              confirmButtonText: '打卡'
            }).then(() => {
              // 确认打卡
              let paras = {
                gid: this.$route.query.id,
                longitude: this.$store.getters.NDparams.longitude,
                latitude: this.$store.getters.NDparams.latitude,
                clockinPlaceName: address,
                clockinPlaceAddress: address
              }
              //开始打卡
              this.$store.dispatch('clockin',paras).then(r=>{
                sessionStorage.localMap = JSON.stringify(paras)
              }).then(()=>{
                this.$router.go(-1)
              })
            });
          })
        }else{
          this.$router.go(-1)
        }
      }else{
        this.$toast('请选择地址')
        // this.$notify({ type: 'warning', message: '请选择地址' })
      }
    },

    handler({BMap, map}){
      // 1.获取当前的经纬度 进行定位
      // 2.根据url地址传过来的经纬度 进行定位
        this.BMap = BMap
        if(this.$route.query.lng){
          this.center = {
            lng: this.$route.query.lng, 
            lat: this.$route.query.lat
          }
          this.dragend({
            point: this.center
          })
        }else{
              var geolocation1 = new this.BMap.Geolocation();
              geolocation1.enableSDKLocation();
              geolocation1.getCurrentPosition((position) => {
                console.log(position)
                this.center = {
                  lng: position.point.lng, 
                  lat:position.point.lat
                }
                this.dragend({
                  point: this.center
                })
              })
        }
    }
  },
  mounted() {
    delete sessionStorage.localMap;
  },
}
</script>

<style scoped>
</style>