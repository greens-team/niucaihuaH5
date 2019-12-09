 <!-- 拜访记录表单 -->
<template>
  <div class="VisitRecord flex flex-1 flex-col">
    <!-- <van-nav-bar title="填写拜访记录" left-text="返回" @click-left="$router.go(-1)" left-arrow></van-nav-bar> -->

    <div class="items-center pl-4 pr-4 flex border-b border-gray-200 bg-white">
      <div class="flex-1 flex">
        <div
          @click="$route.query.back ? $router.replace('/') : $router.go(-1)"
          class="flex text-xl pt-5 pb-4 pl-1 pr-1 items-center hover:text-blue-600"
        >
          <img class="bar_icon back_icon" src="../../assets/topBarIcon/back_icon.png" alt="返回" />
        </div>
      </div>
      <span class="text-center font-bold bar_title">填写拜访记录</span>
      <div class="flex-1 items-center flex text-xl">
        <div class="flex-1"></div>
      </div>
    </div>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">
        <van-cell clickable>
          <template slot="title">
            <span class="text-red-400 -ml-1">*</span>
            <span class="custom-title">近期运营情况</span>
          </template>
          <template slot="default">
            <van-field
              v-model="$store.state.task.addEditVisitlogParams.dealerDes"
              type="textarea"
              rows="5"
              placeholder="月销售量/半年人销售量/近期热销车"
            />
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">狮桥意向单量</span>
          </template>
          <template slot="default">
            <van-field
              v-model="$store.state.task.addEditVisitlogParams.lbPreOrderCount"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入单量"
              @input="$store.state.task.addEditVisitlogParams.lbPreOrderCount=$store.state.task.addEditVisitlogParams.lbPreOrderCount.replace(/\D/g,'')"
            />
          </template>
        </van-cell>

        <div class="bg-gray-100 pt-3 pb-3 relative">
          <div
            class="absolute z-30 text-xl round"
            @click="$store.state.task.addEditVisitlogParams.lesseeList.push({lesseeName: '',lesseeComment: ''})"
          >+</div>

          <div v-for="(r,i) in $store.state.task.addEditVisitlogParams.lesseeList" :key="i">
            <van-cell clickable class="relative">
              <template slot="title">
                <span class="custom-title">意向承租人</span>
                <span
                  v-if="i"
                  class="absolute z-30 text-xl round"
                  style="top:10px; opacity: .5"
                  @click="$store.state.task.addEditVisitlogParams.lesseeList.splice(i, 1)"
                >-</span>
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
            <van-field
              v-model="$store.state.task.addEditVisitlogParams.competitorOrderCount"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入竞对单量"
              @input="$store.state.task.addEditVisitlogParams.competitorOrderCount=$store.state.task.addEditVisitlogParams.competitorOrderCount.replace(/\D/g,'')"
            />
          </template>
        </van-cell>
        <div class="bg-gray-100 pt-3 pb-3 relative">
          <div
            class="absolute z-30 text-xl round"
            @click="$store.state.task.addEditVisitlogParams.competitorList.push({modelGid:0,modelAttr:''})"
          >+</div>

          <div v-for="(r,i) in $store.state.task.addEditVisitlogParams.competitorList" :key="i">
            <van-cell clickable class="relative">
              <template slot="title">
                <span class="custom-title">竞对名称</span>
                <span
                  v-if="i"
                  class="absolute z-30 text-xl round"
                  style="top:10px; opacity: .5"
                  @click="$store.state.task.addEditVisitlogParams.competitorList.splice(i, 1)"
                >-</span>
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
            <span class="custom-title">图片</span>
          </template>
          <template slot="default">
            <van-uploader
              :after-read="file => uploadFile(file, (fileUrl)=>$store.state.task.addEditVisitlogParams.pics = fileUrl, 0)"
              :before-read="file => uploadFile(file,true)"
              v-model="picVal"
              :max-count="1"
            />
          </template>
        </van-cell>

        <van-cell clickable>
          <template slot="title">
            <span class="custom-title">备注</span>
          </template>
          <template slot="default">
            <van-field
              v-model="$store.state.task.addEditVisitlogParams.visitComment"
              type="textarea"
              rows="5"
              placeholder="请填加描述"
            />
          </template>
        </van-cell>
      </div>
    </div>

    <div
      @click="finishTask"
      class="bg-white p-4 text-center text-xl font-bold border-t border-gray-200 text-orange-500 bg-gray-100"
    >完成任务</div>
  </div>
