<!-- 新建联系人 -->
<template>
  <div class="NewContacts flex-1 flex flex-col bg-gray-100">
    <van-nav-bar title="新建联系人" left-text="取消" @click-left="$router.go(-1)" @click-right="finish" left-arrow>
      <div slot="right">保存</div>
    </van-nav-bar>
      
    <div class="pr-4 mt-2 bg-white flex-1">
        <div class="relative formBar font-bold text-base p-3 pl-4">联系人</div>
        <van-field
          v-model="$store.state.contacts.createContactsParams.contactsName"
          required
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
      if(!this.$store.state.contacts.createContactsParams.contactsName){
        this.$dialog.alert({
            message: '联系人姓名不能为空'
        });
      }else{
        if(this.$store.state.contacts.createContactsParams.contactsName){
          this.$store.dispatch('createContacts').then(res => {
            // this.$notify({ type: 'success', message: res.msg })
            this.$toast(res.msg)
            this.$store.state.contacts.listContactsParams.queryString = ''
            let selectedUserGids = this.$store.state.contacts.selectedUserGids.concat(this.$store.state.contacts.createContactsParams.contactsName+','+res.data)
            sessionStorage.selectedUserGids = JSON.stringify(selectedUserGids)
            this.$router.go(-1)
          })
        }else{
          // this.$notify({ type: 'warning', message: '请填写姓名' })
          this.$toast('请填写姓名')
        }
      }
    }
  }
}
</script>

<style scoped>
</style>