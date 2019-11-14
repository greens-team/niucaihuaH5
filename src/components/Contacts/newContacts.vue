<!-- 新建联系人 -->
<template>
  <div class="NewContacts flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="新建联系人" left-text="取消" @click-left="$router.go(-1)" @click-right="finish" left-arrow>
      <div slot="right">新建</div>
    </van-nav-bar>
      
    <div class="pr-4 mt-2 bg-white flex-1">
        <div class="relative formBar font-bold text-base p-3 pl-4">联系人</div>
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsName"
          label="姓名"
          placeholder="请输入姓名"
          label-width="130"
        />
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsPhone"
          label="电话"
          placeholder="请输入手机号码"
          label-width="130"
        />
        <van-field
          v-model="$store.state.contacts.createContactsParams.weichatNum"
          label="微信"
          placeholder="请输入微信号"
          label-width="130"
        />

        <div></div>
        
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'NewContacts',
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('setCreateContactsParamsEmpty')
  },
  methods: {
    finish(){
      if(this.$store.state.contacts.createContactsParams.contactsName){
        this.$store.dispatch('createContacts').then(msg => {
          this.$notify({ type: 'success', message: msg })
          this.$store.state.contacts.listContactsParams.queryString = ''
          this.$router.go(-1)
        })
      }else{
        this.$notify({ type: 'warning', message: '请填写姓名' })
      }
    }
  }
}
</script>

<style scoped>
</style>