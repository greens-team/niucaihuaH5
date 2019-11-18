<!-- 嵌套部门循环组件 -->
<template>
  <div class="flex-1 flex flex-col">

    <van-nav-bar
      :title="$route.query.clockIn?'签到打卡':'选择地图位置'"
      left-text="返回"
      right-text="确定"
      @click-left="$router.go(-1)"
      @click-right="setLocation"
    />
   
    <div class="p-1 text-sm text-gray-500 pl-3 text-center bg-gray-100">拖动地图上的红色图标，可选择地址</div>
    
    <van-radio-group v-model="addressValue">
      <van-radio v-for="(r,i) in addressList" :key="i" icon-size="15px" :name="r.value" class=" text-sm p-2 border-b border-gray-200"><span class="ellipsis">{{r.text}}</span></van-radio>
    </van-radio-group>

    <baidu-map class="flex-1  map" :center="center" :zoom="zoom"  > 
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker :position="center" :dragging="true" @dragend="dragend"></bm-marker>
    </baidu-map>

  </div>
</template>

<script>
import {BmlMarkerClusterer} from 'vue-baidu-map'
export default {
  name: 'Map',
  data() {
    return {
      center: {lng: Number(localStorage.lng), lat:Number(localStorage.lat)},
      zoom: 18,
      addressList: [],
      addressValue: ''
    }
  },
  components: {
    BmlMarkerClusterer
  },
  methods: {
    dragend(event){
      let _this = this
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(event.point.lng,event.point.lat);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function(rs){
        // _this.center = point;
        var addComp = rs.addressComponents;
        let lngLatText = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        console.log(lngLatText)
        _this.addressList = []
        _this.addressList.push({
          text: lngLatText,
          value: JSON.stringify(point)
        })
        rs.surroundingPois.map(r=>{
          _this.addressList.push({
            text: r.title+' '+r.address,
            value: JSON.stringify(r.point)
          })
        })
      });
    },
    setLocation(){
      if(this.addressValue){
        let o = JSON.parse(this.addressValue)
        this.$store.getters.NDparams.longitude =  String(o.lng).split('.')[1].length > 6 ? o.lng.toFixed(6) : o.lng
        this.$store.getters.NDparams.latitude = String(o.lat).split('.')[1].length > 6 ? o.lat.toFixed(6) : o.lat

        if(this.$route.query.id && this.$route.query.clockIn){
          this.$store.dispatch('clockincheck',{
            gid: this.$route.query.id,
            longitude: this.$store.getters.NDparams.longitude,
            latitude: this.$store.getters.NDparams.latitude
          }).then(res=>{
            this.$dialog.confirm({
              message: res.data ? '你在打卡范围内' : '你不在打卡范围内',
              confirmButtonText: '打卡'
            }).then(() => {
              let address = ''
              this.addressList.some(r=>{
                if(r.value == this.addressValue){
                  address = r.text
                }
              })
              // 确认打卡
              let paras = {
                gid: this.$route.query.id,
                longitude: this.$store.getters.NDparams.longitude,
                latitude: this.$store.getters.NDparams.latitude,
                clockinPlaceName: address,
                clockinPlaceAddress: address
              }
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
        this.$notify({ type: 'warning', message: '请选择地址' })
      }
    },

  },
  mounted() {
    delete sessionStorage.localMap;
    this.dragend({
      point: this.center
    })
  },
}
</script>

<style scoped>
.ellipsis{
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>