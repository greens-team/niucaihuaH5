<template>
  <div class="flex-1 flex flex-col amapBox">
    <van-nav-bar
      title="地图位置"
      left-text="返回"
      :right-text="$route.query.lng && $route.query.edit ? '确定' : ($route.query.lng ? '' : '确定')"
      @click-left="setSource(),$router.go(-1)"
      @click-right="setLocation"
    />

    <!-- <input  
          v-model="searchKey"
          type="search"  
          id="search"
          > -->

          <!-- <button @click="searchByHand" @input="searchByHand" >搜索</button> -->
    

    


    
    <div class="amap-page-container flex-1 flex flex-col relative">
      <el-amap vid="amap" ref="map" :plugin="plugin" :zoom="zoom" :class="['flex-1', {ding: dealerPosition}]" :center="center" :events="$route.query.lng && $route.query.edit ? events  : ($route.query.lng ? {} : events)" >
        <el-amap-marker v-if="dealerPosition" class="" style="z-index: 9999999999;" :position="center" icon="./ding.png" :offset="[-24,-40]"></el-amap-marker>
      </el-amap>
    </div>

    
    <div v-if="!dealerPosition" style="min-height: 300px;" class="checkBoxGroup flex flex-col" >
      <van-field v-model="searchKey" id="search"  type="search"   placeholder="请输入关键字" />
      <div id="searchTip"></div>
      <!-- <el-amap-search-box  style="width:90%;margin:10px 5%" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
      <div class="flex-1 relative">
        <div class="absolute inset-0 overflow-y-scroll">
            <van-radio-group v-model="resPoi">
              <van-radio icon-size="16px" class="border-b border-gray-100 ml-5 mr-5 pt-3 pb-3" v-for="(r,i) in pois.pois" :key="i" :name="r">
                {{r.name}}<br />
                <span class="text-sm text-gray-500">{{r.address}}</span>
              </van-radio>
            </van-radio-group>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Map',
  data() {
    let self = this;
      return {
        searchKey: '',
        poiPicker:null,
        toSearch:false,
        ding: {//自定义外观
          url:'./ding.png',//图片地址
          size:[48,48],  //要显示的点大小，将缩放图片
          ancher:[24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        },
        dealerPosition: false,
        pois: {},
        resPoi: {},
        params : {
          lng: '',
          lat: '',
          address: ''
        },

        // searchOption: {
        //   city: '北京',
        //   citylimit: false
        // },

        map:null,
        events: {
          init (o) {
            self.map=o;
			
            // o.getCurrentPosition && o.getCurrentPosition((status, result) => {
            //   console.log(status, result, 333)
            // })


            // self.$refs.map.$$getInstance().plugin('AMap.Autocomplete', function(){
            //   // 实例化Autocomplete
            //   var autoOptions = {
            //     // input 为绑定输入提示功能的input的DOM ID
            //     input: 'input_id'
            //   }
            //   var autoComplete= new AMap.Autocomplete(autoOptions);
            //   console.log(autoComplete, 333344444)
            //   // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
            // })
            

            // let marker = new AMap.Marker({
            //   position: [116.397451, 39.909187]
            // });
            // marker.setMap(o);

            // this.$refs.map.$$getInstance()

            // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
            //     const marker = new SimpleMarker({
            //       iconLabel: 'A',
            //       iconStyle: 'red',
            //       map: o,
            //       position: o.getCenter()
            //     });
            //   });

          }
        },
        zoom: 15,
        center: [116.397451, 39.909187],
        plugin: [{
          pName: 'Geolocation', 
          events: !Object.keys(self.$route.query).length ? {} : (!self.$route.query.lng ? {
            init(o) {
              self.map=o;
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat];
                  self.getInfo(result.position.lng, result.position.lat)
                  self.$nextTick();
                }
              });
            }
          }: {})
        },{
          pName: 'ToolBar',
          position: 'RB',
        }]
      }
  },
  watch: {
    map:function(){
      if(this.map!=null){
        this.startDrag();
        this.initSearch();
      }
    },
    resPoi(val){
      this.params = val ? {
        lng: val.location.lng,
        lat: val.location.lat,
        address: this.pois.addressComponent.province + this.pois.addressComponent.city + this.pois.addressComponent.district + val.address + val.name
      } : {
        lng: '',
        lat: '',
        address: ''
      }
    }
  },
  methods: {
    initSearch(){
        let vm=this;
        let map=this.$refs.map.$$getInstance();
        this.toSearch=true;
        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
          var poiPicker = new PoiPicker({
              input: 'search', //输入框id
              placeSearchOptions: {
                map: map,
                pageSize: 10,
              },
              suggestContainer:'searchTip',
          });
          vm.poiPicker=poiPicker;
          //监听poi选中信息
          poiPicker.on('poiPicked', function(poiResult) {
            let poi = poiResult.item;
            poiPicker.clearSearchResults();
            vm.searchKey="";
            vm.center = [poi.location.lng, poi.location.lat];
            vm.getInfo(poi.location.lng, poi.location.lat)
            document.getElementById('searchTip').innerHTML = ''
          });

          // poiPicker.on('poiPicked', function(poiResult) {
          //   let source = poiResult.source;
          //   let poi = poiResult.item;
          //   if (source !== 'search') {
          //       poiPicker.searchByKeyword(poi.name);
          //   } else {
          //     poiPicker.clearSearchResults();
          //     vm.center=[poiResult.item.location.lng,poiResult.item.location.lat];
          //     vm.address=poi.name;
          //     vm.searchKey="";
          //     vm.toSearch=false;
          //   }
          // });


        });
      },
    // searchByHand(){
    //   if(this.searchKey!=''){
    //     this.poiPicker.searchByKeyword(this.searchKey);
    //   }
    // },
    startDrag(){//方法二
        let self = this;
        var map = this.$refs.map.$$getInstance()
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
          var positionPicker = new PositionPicker({
              mode: 'dragMap',
              map: map,
              iconStyle:self.ding
          });
          //定位
          let geolocation;
          map.plugin('AMap.Geolocation', function () {
            geolocation=new AMap.Geolocation({
              showButton: true,        //显示定位按钮，默认：true
              showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
              extensions:'all'
            })
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', function(data){
              positionPicker.start();
            });//返回定位信息
          })
          positionPicker.on('success', function(positionResult){
            // let lt = positionResult.position
            // console.log('aaaaaaaaa')
            // self.getInfo(lt.lng, lt.lat)
            if (positionResult.info === 'OK') {
              self.setAllVal(positionResult)
            }
          })
          positionPicker.on('fail', function(failResult){
            console.log(failResult)
          })
          positionPicker.start();
        })
    },

    setAllVal(result){
      // this.searchOption.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
      this.pois = result.regeocode
      this.pois.pois && this.pois.pois[0] && this.pois.pois[0].lng && (this.center = [this.pois.pois[0].lng, this.pois.pois[0].lat]);
      this.resPoi = this.pois.pois[0]
    },
    getInfo(lng ,lat){
      var geocoder = new AMap.Geocoder({
        radius: 100,
        extensions: "all"
      });        
      geocoder.getAddress([lng ,lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            this.setAllVal(result)
            this.$nextTick();
          }
        }
      }); 
    },
    // onSearchResult(pois) {
    //   console.log(pois, 444)
    //   this.pois.pois = pois
    //   this.center = [pois[0].lng, pois[0].lat];
    //   this.resPoi = pois[0]
    // },
    
    setSource(){
      // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据
      sessionStorage.mapsource="true"
    },
    setLocation(){
      this.setSource() // 记录页面来源，是为了编辑经销商时不重新渲染经销商数据
      // 赋值给NDparams 经纬度
      if(this.params.lng){
        let { lng, lat } = this.$root.gps_bgps(this.params.lng, this.params.lat)
        this.$store.getters.NDparams.longitude =  lng
        this.$store.getters.NDparams.latitude = lat
        // 赋值给NDparams 地理位置
        this.$store.getters.NDparams.locationName = this.params.address
        this.$router.go(-1)
      }else{
        this.$toast('请在地图选择位置');
      }
    },
  },
  mounted() {
    delete sessionStorage.localMap;
    if(this.$route.query.lng){
      let { lng, lat } = this.$root.bgps_gps(this.$route.query.lng, this.$route.query.lat) 
      this.center = [lng, lat];
      this.dealerPosition = !this.$route.query.edit;
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

.checkBoxGroup /deep/ .van-nav-bar__text {
  color: #ff9b02;
  font-size: 1.143rem;
}
.checkBoxGroup /deep/ .van-nav-bar .van-icon {
  color: #ff9b02;
  font-size: 1.143rem;
  display: none;
}
.checkBoxGroup /deep/ .van-radio__icon--checked .van-icon {
  background-color: #ff9b02;
  border-color: #ff9b02;
}
.checkBoxGroup /deep/ .van-nav-bar__arrow + .van-nav-bar__text {
  margin-left: -25px;
}


.checkBoxGroup /deep/ textarea::-webkit-input-placeholder {
  color: #c4c6cc;
}
.checkBoxGroup /deep/ textarea::-moz-input-placeholder {
  color: #c4c6cc;
}
.checkBoxGroup /deep/ textarea::-ms-input-placeholder {
  color: #c4c6cc;
}

.checkBoxGroup /deep/ .el-vue-search-box-container{
  border-radius: 20px;
  box-shadow: 0 3px 5px #f5f5f5;
  border: 1px solid #f1f1f1;
  height: 40px;
}
.checkBoxGroup /deep/ .el-vue-search-box-container input{
  margin-left: 10px;
}

.ding /deep/ img{
  width: 48px;
}


.amapBox #searchTip{
  
  overflow-y: scroll;
  border-radius: 5px;
  margin: 0 6px;
  box-shadow: 0 0px 2px #e5e5e5;
  max-height: 248px;
  border: none;
}

 .amapBox /deep/ .sugg-no-id{
   display: none;
 }


</style>