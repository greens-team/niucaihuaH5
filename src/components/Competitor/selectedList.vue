<!-- 竞争对手列表 -->
<template>
  <div class="selectedListContacts  flex flex-1 flex-col">
    <van-nav-bar title="竞争对手" left-text="返回" @click-left="$store.state.competitor.selectedUserGids = $store.state.competitor.confirmUserGids; $router.go(-1)"  @click-right="finish" left-arrow>
      <div slot="right">完成</div>
    </van-nav-bar>

    <div class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto">

        <div class="flex">

          <van-checkbox-group v-model="$store.state.competitor.confirmUserGids" class="flex-1  ml-5"> 
            <van-checkbox v-for="(item, i) in $store.state.competitor.selectedUserGids" :key="i" icon-size="16px" 
              class="border-b border-gray-200" style="padding: 0.86rem"
              :name="item">{{item.split(',')[0]}}
            </van-checkbox>
          </van-checkbox-group>

          <div class="mr-5 flex-1 flex">
            <div v-for="(item, i) in $store.state.competitor.selectedUserGids" :key="i" class="border-b border-gray-200 flex flex-1" >
              <van-field
                v-model="$store.state.competitor.jobsUser[i]"
                placeholder="应对策略"
              />
              <van-field
                v-model="$store.state.competitor.jobsUser1[i]"
                placeholder="竞对政策"
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
      this.$store.state.competitor.selectedUserGids.filter((r,i)=>{
        let obj = {
          contactsGid: '',
          jobTitle: '',
          jobTitle1: ''
        }
        this.$store.state.competitor.confirmUserGids.some(x=>{
          if(x == r){
            obj.contactsGid = x.split(',')[1]
            return true
          }
        })
        if(obj.contactsGid){
          obj.jobTitle = this.$store.state.competitor.jobsUser[i]
          obj.jobTitle1 = this.$store.state.competitor.jobsUser1[i]
          arr.push(obj)
        }
      })

      // 关联 竞争对手
      this.$store.dispatch('associatedcompetitor',{
        associatedType: 0,
        modelGid: this.$route.query.modelGid,
        associatedAttr: arr.map(r=>{
          return {
            modelGid: r.contactsGid,
            modelAttr: r.jobTitle,
            modelAttr2: r.jobTitle1
          }
        })
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
