<template>
  <st-modal
    title="分享海报"
    v-model="show"
    @ok="handleOk"
    :footer="null"
  >
    <div>
      <p>复制和下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。</p>
      <div></div>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'BrandMarketingRuleTip',
  serviceInject() {
    return {
    }
  },
  props: {
    contents: {
      type: Array,
      default: () => {
        return ['1、客户可以凭券抵扣相同面值的现金', '2、客户可以凭券抵扣相同面值的现金', '3、客户可以凭券抵扣相同面值的现金']
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
  },
  methods: {
    handleOk() {
      this.show = false
    }
  }
}
</script>
