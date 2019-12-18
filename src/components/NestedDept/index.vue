<!-- 嵌套部门循环组件 -->
<template>
  <div>
    <div v-for="(row, i) in deptData" :key="i" class="">
      <div class="flex p-3 border-b border-gray-100">
        <van-checkbox icon-size="16px" :name="row.name+','+row.id">{{row.name}}</van-checkbox>
        <div v-if="row.children && row.children.length" @click="showId == row.id ? showId = '' : showId = row.id" class="flex-1 text-right cursor-pointer text-sm" style="color:#80848d;">
          <van-icon v-if="showId == row.id"  name="arrow-up" />
          <van-icon v-else  name="arrow-down" />
        </div>
      </div>
      <NestedDept class="pl-5" v-if="row.children && row.children.length && showId == row.id" :deptData="row.children" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedDept',
  props: ['deptData'],
  data() {
    return {
      deptGids: [],
      showId: 1
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>