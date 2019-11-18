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
        <li @click="onClickSharePoster(1)" class="mg-r48">
          <img src="~@/assets/img/brand/marketing/lottery/poster.png" alt="" />
          <a>分享海报</a>
        </li>
        <li class="mg-r48" @click="onClickGoactivityAd">
          <img src="~@/assets/img/brand/marketing/lottery/ad.png" alt="" />
          <a>设置活动广告</a>
        </li>
        <li @click="onClickSharePoster(2)">
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
import MarketingPoster from '@/views/biz-modals/brand/marketing/poster'
export default {
  name: 'ReleaseActivity',
  bem: {
    bPage: 'page-marketing-release-activity'
  },
  modals: {
    MarketingPoster
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    activityId() {
      return +this.$searchQueryactivity_id
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
    pushModal(type) {
      this.$modalRouter.push({
        name: 'marketing-poster',
        props: {
          pluginType: 'signUp',
          type,
          activity_id: this.activityId
        }
      })
    },
    onClickSharePoster(type) {
      this.pushModal(type)
    }
  }
}
</script>
