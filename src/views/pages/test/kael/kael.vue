<template>
  <st-panel app>
    <st-shop-hour-picker v-model="timeList"></st-shop-hour-picker>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      reason: ''
    }
  },
  methods: {
    onReasonChange(e) {
      console.log(3)
    }
  }
}
</script>
