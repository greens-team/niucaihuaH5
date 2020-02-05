/**
 * index.vue        我的模块首页
 * BaseInfo.vue     我的基本信息
 */

 <!-- 我的模块首页 -->
<template>
  <div class="My">
    <div class="baseinfo m-4 rounded-lg relative">
      <div class="p-6 pl-8">
        <div class="flex justify-between items-center">
          <p>
            <span class="text-xl font-bold">
              <!-- 王成阔 -->
              {{this.userInfo.realname}}
            </span>

            <br />
            {{this.userInfo.job}}
            <!-- 广州城市经理 -->
          </p>

          <div
            class="circleBg font-bold text-xl"
          >{{this.userInfo.realname && this.userInfo.realname.trim().substring(0,1).toUpperCase()}}</div>

          <!-- <img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1624240531,2195794812&fm=26&gp=0.jpg"
            class="border border-white w-20 h-20 rounded-full"
            alt
          />-->
        </div>
        <p class="text-xs mt-3">
          电话 {{this.userInfo.phone}}
          <br />
          工号 {{this.userInfo.username}}
        </p>
      </div>

      <!-- <div class="editor absolute bottom-0 right-0 bg-white pl-2 pt-2">
        <img
          @click="$router.push('/MyBaseInfo')"
          src="../../assets/my/icon_editor.png"
          class="w-5 m-1"
          alt
        />
      </div>-->
    </div>

    <div class="bg-gray-100 mt-8">
      <!-- <van-cell is-link>
        <template slot="title">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex items-center">
              <img style="width:1.57rem;height:1.57rem;" class="mr-1" src="../../assets/my/icon1.png" alt />
              <p style="font-size:1.143rem;">我的团队</p>
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell is-link>
        <template slot="title">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex items-center">
              <img style="width:1.57rem;height:1.57rem;" class="mr-1" src="../../assets/my/icon2.png" alt />
              <p style="font-size:1.143rem;">活动状态</p>
            </div>
          </div>
        </template>
      </van-cell> 
      <van-cell class="mt-3" is-link>
        <template slot="title">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex items-center">
              <img style="width:1.57rem;height:1.57rem;" class="mr-1" src="../../assets/my/icon3.png" alt />
              <p style="font-size:1.143rem;">快速入门</p>
            </div>
          </div>
        </template>
      </van-cell>
      -->
      <van-cell is-link @click="$router.push('/FeedBack');">
        <template slot="title">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex items-center">
              <img
                style="width:1.57rem;height:1.57rem;"
                class="mr-1"
                src="../../assets/my/icon4.png"
                alt
              />
              <p style="font-size:1.143rem;">意见反馈</p>
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell class="mt-3" is-link @click="$router.push('/MySetInfo');">
        <template slot="title">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex items-center">
              <img
                style="width:1.57rem;height:1.57rem;"
                class="mr-1"
                src="../../assets/my/icon5.png"
                alt
              />
              <p style="font-size:1.143rem;">设置信息</p>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      userInfo: {},
      testToken: ""
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.userInfo);
    this.getAuth();
  },
  methods: {
    getAuth() {
      this.$store.dispatch("getAuthInfo").then(res => {
        this.userInfo = res;
      });
    }
  }
};
</script>

<style scoped>
.baseinfo {
  background: linear-gradient(
    245deg,
    rgba(255, 191, 42, 1) 0%,
    rgba(254, 233, 124, 1) 100%
  );
  box-shadow: 0px 2px 13px 5px rgba(221, 221, 221, 0.5);
}
.baseinfo .editor {
  border-top-left-radius: 5rem;
  border-bottom-right-radius: 1rem;
}
.My .van-cell:not(:last-child)::after {
  right: 16px;
}
.circleBg {
  background: #fcfdff;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 3rem;
  text-align: center;
  line-height: 4.5rem;
  color: #252525;
  font-size: 1.3rem;
}
.My /deep/ .van-cell {
  padding: 14px;
}
.My /deep/ .van-cell:not(:last-child)::after {
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}
</style>