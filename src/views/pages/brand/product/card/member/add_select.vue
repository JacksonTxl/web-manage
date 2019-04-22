<template>
  <st-panel app class="page-brand-add-select">
    <div class="page-brand-add-select-content">
      <div class="page-brand-add-select-item" v-for="(i,index) in cardTypeList" :key="index">
        <img :src="i.bg" width="328" height="182" :alt="i.title">
        <div class="page-brand-add-select-text">
          <h2 class="page-brand-add-select-title">{{i.title}}</h2>
          <p class="page-brand-add-select-describe">{{i.describe}}</p>
        </div>
      </div>
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
          describe: '支持会员在有效时间段内进入场馆'
        },
        {
          bg: require('@/assets/img/bg_cardnumber.png'),
          title: '会员次卡',
          describe: '支持会员在有效次数内进入场馆并消耗次数'
        }
      ]
    }
  }
}
</script>
