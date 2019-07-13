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
      model: []
    }
  },
  methods: {
    onChange(data) {
      console.log('changed', data)
    }
  }
}
</script>
