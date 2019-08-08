<template>
  <div class="pages-test-store container-basis">
    <shop-hour-picker
      v-model="business_time"
      type="shop-hour-picker"
      @change="sliderCange"
    ></shop-hour-picker>
  </div>
</template>

<script>
import ShopHourPicker from '@/views/biz-components/shop-hour-picker/shop-hour-picker'
export default {
  components: {
    ShopHourPicker
  },
  data() {
    return {
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
  },
  created() {
    // this.tooltip()
  },
  methods: {
    sliderCange(data) {
      console.log(data)
    }
  }
}
</script>
