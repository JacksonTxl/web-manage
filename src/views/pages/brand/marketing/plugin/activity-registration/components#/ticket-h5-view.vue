<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        选择票种
      </template>
      <div :class="bComponent('content')">
        <div :class="bItem()">
          <st-t3 :class="bItem('title')">
            早鸟票早鸟票早鸟票早鸟票早鸟票
          </st-t3>
          <div :class="bItem('price-info')">
            <span class="discount-price">
              ¥200
            </span>
            <span class="original-price">/¥250</span>
            <span class="discount-terms">超过3张，每张减¥50</span>
          </div>
          <div :class="bItem('date')">
            售票时间：2019.06.22 19:30-2019.06.30 21:30
          </div>
          <div :class="bItem('remark')">
            备注说明：是哪个底色从 2015 年 4 月起，Ant Design
            在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800
            个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员
          </div>
        </div>
        <div :class="bComponent('footer')">
          <st-button pill class="footer__button" type="primary">
            下一步
          </st-button>
        </div>
      </div>
    </h5-container>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'TicketH5View',
  bem: {
    bComponent: 'component-ticket-h5-view',
    bItem: 'ticket-item'
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
