<template>
  <div class="NewContacts flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="新建联系人" left-text="取消" @click-left="$router.go(-1)" left-arrow>
      <div slot="right">下一步</div>
    </van-nav-bar>
      
    <div class="pr-4 mt-2 bg-white flex-1">
        <div class="relative formBar font-bold text-base p-3 pl-4">联系人</div>
        <van-field
          v-model="username"
          label="姓名"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="职务"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="电话"
          placeholder="请填写信息"
          label-width="130"
        />
        <van-field
          v-model="username"
          label="E-mail"
          placeholder="请填写信息"
          label-width="130"
        />
        
          <van-checkbox class="ml-4 pt-3 pb-3 border-b border-gray-200" icon-size="16px" v-model="checked">关联已有</van-checkbox>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'NewContacts',
  data() {
    return {
      username: '',
      checked: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>