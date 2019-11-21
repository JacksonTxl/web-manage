<template>
  <st-panel app class="page-shop-add-select">
    <div class="page-shop-add-select-content">
      <router-link
        :to="i.url"
        v-for="(i, index) in moreCardTypeList"
        :key="index"
      >
        <div class="page-shop-add-select-item">
          <img :src="i.bg" width="328" height="182" :alt="i.title" />
          <div class="page-shop-add-select-text">
            <h2 class="page-shop-add-select-title">{{ i.title }}</h2>
            <p class="page-shop-add-select-describe">{{ i.describe }}</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="page-shop-add-select-content">
      <router-link :to="i.url" v-for="(i, index) in cardTypeList" :key="index">
        <div class="page-shop-add-select-item">
          <img :src="i.bg" width="328" height="182" :alt="i.title" />
          <div class="page-shop-add-select-text">
            <h2 class="page-shop-add-select-title">{{ i.title }}</h2>
            <p class="page-shop-add-select-describe">{{ i.describe }}</p>
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
          bg: require('@/assets/img/bg-card-member-period.png'),
          title: '会员期限卡',
          describe: '支持会员在有效时间段内进入场馆',
          url: './period/add'
        },
        {
          bg: require('@/assets/img/bg-card-member-number.png'),
          title: '会员次卡',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: './number/add'
        }
      ],
      moreCardTypeList: [
        {
          bg: require('@/assets/img/bg-card-member-more-period.png'),
          title: '多人共享期限卡',
          describe: '支持购卡人、卡成员在固定期限进入场馆锻炼',
          url: './period/add?type=1'
        },
        {
          bg: require('@/assets/img/bg-card-member-more-number.png'),
          title: '多人共享次卡',
          describe: '支持购卡人、卡成员进入场馆锻炼固定次数',
          url: './number/add?type=1'
        }
      ]
    }
  }
}
</script>
