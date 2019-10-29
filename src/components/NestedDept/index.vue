<!-- 嵌套部门循环组件 -->
<template>
  <div>
    <div v-for="(row, i) in deptData" :key="i" class="">
      <div class="flex p-3 border-b border-gray-100">
        <van-checkbox class="flex-1" icon-size="16px" :name="row.name+','+row.id">{{row.name}}</van-checkbox>
        <!-- showId == row.id ? (showId = '') : (showId = row.id) -->
        <div v-if="row.children && row.children.length" @click="showId == '' ? (showId = row.id) : (showId = '')" class="cursor-pointer text-blue-500 text-sm"><span class="pr-2 text-gray-500">|</span>下级</div>
      </div>
      <!-- showId == row.id -->
      <NestedDept v-if="row.children && row.children.length && showId == ''" :deptData="row.children" />
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
      showId: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>