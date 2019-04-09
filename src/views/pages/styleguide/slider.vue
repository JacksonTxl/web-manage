<template>
  <div>
    <st-shop-hour-picker :getSlider="getSlider" @change="sliderCange"></st-shop-hour-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getSlider: {
        business_time: [
          {
            week_day: 1,
            start_time: '00:00',
            end_time: '24:00'
          },
          {
            week_day: 2,
            start_time: '10:00',
            end_time: '24:00'
          },
          {
            week_day: 5,
            start_time: '22:00',
            end_time: '24:00'
          }
        ]
      }
    }
  },
  methods: {
    sliderCange(data) {
      console.log(data)
    }
  }
}
</script>
