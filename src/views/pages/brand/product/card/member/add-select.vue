<template>
  <st-panel app class="page-brand-add-select">
    <div class="page-brand-add-select-content">
      <router-link :to="i.url" v-for="(i,index) in cardTypeList" :key="index">
        <div class="page-brand-add-select-item">
          <img :src="i.bg" width="328" height="182" :alt="i.title">
          <div class="page-brand-add-select-text">
            <h2 class="page-brand-add-select-title">{{i.title}}</h2>
            <p class="page-brand-add-select-describe">{{i.describe}}</p>
          </div>
        </div>
      </router-link>
    </div>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      cardTypeList: [
        {
          bg: require('@/assets/img/bg_cardperiod.png'),
          title: '会员期限卡',
          describe: '支持会员在有效时间段内进入场馆',
          url: './period/add'
        },
        {
          bg: require('@/assets/img/bg_cardnumber.png'),
          title: '会员次卡',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: './number/add'
        }
      ]
    }
  }
}
</script>
