 <!-- 新建拜访任务 -->
<template>
  <div class="taskCreate">
    <van-nav-bar :title="taskId ? $store.state.task.addEditTaskParams.taskName : ($route.query.taskType == 1 ?'经销商拜访' : '任务事项')" left-text="返回" 
          @click-left="$router.go(-1)" left-arrow 
         >
      <div  @click="save" v-if="editor && !taskId" slot="right">{{$route.query.taskType == 1 ? '下一步' : '保存'}}</div>
      <div slot="right" v-if="!editor && taskId && !taskStatus " @click="editor = !editor">编辑</div>
      <div  @click="editorFun" v-if="editor && taskId" slot="right">保存</div>
    </van-nav-bar>

    <!-- {{mainUserGids}} - {{userInfo.EMPLOYEE_ID}} - {{userInfo.EMPLOYEE_NAME}}
    {{$route.query.dealerName}}
    {{$route.query.dealerGid}}
    {{$store.state.task.addEditTaskParams.taskTime ? $root.moment($store.state.task.addEditTaskParams.taskTime*1000).format('YYYY-MM-DD HH:mm') : '请选择时间'}} -->

    <div class="taskCreateRow">
      <van-cell clickable>
        <template slot="title">
          <span class="text-red-400">*</span>
          <span class="custom-title">主题</span>
        </template>
        <template slot="default">
          <van-field v-if="editor" maxlength="15" v-model="$store.state.task.addEditTaskParams.taskName" placeholder="请输入任务主题" />
          <p v-else class="p5">{{$store.state.task.addEditTaskParams.taskName}}</p>
        </template>
      </van-cell>

      <!-- <van-cell clickable>
        <template slot="title">
          <span class="custom-title">类型</span>
        </template>
        <template slot="default">
          <p class="p5" @click="editor && (taskPopupShow = true)">{{taskTypeOption[$store.state.task.addEditTaskParams.taskType-1].text}}</p>
        </template>
      </van-cell> -->

      <van-cell clickable>
        <template slot="title">
          <!-- <span class="text-red-400">*</span> -->
          <span class="custom-title">时间</span>
        </template>
        <template slot="default">
          <p class="p5" @click="editor && (taskTimeShow = true)">{{$store.state.task.addEditTaskParams.taskTime ? $root.moment($store.state.task.addEditTaskParams.taskTime*1000).format('YYYY-MM-DD HH:mm') : '请选择时间'}}</p>
        </template>
      </van-cell>

      <van-cell clickable>
        <template slot="title">
          <!-- <span class="text-red-400">*</span> -->
          <span class="custom-title">提醒</span>
        </template>
        <template slot="default">
          <p class="p5" @click="editor && changeAlarmTime()">{{alarmTimeText || '请选择提醒时间'}}</p>
        </template>
      </van-cell>

      <van-cell clickable v-if="$route.query.taskType == 1">
        <template slot="title">
          <span class="text-red-400">*</span>
          <span class="custom-title">相关经销商</span>
        </template>
        <template slot="default">
          <p class="p5" v-if="$route.query.dealerName">{{$route.query.dealerName}}</p>
          <p class="p5" v-else @click="editor && (dealerShow = true)">{{dealerName || '请选择相关经销商'}}</p>
        </template>
      </van-cell>
      
      <van-cell clickable v-if="$route.query.gid">
        <template slot="title">
          <span class="text-white">*</span>
          <span class="custom-title">创建人</span>
        </template>
        <template slot="default">
          <div class="p5">{{$store.state.task.addEditTaskParams.createUserName}}</div>
        </template>
      </van-cell>

      <van-cell clickable>
        <template slot="title">
          <span class="text-red-400">*</span>
          <span class="custom-title">{{$route.query.taskType == 2 ? '负责人' : '拜访人'}}</span>
        </template>
        <template slot="default">
          <UserList title="选择负责人" :paramsVal="mainUserGids" @setParams="val=>mainUserGids = val" soltCon="true" class="p5">
            {{mainUserGidsFun(mainUserGids, 'refRlNm', 0)}}
          </UserList>
        </template>
      </van-cell>

      <van-cell clickable>
        <template slot="title">
          <span class="text-white">*</span>
          <span class="custom-title">{{$route.query.taskType == 2 ? '参与人' : '协访人'}}</span>
        </template>
        <template slot="default">
          <UserList title="选择负责人" :paramsVal="otherUserGids" @setParams="val=>otherUserGids = val" soltCon="true" class="p5">
            {{mainUserGidsFun(otherUserGids, 'refRlNm', 1)}}
          </UserList>
        </template>
      </van-cell>


      <van-cell clickable v-if="$route.query.taskType == 1">
        <template slot="title">
          <span class="text-red-400">*</span>
          <span class="custom-title">拜访目的</span>
        </template>
        <template slot="default">
          <p class="p5" @click="editor && (visitAimShow = true)">{{visitAimText || '请选择拜访目的'}}</p>
        </template>
      </van-cell>

      <van-cell clickable>
        <template slot="title">
          <span class="text-white">*</span>
          <span class="custom-title">备注</span>
        </template>
        <template slot="default">
          <van-field v-if="editor" v-model="$store.state.task.addEditTaskParams.comment" type="textarea" rows="5" placeholder="请输入任务描述" />
          <p class="p5" v-else>{{$store.state.task.addEditTaskParams.comment}}</p>
        </template>
      </van-cell>



      <div v-if="$store.state.task.addEditTaskParams.clockinPlaceAddress" class="bg-gray-100 pt-3 pb-2">
        <div class="pl-5">打卡位置</div>
        <div class="flex items-center bg-white mt-2 pl-5 pr-5 pt-2 pb-2">
          <div class="flex-1">
            <span class="text-blue-500">{{$store.state.task.addEditTaskParams.clockinPlaceAddress}}</span><br />
            <span>{{$store.state.task.addEditTaskParams.clockinPlaceName}}</span>
          </div>
          <i class="iconfont iconweizhi text-orange-500"></i>
          <div><i @click="$router.push({name:'Map', query:{lng:$store.state.task.addEditTaskParams.dealerLongitude ,lat: $store.state.task.addEditTaskParams.dealerLatitud}})" class="iconfont iconweizhibang"></i></div>
        </div>
      </div>


    </div>

    <div></div>


    <!-- 选择类型 -->
    <van-popup
      v-model="taskPopupShow"
      position="bottom"
    >
      <van-nav-bar
        title="选择类型"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="taskPopupShow = false"
        @click-right="taskPopupShow = false; $store.state.task.addEditTaskParams.visitType = visitTypeVal"
      />
      <van-radio-group v-model="visitTypeVal">
        <van-cell-group>
          <van-cell v-for="(r,i) in taskTypeOption" :key="i" :title="r.text" clickable @click="visitTypeVal = r.value">
            <van-radio slot="right-icon" :name="r.value" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <!-- 开始时间 -->
    <van-popup
      v-model="taskTimeShow"
      position="bottom"
    >
      <van-datetime-picker
        type="datetime"
        :min-date="new Date()"
        @cancel="taskTimeShow=false"
        @confirm="confirmTaskTime"
        v-model="currentDate"
        :formatter="formatter"
      />
    </van-popup>

    <!-- 提醒列表选择 -->
    <van-popup
      v-model="alarmTimeShow"
      position="bottom"
    >
      <van-nav-bar
        title="提醒时间"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="alarmTimeShow = false"
        @click-right="alarmTimeShow = false; alarmTimeText = alarmTimeVal.text; $store.state.task.addEditTaskParams.alarmTime = Math.floor(($store.state.task.addEditTaskParams.taskTime*1000 - alarmTimeVal.value)/1000)"
      />
      <van-radio-group v-model="alarmTimeVal">
        <van-cell-group>
          <van-cell v-for="(r,i) in alarmTimeOption" :key="i" :title="r.text" clickable @click="alarmTimeVal = r">
            <van-radio slot="right-icon" :name="r" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <!-- 相关经销商 -->
    <van-popup
      v-model="dealerShow"
      position="bottom"
      class="flex flex-col"
      :style="{ height: '50%',}"
    >
      <van-nav-bar
        title="选择经销商"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="dealerShow = false"
        @click-right="dealerShow = false; dealerName = dealerRow.dealerName; $store.state.task.addEditTaskParams.dealerGid = dealerRow.gid"
      />
      <van-search shape="round" placeholder="请输入经销商名称"  clearable v-model="$store.state.dealer.listParams.queryString" />
      <div class="flex-1 relative">
        <div class="absolute inset-0 overflow-y-auto" ref="dealerListsBox">
          <van-radio-group v-model="dealerRow">
            <van-cell-group>
              <van-cell v-for="(r,i) in $store.state.dealer.listData" :key="i" :title="r.dealerName" clickable @click="dealerRow = r">
                <van-radio slot="right-icon" :name="r" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </van-popup>


    <!-- 拜访目的 -->
    <van-popup
      v-model="visitAimShow"
      position="bottom"
    >
      <van-nav-bar
        title="拜访目的"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="visitAimShow = false"
        @click-right="visitAimShow = false; $store.state.task.addEditTaskParams.visitAim = visitAimObj.id; visitAimText=visitAimObj.text"
      />
      <van-radio-group v-model="visitAimObj">
        <van-cell-group>
          <van-cell v-for="(r,i) in visitAimTypes" :key="i" :title="r.text" clickable @click="visitAimObj = r">
            <van-radio slot="right-icon" :name="r" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <van-popup
      v-model="newTask"
      position="bottom"
    >
      <div class="bg-gray-200">
        <div @click="createTask" class="text-center border-b border-gray-300 bg-white items-center p-2 cursor-pointer"><span class="text-orange-500 font-bold text-xl">创建拜访任务</span><br /><span class="text-gray-500 text-sm">未完成拜访，创建拜访任务</span></div>
        <div class="text-center border-b border-gray-300 bg-white items-center p-2 cursor-pointer" @click="createTaskLog(1)"><span class="text-orange-500 font-bold text-xl">直接填写拜访记录</span><br /><span class="text-gray-500 text-sm">已完成拜访，直接填写拜访记要</span></div>
        <div class="text-center border-b border-gray-300 bg-white items-center p-3 cursor-pointer mt-3 font-bold text-gray-700" @click="newTask=false">取 消</div>
      </div>
    </van-popup>
    

    <div @click="finishTask" v-if="!editor && $route.query.taskType == 2 && taskId" class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100 fixed left-0 right-0 bottom-0">
      完成任务
    </div>

    <div @click="clockIn" v-if="!editor && $route.query.taskType == 1 && taskId && taskStatus==0 && $store.state.task.addEditTaskParams.visitType == 0" class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100 fixed left-0 right-0 bottom-0">
      签到打卡
    </div>
    <div @click="createTaskLog(0)" v-if="!editor && $route.query.taskType == 1 && taskId && taskStatus==0 && $store.state.task.addEditTaskParams.visitType == 1" class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100 fixed left-0 right-0 bottom-0">
      填写拜访记录
    </div>

    <div @click="createTaskLog(0)" v-if="!editor && $route.query.taskType == 1 && taskId && taskStatus==1" class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100 fixed left-0 right-0 bottom-0">
      填写拜访记录
    </div>

    <!-- CreateTask
    TaskDetail -->
  </div>
