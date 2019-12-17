/**
 * index.vue        Crm模块首页
 */

 <!-- Crm模块首页 -->
<template>
  <div class="Crm">
    <div class="flex justify-around pt-8 pb-6">
      <div @click="$root.checkRole('DEALER_SELECT', 'tipText') && $router.push('/DealerManage')">
        <img src="../../assets/crm/icon1.png" class="w-16" alt />
        <p class="text-center text-gray-700" style="font-size:1.1rem;line-height:3rem;">经销商</p>
      </div>
      <div @click="$root.checkRole('CONTACTS_SELECT', 'tipText') && $router.push('/Contacts')">
        <img src="../../assets/crm/icon2.png" class="w-16" alt />
        <p class="text-center text-gray-700" style="font-size:1.1rem;line-height:3rem;">联系人</p>
      </div>
      <div @click="$root.checkRole('LESSEE_SELECT', 'tipText') && $router.push('/Lessee')">
        <img src="../../assets/crm/icon3.png" class="w-16" alt />
        <p class="text-center text-gray-700" style="font-size:1.1rem;line-height:3rem;">承租人</p>
      </div>
    </div>

    <div class="bg-gray-100">
      <div class="pt-3">
        <!-- <van-cell is-link>
          <template slot="title">
            <div class="flex  items-center">
              <img src="../../assets/crm/icon4.png" class="w-5 mr-2" alt="">
              <span class="custom-title">项目管理</span>
            </div>
          </template>
        </van-cell>-->
      </div>
      <van-cell-group>
        <!-- <van-cell is-link>
          <template slot="title">
            <div class="flex  items-center">
              <img src="../../assets/crm/icon5.png" class="w-5 mr-2" alt="">
              <span class="custom-title">厂商品牌</span>
            </div>
          </template>
        </van-cell>-->
        <van-cell is-link>
          <template slot="title">
            <div
              class="flex items-center justify-between"
              @click="$root.checkRole('COMPETITOR_SELECT', 'tipText') && $router.push('/Competitor')"
            >
              <div class="flex-1 flex items-center">
                <img style="width:1.57rem;height:1.57rem;" class="mr-1" src="../../assets/crm/icon6.png" alt />
                <p style="font-size:1.143rem;">竞争对手</p>
              </div>
              
            </div>
          </template>
        </van-cell>
        <div></div>
        <!-- <van-cell is-link>
          <template slot="title">
            <div class="flex  items-center">
              <img src="../../assets/crm/icon7.png" class="w-5 mr-2" alt="">
              <span class="custom-title">车型</span>
            </div>
          </template>
        </van-cell>-->
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Crm",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>