</template>

<script>
export default {
  name: "VisitRecord",
  data() {
    return {
      competitorList: [{ text: "请选择竞对名称", value: 0 }],
      ediotr: true,
      picVal: []
    };
  },
  mounted() {
    this.$store.dispatch("getTaskInfo", this.$route.query.id).then(() => {
      if (this.$store.state.task.taskInfo.dealerDes) {
        // 回显数据
        this.$store.state.task.addEditVisitlogParams = {
          competitorList: this.$store.state.task.taskInfo.competitorList
            ? this.$store.state.task.taskInfo.competitorList.map(r => {
                return {
                  modelGid: r.competitorGid,
                  modelAttr: r.racePolicy
                };
              })
            : [{ modelGid: "", modelAttr: "" }],
          competitorOrderCount: this.$store.state.task.taskInfo
            .competitorOrderCount,
          dealerDes: this.$store.state.task.taskInfo.dealerDes,
          gid: this.$store.state.task.taskInfo.gid,
          lbPreOrderCount: this.$store.state.task.taskInfo.lbPreOrderCount,
          lesseeList: this.$store.state.task.taskInfo.lesseeList || [
            { lesseeComment: "", lesseeName: "" }
          ],
          pics: this.$store.state.task.taskInfo.pics,
          visitComment: this.$store.state.task.taskInfo.visitComment
        };

        this.$store.state.task.taskInfo.pics &&
          (this.picVal = [
            { url: window.picServer + this.$store.state.task.taskInfo.pics }
          ]);

        // console.log(this.$store.state.task.taskInfo.pics)
        // this.competitorList = this.competitorList.concat(this.$store.state.task.taskInfo.competitorList ? this.$store.state.task.taskInfo.competitorList.map(r=>{
        //   return {
        //     text: r.competorName,
        //     value: r.competitorGid,
        //   }
        // }) : [])
      }
    });

    // 请求赋值competitorList
    this.$store.dispatch("listCompetitor").then(() => {
      this.competitorList = this.competitorList.concat(
        this.$store.state.competitor.list.map(r => {
          return {
            text: r.competorName,
            value: r.gid
          };
        })
      );
    });

    // 排除competitorList中重复的值
    setTimeout(() => {
      let keys = [];
      this.competitorList = this.competitorList.filter(r => {
        if (!keys.includes(r.value)) {
          keys.push(r.value);
          return true;
        } else {
          return false;
        }
      });
    }, 2000);
  },
  watch: {},
  methods: {
    finishTask() {
      if (!this.$store.state.task.addEditVisitlogParams.dealerDes) {
        this.$dialog.alert({
          message: "请认真填写"
        });
      } else {
        let competitorList = this.$store.state.task.addEditVisitlogParams
          .competitorList;
        for (let i = 0; i < competitorList.length; i++) {
          if (Number(competitorList[i].modelGid) == 0) {
            competitorList.splice(i, 1); //删除下标为i的元素
          }
        }
        this.$store.state.task.addEditVisitlogParams.competitorList = competitorList;
        this.$store
          .dispatch(this.$route.query.back ? "addvisitlog" : "editvisitlog", {
            gid: this.$route.query.id
          })
          .then(msg => {
            this.$dialog
              .alert({
                message: msg
              })
              .then(() => {
                this.$route.query.back
                  ? this.$router.replace("/")
                  : this.$router.go(-1);
              });
          });
      }
    }
  }
};
</script>

<style scoped>
.VisitRecord /deep/ .van-cell {
  padding: 5px 5px 5px 10px;
  /* background-color: inherit; */
}
.VisitRecord /deep/ .van-cell__title {
  padding: 5px;
}
.p5 {
  padding: 5px 5px 5px 10px;
}
.VisitRecord /deep/ .van-cell__title {
  width: 120px;
  flex: inherit;
}
.VisitRecord /deep/ .van-cell__value {
  text-align: inherit;
}
.round {
  border-radius: 10px;
  background: #ddd;
  text-align: center;
  line-height: 20px;
  font-size: 22px;
  color: white;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 10px;
}
.van-dropdown-menu.van-hairline--top-bottom {
  height: 35px;
  border: none;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0;
}
.edit_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_icon {
  width: 1.57rem;
  height: 1.57rem;
}
.bar_title {
  font-size: 1.286rem;
}
</style>