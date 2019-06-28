<template>
  <div :class="basic()">
    <div :class="basic('left')">
      <p :class="basic('title')">优惠券</p>
      <p :class="basic('content')">拉新、促进单位成新拉新、促进单位成新拉新、促进单位成新拉新、促进单位成新</p>
      <p :class="basic('footer')">
        <label @click="ruleDetail">规则说明</label>
        <label>使用教程</label>
        <label>活动案例</label>
      </p>
    </div>
    <div :class="basic('right')" v-viewer="{ url: 'data-src' }">
      <img v-for="(item, index) in imgKeys" :key="index" :src="item|imgFilter({ w: 80, h: 142 })" :data-src="item|imgFilter({ w: 1000 })">
    </div>
  </div>
</template>

<script>
import { MarketingTitleService } from './marketing-title.service'
export default {
  name: 'MarktingPluginTitle',
  bem: {
    basic: 'markting-plugin-title'
  },
  serviceInject() {
    return {
      marketingTitleService: MarketingTitleService
    }
  },
  rxState() {
    return {
      loading: this.marketingTitleService.loading$,
      info: this.marketingTitleService.info$
    }
  },
  data() {
    return {
      imgKeys: [
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg'
      ]
    }
  },
  methods: {
    ruleDetail() {
      this.$modalRouter.push({
        name: 'brand-marketing-rule-tip',
        props: {

        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    }
  }
}
</script>
