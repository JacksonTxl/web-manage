<template>
  <st-modal :title="title" v-model="show" width="400px" :footer="null">
    <div :class="basic()">
      <p>{{ message }}</p>
      <st-image :src="url" :class="activeClass" />
      <div>
        <st-button
          block
          pill
          type="primary"
          icon="download"
          size="large"
          @click="downloadPoster"
        >
          {{ button }}
        </st-button>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { PosterService } from './poster.service'
import { OssService } from '@/services/oss.service'
import { ShsService } from '@/services/shs.service'
import { POSTER } from '@/constants/brand/marketing'
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-poster'
  },
  serviceInject() {
    return {
      posterService: PosterService,
      shsService: ShsService
    }
  },
  serviceProviders() {
    return [ShsService, PosterService]
  },
  props: {
    shsImageRquerst: {}
  },
  data() {
    return {
      POSTER,
      show: false,
      url: '',
      title: '分享海报',
      message:
        '复制和下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。',
      button: '下载海报',
      activeClass: 'poster'
    }
  },
  created() {
    this.shsService.getShsImage(this.shsImageRquerst).subscribe(res => {
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
    }
  }
}
</script>
