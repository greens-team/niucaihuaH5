<!-- 选中的经销商 -->
<template>
  <div class="selectedListLessee  flex flex-1 flex-col">
    <van-nav-bar title="经销商" left-text="返回" @click-left="$store.state.dealer.selectedUserGids = $store.state.dealer.confirmUserGids; $router.go(-1)"  @click-right="finish" left-arrow>
      <div slot="right">完成</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

        <!-- <div class="flex"> -->

          <van-checkbox-group v-model="$store.state.dealer.confirmUserGids" class="flex-1  ml-5"> 
            <van-checkbox v-for="(item, i) in $store.state.dealer.selectedUserGids" :key="i" icon-size="16px" 
              class="border-b border-gray-200" style="padding: 0.86rem"
              :name="item">{{item.split(',')[0]}}
            </van-checkbox>
          </van-checkbox-group>

          <!-- <div class="mr-5">
            <div v-for="(item, i) in $store.state.lessee.selectedUserGids" :key="i" class="border-b border-gray-200" >
              <van-field
                v-model="$store.state.lessee.jobsUser[i]"
                placeholder="请输入职位"
              />
            </div>
          </div>
        </div> -->

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'selectedListDealer',
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
      this.$store.state.dealer.selectedUserGids.filter((r,i)=>{
        let obj = {
          contactsGid: '',
          jobTitle: ''
        }
        this.$store.state.dealer.confirmUserGids.some(x=>{
          if(x == r){
            obj.contactsGid = x.split(',')[1]
            return true
          }
        })
        if(obj.contactsGid){
          obj.jobTitle = this.$store.state.dealer.jobsUser[i]
          arr.push(obj)
        }
      })

      // 关联联系人
      this.$store.dispatch('associatedLessee',{
        associatedType: 0,
        modelGid: this.$route.query.modelGid,
        modelGids: arr.map(r=>{
          return r.contactsGid
        }).toString()
      }).then(msg=>{
        this.$notify({ type: 'success', message: msg })
        this.$router.go(-2)
      })

    }
  }
}
</script>

<style scoped>
</style>
