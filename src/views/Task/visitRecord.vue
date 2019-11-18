 <!-- 拜访记录表单 -->
<template>
  <div class="VisitRecord flex flex-1 flex-col">
    <van-nav-bar title="填写拜访记录" left-text="返回" 
      @click-left="$router.go(-1)" left-arrow >
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">近期运营情况</span>
            </template>
            <template slot="default">
              <van-field v-model="$store.state.task.addEditVisitlogParams.dealerDes" type="textarea" rows="5" placeholder="月销售量/半年人销售量/近期热销车" />
            </template>
          </van-cell>

          <van-cell clickable>
            <template slot="title">
              <span class="custom-title">狮桥意向单量</span>
            </template>
            <template slot="default">
              <van-field v-model="$store.state.task.addEditVisitlogParams.lbPreOrderCount" type="number" placeholder="请输入单量" />
            </template>
          </van-cell>

        <div class="bg-gray-100 pt-3 pb-3 relative">
          <div class="absolute z-30 text-xl round" @click="$store.state.task.addEditVisitlogParams.lesseeList.push({lesseeName: '',lesseeComment: ''})">+</div>

          <div v-for="(r,i) in $store.state.task.addEditVisitlogParams.lesseeList" :key="i">
            <van-cell clickable>
              <template slot="title">
                <span class="custom-title">意向承租人</span>
              </template>
              <template slot="default">
                  <van-field v-model="r.lesseeName" placeholder="请输入姓名" />
              </template>
            </van-cell>
            <van-cell clickable>
              <template slot="title">
                <span class="custom-title">备注</span>
              </template>
              <template slot="default">
                <van-field v-model="r.lesseeComment" type="textarea" rows="5" placeholder="请填加描述" />
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
            <van-field v-model="$store.state.task.addEditVisitlogParams.competitorOrderCount" type="number" placeholder="请输入竞对单量" />
          </template>
        </van-cell>
        
        <div class="bg-gray-100 pt-3 pb-3 relative">
          <div class="absolute z-30 text-xl round" @click="$store.state.task.addEditVisitlogParams.competitorList.push({modelGid:0,modelAttr:''})">+</div>
          <div v-for="(r,i) in $store.state.task.addEditVisitlogParams.competitorList" :key="i">
            <van-cell clickable>
              <template slot="title">
                <span class="custom-title">竞对名称</span>
              </template>
              <template slot="default">
                <van-dropdown-menu>
                  <van-dropdown-item v-model="r.modelGid" :options="competitorList" />
                </van-dropdown-menu>
              </template>
            </van-cell>
            <van-cell clickable>
              <template slot="title">
                <span class="custom-title">竞对政策</span>
              </template>
              <template slot="default">
                <van-field v-model="r.modelAttr" type="textarea" rows="5" placeholder="请填加描述" />
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
            <van-field v-model="$store.state.task.addEditVisitlogParams.visitComment" type="textarea" rows="5" placeholder="请填加描述" />
          </template>
        </van-cell>
        

      </div>
    </div>

    <div @click="finishTask" class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100">
      完成任务
    </div>

  </div>
</template>

<script>
export default {
  name: 'VisitRecord',
  data() {
    return {
      competitorList: [
         { text: '选择竞对名称', value: 0 },
      ]
    }
  },
  mounted() {
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
    finishTask(){
      this.$store.dispatch('addvisitlog', {gid: this.$route.query.id}).then((msg)=>{
        this.$dialog.alert({
            message: msg
          }).then(() => {
            this.$router.push('/')
          });
      }) 
    }
  }
}
</script>

<style scoped>

.VisitRecord /deep/ .van-cell{
  padding: 5px 5px 5px 10px;
  /* background-color: inherit; */
}
.VisitRecord /deep/ .van-cell__title{
  padding: 5px;
}
.p5{
  padding:5px 5px 5px 10px;
}
.VisitRecord /deep/ .van-cell__title{
  width: 120px;    flex: inherit;
}
.VisitRecord /deep/ .van-cell__value {
  text-align: inherit;
}
.round{
  border-radius: 10px; background: #ddd; text-align: center; line-height: 20px; font-size: 22px; color: white; width: 20px; height: 20px;top:20px; right:10px;
}
.van-dropdown-menu.van-hairline--top-bottom{
  height: 35px;
  border: none;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border: 0;
}
</style>