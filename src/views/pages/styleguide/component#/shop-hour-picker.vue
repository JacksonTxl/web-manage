<template>
  <section class="sg-section">
    <h3>st-shop-hour-picker</h3>
    {{model}}
    <st-shop-hour-picker :isInfo="false" v-model="model" @change="onChange"></st-shop-hour-picker>
    <!-- <st-shop-hour-picker :isInfo="true" v-model="model" @change="onChange"></st-shop-hour-picker> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: [
        {
          week_day: 1,
          start_time: '00:00',
          end_time: '03:00'
        },
        {
          week_day: 2,
          start_time: '03:00',
          end_time: '06:00'
        },
        {
          week_day: 3,
          start_time: '09:00',
          end_time: '12:00'
        },
        {
          week_day: 4,
          start_time: '15:00',
          end_time: '18:00'
        },
        {
          week_day: 5,
          start_time: '18:00',
          end_time: '21:00'
        }
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
