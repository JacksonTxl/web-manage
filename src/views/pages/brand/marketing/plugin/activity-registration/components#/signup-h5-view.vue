<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        报名表
      </template>
      <div :class="bComponent('content')">
        <div :class="bComponent('footer')">
          <st-icon size="44px" type="edit"></st-icon>
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
  name: 'SignUpH5View',
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
