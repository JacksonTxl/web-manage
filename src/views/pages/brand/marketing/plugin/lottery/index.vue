<template>
  <div :class="bPage()">
    <st-panel app>
      <div :class="bPage('preview')">
        <div :class="bPage('preview-text')">
          <st-t2 class="mg-b8">幸运大转盘</st-t2>
          <div :class="bPage('preview-tip')">提供多种优惠券发放方式。</div>
          <div :class="bPage('preview-tip')">包括进店有礼、支付有礼等。</div>
          <div class="mg-t24">
            <a class="mg-r8">规则说明</a>
            <a class="mg-r8">使用教程</a>
            <a>活动案例</a>
          </div>
        </div>

        <div :class="bPage('preview-img')">
          <img
            :class="bPage('preview-img-item')"
            src="~@/assets/img/brand/marketing/lottery/example1.png"
            alt="example1"
          />
          <img
            :class="bPage('preview-img-item')"
            src="~@/assets/img/brand/marketing/lottery/example2.png"
            alt="example2"
          />
          <img
            :class="bPage('preview-img-item')"
            src="~@/assets/img/brand/marketing/lottery/example3.png"
            alt="example3"
          />
          <img
            :class="bPage('preview-img-item')"
            src="~@/assets/img/brand/marketing/lottery/example4.png"
            alt="example4"
          />
        </div>
      </div>
    </st-panel>
    <div :class="bPage('divider')"></div>
    <st-panel app>
      <st-table></st-table>
    </st-panel>
  </div>
</template>
<script>
import { IndexService } from './index.service'

export default {
  name: 'PluginLotteryIndex',
  data() {
    return {}
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-index'
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      list: this.indexService.list$
    }
  }
}
</script>
