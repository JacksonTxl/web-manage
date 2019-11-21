<template>
  <st-modal :title="title" v-model="show" width="400px" :footer="null">
    <div :class="basic()">
      <p :class="basic('tip')">{{ message }}</p>
      <st-image :src="url" :class="basic('qrcode')" />
      <st-button
        block
        pill
        :class="basic('button')"
        type="primary"
        icon="download"
        size="large"
        @click="downloadPoster"
      >
        {{ button }}
      </st-button>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-share'
  },
  props: {
    qrCodeUrl: String
  },
  data() {
    return {
      show: false,
      title: '小程序码',
      message:
        '将小程序码贴在宣城刊物、店内等任何地方，用户用手机扫一扫后，即可参与活动转化下单。',
      button: '下载小程序码'
    }
  },

  methods: {
    downloadPoster() {
      const a = document.createElement('a')
      a.href = this.url
      a.target = '_blank'
      a.download = 'poster.png'
      a.click()
    }
  }
}
</script>
