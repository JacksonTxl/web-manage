<template>
  <st-modal :title="title" v-model="show" width="400px" :footer="null">
    <div :class="basic()">
      <p :class="basic('tip')">{{ message }}</p>
      <st-image :src="url" :class="basic('poster')"></st-image>
      <div :class="basic('btn-group')">
        <st-button
          pill
          type="primary"
          icon="download"
          size="large"
          class="mg-r8"
          :class="basic('button')"
          @click="downloadPoster"
        >
          {{ button }}
        </st-button>
        <st-button
          pill
          v-if="isQrCodeBtn"
          type="primary"
          icon="download"
          size="large"
          :class="basic('button')"
          @click="downloadQrCode"
        >
          下载小程序码
        </st-button>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { ShsService } from '@/services/shs.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-share'
  },
  serviceInject() {
    return {
      shsService: ShsService
    }
  },
  serviceProviders() {
    return [ShsService]
  },
  props: {
    // shsInfo 的qrcode_url必传
    shsInfo: {
      type: Object,
      default: () => {}
    },
    // 是否添加下载二维码按钮
    isQrCodeBtn: {
      type: Boolean,
      default: false
    },
    shsPath: String
  },
  data() {
    return {
      show: false,
      url: '',
      title: '分享海报',
      message:
        '复制和下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。',
      button: '下载海报'
    }
  },
  created() {
    const shsInfo = cloneDeep(this.shsInfo)
    this.shsService.getShsImage(shsInfo, this.shsPath).subscribe(res => {
      this.url = res
    })
  },

  methods: {
    downloadPoster() {
      const a = document.createElement('a')
      a.href = this.url
      a.target = '_blank'
      a.download = 'poster.png'
      a.click()
    },
    downloadQrCode() {
      const a = document.createElement('a')
      debugger
      a.href = this.shsInfo.qrcode_url
      a.target = '_blank'
      a.download = 'qrcode.png'
      a.click()
    }
  }
}
</script>
