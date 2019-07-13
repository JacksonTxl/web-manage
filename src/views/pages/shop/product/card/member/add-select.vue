<template>
  <st-panel app class="page-shop-add-select">
    <div class="page-shop-add-select-content">
      <router-link :to="i.url" v-for="(i,index) in cardTypeList" :key="index">
        <div class="page-shop-add-select-item">
          <img :src="i.bg | imgFilter({w:328,h:182})" width="328" height="182" :alt="i.title">
          <div class="page-shop-add-select-text">
            <h2 class="page-shop-add-select-title">{{i.title}}</h2>
            <p class="page-shop-add-select-describe">{{i.describe}}</p>
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
          bg: `https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-card-member-period.png`,
          title: '会员期限卡',
          describe: '支持会员在有效时间段内进入场馆',
          url: './period/add'
        },
        {
          bg: `https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-card-member-number.png`,
          title: '会员次卡',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: './number/add'
        }
      ]
    }
  }
}
</script>
