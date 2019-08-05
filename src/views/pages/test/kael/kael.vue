<template>
  <st-panel app>
    {{ timeList }}
    <shop-hour-picker v-model="timeList"></shop-hour-picker>
  </st-panel>
</template>
<script>
import ShopHourPicker from '@/views/biz-components/shop-hour-picker/shop-hour-picker'
export default {
  components: {
    ShopHourPicker
  },
  data() {
    return {
      timeList: [
        {
          week_day: 1,
          start_time: '10:00',
          end_time: '22:00',
          range: [9.5, 16]
        },
        { week_day: 2, start_time: '10:00', end_time: '24:00' }
      ]
    }
  },
  methods: {
    onReasonChange(e) {
      console.log(3)
    }
  }
}
</script>
