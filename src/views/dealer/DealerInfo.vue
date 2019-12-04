<!-- 经销商详情信息页面 -->
<template>
<!--  -->
  <div class="DealerInfo flex-1 flex flex-col bg-gray-100">

    <van-nav-bar
      :title="info.dealerName"
      @click-left="$router.go(-1)"
      left-text="返回"
      left-arrow>
        <i class="iconfont iconqipaocaidanbianji-bang" @click="editor" slot="right" style="font-size: 1.6rem;"></i>
        <!-- <i class="iconfont icongengduo ml-2" slot="right" style="font-size: 1.2rem;"></i> -->
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-scroll" ref="listBox">

            <div class="shadow-md rounded-lg m-3 p-4 bg-white">
              <div class="flex">
                <p class="flex-1 text-xl font-bold">{{info.dealerName}}</p>
                <!-- <i class="iconfont iconweizhi text-orange-500"></i> -->
              </div>
              <div class="flex mt-4 justify-between">
                <div class="text-center  text-xs" @click="$refs.swipe.swipeTo(1)">
                  {{info.contactsCount}}<br/>联系人
                </div>
                <!-- <div class="text-center  text-xs">
                  4<br/>经营品牌
                </div> -->
                <!-- <div class="text-center  text-xs">
                  4<br/>在售车型
                </div> -->
                <div class="text-center  text-xs" @click="$refs.swipe.swipeTo(2)">
                  {{info.competitorCount}}<br/>竞争对手
                </div>
                <div class="text-center  text-xs" @click="$refs.swipe.swipeTo(3)">
                  {{info.lesseeCount}}<br/>承租人
                </div>
              </div>
            </div>

            <div class="shadow-md rounded-lg bg-white m-3 mt-0 p-4">
              <div class="flex">
                <div class="flex-1 font-bold">业务状态</div>
                <!-- <p class="text-sm text-orange-500">放弃</p> -->
              </div>
              <div class="flex mt-2">
                <div @click="changeFollowStatus(i)" v-for="(row,i) in $store.state.dealer.followStatus" :key="i" v-if="i" :class="['flex flex-1 items-center', {gray: i <= info.followStatus}]">
                  <div class="rounded bg-line p-2 text-center text-sm shadow" >{{row.name}}
                  </div>
                  <div class="triangle-line"></div>
                </div>
              </div>
            </div>

            <van-tabs class="tabs -mt-2 -mb-2"  v-model="$store.state.dealerInfo.currentTabsIndex" @click="$refs.swipe.swipeTo($store.state.dealerInfo.currentTabsIndex)">
              <van-tab v-for="(row,index) in $store.state.dealerInfo.tabs" :key="index" :title="row.text" :name="row.id">
              </van-tab>
            </van-tabs>


            <van-swipe ref='swipe' :loop="false" :show-indicators="false" @change="(num)=>$store.commit('setCurrentTabsIndex', num)">
              <van-swipe-item v-for="(row,index) in $store.state.dealerInfo.tabs" :key="index">

                  <!-- 备案信息 基本信息 -->
                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 0">
                    <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                      <div class="flex items-center">
                        <div class="flex flex-1 items-center font-bold"  @click="showInfo1 = !showInfo1">
                          备案信息 
                          <i class="iconfont iconweizhankai ml-2" ></i>
                        </div>
                        <div class="text-sm text-orange-500" @click="recordSubmit">{{info.recordStatus ? $store.state.record.recordStatus[info.recordStatus] : '提交备案'}}</div>
                      </div>
                      
                      <div v-show="showInfo1">
                        <div class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500"><span class="text-red-500">*</span>经销商名称</p>
                          <p>{{info.dealerName}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">统一社会信用代码</p>
                          <p>{{info.creditCode}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">成立日期</p>
                          <p>{{$root.moment(info.establishTime*1000).format('YYYY-MM-DD')}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">所属地区</p>
                          <p>{{info.province}}{{info.city}}{{info.area}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">详情地址</p>
                          <p>{{info.address}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">公司归属</p>
                          <p>{{$store.getters.NDownerCdTypes[info.ownerCd-1] && $store.getters.NDownerCdTypes[info.ownerCd-1].text}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">业务类型</p>
                          <p>{{info.chkBusTypCdList | getBusTypCdList($store.getters.NDbusinessTypes)}}</p>
                        </div>

                        <div v-if="info.contactsName">
                          <div class="border-t border-gray-100 p-2 mt-2">
                            <p class="text-xs text-gray-500">法人姓名</p>
                            <p>{{info.contactsName}}</p>
                          </div>
                          <div class="border-t border-gray-100 p-2 mt-2">
                            <p class="text-xs text-gray-500">证件类型</p>
                            <p>{{$store.state.record.certTypCd[info.certTypCd]}}</p>
                          </div>
                          <div class="border-t border-gray-100 p-2 mt-2">
                            <p class="text-xs text-gray-500">证件号码</p>
                            <p>{{info.certNo}}</p>
                          </div>
                          <div class="border-t border-gray-100 p-2 mt-2">
                            <p class="text-xs text-gray-500">手机号码</p>
                            <p>{{info.contactsPhone}}</p>
                          </div>
                        </div>

                        <div v-if="info.idcardFrontPic" class="border-t border-gray-100 p-2 mt-2 flex">
                          <div class="flex-1">
                            <p class="text-xs text-gray-500">法人身份证正面</p>
                            <img :src="picServer + info.idcardFrontPic" alt="">
                          </div>
                          <div class="flex-1  ml-3">
                            <p class="text-xs text-gray-500">法人身份证反面</p>
                            <img :src="picServer + info.idcardBackPic" alt="">
                          </div>
                        </div>
                        <div class="border-t border-gray-100 p-2 mt-2" v-if="info.licensePic">
                          <p class="text-xs text-gray-500">营业执照</p>
                          <img :src="picServer + info.licensePic" alt="">
                        </div>

                      </div>

                    </div>
                    <div class="shadow-md rounded-lg m-3 p-2 pl-4 pr-4 bg-white">
                      <div class="flex items-center">
                        <div class="flex flex-1 items-center font-bold" @click="showInfo2 = !showInfo2">
                          基本信息 
                          <i class="iconfont iconweizhankai ml-2" ></i>
                        </div>
                      </div>
                      <div v-show="showInfo2">
                        <div class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500">地理位置</p>
                          <div class="flex">
                            <!-- {{info.province +' '+ info.city +' '+ info.area}} -->
                            {{info.longitude+','+info.latitude}}
                            <div class="flex-1"></div>
                            <i @click="$router.push({name:'Map', query:{lng:info.longitude ,lat: info.latitude}})" class="iconfont iconweizhibang text-orange-500"></i>
                          </div>
                        </div>
                        <div class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500">经销商分级</p>
                          <p>{{info.level | getLevelText($store.getters.NDlevelList)}}</p>
                        </div>
                        <div v-if="info.ownerUserList && info.ownerUserList.length" class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500">负责人</p>
                          <p>{{info.ownerUserList.map(r=>r.ownerUserName).toString()}}</p>
                        </div>
                        <div v-if="info.followerUserList && info.followerUserList.length" class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500">参与人</p>
                          <p>{{info.followerUserList.map(r=>r.ownerUserName).toString()}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2">
                          <p class="text-xs text-gray-500">创建日期</p>
                          <p>{{$root.moment(info.createTime*1000).format('YYYY-MM-DD')}}</p>
                        </div>
                        <div class="border-t border-gray-100 p-2 mt-2">
                          <p class="text-xs text-gray-500">备注信息</p>
                          <p>{{info.comment}}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 联系人 -->
                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 1" class="contactslist shadow-md rounded-lg m-3 pt-3 pb-3 bg-white">
                    <div class="flex pl-3 pr-3 pb-3">
                      <div class="flex-1 font-bold">联系人</div>
                      <div class="text-sm text-blue-500"  @click="$router.push({path:'/ContactsList', query: {modelGid: id}})">关联</div>
                    </div>
                    <van-collapse v-model="currentContacts">
                        <van-collapse-item v-for="(r,i) in contactslist" :key="i" :title="r.contactsName" :name="r.id">
                          <div class="border-b border-gray-100 pt-2 pb-2">
                            <p class="text-xs text-gray-500">姓名</p>
                            <p class="text-gray-900 text-sm text-blue-500" @click="$router.push({path:'/ContactsInfo',query:{gid:r.gid}})">{{r.contactsName}}</p>
                          </div>
                          <div class="border-b border-gray-100 pt-2 pb-2">
                            <p class="text-xs text-gray-500">职务</p>
                            <p class="text-gray-900 text-sm">{{r.jobTitle}}</p>
                          </div>
                          <div class="border-b border-gray-100 pt-2 pb-2">
                            <p class="text-xs text-gray-500">电话</p>
                            <p class="text-gray-900 text-sm">{{r.contactsPhone}}</p>
                          </div>
                          <div class="pt-2 pb-2">
                            <p class="text-xs text-gray-500">微信</p>
                            <p class="text-gray-900 text-sm">{{r.weichatNum}}</p>
                          </div>
                        </van-collapse-item>
                    </van-collapse>
                    
                  </div>

                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 2" class="shadow-md rounded-lg m-3 pt-3 pb-3 bg-white">
                    <div class="flex pl-3 pr-3 pb-3">
                      <div class="flex-1 font-bold">竞争对手</div>
                      <div class="text-sm text-blue-500" @click="$router.push({path:'/CompetitorList', query: {modelGid: id}})">关联</div>
                    </div>
                    <van-collapse v-model="currentCompetitor">
                      <van-collapse-item v-for="(r,i) in competitorlist" :key="i" :title="r.competorName" :name="r.id">
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">竞对名称</p>
                          <p class="text-gray-900 text-sm  text-blue-500" @click="$router.push({path:'/CompetitorInfo',query:{id:r.gid}})">{{r.competorName}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">竞对政策</p>
                          <p class="text-gray-900 text-sm">{{r.racePolicy}}</p>
                        </div>
                        <div class="pt-2 pb-2">
                          <p class="text-xs text-gray-500">应对策略</p>
                          <p class="text-gray-900 text-sm">{{r.tactics}}</p>
                        </div>
                      </van-collapse-item>
                    </van-collapse>
                  </div>

                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 3" class="shadow-md rounded-lg m-3 pt-3 pb-3 bg-white">
                    <div class="flex pl-3 pr-3 pb-3">
                      <div class="flex-1 font-bold">承租人</div>
                      <div class="text-sm text-blue-500" @click="$router.push({path:'/LesseeList', query: {modelGid: id}})">关联</div>
                    </div>
                    <van-collapse v-model="currentLesseelist">
                      <van-collapse-item v-for="(r,i) in lesseelist" :key="i" :title="r.lesseeName" :name="r.id">
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">姓名</p>
                          <p class="text-gray-900 text-sm text-blue-500" @click="$router.push({path:'/LesseeInfo',query:{id:r.gid}})">{{r.lesseeName}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">证件号码</p>
                          <p class="text-gray-900 text-sm">{{r.idcardNum}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">出生日期</p>
                          <p class="text-gray-900 text-sm">{{r.birthday}}</p>
                        </div>
                        <!-- <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">婚姻情况</p>
                          <p class="text-gray-900 text-sm">{{r.marry ? '已婚' : '未婚'}}</p>
                        </div> -->
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">性别</p>
                          <p class="text-gray-900 text-sm">{{r.gender ? '女' : '男'}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">客户类型</p>
                          <!-- r.lesseeType -->
                          <p class="text-gray-900 text-sm">自然人</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">手机号</p>
                          <p class="text-gray-900 text-sm">{{r.lesseePhone}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">户口所在地</p>
                          <p class="text-gray-900 text-sm">{{r.domicilePlace}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">从业年限</p>
                          <p class="text-gray-900 text-sm">{{r.workingYears}}</p>
                        </div>
                        <div class="border-b border-gray-100 pt-2 pb-2">
                          <p class="text-xs text-gray-500">本人照片</p>
                          <img :src="r.userPic" width="130" alt="本人照片" />
                        </div>
                        <div class="pt-2 pb-2">
                          <p class="text-xs text-gray-500">身份证照片</p>
                          <div class="flex">
                            <img :src="r.idcardFrontPic" width="130" alt="身份证正面" />
                            <img :src="r.idcardBackPic" class="ml-1" width="130" alt="身份证反面" />
                          </div>
                        </div>


                        
                        
                      </van-collapse-item>
                    </van-collapse>
                  </div>

                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 4" class="shadow-md rounded-lg m-3 pt-3 pb-3 bg-white">
                    <div class="flex pl-3 pr-3 pb-3 border-b">
                      <div class="flex-1 font-bold">动态记录</div>
                      <!-- <div class="text-sm text-blue-500" @click="$router.push({path:'/LesseeList', query: {modelGid: id}})">关联</div> -->
                    </div>

                        <div
                          class="border-b ml-4 mr-4"
                          style="padding-top: 1rem;padding-bottom: 1rem;"
                          v-for="(r,i) in $store.state.dealerInfo.listNewslog"
                          :key="i"
                        >
                          <div class="flex">
                            <div
                              class="w-12 h-12 text-center rounded-full mr-4 text-3xl text-gray-700 baseName"
                            >z</div>
                            <div>
                              <div class="text-ms font-bold">{{r.userName}}</div>
                              <div class="text-xs" style="color:#80848D">{{r.userJobTitle}}</div>
                            </div>
                          </div>

                          <div class="flex items-center mt-3">
                            <p
                              v-if="r.content != '' "
                              class="text-ms leading-relaxed"
                              style="color:#252525"
                            >{{r.content}}</p>
                            
                            <img v-if="r.pics != '' " :src="picServer+r.pics" alt /><br />
                          </div>
                          <p class="text-sm text-gray-500">{{$root.moment(r.createTime*1000).format('YYYY-MM-DD HH:mm:ss')}}</p>
                        </div>
                        
                  </div>

                  <div v-if="$store.state.dealerInfo.currentTabsIndex === 5" class="shadow-md rounded-lg m-3 pt-3 pb-3 bg-white">
                    <div class="flex pl-3 pr-3 pb-3  border-b">
                      <div class="flex-1 font-bold">操作历史</div>
                      <!-- <div class="text-sm text-blue-500" @click="$router.push({path:'/LesseeList', query: {modelGid: id}})">关联</div> -->
                    </div>
                    <div
                      class="border-b ml-4 mr-4"
                      style="padding-top: 1rem;padding-bottom: 1rem;"
                      v-for="(r,i) in $store.state.dealerInfo.listOperatelog"
                      :key="i"
                    >
                      <span class="text-ms" style="color:#252525;padding-right:1rem;">{{r.userName}}</span>
                      <span class="text-gray-600">{{r.content}}</span>
                    </div>
                  </div>

                  

              </van-swipe-item>
            </van-swipe>

            <!-- {{info}} -->


        </div>
    </div>



    <div class="flex bg-white footer-bar border-t border-gray-300 iteams-center" style="box-shadow: 0 -2px 10px 0px rgba(0,0,0,.1); z-index: 1;">
      <i
        class="iconfont iconjingxiaoshangbaifang ml-3 mr-3"
        @click="$router.push({name:'CreateTask',query:{taskType:1,editor: true, dealerName:info.dealerName, dealerGid:info.gid}})"
        style="font-size: 2rem;height:105%"
      ></i>
      
      <van-uploader  :after-read="logPic" :before-read="file => uploadFile(file,true)" :max-count="1" style="height:105%">
        <i class="iconfont iconzhaopianhover" style="font-size: 2rem;"></i>
      </van-uploader>

      <van-field v-model="newsLogContent" class="rounded-lg m-3" style="background:#f6f6f6;height:70%" placeholder="请输入工作进展" @keyup.13="tapToSearch" />

      <!-- <form class="flex-1 mr-3 flex" action="javascript:void 0" style="height:70%">
        <input
          type="text"
          placeholder="请输入工作进展"
          class="rounded-lg progress"
          v-model="newsLogContent"
          @keyup.13="tapToSearch"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='请输入工作进展'"
        />
      </form> -->

    </div>


  
  </div>
</template>

<script>
export default {
  name: 'DealerInfo',
  data() {
    return {
      id: '',
      info: {},
      contactslist: [],
      competitorlist: [],
      lesseelist: [],
      currentContacts: [],
      currentCompetitor: [],
      currentLesseelist: [],
      showInfo1: true,
      showInfo2: true,

      listNewslogPageNum: 1,
      listOperatelogNum: 1,
      isNewslogLastPage: false,
      isOperatelogLastPage: false,

      newsLogContent: '',

      picServer: ''
    }
  },
  mounted() {

    this.picServer = window.picServer
    this.id = this.$route.query.id

    this.addRecentvisit({modelObjType:1, modelId:this.id})
    if(this.$store.state.dealerInfo.currentTabsIndex){
      this.getBaseInfo(0)
      this.getBaseInfo(this.$store.state.dealerInfo.currentTabsIndex)
    }else{
      this.getBaseInfo(0)
    }

    // 动态记录
    this.$refs.listBox && this.scrollLoad(this.$refs.listBox, resolve => {
      if(this.$store.state.dealerInfo.currentTabsIndex == 4 && !this.isNewslogLastPage){
          this.$store.dispatch( "listNewslog",{
              modelObjType: 1,
              modelId: this.id,
              pageNum: ++this.listNewslogPageNum,
              pageSize: 10
            }
          ).then(len => {
            if(len < 10){
              this.isNewslogLastPage = true
            }
            resolve();
          });
      }
      if(this.$store.state.dealerInfo.currentTabsIndex == 5 && !this.isOperatelogLastPage){
          this.$store.dispatch("listOperatelog",{
              modelObjType: 1,
              modelId: this.id,
              pageNum: ++this.listOperatelogNum,
              pageSize: 10
            }
          ).then(len => {
            if(len < 10){
              this.isOperatelogLastPage = true
            }
            resolve();
          });
      }
      resolve();
    });

  },
  watch: {
    '$store.state.dealerInfo.currentTabsIndex'(num){
      this.getBaseInfo(num)
    }
  },
  filters: {
    getBusTypCdList(val, all){
      return val && all.filter(r=>{
        return val.includes(r.value)
      }).map(r=>{
        return r.text
      }).toString()
    },
    getLevelText(val, all){
      return val && all.filter(r=>{
        if(val == r.value){
          return true
        }
      })[0].text
    }
  },
  methods: {
    logPic(file){
      this.uploadFile(file, (fileUrl)=>{
        this.tapToSearch(fileUrl)
      }, 0)
    },
    tapToSearch(picUrl) {
      if(this.newsLogContent || typeof picUrl == 'string'){
        this.$store.dispatch('addNewslog',{
          modelObjType: 1,
          modelId: this.id,
          content: this.newsLogContent || '',
          pics: typeof picUrl == 'string' ? picUrl : ''
        }).then((msg)=>{
          this.$store.state.dealerInfo.currentTabsIndex = 4
          this.isNewslogLastPage = false
          this.listNewslogPageNum = 1
          this.newsLogContent = ''
          this.$store.dispatch('listNewslog', {
            modelObjType: 1,
            modelId: this.id,
            pageNum: this.listNewslogPageNum,
            pageSize: 10
          })
        })
      }
    },
    recordSubmit(){
      if(!this.info.recordStatus){
        sessionStorage.record && delete sessionStorage.record
        sessionStorage.record = JSON.stringify({
            idcardFrontPic:  this.info.idcardFrontPic,
            idcardBackPic:  this.info.idcardBackPic,
            licensePic:  this.info.licensePic
        })
        if(this.info.dealerName && this.info.creditCode && this.info.gid){

          this.$store.dispatch('checkRecord', {
            dealerGid: this.info.gid,
            dealerName: this.info.dealerName,
            creditCode: this.info.creditCode
          }).then(()=>{
            this.$router.push({name:'recordCheck', query: {
              dealerGid: this.info.gid,
              dealerName: this.info.dealerName,
              creditCode: this.info.creditCode
            }})
          })
          
        }else{
          this.$dialog.alert({
            message: '经销商名称、统一社会信用代码不能为空，完善信息后，重新提交备案'
          });
        }
      }
    },
    changeFollowStatus(i){
      this.$dialog.confirm({
        message: '确认要改变业务状态吗？'
      }).then(() => {
        this.$store.dispatch('editDealer',Object.assign({},this.info, {followStatus: i})).then(msg=>{
          this.$store.commit('setInfo', {followStatus: i})
        })
      });
    },
    getBaseInfo(num){
      if(num === 0){
        this.$store.dispatch('getinfo', this.id).then(res => {
          this.info = this.$store.state.dealerInfo.baseInfo
        })
      }
      if(num === 1){
        this.$store.dispatch('getcontactslist', this.id).then(res => {
          this.contactslist = this.$store.state.dealerInfo.contactslist
          this.currentContacts = this.contactslist.length ? [this.contactslist[0].id] : []
        })
      }
      if(num === 2){
        this.$store.dispatch('getcompetitorlist', this.id).then(res => {
          this.competitorlist = this.$store.state.dealerInfo.competitorlist
          this.currentCompetitor = this.competitorlist.length ? [this.competitorlist[0].id] : []
        })
      }
      if(num === 3){
        this.$store.dispatch('getlesseelist', this.id).then(res => {
          this.lesseelist = this.$store.state.dealerInfo.lesseelist
          this.currentLesseelist = this.lesseelist.length ? [this.lesseelist[0].id] : []
        })
      }
      if(num === 4) {
        this.$store.dispatch('listNewslog', {
          modelObjType: 1,
          modelId: this.id,
          pageNum: this.listNewslogPageNum,
          pageSize: 10
        })
      }
      if(num === 5) {
        this.$store.dispatch('listOperatelog', {
          modelObjType: 1,
          modelId: this.id,
          pageNum: this.listOperatelogNum,
          pageSize: 10
        })
      }
    },
    editor(){
      this.$store.commit('setNewDealerParams')
      this.$store.commit('setParams', this.$store.state.dealerInfo.baseInfo)
      this.$router.push({path:'/CreateDealer',query:{editor:true,id: this.id}})
    }
  }
}
</script>

<style scoped>
.bg-line{
  background: #d4d4d4;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex:1;
  color: #555;
}
.triangle-line{
  border-width: 8px;
  border-top-width: 16px;
  border-bottom-width: 16px;
  border-style: solid;
  border-color: transparent  #c4c4c4 transparent transparent ;
  transform: rotate(180deg); /*顺时针旋转90°*/
}
.gray .bg-line{
  background: linear-gradient(#FFAD00, #FFD844);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex:1;
  color: #222;
}
.gray .triangle-line{
  border-width: 8px;
  border-top-width: 16px;
  border-bottom-width: 16px;
  border-style: solid;
  border-color: transparent  orange transparent transparent ;
  transform: rotate(180deg); /*顺时针旋转90°*/
}

.DealerInfo .tabs /deep/.van-tabs__line{
  background-image: linear-gradient(160deg, #ffce00 20%,#ff8b00 80%);
  height: 4px;
}
.DealerInfo .tabs /deep/ .van-hairline--top-bottom::after, .DealerInfo .tabs /deep/ .van-hairline-unset--top-bottom::after{
  border: 0;
}
.DealerInfo .tabs /deep/ .van-tab--active span{ font-size: 1.2rem; }
.DealerInfo .tabs /deep/ [class*=van-hairline]::after{
  position: static;
}
.DealerInfo .tabs /deep/ .van-tag{padding:0 0.2em;}
.DealerInfo .tabs /deep/ .van-tabs__nav {
  background-color: inherit;
}

.baseName {
  background: linear-gradient(
    245deg,
    rgba(255, 191, 42, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
}


.DealerInfo /deep/ .van-collapse-item__content{padding-top:5px; padding-bottom:5px;}


.footer-bar {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  align-items: center;
}

.progress {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f6f6f6;
}

.DealerInfo /deep/ ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  text-align: center;
}
.DealerInfo /deep/ ::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
.DealerInfo /deep/ :-ms-input-placeholder {
  /* IE 10+ */
  text-align: center;
}
.DealerInfo /deep/ :-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}

</style>