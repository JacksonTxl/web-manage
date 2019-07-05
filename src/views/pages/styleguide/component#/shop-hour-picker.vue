<template>
  <section class="sg-section">
    <h3>st-shop-hour-picker</h3>
    {{model}}
    <st-shop-hour-picker :isInfo="false" v-model="model" @change="onChange"></st-shop-hour-picker>
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
          end_time: '06:00'
        },
        {
          week_day: 2,
          start_time: '06:00',
          end_time: '12:00'
        },
        {
          week_day: 5,
          start_time: '12:00',
          end_time: '18:00'
        },
        {
          week_day: 6,
          start_time: '18:00',
          end_time: '24:00'
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
