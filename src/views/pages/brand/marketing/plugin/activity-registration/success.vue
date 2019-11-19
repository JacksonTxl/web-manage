<template>
  <st-panel app :class="bPage()">
    <div :class="bPage('content')">
      <img
        :class="bPage('content-img')"
        src="~@/assets/img/icon_setting_success.png"
      />
      <st-t2 :class="bPage('content-title')">发布成功</st-t2>
      <p :class="bPage('content-subtitle')">更多曝光推广，获得更多客户与订单</p>
      <ul :class="bPage('content-list')">
        <li @click="pushSharePosterModal()" class="mg-r48">
          <img src="~@/assets/img/brand/marketing/lottery/poster.png" alt="" />
          <a>分享海报</a>
        </li>
        <li class="mg-r48" @click="onClickGoactivityAd">
          <img src="~@/assets/img/brand/marketing/lottery/ad.png" alt="" />
          <a>设置活动广告</a>
        </li>
        <li @click="pushQrCodeModal()">
          <img src="~@/assets/img/brand/marketing/lottery/mina.png" alt="" />
          <a>小程序码</a>
        </li>
      </ul>
      <div :class="bPage('content-button-group')">
        <st-button @click="onClickGoAddActivity" class="mg-r16">
          新建活动
        </st-button>
        <st-button @click="onClickGoActivityList" type="primary">
          返回活动
        </st-button>
      </div>
    </div>
  </st-panel>
</template>
<script>
import MarketingPoster from '@/views/biz-modals/brand/marketing/share-poster'
import { SuccessService } from './success.service'
export default {
  name: 'ReleaseActivity',
  bem: {
    bPage: 'page-marketing-release-activity'
  },
  modals: {
    MarketingPoster
  },
  serviceInject() {
    return {
      service: SuccessService
    }
  },
  rxState() {
    const { info$, qrcode$, brand$ } = this.service
    return { info$, qrcode$, brand$ }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    activityId() {
      return +this.$searchQuery.activity_id
    }
  },
  methods: {
    onClickGoAddActivity() {
      this.$router.replace({
        name: 'brand-marketing-plugin-activity-registration-add'
      })
    },
    onClickGoActivityList() {
      this.$router.replace({
        name: 'brand-marketing-plugin-activity-registration-list'
      })
    },
    onClickGoactivityAd() {
      this.$router.replace({
        name: 'brand-marketing-activity'
      })
    },
    pushSharePosterModal() {
      this.service.getSharePosterInfo(this.activityId).subscribe(() => {
        const info = this.info$
        const activity_date = `${info.start_time} - ${info.end_time}`
        this.$modalRouter.push({
          name: 'marketing-poster',
          props: {
            info: {
              qrcode_url: info.qrcode,
              brand_name: this.brand$.name,
              brand_logo: this.brand$.logo,
              activity_img: info.image.image_url,
              activity_title: info.activity_name,
              activity_date,
              activity_address: info.address
            },
            shsUrl: '/saas/activity'
          }
        })
      })
    },
    pushQrCodeModal() {
      this.service.getQrCode(this.activityId).subscribe(() => {
        this.$modalRouter.push({
          name: 'marketing-poster',
          props: {
            url: this.qrcode$
          }
        })
      })
    }
  }
}
</script>
