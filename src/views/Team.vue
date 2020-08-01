<!-- 首页 -->
<template>
  <div class="team flex-1 flex flex-col overflow-y-auto p-2">
    <div class="rounded-lg bg-base text-white p-5 text-center" >
      <span class="text-2xl fb text-shadow">{{team.name}}</span><br />
      <span class="opacity-75">{{tip1}},{{tip2}}</span>
    </div>
    <div class="flex flex-row mt-1 text-center justify-center flex-wrap">
      <van-image
          v-for="(row,i) in userList" :key="i" @click="setCurrentUser(row.id == currentUser.id ? '' : row)"
          width="40px"
          height="40px"
          round
          fit="cover"
          class=""
          :style="{padding: '1px', border: row.id == currentUser.id ? '8px solid #DC4D00' : '8px solid #f1f1f1'}"
          :src="row.photo.includes('wx.qlogo.cn') ? row.photo : serverUrl + row.photo"
        />
    </div>

    <div class="flex flex-row mt-1 flex-wrap" v-if="showProductList.length">
      <div v-for="(row, i) in showProductList" :key="i+row.name" style="width: 50%;">
        <div style="border: 1px solid #eee;" class="rounded-lg m-1">
          <div class="flex flex-row p-1 pl-2 pr-2 items-center" style="background: #f1f1f1;">
            <van-image
              width="35px"
              height="35px"
              round
              fit="cover"
              style="border:1px solid #fff;"
              :src="serverUrl + row.thumbnail"
            />
            <div class="text-right flex-1">
              <span class="fb text-lg">{{row.name}}</span><br />
              <span class="text-sm"><b style="color: #DC4D00;">{{row.price}}</b>元/{{unitList[row.unit].name}}</span>
            </div>
          </div>

          <div class="relative">
            <van-swipe v-if="row.pics && row.pics.length" style="width: 100%; height: 250px;">
              <van-swipe-item v-for="(image, index) in row.pics" :key="index" style="background: #000;">
                <van-image
                  width="100%"
                  height="100%"
                  fit="cover"
                  :src="image"
                />
              </van-swipe-item>
            </van-swipe>
            <video v-if="row.video" muted :src="serverUrl + row.video" style="object-fit:cover; height: 250px; background: #222;" controls="controls" width="100%"></video>
            <div @click="$router.push({path: '/', query: {userId:row.user_id,id:row.id}})" class="absolute text-white p-1 text-sm opacity-75" style="border: 1px solid #f1f1f1;  border-right:none; border-top-left-radius: 5px;border-bottom-left-radius: 5px; top: 25px; right:0; background: #DC4D00; ">详<br />情</div>
        </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center" style="color: #ccc; padding: 60px 0 20px 0;">
      {{currentUser.name || ''}}暂时没有上架的产品
    </div>

    <div  style="transform: scale(0.8,0.8);" class="p-4 pb-10 mb-5">
      <img src="../assets/pic1.png" style="width: 100%;" alt="">
    </div>


  </div>
</template>

<script>
import vueQr from 'vue-qr'
import { mapState, mapMutations } from 'vuex'
let vm = {}
export default {
  name: 'team',
  components: {
    vueQr
  },
  created(){
  },
  filters:{
  },
  computed: {
    ...mapState({
      team: state => state.team.team,
      userList: state => state.team.userList,
      productList:state => state.team.productList,
      tip1:state => state.team.tip1,
      tip2:state => state.team.tip2,
      currentUser: state => state.team.currentUser,
      showProductList: state => state.team.showProductList,
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
        teamId: ''
      },
    }
  },
  watch: {
  },
  created(){
    this.locationSearch.teamId = this.$route.query.teamId || '';
  },
  mounted(){
    if(this.locationSearch.teamId){
      this.$store.dispatch("getTeamInfo",  this.locationSearch.teamId)
      this.$store.dispatch("postUserList",  {community_id: this.locationSearch.teamId})
      // this.$store.dispatch("postProductsList",  {community_id: this.locationSearch.teamId})
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentUser'
    ]),
  }
}
</script>
<style scope>
.fb{
  font-weight: bold;
}
.bg-base{
  background: #DC4D00;
}
</style>