<template>
  <st-modal :title="title" v-model="show" width="400px" :footer="null">
    <div :class="basic()">
      <p>{{ message }}</p>
      <img
        v-if="!isLoading"
        :src="url"
        :class="activeClass"
        style="width:100%"
      />
      <div v-else class="loading-state">
        <a-spin size="large" />
      </div>
      <div class="mg-t24">
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
import { SharePosterService } from './share-poster.service'
import { AppConfig } from '@/constants/config'
import { OssService } from '@/services/oss.service'
import { ShsService } from '@/services/shs.service'
import { ACTIVITY_POSTER } from '@/constants/brand/marketing'
import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'

export default {
  name: 'BrandMarketingActivityPoster',
  bem: {
    basic: 'brand-marketing-activity-poster'
  },
  modals: {
    BrandMarketingBind
  },
  serviceInject() {
    return {
      sharePosterService: SharePosterService,
      appConfig: AppConfig,
      shsService: ShsService
    }
  },
  serviceProviders() {
    return [ShsService]
  },
  rxState() {
    return {
      loading: this.sharePosterService.loading$,
      isLoading: this.shsService.loading$,
      info: this.sharePosterService.info$,
      brand: this.sharePosterService.brand$,
      qrcode: this.sharePosterService.qrcode$
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    activity_id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ACTIVITY_POSTER,
      show: false,
      url: '',
      title: '分享海报',
      message:
        '将小程序码贴在宣传刊物、店内等任何地方，用户用手机扫一扫后，即可参与活动、转化下单',
      button: '下载海报',
      activeClass: 'poster'
    }
  },
  created() {
    if (this.type === this.ACTIVITY_POSTER.POSTER_TYPE) {
      this.sharePosterService
        .getSharePosterInfo(this.activity_id)
        .subscribe(res => {
          if (res.is_auth) {
            // this.show = false
            // this.$modalRouter.push({
            //   name: 'brand-marketing-bind'
            // })
            // return
          } else {
            const activity_date = `${this.info.start_time} - ${
              this.info.end_time
            }`
            this.shsService
              .getShsImage(
                {
                  qrcode_url: this.info.qrcode,
                  brand_name: this.brand.name,
                  brand_logo: this.brand.logo,
                  activity_img: this.info.image.image_url,
                  activity_title: this.info.activity_name,
                  activity_date,
                  activity_address: this.info.address
                },
                '/saas/activity'
              )
              .subscribe(res => {
                console.log(res)
                this.url = res
                this.isLoading = false
              })
          }
        })
    } else if (this.type === this.ACTIVITY_POSTER.QRCODE_TYPE) {
      this.activeClass = 'qrcode'
      this.title = '小程序码'
      this.message =
        '将小程序码贴在宣城刊物、店内等任何地方，用户用手机扫一扫后，即可参与活动转化下单。'
      this.button = '下载小程序码'
      this.sharePosterService.getQrCode(this.activity_id).subscribe(res => {
        if (!res.is_auth) {
          // this.show = false
          // this.$modalRouter.push({
          //   name: 'brand-marketing-bind'
          // })
        } else {
          this.isLoading = false
          this.url = res.qrcode
        }
      })
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
