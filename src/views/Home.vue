<!-- 首页 -->
<template>
  <div class="home flex-1 flex flex-col overflow-y-auto p-2">
    <div class="flex rounded-lg flex-row items-center justify-center bg-orange-500" style="background: linear-gradient(-90deg, transparent 180px, orange 350px ), linear-gradient(90deg, transparent 180px, orange 350px ); background: #DC4D00;">
      <van-image
          v-if="user.photo"
          width="65px"
          height="65px"
          round
          fit="cover"
          style="border:10px solid #fff;"
          :src="user.photo.includes('wx.qlogo.cn') ? user.photo : serverUrl + user.photo"
        />
    </div>
    <div class="flex flex-row p-2 mt-8 items-center justify-center">
        <van-image
          round
          width="100px"
          fit="cover"
          style=" border-radius: 10px; border:1px solid #fff; box-shadow: 0 0 5px #999;"
          :src="serverUrl+pro.thumbnail"
        />
      <div class="flex-1 ml-4 text-base text-gray-500">
        <span class="font-bold text-2xl text-black" >{{pro.name}}</span>
        <p v-if="pro.price" class="text-orange-600 font-bold" style="margin:0;">
          <span>￥</span><span class=" text-2xl">{{pro.price}}</span><span>元/{{unitList[pro.unit].name}}</span>
        </p>
        农户：{{user.name}}<br />
        产地：{{user.address}}<br />
        信息：共{{letterCount}}封信息成长故事
      </div>
    </div>

    <div  style="transform: scale(0.8,0.8);" class="pl-4 pr-4 pb-2 -mt-1">
      <img src="../assets/pic1.png" style="width: 100%;" alt="">
    </div>

    <div v-if="qrcodeurl" class="flex flex-row items-center justify-center mb-3">
      <vue-qr :logoSrc="imgUrl" :text="qrcodeurl" :size="220"></vue-qr>
    </div>

    <div class="relative p-2 text-orange-500 font-bold text-base" style=" line-height: 20px; background: linear-gradient(-60deg, transparent 50px, #FFEBD7 0px)">
      {{pro.name}}{{letterCount}}封信息，让每个瞬间都成为永恒，
      <p class="text-2xl text-orange-700 leading-normal">追溯每一件有意义的事情！</p>
      <img class="absolute top-0 bottom-0 right-0" style="height: 100%;" src="../assets/pic2.png" alt="">
    </div>

    <div class="mt-5 mb-10" v-if="pro.pics && pro.pics.length">
      <van-swipe :autoplay="3000" style="width: 100%; height: 400px;">
        <van-swipe-item v-for="(image, index) in pro.pics" :key="index" style="background: #000;">
          <van-image
            width="100%"
            height="100%"
            fit="contain"
            :src="image"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- contain cover cover scale-down-->
    </div>

    <div class="mt-5 mb-10" v-if="pro.video">
      <video muted autoplay="autoplay" :src="serverUrl + pro.video" style="object-fit:cover; height: 400px; background: #eee;" controls="controls" width="100%"></video>
    </div>
    <div v-if="letter.length > 1" class="flex flex-row border-white mb-5 border-solid border shadow-md">
      <div v-for="(letters, index) in letter" :key="index" @click="setCurrentIndex(index)" :class="['text-lg p-2 text-center flex-1 text-white',{'bg-gray-400': index != currentIndex},{'bg-orange-500': index == currentIndex}]">溯源信息{{index+1}}</div>
    </div>
    
    <div v-for="(row, index) in letter[currentIndex]" :key="index">
      <div class="flex flex-row mt-8 " >
        <div style="width: 100px;" class="relative font-bold">
            <div class="ml-3" v-if="row.create_time > $root.moment().startOf('day').valueOf()">
              <span class="text-base">{{row.create_time | fliterMoment}}</span>
            </div>
            <div class="ml-3" v-else>
              <span class="text-3xl">{{row.day}}</span>
              <span>/{{row.month}}月</span>
            </div>

            <img src="../assets/pic3.png" class="absolute" style="top: 50px; right: 30px; transform:rotate(35deg); opacity: .4;" width="60px" alt="">
            <img v-if="row.pics.length != 2" src="../assets/pic3.png" class="absolute" style="bottom: 10px; left: 30px; transform:rotate(-35deg);  opacity: .7;" width="40px" alt="">
        </div>
        <div class="flex-1 flex flex-col">
          <p>{{row.description}}</p>
          <div class="flex-1 flex">
            <div v-if="row.video" class="flex-1">
              <video style="object-fit:cover; height: 180px; background: #eee;" controls="controls" width="100%" :src="row.video"></video>
            </div>
            <div class="flex flex-1 flex-row flex-wrap" v-if="row.pics" @click="imagePreview(row.pics)">
              <van-image
                v-if="row.pics.length == 1"
                v-for="(path,i) in row.pics" :key="i"
                class="mr-1 mb-1"
                width="240"
                height="160"
                fit="cover"
                :src="path"
              />
              <img src="" alt="">
              <van-image
                v-if="row.pics.length == 2 || row.pics.length == 4"
                v-for="(path,i) in row.pics" :key="i"
                class="mr-1 mb-1"
                width="117"
                height="90"
                fit="cover"
                :src="path"
              />
              <van-image
                v-if="row.pics.length == 3 || row.pics.length == 5 || row.pics.length == 6"
                v-for="(path,i) in row.pics" :key="i"
                class="mr-1 mb-1"
                width="77"
                height="77"
                fit="cover"
                :src="path"
              />
            </div>
            
          </div>
        </div>
      </div>
      <div class="mt-8 flex flex-row items-center justify-center content-center">
        <img src="../assets/pic3.png" class="ml-4 mr-4" width="30px" alt="">
        <div class="flex-1" style="border-top: 1px dashed #FFF0E4; "></div>
      </div>
    </div>


    <div style="background-color: #F06600;" class="p-4 mt-5">
      <div class="text-white text-xl font-bold">购买{{pro.name}}：</div>
      <div class="flex bg-white mt-3">
        <van-field class="flex-1 p-2" v-model="postal.name" placeholder="姓名" />
      </div>
      <div class="flex bg-white mt-3">
        <van-field class="flex-1 p-2" type="tel" v-model="postal.mobile" placeholder="手机号" />
      </div>
      <div class="flex bg-white mt-3">
        <van-field
          v-model="postal.addres"
          rows="1"
          autosize
          type="textarea"
          placeholder="邮寄地址"
          class="flex-1 p-2"
        />
      </div>
      <div class="flex bg-white mt-3 items-center">
        <van-field class="flex-1 p-2" type="number" v-model="postal.num" placeholder="购买数量" />
        <div v-if="pro.unit" class="p-2 text-gray-500">{{unitList[pro.unit].name}}</div>
      </div>
      <div class="flex bg-white mt-3">
        <van-field
          v-model="postal.remark"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="备注信息"
          show-word-limit
          class="flex-1 p-2"
        />
      </div>
      <div class="mt-4 bg-white text-black text-center p-3 text-xl opacity-75" @click="postalSubmit">提 交</div>
    </div>
   

    <div  style="transform: scale(0.8,0.8);" class="p-4 pb-10 mb-5">
      <img src="../assets/pic1.png" style="width: 100%;" alt="">
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import { ImagePreview } from 'vant';
import { mapState, mapMutations } from 'vuex'
let vm = {}
export default {
  name: 'home',
  components: {
    vueQr
  },
  filters:{
    fliterMoment: function(str){
      if(str > vm.$root.moment().startOf('day').valueOf()){
        return vm.$root.moment(Number(str)).format('HH:mm')
      }else{
        return false
      }
    }
  },
  computed: {
    ...mapState({
      pro: state => state.home.product,
      user: state => state.home.userInfo,
      letter: state => state.home.letter,
      letterCount: state => state.home.letterCount,
      currentIndex: state => state.home.currentIndex
    })
  },
  data() {
    vm = this
    return {
      qrcodeurl: '',
      imgUrl: require("../assets/logo.png"),
      unitList: [
        {id:0, name: '斤'},
        {id:1, name: '袋'},
        {id:2, name: '包'},
        {id:3, name: '两'},
        {id:4, name: '个'}
      ],
      locationSearch: {
        id: '',
        userId: ''
      },
      postal: {
        name: '',
        mobile: '',
        addres: '',
        num: '',
        remark: ''
      }
    }
  },
  watch: {
    pro(val){
      this.qrcodeurl = window.location.protocol+'//'+window.location.host + '?id='+this.pro.id+'&userId='+this.user.id;
    }
  },
  created(){
    this.locationSearch = {
      id: this.$route.query.id,
      userId: this.$route.query.userId
    }
    // let search = window.location.search.substring(1).split('&')
    // if(search.length == 2){
    //   search.map(r=>{
    //     let a = r.split('=');
    //     this.locationSearch[a[0]] = a[1]
    //   })
    // }
  },
  mounted(){
    if(this.locationSearch.userId && this.locationSearch.id){
      this.$store.dispatch("getUser",  this.locationSearch.userId)
      this.$store.dispatch("getProduct",  this.locationSearch.id)
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentIndex'
    ]),
    imagePreview(pics){
      ImagePreview(pics)
    },
    postalSubmit(){
				if(!this.postal.name || !this.postal.mobile  || !this.postal.addres  || !this.postal.num ){
          this.$toast('请认真填写邮寄信息');
					return
        }
        this.$store.dispatch("postPostalAdd",  Object.assign(this.postal,{
						productId: this.pro.id,
						userId:this.pro.user_id,
					})).then(res=>{
          if(res.affectedRows){
            this.$toast.success('邮寄信息已发送，请注意查收，谢谢！');
            this.postal = {
              name: '',
              mobile: '',
              addres: '',
              num: '',
              remark: ''
            }
          }
        })

			},
  }
}
</script>
<style scope>
/* import './assets/tailwind/tailwind.min.css' */
/* @import url('../assets/tailwind/tailwind.min.css'); */
</style>