</template>

<script>
import UserList from '@/components/UserList/index.vue'
export default {
  name: 'taskCreate',
  components: {
    UserList
  },
  data() {
    return {
      searchKeyword: '',
      newTask: false,

      value: '',
      taskTypeOption: [
        { text: '经销商拜访', value: 1},
        { text: '任务事项', value: 2},
      ],
      visitTypeVal: 1,
      taskPopupShow: false,

      taskTimeShow: false,
      currentDate: new Date(),

      alarmTimeShow: false,
      alarmTimeVal:  { text: '30分钟', value: 30*60*1000},
      alarmTimeText: '30分钟',
      alarmTimeOption: [
        { text: '准时', value: 0},
        { text: '不提醒', value: ''},
        { text: '提前15分钟', value: 15*60*1000},
        { text: '提前30分钟', value: 30*60*1000},
        { text: '提前1小时', value: 60*60*1000},
        { text: '提前2小时', value: 60*60*1000*2},
        { text: '提前6小时', value: 60*60*1000*6},
        { text: '1天前', value: 24*60*60*1000}
      ],

      dealerShow: false,
      dealerName: '',
      dealerRow: {},

      mainUserGids: [{
        id: '', 
        refRlNm:''
      }],
      otherUserGids: [],
      
      visitAimTypes: [
        {text:'客情维护',id:0},
        {text:'首次拜访',id:1},
        {text:'沟通需求',id:2},
        {text:'签单',id:3},
        {text:'贷后跟进',id:4}
      ],
      visitAimShow: false,
      visitAimObj: {},
      visitAimText: '',

      editor: true,

      taskId: '',

      visitType: '',

      taskStatus: 0,

      userInfo: {
        EMPLOYEE_ID:'',
        EMPLOYEE_NAME:''
      },


    }
  },
  filters:{
  },
  watch: {
    mainUserGids(val){
      this.$store.state.task.addEditTaskParams.mainUserNames = val;
      this.$store.state.task.addEditTaskParams.mainUserGids = this.mainUserGidsFun(val, 'id', 0)
    },
    otherUserGids(val){
      this.$store.state.task.addEditTaskParams.otherUserNames = val;
      this.$store.state.task.addEditTaskParams.otherUserGids = this.mainUserGidsFun(val, 'id', 1)
    },
    dealerShow(val){
      setTimeout(() => {
        val && this.scrollLoad(this.$refs.dealerListsBox, (resolve)=>{
          this.$store.dispatch('getListData', {
            pageNum: this.$store.state.dealer.listParams.pageNum+1
          }).then(msg=>{
            resolve(msg)
          })
          console.log(222)
        })
      }, 0);
    },
    '$store.state.dealer.listParams.queryString'(keyword){
      this.$store.dispatch('getListData', {pageNum: 1})
    }
  },
  mounted() {

    

    // sessionStorage.userInfo = JSON.stringify({
    //   EMPLOYEE_ID:'2121212',
    //   EMPLOYEE_NAME: '中华人民共和国'
    // })
    // alert(sessionStorage.userInfo)
    // alert(JSON.parse(sessionStorage.userInfo).EMPLOYEE_ID)
    // alert(JSON.parse(JSON.parse(sessionStorage.userInfo)).EMPLOYEE_ID)
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.mainUserGids = [{
      id: this.userInfo.EMPLOYEE_ID, 
      refRlNm:this.userInfo.EMPLOYEE_NAME
    }];
    this.$store.commit('setAddEditTaskParams',{ mainUserNames: this.mainUserGids })
    this.$store.state.task.addEditTaskParams.mainUserGids = this.mainUserGidsFun(this.$store.state.task.addEditTaskParams.mainUserNames, 'id', 0)


    this.$route.query.taskType && (this.taskType = this.$route.query.taskType)
    this.$route.query.gid && (this.taskId = this.$route.query.gid)

    this.editor = this.$route.query.editor

    this.$store.dispatch('getListData', {pageNum: 1})


    if(sessionStorage.localMap){
      this.taskId = JSON.parse(sessionStorage.localMap).gid
    }

    if(this.taskId){

      this.editor = false

      this.$store.dispatch('getTaskInfo', this.taskId).then(()=>{
        this.$store.commit('setAddEditTaskParams', this.$store.state.task.taskInfo)
        this.taskStatus = this.$store.state.task.taskInfo.taskStatus

        // 回显 提醒分钟的值 
        if(this.$store.state.task.addEditTaskParams.alarmTime == null){
          this.alarmTimeText = this.alarmTimeOption[1].text
        }else{
          let ms = this.$store.state.task.addEditTaskParams.taskTime * 1000 - this.$store.state.task.addEditTaskParams.alarmTime * 1000
          this.alarmTimeOption.some(r=>{
            if(r.value == ms){
              this.alarmTimeText = r.text
              return true
            }
          })
        }
        // 回显 相关经销商的值 
        this.dealerName = this.$store.state.task.addEditTaskParams.dealerName

        //回显 拜访人 mainUserNames
        // mainUserNames

        // this.$store.state.task.addEditTaskParams.mainUserNames.unshift([{
        //   modelGid: userInfo.EMPLOYEE_ID, 
        //   modelName:userInfo.EMPLOYEE_NAME}]
        // )

        this.mainUserGids = this.$store.state.task.addEditTaskParams.mainUserNames ? this.$store.state.task.addEditTaskParams.mainUserNames.map(r=>{
          return {
            id: r.modelGid,
            refRlNm: r.modelName
          }
        }) : []


        //回显 协访人 otherUserNames
        this.otherUserGids = this.$store.state.task.addEditTaskParams.otherUserNames ? this.$store.state.task.addEditTaskParams.otherUserNames.map(r=>{
          return {
            id: r.modelGid,
            refRlNm: r.modelName
          }
        }) : []

        // 回显 visitAim
        this.visitAimTypes.some(r=>{
          if(r.id == this.$store.state.task.addEditTaskParams.visitAim){
            this.visitAimText = r.text
            return true
          }
        })
      })
    }

    if(this.$route.query.dealerName && this.$route.query.dealerGid){
      this.dealerName = this.$route.query.dealerName
      this.$store.state.task.addEditTaskParams.dealerGid  = this.$route.query.dealerGid
    }
    //dealerName = dealerRow.dealerName; $store.state.task.addEditTaskParams.dealerGid 
    
  },
  methods: {
    mainUserGidsFun(vals, key, userType){
      if(!vals.length && key == 'refRlNm' && !userType){
        return '请选择拜访人'
      }
      if(!vals.length && key == 'refRlNm' && userType){
        return '请选择协访人'
      }
      return vals.map(r=>{
        return String(r[key])
      }).toString()
    },
    changeAlarmTime(){
      if(!this.$store.state.task.addEditTaskParams.taskTime){
        this.$dialog.alert({
            message: '请先选择开始时间'
        });
      }else{
        this.alarmTimeShow = true
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    save(){

      let params = this.$store.state.task.addEditTaskParams
      if(params.taskName.trim() === '' || params.alarmTime === '' || params.taskTime === '' || params.mainUserGids === ''){
        this.$dialog.alert({
          message: '请认真填写'
        });
        return
      }
      if(this.$route.query.taskType === 1 && (params.visitAim === '' || params.dealerGid === '')){
        this.$dialog.alert({
          message: '请认真填写'
        });
        return
      }
      
      if(this.$route.query.taskType == 1){
        this.newTask = true
      }else{
        //直接保存
        if(this.alarmTimeText == this.alarmTimeOption[1].text){
          this.$store.state.task.addEditTaskParams.alarmTime = ''
        }
        this.editor = false
        this.$store.dispatch('addTask', {taskType: this.taskType}).then(res=>{
          this.$dialog.alert({
            message: res.msg
          }).then(() => {
            this.taskId = res.data
            this.$router.go(-1)
          });
        })
      }
    },
    //签到打卡 调地图
    clockIn(){
      this.$router.push({path:'/map',query:{clockIn:true, id: this.taskId}})
    },
    // 创建拜访任务
    createTask(){
      // 经销商拜访
      // this.$store.state.task.addEditTaskParams.visitType = 0
      this.visitTypeVal = 0;
      this.editor = false
      this.$store.dispatch('addTask', {taskType: this.taskType, visitType: 0}).then(res=>{
        this.newTask = false
        this.$dialog.alert({
          message: res.msg
        }).then(() => {
           this.taskId = res.data
           this.$router.go(-1)
        });
      })
    },

    // 直接填写拜访记录
    createTaskLog(visitType){
      // 清空填写拜访记录
      this.$store.commit('setAddEditVisitlogParams')
      if(visitType){
          // this.$store.state.task.addEditTaskParams.visitType = 1
          this.visitTypeVal = visitType;
          this.$store.dispatch('addTask', {taskType: this.taskType, visitType: visitType}).then(res=>{
            this.newTask = false
            this.$dialog.alert({
              message: res.msg
            }).then(() => {
              this.taskId = res.data
              this.$router.go(-1)
              // 跳转到填写拜访记录页面
              // this.$router.push({name:'VisitRecord',query:{id: this.taskId}})
            });
          })
      }else{
        this.$router.push({name:'VisitRecord',query:{id: this.taskId, back: 'home'}})
      }
    },

    // 完成并保存
    finishTask(){
      this.$store.dispatch('finishTask', this.taskId).then(res=>{
        this.$dialog.alert({
          message: res.msg
        }).then(() => {
          this.$router.go(-1)
        });
      })
    },
    editorFun(){
      let mainUserNames = this.$store.state.task.addEditTaskParams.mainUserNames ? this.$store.state.task.addEditTaskParams.mainUserNames.map(r=>{
        return String(r.modelGid || r.id)
      }) : []
      let otherUserNames = this.$store.state.task.addEditTaskParams.otherUserNames ? this.$store.state.task.addEditTaskParams.otherUserNames.map(r=>{
        return String(r.modelGid || r.id)
      }) : []
      this.$store.dispatch('editTask',{mainUserGids:mainUserNames,otherUserGids:otherUserNames}).then(msg=>{
        this.newTask = false
        this.$dialog.alert({
          message: msg
        }).then(() => {
          this.editor = false
        });
      })
    },

    confirmTaskTime(){
      this.taskTimeShow=false; 
      this.$store.state.task.addEditTaskParams.taskTime = Math.floor(this.timeStamp(this.currentDate) / 1000); 
    
      if(this.$store.state.task.addEditTaskParams.alarmTime && !isNaN(this.alarmTimeVal.value)){
        this.$store.state.task.addEditTaskParams.alarmTime = Math.floor((this.timeStamp(this.currentDate) - this.alarmTimeVal.value)/1000)
      }
    } 

  }
}
</script>

<style scoped>
.taskCreate .taskCreateRow /deep/ .van-cell{
  padding: 5px 5px 5px 10px;
  /* background-color: inherit; */
}
.taskCreate .taskCreateRow /deep/ .van-cell__title{
  padding: 5px;
}
.p5{
  padding:5px 5px 5px 10px;
}
.taskCreate .taskCreateRow /deep/ .van-cell__title{
  width: 120px;    flex: inherit;
}
.taskCreate .taskCreateRow /deep/ .van-cell__value {
  text-align: inherit;
}
</style>