<template>
  <div :class="bComponent()">
    <h5-container fixed>
      <template v-slot:title>
        活动报名
      </template>
      <div :class="bComponent('content')">
        <div :class="bComponent('content-img')">
          <img class="image" :src="stepInfo.imageUrl" alt="活动海报" />
        </div>
        <div :class="bComponent('content-info')">
          <st-t2 class="title">{{ stepInfo.activity_name }}</st-t2>
          <div class="content">
            <div class="price-info">
              <span class="price">¥--</span>
              <span class="subfix">起</span>
            </div>
            <div class="hot-info">
              <div class="view mg-r48">
                <st-icon size="32px" type="scan"></st-icon>
                <span class="mg-l16">190</span>
              </div>
              <div class="share">
                <st-icon size="32px" type="share-link"></st-icon>
                <span class="mg-l16">108</span>
              </div>
            </div>
          </div>
        </div>
        <div :class="bComponent('content-sub-info')">
          <div class="time">
            <st-icon size="32px" type="clock" class="mg-r16"></st-icon>
            <span>{{ stepInfo.date | formatActivityDate }}</span>
          </div>
          <div class="address">
            <div>
              <st-icon
                size="32px"
                type="location-mina"
                class="mg-r16"
              ></st-icon>
              <span>{{ stepInfo.address }}</span>
            </div>

            <div class="address__map">
              <img
                src="~@/assets/img/brand/marketing/activity/icon-location.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div :class="bComponent('content-activity-detail')">
          <st-t2 class="title">活动详情</st-t2>
          <div class="content-box" v-html="stepInfo.content"></div>
        </div>
        <div :class="bComponent('footer')">
          <st-icon size="44px" type="share"></st-icon>
          <st-button pill class="footer__button" type="primary">
            立即报名
          </st-button>
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
  filters: {
    formatActivityDate(dateArr = []) {
      if (!dateArr.length) return ''
      const startDate = dateArr[0].format('YYYY-MM-DD')
      const endDate = dateArr[1].format('YYYY-MM-DD')
      const startTime = dateArr[0].format('HH:mm')
      const endTime = dateArr[1].format('HH:mm')
      return startDate === endDate
        ? `${startDate} ${startTime} - ${endTime}`
        : `${startDate} ${startTime} - ${endDate} ${endTime}`
    }
  },
  props: {
    stepInfo: {
      type: Object,
      default: () => {
        return {
          content: ''
        }
      }
    }
  }
}
</script>

<style></style>
