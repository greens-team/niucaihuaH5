<!-- 嵌套部门循环组件 -->
<template>
  <div class="flex-1 flex flex-col clockIn">

    <van-nav-bar
      title="签到打卡"
      left-text="返回"
      :right-text="$route.query.lng ? '' : '确定'"
      @click-left="$router.go(-1)"
      @click-right="setLocation"
    />
    <div class="flex flex-1 flex-col relative">
      <div v-if="!$route.query.lng" class="text-sm font-bold p-2 absolute z-10 bg-white opacity-75 rounded text-white" style="top:5px; left:5px; right:5px;">
        占位
      </div>
      <div v-if="!$route.query.lng" class="text-sm text-gray-700 font-bold p-2 absolute z-10 ellipsis" style="top:5px; left:5px; right:5px;">
        您所在位置: {{address}}
      </div>
      <el-amap vid="amap" :plugin="plugin" :zoom="zoom" class="flex-1 ding" :center="dealerCenter.length ? dealerCenter : center" >
	    <el-amap-marker style="z-index: 9999999999;" :position="center" :icon="dingIcon" :offset="[-24,-40]"></el-amap-marker>
        <el-amap-circle v-for="circle in circles" :key="circle.center.toString()" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" stroke-weight="0" stroke-opacity=".3" fill-color="#5791fc" stroke-color="#5791fc"></el-amap-circle>
      </el-amap>
    </div>

  </div>
</template>

<script>
import VueAMap from 'vue-amap';
VueAMap.initAMapApiLoader({
  key: '276923c83894386e499c8b979ee7f446',
  plugin: ['AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  // v: '1.4.4'
});
//18141923080 1q2w3e4r 
export default {
  name: 'Map',
  data() {
    let self = this;
      return {
		dealerCenter: [],
		dingIcon: new AMap.Icon({//自定义外观
		  image: './ding.png',
		  imageSize: new AMap.Size(48, 48),
		  size: new AMap.Size(48, 48),
        }),
        zoom: 15,
        circles: [ // 经销商位置
          {
            center: [121.5273285, 31.21515044],
            radius: 500,
            fillOpacity: 0.38
          }
        ],
        center: [121.59996, 31.197646], // 当前地图 及 当前用户位置
        lng: 0,
        lat: 0,
        address: '',
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              !self.dealerCenter.length && o.getCurrentPosition((status, result) => {
                if (result && result.position && !self.$route.query.lng) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.address = result.formattedAddress;
                  self.center = [self.lng, self.lat];
                  self.$nextTick();
                }else{
                  self.$nextTick();
                }
              });
            }
          }
        },{
            pName: 'ToolBar',
            position: 'RB',
          }]
      }
  },
  methods: {
    setLocation(){
      let { lng, lat } = this.$root.gps_bgps(this.lng, this.lat)
      //打卡是否在范围内
      this.$store.dispatch('clockincheck',{
        gid: this.$route.query.id,
        longitude: lng,
        latitude: lat
      }).then(res=>{
        this.$dialog.confirm({
          message: res.data ? '你在打卡范围内' : '你不在打卡范围内',
          confirmButtonText: '打卡'
        }).then(() => {
          // 确认打卡
          let paras = {
            gid: this.$route.query.id,
            longitude: lng,
            latitude: lat,
            clockinPlaceName: this.address,
            clockinPlaceAddress: this.address
          }
          //开始打卡
          this.$store.dispatch('clockin',paras).then(r=>{
            sessionStorage.localMap = JSON.stringify(paras)
          }).then(()=>{
            this.$router.go(-1)
          })
        });
      })
    },
  },
  mounted() {
    delete sessionStorage.localMap;
    //经销商位置赋值
    let { lng, lat } = this.$root.bgps_gps(this.$route.query.dealerLog, this.$route.query.dealerLat) 
    this.circles[0].center = [lng, lat]
    this.$route.query.dealerInfo === true && (this.dealerCenter = [lng, lat])
    if(this.$route.query.lng){
      let { lng, lat } = this.$root.bgps_gps(this.$route.query.lng, this.$route.query.lat) 
      this.center = [lng, lat];
	  this.$route.query.dealerInfo === false && (this.dealerCenter = [lng, lat])
    }
  },
}
</script>

<style scoped>
.amap-demo {
  height: 300px;
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clockIn /deep/ .amap-marker-content{
	display: none;
}
</style>