<template>
  <div class="flex-1 flex flex-col">
    <van-nav-bar
      title="地图位置"
      left-text="返回"
      :right-text="$route.query.lng && $route.query.edit ? '确定' : ($route.query.lng ? '' : '确定')"
      @click-left="setSource(),$router.go(-1)"
      @click-right="setLocation"
    />
    <div class="amap-page-container flex-1 flex flex-col relative">
      <div class="text-sm font-bold p-2 absolute z-10 bg-white opacity-75 rounded text-white" style="top:5px; left:5px; right:5px;">占位</div>
      <div class="text-sm border border-gray-300  font-bold p-2 absolute z-10 ellipsis" style="top:5px; left:5px; right:5px;">
        经销商位置: {{params.address}}
      </div>
      
      <el-amap-search-box v-if="$route.query.lng && $route.query.edit ? true : ($route.query.lng ? false : true)" class="search-box absolute z-10 w-full  shadow border-gray-300 " style="top:43px; left:5px; right:5px; width:auto; position:absolute; opacity: 0.8" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <!-- <el-amap-search-box v-if="$route.query.edit" class="search-box absolute z-10 w-full  shadow border-gray-300 " style="top:43px; left:5px; right:5px; width:auto; position:absolute; opacity: 0.8" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
      <el-amap vid="amap" :plugin="plugin" :zoom="zoom" class="flex-1" :center="center" :events="$route.query.lng && $route.query.edit ? events  : ($route.query.lng ? {} : events)" >
        <template v-if="($route.query.lng && $route.query.edit ? true : ($route.query.lng ? false : true)) && markers.length">
          <el-amap-marker v-for="(marker,i) in markers" :events="markerClick" :key="i" :position="marker" :clickable="true"></el-amap-marker>
        </template>
        <el-amap-marker style="z-index: 9999999999;" :position="dealerPosition" icon="./flag.png" :offset="[-20,-43]"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>

import VueAMap from 'vue-amap';
VueAMap.initAMapApiLoader({
  key: '8aa627fa31e90b627f676ad9c5f9f26a',
  plugin: ['AMap.Geolocation','AMap.ToolBar'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

export default {
  name: 'Map',
  data() {
    let self = this;
      return {
        params : {
          lng: '',
          lat: '',
          address: ''
        },
        markerClick: {
          click: (e) => {
            let { lng, lat } = e.lnglat;//e.lnglat; //()
            self.getInfo(lng, lat)
          }
        },
        // icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576128884556&di=bec7a6edff8972abb223c4a92f70f68e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F59%2F31%2F594d771606856_610.jpg',
        dealerPosition: [121.59, 31.19],
        markers:[],
        searchOption: {
            city: '全国',
            citylimit: true
          },
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;  
            self.getInfo(lng, lat)  
          }
        },
        zoom: 15,
        center: [121.59, 31.19],
        address: '',
        plugin: [{
          pName: 'Geolocation',
          events: !self.$route.query.lng ? {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat];
                  self.dealerPosition = [result.position.lng, result.position.lat]
                  self.params = {
                    lng: result.position.lng,
                    lat: result.position.lat,
                    address: result.formattedAddress
                  }
                  self.searchOption.city = result.addressComponent.city || result.addressComponent.province
                  self.$nextTick();
                }
              });
            }
          }: {}
        },{
          pName: 'ToolBar',
          position: 'RB',
        }]
      }
  },
  methods: {
    getInfo(lng ,lat){
      var geocoder = new AMap.Geocoder({
        radius: 500,
        extensions: "all"
      });        
      geocoder.getAddress([lng ,lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            this.searchOption.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
            this.params = {
              lng: lng,
              lat: lat,
              address: result.regeocode.formattedAddress
            }
           this.dealerPosition = [lng, lat]
            this.$nextTick();
          }
        }
      }); 
    },
    onSearchResult(pois) {
        this.markers=[]
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
        }
      },
    
    setSource(){
      // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据
      sessionStorage.mapsource="true"
    },
    setLocation(){
      this.setSource() // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据
      // 赋值给NDparams 经纬度
      let { lng, lat } = this.$root.gps_bgps(this.params.lng, this.params.lat)
      this.$store.getters.NDparams.longitude =  lng
      this.$store.getters.NDparams.latitude = lat
      // 赋值给NDparams 地理位置
      this.$store.getters.NDparams.locationName = this.params.address
      this.$router.go(-1)
    },
  },
  mounted() {
    delete sessionStorage.localMap;
    //$route.query.lng && $route.query.edit ? true : ($route.query.lng ? false : true)
    if(this.$route.query.lng){
      let { lng, lat } = this.$root.bgps_gps(this.$route.query.lng, this.$route.query.lat) 
      this.getInfo(lng, lat)
      this.center = [lng, lat];
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
</style>