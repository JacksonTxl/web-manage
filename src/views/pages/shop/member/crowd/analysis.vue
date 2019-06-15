<template>
  <div class="shop-member-crowd-analysis">
    <st-panel>
      <div class="shop-member-crowd-analysis-title">
        <div class="shop-member-crowd-analysis-title__left">
          <img
            :src="imgUrl[$route.query.urlid]"
            alt
            class="shop-member-crowd-analysis-title__left-img"
          >
          <div class="shop-member-crowd-analysis-title__left-info">
            <st-t3
              class="shop-member-crowd-analysis-title__info-title"
            >{{analysisInfo.info.crowd_name}}</st-t3>
            <st-t4 class="shop-member-crowd-analysis-title__info">{{analysisInfo.info.description}}</st-t4>
          </div>
        </div>
        <div class="shop-member-crowd-analysis-title__right">
          <st-t4 class="shop-member-crowd-analysis-title__info">
            人群
            <st-help-tooltip :id="1"/>
          </st-t4>
          <div class="shop-member-crowd-analysis-title__right-num">{{analysisInfo.info.num}}</div>
        </div>
      </div>
      <div class="shop-member-crowd-analysis-content">
        <div class="shop-member-crowd-analysis-content__info">
          <st-t3>新注册用户</st-t3>
          <st-t4
            class="shop-member-crowd-analysis-title__info shop-member-crowd-analysis-content__info-h2"
          >近7天内，新注册的潜在用户</st-t4>
        </div>
        <ul class="card-items">
          <li
            v-for="(item,index) in cardItem"
            :key="index"
            :style="{'borderTopColor':item.color}"
            :class="index === 0 ? 'card-items-start card-items-li': index === cardItem.length-1 ? 'card-items-end card-items-li':'card-items-li'"
          >
            <div class="card-items-box">
              <st-t4 class="shop-member-crowd-analysis-title__info">{{item.title}}</st-t4>
              <st-help-tooltip :id="1"/>
            </div>
            <div
              class="shop-member-crowd-analysis-title__right-num"
            >{{index === 0? analysisInfo.info.entrance_num:index ===1 ?analysisInfo.info.coupon_num :index ===2? analysisInfo.info.trade_num: analysisInfo.info.course_num}}</div>
          </li>
        </ul>
      </div>
      <st-area-chart id="analysis" :data="chartData"/>
    </st-panel>
    {{analysisInfo}}
  </div>
</template>
<script>
import shop_crowd_private_teaching from '@/assets/img/shop_crowd_private_teaching.png'
import shop_crowd_expire from '@/assets/img/shop_crowd_expire.png'
import shop_crowd_new from '@/assets/img/shop_crowd_new.png'
import { AnalysisService } from './analysis.service'
export default {
  serviceInject() {
    return {
      aService: AnalysisService
    }
  },
  rxState() {
    return {
      analysisInfo: this.aService.analysisInfo$
    }
  },
  data() {
    return {
      chartData: [
        {
          test_time: '2013',
          value: 30900
        },
        {
          test_time: '2014',
          value: 27409
        },
        {
          test_time: '2015',
          value: 38000
        },
        {
          test_time: '2016',
          value: 31056
        },
        {
          test_time: '2017',
          value: 31982
        },
        {
          test_time: '2018',
          value: 32040
        },
        {
          test_time: '2019',
          value: 33233
        }
      ],
      imgUrl: [shop_crowd_expire, shop_crowd_new, shop_crowd_private_teaching],

      cardItem: [
        {
          title: '入场人数',
          color: '#3F66F6',
          num: 1234
        },
        {
          title: '领券人数',
          color: '#06DB8C',
          num: 1234
        },
        {
          title: '交易人数',
          color: '#FFB946',
          num: 1234
        },
        {
          title: '上课人数',
          color: '#C87FFF',
          num: 1234
        }
      ]
    }
  },

  created() {},
  methods: {}
}
</script>
