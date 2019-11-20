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
import { PosterService } from './poster.service'
import { AppConfig } from '@/constants/config'
import { OssService } from '@/services/oss.service'
import { ShsService } from '@/services/shs.service'
import { POSTER } from '@/constants/brand/marketing'
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-share'
  },
  serviceInject() {
    return {
      posterService: PosterService,
      appConfig: AppConfig,
      shsService: ShsService
    }
  },
  serviceProviders() {
    return [ShsService]
  },
  rxState() {
    return {
      loading: this.posterService.loading$,
      isLoading: this.shsService.loading$,
      token: this.posterService.token$,
      info: this.posterService.info$,
      qrcode: this.posterService.qrcode$
    }
  },
  props: {
    url: String
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
