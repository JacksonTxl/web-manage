<template>
  <st-modal
    title="分享海报"
    v-model="show"
    @ok="handleOk"
    width="400px"
    :footer="null"
  >
    <div :class="basic()">
      <p>复制和下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。</p>
      <img src=""/>
      <div>
        <st-button block pill type="primary" icon="download" size="large">下载海报</st-button>
      </div>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-poster'
  },
  serviceInject() {
    return {
    }
  },
  props: {
    type: {
      type: String,
      default: () => {
        return 'http://www.baidu.com/'
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
