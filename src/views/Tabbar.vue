<template>
  <div class="tabbar flex-1 flex flex-col">

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-scroll" style="padding-bottom:52px;">
        <component v-bind:is="currentModel"></component>
      </div>
    </div>

    <div>
      <van-tabbar v-model="$store.state.currentModelActive">
        <van-tabbar-item>
          <span class="text-sm">工作台</span>
          <img
            v-if="$store.state.currentModelActive == 0"
            slot="icon"
            src="../assets/icon1_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/icon1_0.png"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span class="text-sm">CRM</span>
          <img
            v-if="$store.state.currentModelActive == 1"
            slot="icon"
            src="../assets/icon2_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/icon2_0.png"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span class="text-sm">统计</span>
          <img
            v-if="$store.state.currentModelActive == 2"
            slot="icon"
            src="../assets/icon3_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/icon3_0.png"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span class="text-sm">我</span>
          <img
            v-if="$store.state.currentModelActive == 3"
            slot="icon"
            src="../assets/icon4_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/icon4_0.png"
          >
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">退出</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>

import Workbench  from '@/views/Workbench/Workbench.vue'    // 工作台
import Crm        from '@/views/Crm.vue'          // CRM
import Statistics from '@/views/Statistics.vue'   // 统计
import My         from '@/views/My/Index.vue'           // 我

export default {
  name: 'tabbar',
  components: {
  },
  data() {
    return {
      currentModel: '',
      active: 1
    }
  },
  created () {
    this.$ajax.scale.getTest({id:11122}).then(res => {
      console.log(res)
    })
  },
  watch: {
    '$store.state.currentModelActive' (val){
      this.setCurrentModel(val)
    }
  },
  mounted() {
    this.setCurrentModel(this.$store.state.currentModelActive)
  },
  methods: {
    setCurrentModel (val) {
      switch(Number(val)){
        case 0:
          this.currentModel = Workbench;
          break;
        case 1:
          this.currentModel = Crm;
          break;
        case 2:
          this.currentModel = Statistics;
          break;
        case 3:
          this.currentModel = My;
          break;
      }
    }
  },
}
</script>
