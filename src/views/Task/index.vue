 <!-- 拜访任务详情 -->
<template>
  <div class="taskDetails  flex flex-1 flex-col">
    <van-nav-bar title="任务详情" left-text="返回" 
          @click-left="$router.go(-1)" left-arrow>
      <!-- <div v-if="editor" slot="right">保存</div> -->
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">任务名称</span>
            </template>
            <template slot="default">
              <van-field v-if="editor" v-model="$store.state.task.taskInfo.taskName" placeholder="请输入任务主题" />
              <p v-else class="p5">{{$store.state.task.taskInfo.taskName}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">类型</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (taskPopupShow = true)">{{$store.state.task.taskInfo.taskType && visitTypeOption[$store.state.task.taskInfo.taskType-1].text}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">时间</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (taskTimeShow = true)">{{$store.state.task.taskInfo.taskTime ? $root.moment($store.state.task.taskInfo.taskTime/1000).format('YYYY-MM-DD') : '请选择时间'}}</p>
            </template>
          </van-cell>


          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">提醒</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && changeAlarmTime()">{{alarmTimeText || '请选择提醒时间'}}</p>
            </template>
          </van-cell>

          <van-cell clickable v-if="$store.state.task.taskInfo.taskType == 1">
            <template slot="title">
              <span class="custom-title">相关经销商</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (dealerShow = true)">{{dealerName || '请选择相关经销商'}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">拜访人</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (mainUserGidsShow = true,mainUserGidsArr=[],userType=0)">{{mainUserGidsFun(mainUserGids, 'refRlNm', 0)}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">协访人</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (mainUserGidsShow = true,mainUserGidsArr=[],userType=1)">{{mainUserGidsFun(otherUserGids, 'refRlNm', 1)}}</p>
            </template>
          </van-cell>

          <van-cell clickable v-if="$store.state.task.taskInfo.taskType == 1">
            <template slot="title">
              <span class="custom-title">拜访目的</span>
            </template>
            <template slot="default">
              <p class="p5" @click="editor && (visitAimShow = true)">{{visitAimText || '请选择拜访目的'}}</p>
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">备注</span>
            </template>
            <template slot="default">
              <van-field v-if="editor" v-model="$store.state.task.taskInfo.comment" type="textarea" rows="5" placeholder="请输入任务描述" />
              <p class="p5" v-else>{{$store.state.task.taskInfo.comment}}</p>
            </template>
          </van-cell>



          <div v-if="$store.state.task.taskInfo.clockinPlaceAddress" class="bg-gray-100 pt-3 pb-2">
            <div class="pl-5">打卡位置</div>
            <div class="flex items-center bg-white mt-2 pl-5 pr-5 pt-2 pb-2">
              <div class="flex-1">
                <span class="text-blue-500">{{$store.state.task.taskInfo.clockinPlaceAddress}}</span><br />
                <span>{{$store.state.task.taskInfo.clockinPlaceName}}</span>
              </div>
              <i class="iconfont iconweizhi text-orange-500"></i>
              <div>{{$store.state.task.taskInfo.dealerLongitude}} {{$store.state.task.taskInfo.dealerLatitud}}</div>
            </div>
          </div>
          
          

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">近期运营情况</span>
            </template>
            <template slot="default">
              <van-field v-if="editor" v-model="$store.state.task.taskInfo.dealerDes" type="textarea" rows="5" placeholder="月销售量/半年人销售量/近期热销车" />
              <p v-else class="p5">{{$store.state.task.taskInfo.dealerDes}}</p>
            </template>
          </van-cell>


          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">狮桥意向单量</span>
            </template>
            <template slot="default">
              <p class="p5">{{$store.state.task.taskInfo.lbPreOrderCount}}</p>
            </template>
          </van-cell>


          <div class="bg-gray-100 pt-3 pb-3">
            <div v-for="(r,i) in $store.state.task.taskInfo.lesseeList" :key="i">
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">意向承租人</span>
                </template>
                <template slot="default">
                  <p class="p5">{{r.lesseeName}}</p>
                </template>
              </van-cell>
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">备注</span>
                </template>
                <template slot="default">
                  <p class="p5">{{r.lesseeComment}}</p>
                </template>
              </van-cell>
              <div></div>
            </div>
          </div>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">竞对单量</span>
            </template>
            <template slot="default">
              <p class="p5">{{$store.state.task.taskInfo.competitorOrderCount}}</p>
            </template>
          </van-cell>

          <div class="bg-gray-100 pt-3 pb-3 relative">
            <div v-for="(r,i) in $store.state.task.taskInfo.competitorList" :key="i">
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">竞对名称</span>
                </template>
                <template slot="default">
                  <van-dropdown-menu>
                    <van-dropdown-item disabled v-model="r.modelGid" :options="competitorList" />
                  </van-dropdown-menu>
                </template>
              </van-cell>
              <van-cell clickable>
                <template slot="title">
                  <span class="custom-title">竞对政策</span>
                </template>
                <template slot="default">
                  <p class="p5">{{r.modelAttr}}</p>
                </template>
              </van-cell>
              <div></div>
            </div>
          </div>
          

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">备注</span>
            </template>
            <template slot="default">
              <p class="p5">{{$store.state.task.taskInfo.visitComment}}</p>
            </template>
          </van-cell>




      </div>
    </div>



    



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
        @click-right="taskPopupShow = false; $store.state.task.taskInfo.taskType = taskType"
      />
      <van-radio-group v-model="taskType">
        <van-cell-group>
          <van-cell v-for="(r,i) in visitTypeOption" :key="i" :title="r.text" clickable @click="taskType = r.value">
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
        @cancel="taskTimeShow=false"
        @confirm="taskTimeShow=false;$store.state.task.taskInfo.taskTime = timeStamp(currentDate)"
        v-model="currentDate"
        :formatter="formatter"
        type="date"
      />
    </van-popup>




    <!-- 提醒列表选择 -->
    <van-popup
      v-model="alarmTimeShow"
      position="bottom"
    >
      <van-nav-bar
        title="选择类型"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="alarmTimeShow = false"
        @click-right="alarmTimeShow = false; alarmTimeText = alarmTimeVal.text; $store.state.task.taskInfo.alarmTime = $store.state.task.taskInfo.taskTime - alarmTimeVal.value"
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
        @click-right="dealerShow = false; dealerName = dealerRow.dealerName; $store.state.task.taskInfo.dealerGid = dealerRow.gid"
      />
      <div class="flex-1 relative">
        <div class="absolute inset-0 overflow-y-auto">
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


    <!-- 拜访人 -->
    <van-popup
      v-model="mainUserGidsShow"
      position="bottom"
      class="flex flex-col"
      :style="{ height: '50%',}"
    >
      <van-nav-bar
        title="选择经销商"
        left-text="取消"
        right-text="确定"
        left-arrow
        @click-left="mainUserGidsShow = false"
        @click-right="clickRight"
      />
      <div class="flex-1 relative">
        <div class="absolute inset-0 overflow-y-auto">
          <van-checkbox-group v-model="mainUserGidsArr">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in $store.state.dealer.colleagueDataList"
                clickable
                :key="item.id"
                :title="`${item.refRlNm}`"
                @click="toggle(index)"
              >
                <van-checkbox
                  :name="item"
                  ref="checkboxes"
                  slot="right-icon"
                />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>

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
        @click-right="visitAimShow = false; $store.state.task.taskInfo.visitAim = visitAimObj.value; visitAimText=visitAimObj.text"
      />
      <van-radio-group v-model="visitAimObj">
        <van-cell-group>
          <van-cell v-for="(r,i) in visitAimTypes" :key="i" :title="r.text" clickable @click="visitAimObj = r">
            <van-radio slot="right-icon" :name="r" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>



  </div>
</template>

<script>
import VisitRecord from './visitRecord.vue'
export default {
  name: 'taskDetails',
  components:{
    VisitRecord
  },
  data() {
    return {
      competitorList: [
         { text: '选择竞对名称', value: 0 },
      ],



      taskType: 1,




      newTask: false,

      value: '',
      visitTypeOption: [
        { text: '经销商拜访', value: 1},
        { text: '任务事项', value: 2},
      ],
      visitTypeVal: 1,
      taskPopupShow: false,

      taskTimeShow: false,
      currentDate: '',

      alarmTimeShow: false,
      alarmTimeVal: '',
      alarmTimeText: '',
      alarmTimeOption: [
        { text: '5分钟', value: 5*60*1000},
        { text: '10分钟', value: 10*60*1000},
        { text: '15分钟', value: 15*60*1000},
        { text: '30分钟', value: 30*60*1000},
        { text: '1小时', value: 60*60*1000},
        { text: '1天前', value: 24*60*60*1000},
        { text: '2天前', value: 2*24*60*60*1000},
      ],

      dealerShow: false,
      dealerName: '',
      dealerRow: {},

      mainUserGidsShow: false,
      mainUserGids: [],
      mainUserGidsArr: [],
      userType: '',
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

      editor: false,

      taskId: '',

      visitType: '',

      taskStatus: 0


      

    }
  },
  mounted() {
    this.$store.dispatch('getTaskInfo',this.$route.query.id)

    this.$store.dispatch('getListData')
    this.$store.dispatch('getColleague',{
      pageNum: 1,
      pageSize: 10,
      usrNM: '',
      rlNm: ''
    })


    this.$store.dispatch('listCompetitor').then(()=>{
      this.competitorList = this.$store.state.competitor.list.map(r=>{
        return {
          text: r.competorName,
          value: r.gid
        }
      })
    })

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
        return r[key]
      }).toString()
    },
    changeAlarmTime(){
      if(!this.$store.state.task.taskInfo.taskTime){
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

    clickRight(){
      this.mainUserGidsShow = false; 
      if(this.userType == 0){
        this.mainUserGids = this.mainUserGidsArr;
        this.$store.state.task.taskInfo.mainUserGids = this.mainUserGidsFun(this.mainUserGidsArr, 'id', 0)
      }else{
        this.otherUserGids = this.mainUserGidsArr;
        this.$store.state.task.taskInfo.otherUserGids = this.mainUserGidsFun(this.mainUserGidsArr, 'id', 1)
      }
    },
  }
}
</script>

<style scoped>

.taskDetails /deep/ .van-cell{
  padding: 5px 5px 5px 10px;
  /* background-color: inherit; */
}
.taskDetails /deep/ .van-cell__title{
  padding: 5px;
}
.p5{
  padding:5px 5px 5px 10px;
}
.taskDetails /deep/ .van-cell__title{
  width: 120px;    flex: inherit;
}
.taskDetails /deep/ .van-cell__value {
  text-align: inherit;
}

.van-dropdown-menu.van-hairline--top-bottom{
  height: 35px;
  border: none;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border: 0;
}
</style>