<!-- 获取联系人列表 -->
<template>
  <div class="selectedListContacts  flex flex-1 flex-col">
    <van-nav-bar title="联系人" left-text="返回" @click-left="$store.state.contacts.selectedUserGids = $store.state.contacts.confirmUserGids; $router.go(-1)"  @click-right="finish" left-arrow>
      <div slot="right">完成</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

        <div class="flex">

          <van-checkbox-group v-model="$store.state.contacts.confirmUserGids" class="flex-1  ml-5"> 
            <van-checkbox v-for="(item, i) in $store.state.contacts.selectedUserGids" :key="i" icon-size="16px" 
              class="border-b border-gray-200" style="padding: 0.86rem"
              :name="item">{{item.split(',')[0]}}
            </van-checkbox>
          </van-checkbox-group>

          <div class="mr-5">
            <div v-for="(item, i) in $store.state.contacts.selectedUserGids" :key="i" class="border-b border-gray-200" >
              <van-field
                v-model="$store.state.contacts.jobsUser[i]"
                placeholder="请输入职位"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'selectedListContacts',
  created () {
  },
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    finish(){

      let arr = []
      this.$store.state.contacts.selectedUserGids.filter((r,i)=>{
        let obj = {
          contactsGid: '',
          jobTitle: ''
        }
        this.$store.state.contacts.confirmUserGids.some(x=>{
          if(x == r){
            obj.contactsGid = x.split(',')[1]
            return true
          }
        })
        if(obj.contactsGid){
          obj.jobTitle = this.$store.state.contacts.jobsUser[i]
          arr.push(obj)
        }


      })

      if(this.$route.query.modelGid){
        // 关联联系人
        this.$store.dispatch('associatedcontacts',{
          associatedType: 0,
          modelGid: this.$route.query.modelGid,
          associatedAttr: arr.map(r=>{
            return {
              modelGid: r.contactsGid,
              modelAttr: r.jobTitle
            }
          })
        }).then(msg=>{
          this.$notify({ type: 'success', message: msg })
          this.$router.go(-2)
        })
      }else{
        this.$store.getters.NDparams.dealerContactsList = arr
        this.$store.getters.NDparams.addType = 1

        this.$store.dispatch('addCreateDealer').then(r=>{
          console.log(r, 222)
          this.$router.push('/DealerManage')
        })
      }

    }
  }
}
</script>

<style scoped>
</style>
