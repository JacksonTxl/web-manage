<template>
  <st-panel app>
    {{timeList}}
    <st-shop-hour-picker v-model="timeList"></st-shop-hour-picker>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      timeList: [ { 'week_day': 1, 'start_time': '10:00', 'end_time': '22:00', min: '09:00', max: '23:00' }, { 'week_day': 2, 'start_time': '10:00', 'end_time': '24:00' } ]
    }
  },
  methods: {
    onReasonChange(e) {
      console.log(3)
    }
  }
}
</script>
