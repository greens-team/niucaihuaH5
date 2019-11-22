 <!-- 检查备案信息 -->
<template>
  <div class="recordCheck flex flex-1 flex-col bg-gray-100">
    <van-nav-bar
      title="检查备案信息"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

      <!-- right-text="下一步"
      @click-right="nextStep" -->

    <div class="flex-1 flex flex-col">
      <div class="flex-1 flex flex-col bg-white m-2 rounded-lg shadow">
        <div class="relative formBar font-bold text-base p-3 pl-4">重卡CRM备案信息数据</div>

        <van-swipe ref='swipe1'  :loop="false" @change="(num)=>changeSwipeTo(num, 2)" class="flex-1 mb-1" indicator-color="gray">
          
          <van-swipe-item>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.dealerName">
                <van-radio :name="dealerRecord.dealerName" checked-color="#07c160">
                    <div class="text-xs text-gray-500">经销商名称</div>
                    <div>{{dealerRecord.dealerName}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.creditCode">
                <van-radio :name="dealerRecord.creditCode" checked-color="#07c160">
                    <div class="text-xs text-gray-500">统一社会信用代码</div>
                    <div>{{dealerRecord.creditCode || '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.ownerCd">
                <van-radio :name="dealerRecord.ownerCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">公司归属</div>
                    <div>{{dealerRecord.ownerCd != '' ? $store.state.newDealer.ownerCdTypes[dealerRecord.ownerCd-1].text : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.geoLocation">
                <van-radio :name="dealerRecord.province+'/'+dealerRecord.city+'/'+dealerRecord.area" checked-color="#07c160">
                    <div class="text-xs text-gray-500">省市区</div>
                    <div>{{dealerRecord.province+'/'+dealerRecord.city+'/'+dealerRecord.area}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            
          </van-swipe-item>
          <van-swipe-item>
            <van-cell  clickable>  
              <van-radio-group slot="title" v-model="resultVal.address">
                <van-radio :name="dealerRecord.address" checked-color="#07c160">
                    <div class="text-xs text-gray-500">注册地址</div>
                    <div>{{dealerRecord.address || '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.chkBusTypCdList">
                <van-radio :name="dealerRecord.chkBusTypCdList" checked-color="#07c160">
                    <div class="text-xs text-gray-500">业务类型</div>
                    <div>{{businessTypes(dealerRecord.chkBusTypCdList)}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.establishTime">
                <van-radio :name="dealerRecord.establishTime" checked-color="#07c160">
                    <div class="text-xs text-gray-500">成立时间</div>
                    <div>{{dealerRecord.establishTime}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.splAttrCd">
                <van-radio :name="dealerRecord.splAttrCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">供应商属性</div>
                    <div>{{dealerRecord.splAttrCd != '' ? $store.state.newDealer.splAttrCd[dealerRecord.splAttrCd -1 ].text : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
          </van-swipe-item>
          <van-swipe-item>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.contactsName">
                <van-radio :name="dealerRecord.contactsName" checked-color="#07c160">
                    <div class="text-xs text-gray-500">法人姓名</div>
                    <div>{{dealerRecord.contactsName}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.contactsPhone">
                <van-radio :name="dealerRecord.contactsPhone" checked-color="#07c160">
                    <div class="text-xs text-gray-500">手机号码</div>
                    <div>{{dealerRecord.contactsPhone}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.certTypCd">
                <van-radio :name="dealerRecord.certTypCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">证件类型</div>
                    <div>{{dealerRecord.certTypCd != '' ? $store.state.record.certTypCd[dealerRecord.certTypCd] : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.certNo">
                <van-radio :name="dealerRecord.certNo" checked-color="#07c160">
                    <div class="text-xs text-gray-500">证件号码</div>
                    <div>{{dealerRecord.certNo}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            

          </van-swipe-item>

        </van-swipe>

      </div>
      <div class="flex-1 flex flex-col bg-white m-2 rounded-lg shadow">
        <div class="relative formBar font-bold text-base p-3 pl-4">业务系统备案信息数据</div>

        <van-swipe ref='swipe2' :loop="false" @change="(num)=>changeSwipeTo(num, 1)" class="flex-1 mb-1" indicator-color="gray">
          
          <van-swipe-item>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.dealerName">
                <van-radio :name="splRecord.dealerName" checked-color="#07c160">
                    <div class="text-xs text-gray-500">经销商名称</div>
                    <div>{{splRecord.dealerName}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.creditCode">
                <van-radio :name="splRecord.creditCode" checked-color="#07c160">
                    <div class="text-xs text-gray-500">统一社会信用代码</div>
                    <div>{{splRecord.creditCode}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.ownerCd">
                <van-radio :name="splRecord.ownerCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">公司归属</div>
                    <div>{{splRecord.ownerCd != '' ? $store.state.newDealer.ownerCdTypes[splRecord.ownerCd-1].text : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.geoLocation">
                <van-radio :name="splRecord.province+'/'+splRecord.city+'/'+splRecord.area" checked-color="#07c160">
                    <div class="text-xs text-gray-500">省市区</div>
                    <div>{{splRecord.province+'/'+splRecord.city+'/'+splRecord.area}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            

          </van-swipe-item>
          <van-swipe-item>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.address">
                <van-radio :name="splRecord.address" checked-color="#07c160">
                    <div class="text-xs text-gray-500">注册地址</div>
                    <div>{{splRecord.address || '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.chkBusTypCdList">
                <van-radio :name="splRecord.chkBusTypCdList" checked-color="#07c160">
                    <div class="text-xs text-gray-500">业务类型</div>
                    <div>{{businessTypes(splRecord.chkBusTypCdList)}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell> 
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.establishTime">
                <van-radio :name="splRecord.establishTime" checked-color="#07c160">
                    <div class="text-xs text-gray-500">成立时间</div>
                    <div>{{splRecord.establishTime}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.splAttrCd">
                <van-radio :name="splRecord.splAttrCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">供应商属性</div>
                    <div>{{splRecord.splAttrCd != '' ? $store.state.newDealer.splAttrCd[splRecord.splAttrCd -1 ].text : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

          </van-swipe-item>
          <van-swipe-item>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.contactsName">
                <van-radio :name="splRecord.contactsName" checked-color="#07c160">
                    <div class="text-xs text-gray-500">法人姓名</div>
                    <div>{{splRecord.contactsName}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.contactsPhone">
                <van-radio :name="splRecord.contactsPhone" checked-color="#07c160">
                    <div class="text-xs text-gray-500">手机号码</div>
                    <div>{{splRecord.contactsPhone}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.certTypCd">
                <van-radio :name="splRecord.certTypCd" checked-color="#07c160">
                    <div class="text-xs text-gray-500">证件类型</div>
                    <div>{{splRecord.certTypCd != '' ? $store.state.record.certTypCd[splRecord.certTypCd] : '无'}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            <van-cell  clickable>
              <van-radio-group slot="title" v-model="resultVal.certNo">
                <van-radio :name="splRecord.certNo" checked-color="#07c160">
                    <div class="text-xs text-gray-500">证件号码</div>
                    <div>{{splRecord.certNo}}</div>
                </van-radio>
              </van-radio-group>
            </van-cell>

            

          </van-swipe-item>

        </van-swipe>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'recordCheck',
  data() {
    return {
      radio: '',
      resultVal: {
      },
      dealerRecord: {
        address: '',
        area: '',
        certNo: '',
        certTypCd: '',
        chkBusTypCdList: '',
        city: '',
        contactsName: '',
        contactsPhone: '',
        creditCode: '',
        dealerName: '',
        establishTime: '',
        gid: '',
        ownerCd: '',
        province: '',
        rgnArCd: '',
        rgnCyCd: '',
        rgnPrCd: '',
        rlTypCd: '',
        splAttrCd: ''
      },
      splRecord: {
        address:'',
        area:'',
        certNo:'',
        certTypCd:'',
        chkBusTypCdList:'',
        city:'',
        contactsName:'',
        contactsPhone:'',
        creditCode:'',
        dealerName:'',
        establishTime:'',
        gid:'',
        ownerCd:'',
        province:'',
        rgnArCd:'',
        rgnCyCd:'',
        rgnPrCd:'',
        rlTypCd:'',
        splAttrCd:''
      },
      currentIndex: 0
    }
  },
  watch: {
  },
  mounted() {
    this.$store.dispatch('checkRecord', {
      dealerGid: this.$route.query.dealerGid,
      dealerName: this.$route.query.dealerName,
      creditCode: this.$route.query.creditCode
    }).then(()=>{
      Object.assign(this.dealerRecord, this.$store.state.record.dealerRecord)
      Object.assign(this.splRecord,  this.$store.state.record.splRecord || {})
      Object.assign(this.resultVal, this.splRecord,  this.$store.state.record.splRecord || {})
      this.resultVal = Object.assign({}, this.splRecord, {geoLocation: this.splRecord.province+'/'+this.splRecord.city+'/'+this.splRecord.area})
      //  if(this.splRecord.province && this.splRecord.city){
      //   this.resultVal.geoLocation = this.splRecord.province+'/'+this.splRecord.city+'/'+this.splRecord.area;
      //   }
    })
  },
  methods: {
    businessTypes(data){
      if(data){
        return this.$store.state.newDealer.businessTypes.filter(r=>{
          if(data.includes(r.value)){
            return r.text
          }
        }).map(r=>{
          return r.text
        }).toString()
      }else{
        return '无'
      }
    },
    judgeScroll(num,index, digital, fields){
      let count = this.currentIndex < num ? num - 1 : num + 1
      if(count == digital){
        let res = fields.some(k=>{
          if(this.resultVal[k] == ''){
            return true
          }
        })
       if(res){
          this.$dialog.alert({
            message: '选中的值有不能有空值'
          });
          this.$refs['swipe'+(index == 1 ? 2 : 1)].swipeTo(count)
       }else{
         this.$refs['swipe'+index].swipeTo(num)
       }
      }
    },
    changeSwipeTo (num, index) {
      this.judgeScroll(num,index, 0, ['dealerName', 'creditCode', 'ownerCd', 'geoLocation'])
      this.judgeScroll(num,index, 1, ['address', 'chkBusTypCdList', 'establishTime', 'splAttrCd'])
      this.judgeScroll(num,index, 2, ['contactsName', 'contactsPhone', 'certTypCd', 'certNo'])
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    nextStep(){
      let field = ['dealerName', 'creditCode', 'ownerCd', 'geoLocation', 'address', 'chkBusTypCdList', 'establishTime', 'splAttrCd', 'contactsName', 'contactsPhone', 'certTypCd', 'certNo']
      let res = field.some(name=>{
        if(this.resultVal[name] == ''){
          return true
        }
      })
      if(res){
        this.$dialog.alert({
          message: '选中的值有不能有空值'
        });
      }else{
        let obj = {}
        field.map(name=>{
          if(name == 'geoLocation'){
            if(this.resultVal[name] == this.splRecord.province+'/'+this.splRecord.city+'/'+this.splRecord.area){
              obj.province = this.splRecord.province
              obj.city = this.splRecord.city
              obj.area = this.splRecord.area
              obj.rgnArCd = this.splRecord.rgnArCd
              obj.rgnCyCd = this.splRecord.rgnCyCd
              obj.rgnPrCd = this.splRecord.rgnPrCd
            }else{
              obj.province = this.dealerRecord.province
              obj.city = this.dealerRecord.city
              obj.area = this.dealerRecord.area
              obj.rgnArCd = this.dealerRecord.rgnArCd
              obj.rgnCyCd = this.dealerRecord.rgnCyCd
              obj.rgnPrCd = this.dealerRecord.rgnPrCd
            }
          }else{
            obj[name] = this.resultVal[name]
          }
        })
        obj.rlTypCd = this.splRecord.rlTypCd
        obj.gid = this.splRecord.gid
        console.log(obj)
        // this.$router.push('/recordInfo')
      }
    }
  }
}
</script>

<style scoped>
.titleBar::before{

}
</style>