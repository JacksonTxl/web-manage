<template>
  <st-panel app initial >
    <div :class="basic()">
      <img src="~@/assets/img/brand/marketing/coupon/success.svg" />
      <p :class="basic('success')">活动新建成功</p>
      <p :class="basic('tips')">更多曝光推广，获得更多客户与订单</p>
      <ul>
        <li>
          <img src="~@/assets/img/brand/marketing/coupon/poster.svg" />
          <label @click="sharePoster">分享海报</label>
        </li>
        <li>
          <img src="~@/assets/img/brand/marketing/coupon/activity.png" />
          <label>设置活动广告</label>
        </li>
        <li>
          <img src="~@/assets/img/brand/marketing/coupon/mini-program.svg" />
          <label>小程序码</label>
        </li>
      </ul>
    </div>
  </st-panel>
</template>

<script>
export default {
  name: 'PageBrandMarketingPluginCouponTip',
  bem: {
    basic: 'page-brand-plugin-coupon-tip'
  },
  serviceInject() {
    return {
    }
  },
  rxState() {
    return {
    }
  },
  computed: {

  },
  data() {
    return {
    }
  },
  mounted() {
  },
  watch: {

  },
  methods: {
    sharePoster() {
      this.$modalRouter.push({
        name: 'brand-marketing-poster',
        props: {

        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    }
  },
  components: {
  }
}
</script>
