<template>
  <div :class="basic()">
    <div :class="basic('left')">
      <p :class="basic('title')">{{info.plugin_name}}</p>
      <p :class="basic('content')">{{info.introduction}}</p>
      <p :class="basic('footer')">
        <label @click="ruleDetail">规则说明</label>
        <label @click="openTeach">使用教程</label>
        <label @click="openCase">活动案例</label>
      </p>
    </div>
    <div :class="basic('right')" v-viewer="{ url: 'data-src' }">
      <div class="st-preview-item imgBox" v-for="(item, index) in info.plugin_image" :key="index">
        <img :src="item|imgFilter({ w: 80, h: 142 })" :data-src="item|imgFilter({ w: 1000 })">
      </div>
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
  props: {
    // 1 优惠券 2 邀请有礼
    type: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.marketingTitleService.getPluginInfo(this.type).subscribe()
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
          contents: [
            '1、客户可以凭券抵扣相同面值的现金',
            '2、每笔订单只能使用一张优惠券，不支持叠加使用',
            '3、已领取的优惠券是不可以失效的',
            '4、订单如果发生退款，现金券不支持退回'
          ]
        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    },
    openTeach() {
      if (this.info.usage_link) {
        window.open(this.info.usage_link)
      }
    },
    openCase() {
      if (this.info.usage_link) {
        window.open(this.info.case_link)
      }
    }
  }
}
</script>
