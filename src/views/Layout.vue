<!-- 首页layout布局 -->
<template>
  <div class="tabbar flex-1 flex flex-col">

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-hidden overflow-y-scroll" style="padding-bottom:52px;">
        <component v-bind:is="currentModel"></component>
      </div>
    </div>

    <div>
      <van-tabbar v-model="$store.state.workbench.currentModelActive">
        <van-tabbar-item>
          <span class="text-sm">工作台</span>
          <img
            v-if="$store.state.workbench.currentModelActive == 0"
            slot="icon"
            src="../assets/tabsIcon/icon1_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/tabsIcon/icon1_0.png"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span class="text-sm">CRM</span>
          <img
            v-if="$store.state.workbench.currentModelActive == 1"
            slot="icon"
            src="../assets/tabsIcon/icon2_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/tabsIcon/icon2_0.png"
          >
        </van-tabbar-item>
        <!-- <van-tabbar-item>
          <span class="text-sm">统计</span>
          <img
            v-if="$store.state.workbench.currentModelActive == 2"
            slot="icon"
            src="../assets/tabsIcon/icon3_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/tabsIcon/icon3_0.png"
          >
        </van-tabbar-item> -->
        <van-tabbar-item>
          <span class="text-sm">我</span>
          <img
            v-if="$store.state.workbench.currentModelActive == 2"
            slot="icon"
            src="../assets/tabsIcon/icon4_1.png"
          >
          <img
            v-else
            slot="icon"
            src="../assets/tabsIcon/icon4_0.png"
          >
        </van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>

import Workbench  from '@/views/Workbench'    // 工作台
import Crm        from '@/views/Crm'          // CRM
import Statistics from '@/views/Statistics'   // 统计
import My         from '@/views/My'           // 我

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
  },
  watch: {
    '$store.state.workbench.currentModelActive' (val){
      this.setCurrentModel(val)
    }
  },
  mounted() {
    this.setCurrentModel(this.$store.state.workbench.currentModelActive)
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
          this.currentModel = My;
          break;
        case 3:
          this.currentModel = My;
          break;
      }
    }
  },
}
</script>
