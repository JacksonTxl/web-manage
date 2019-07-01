<template>
  <section class="sg-section">
    <h3>st-shop-hour-picker</h3>
    {{model}}
    <st-shop-hour-picker v-model="model" @change="onChange"></st-shop-hour-picker>
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
  methods: {
    onChange(data) {
      console.log('changed', data)
    }
  }
}
</script>
