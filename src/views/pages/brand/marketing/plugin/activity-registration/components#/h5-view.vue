<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        活动报名
      </template>
      <div :class="bComponent('content')">
        <div :class="bComponent('content-img')">
          <img src="" alt="" />
        </div>
        <div :class="bComponent('content-info')">
          <st-t2 class="title">{{ stepInfo.name }}</st-t2>
          <div class="content">
            <div class="price-info">
              <span class="price">¥4000</span>
              <span class="subfix">起</span>
            </div>
            <div class="hot-info">
              <span class="view">
                190
              </span>
              <span class="share">
                108
              </span>
            </div>
          </div>
        </div>
        <div :class="bComponent('content-sub-info')">
          <div class="time">
            <st-icon type="timer" class="mg-r16"></st-icon>
            <span>2019.06.22 19:30-21:30</span>
          </div>
          <div class="address">
            <div class="address__info">
              <st-icon type="location" class="mg-r16"></st-icon>
              <span>上海市闵行区漕河泾门店</span>
            </div>
            <div class="address__map"></div>
          </div>
        </div>
        <div :class="bComponent('content-activity-detail')">
          <st-t2 class="title">活动详情</st-t2>
          <div class="content-box">
            <p></p>
            打造迷人身线，拥抱健康身材。 测量您的身体成分，了解现有身体状况。
            <p></p>
            根据您的身体状况，量身定制科学减脂计划。
            <p></p>
            1对1授课，帮您高效减脂，改善体态，重建良好身体机能。
            <p></p>
            根据您的运动计划，制定不同周期饮食参考，监督每日饮食。
            <p></p>
            注：2月26日前购买的消费者仍按原有套餐内容接待。
            <p></p>
            漕河泾店营业时间为8：00-22：00； 漕溪路店营业时间为10：00-22：00。
          </div>
        </div>
        <div :class="bComponent('footer')">
          <st-icon size="44px" type="edit"></st-icon>
          <st-button class="footer__button" type="primary">立即报名</st-button>
        </div>
      </div>
    </h5-container>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'h5-view',
  bem: {
    bComponent: 'component-activity-h5-view'
  },
  components: {
    H5Container
  },
  props: {
    stepInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style></style>
