<template>
  <div class="shop-member-crowd-analysis">
    <st-panel>
      <div class="shop-member-crowd-analysis-title">
        <div class="shop-member-crowd-analysis-title__left">
          <img
            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1558317438&di=cc54592d22d6e9b750ea509ab2210332&src=http://b-ssl.duitang.com/uploads/item/201510/12/20151012173844_ef5yt.jpeg"
            alt
            class="shop-member-crowd-analysis-title__left-img"
          >
          <div class="shop-member-crowd-analysis-title__left-info">
            <st-t3 class="shop-member-crowd-analysis-title__info-title">新注册用户</st-t3>
            <st-t4 class="shop-member-crowd-analysis-title__info">近7天内，新注册的潜在用户</st-t4>
          </div>
        </div>
        <div class="shop-member-crowd-analysis-title__right">
          <st-t4 class="shop-member-crowd-analysis-title__info">
            人群
            <a-tooltip placement="bottom" overlayClassName="crowd-analysis-tooltip">
              <template slot="title">
                <span>该人群统计人数，统计时间截止至前一天</span>
              </template>
              <a-icon type="question-circle"/>
            </a-tooltip>
          </st-t4>
          <div class="shop-member-crowd-analysis-title__right-num">1234566</div>
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
              <a-tooltip placement="bottom" overlayClassName="crowd-analysis-tooltip">
                <template slot="title">
                  <span>{{item.info}}</span>
                </template>
                <a-icon type="question-circle"/>
              </a-tooltip>
            </div>
            <div class="shop-member-crowd-analysis-title__right-num">1234566</div>
          </li>
        </ul>
      </div>
      <st-area-chart id="analysis" :data="chartData"/>
    </st-panel>
  </div>
</template>
<script>
export default {
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
      cardItem: [
        {
          title: '入场人数',
          color: '#3F66F6',
          num: 1234,
          info: '该人群，近7天访问过场馆统的去重人数'
        },
        {
          title: '领卷人数',
          color: '#06DB8C',
          num: 1234,
          info: '领卷人数'
        },
        {
          title: '交易人数',
          color: '#FFB946',
          num: 1234,
          info: '交易人数'
        },
        {
          title: '上课人数',
          color: '#C87FFF',
          num: 1234,
          info: '上课人数'
        }
      ]
    }
  }
}
</script>
