<template>
  <section class="sg-section">
    <h3>shop-hour-picker</h3>
    {{ model }}
    <shop-hour-picker
      :isInfo="false"
      v-model="model"
      @change="onChange"
    ></shop-hour-picker>
    <shop-hour-picker
      :isInfo="true"
      v-model="model"
      @change="onChange"
    ></shop-hour-picker>
  </section>
</template>

<script>
import ShopHourPicker from '@/views/biz-components/shop-hour-picker/shop-hour-picker'
export default {
  components: {
    ShopHourPicker
  },
  data() {
    return {
      model: [
        { week_day: 1, range: [], start_time: '00:00', end_time: '24:00' },
        { week_day: 2, range: [], start_time: '03:00', end_time: '06:00' },
        { week_day: 3, range: [], start_time: '06:00', end_time: '09:00' },
        { week_day: 4, range: [], start_time: '09:00', end_time: '12:00' },
        { week_day: 5, range: [], start_time: '12:00', end_time: '15:00' },
        { week_day: 6, range: [], start_time: '15:00', end_time: '18:00' },
        { week_day: 7, range: [], start_time: '18:00', end_time: '21:00' }
      ]
    }
  },
  methods: {
    onChange(data) {
      console.log('changed', data)
    }
  }
}
</script>
