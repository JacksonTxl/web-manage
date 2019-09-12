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
          <span :class="bPage('content-action-item')">
            <img
              :class="bPage('content-action-img')"
              src="~@/assets/img/brand/marketing/lottery/poster.png"
              alt="success"
            />
            <a
              v-modal-link="{
                name: 'brand-marketing-plugin-poster',
                props: {
                  type: 1,
                  id: query.id
                },
                on: { done: onModalTest }
              }"
            >
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
          <span :class="bPage('content-action-item')">
            <img
              :class="bPage('content-action-img')"
              src="~@/assets/img/brand/marketing/lottery/mina.png"
              alt="success"
            />
            <a
              v-modal-link="{
                name: 'brand-marketing-plugin-poster',
                props: {
                  type: 2,
                  id: query.id
                },
                on: { done: onModalTest }
              }"
            >
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
import BrandMarketingPluginPoster from '@/views/biz-modals/brand/marketing/plugin/poster'
import { RouteService } from '@/services/route.service'

export default {
  name: 'PluginLotteryAdd',
  data() {
    return {}
  },
  bem: {
    bPage: 'page-brand-marketing-plugin-lottery-success'
  },
  modals: {
    BrandMarketingPluginPoster
  },
  serviceInject() {
    return {
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$
    }
  },
  methods: {
    onModalTest() {}
  }
}
</script>
