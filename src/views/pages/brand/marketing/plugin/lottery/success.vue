<template>
  <div :class="bPage()">
    <st-panel app>
      <div :class="bPage('content')">
        <img
          :class="bPage('content-success-img')"
          src="~@/assets/img/brand/marketing/lottery/success.png"
          alt="success"
        />
        <div class="mg-b16 mg-t24">活动新建成功</div>
        <div class="mg-b24" :class="bPage('content-text')">
          更多曝光推广，获得更多客户与订单
        </div>
        <div :class="bPage('content-action')">
          <span
            @click="pushSharePosterModal"
            :class="bPage('content-action-item')"
          >
            <img
              :class="bPage('content-action-img')"
              src="~@/assets/img/brand/marketing/lottery/poster.png"
              alt="success"
            />
            <a>
              分享海报
            </a>
          </span>
          <span :class="bPage('content-action-item')">
            <img
              :class="bPage('content-action-img')"
              src="~@/assets/img/brand/marketing/lottery/ad.png"
              alt="success"
            />
            <router-link to="/brand/marketing/activity">
              设置活动广告
            </router-link>
          </span>
          <span
            @click="pushQrCodeModal()"
            :class="bPage('content-action-item')"
          >
            <img
              :class="bPage('content-action-img')"
              src="~@/assets/img/brand/marketing/lottery/mina.png"
              alt="success"
            />
            <a>
              小程序码
            </a>
          </span>
        </div>
        <div :class="bPage('content-btn')">
          <router-link to="./add">
            <st-button class="mg-r16">
              新建活动
            </st-button>
          </router-link>
          <router-link to="./index">
            <st-button type="primary">
              返回活动列表页
            </st-button>
          </router-link>
        </div>
      </div>
    </st-panel>
  </div>
</template>
<script>
import MarketingPoster from '@/views/biz-modals/brand/marketing/share-poster'
import MarketingQrCode from '@/views/biz-modals/brand/marketing/qr-code'
import { SuccessService } from './success.service'
import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'

export default {
  name: 'PluginLotteryAdd',
  data() {
    return {}
  },
  bem: {
    bPage: 'page-brand-marketing-plugin-lottery-success'
  },
  modals: {
    MarketingPoster,
    MarketingQrCode,
    BrandMarketingBind
  },
  serviceInject() {
    return {
      service: SuccessService
    }
  },
  rxState() {
    const { info$, qrcode$ } = this.service
    return { info$, qrcode$ }
  },
  computed: {
    lotteryId() {
      return this.$searchQuery.id
    }
  },
  methods: {
    pushSharePosterModal() {
      this.service.getSharePosterInfo(this.lotteryId).subscribe(res => {
        const info = this.info$
        if (!res.is_auth) {
          this.show = false
          this.$modalRouter.push({
            name: 'brand-marketing-bind'
          })
          return
        }
        this.$modalRouter.push({
          name: 'marketing-poster',
          props: {
            info: {
              qrcode_url: info.qrcode_url,
              sub_name: info.sub_name
            },
            shsUrl: '/saas/lottery_poster'
          }
        })
      })
    },
    pushQrCodeModal() {
      this.service.getQrCode(this.lotteryId).subscribe(() => {
        this.$modalRouter.push({
          name: 'marketing-qr-code',
          props: {
            url: this.qrcode$
          }
        })
      })
    }
  }
}
</script>
