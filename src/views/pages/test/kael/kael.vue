<template>
  <st-panel app>
    <div style="outline:1px solid #ccc">111</div>
    <st-coupon name="卡尔的券" @close="onClose"/>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      kael: 10
    }
  },
  methods: {
    onClose(e) {
      console.log(11111)
    }
  }
}
</script>
