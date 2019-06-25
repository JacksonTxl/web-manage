<template>
  <st-panel app>
    <st-input-number :min="20" @change="kelc" :max="50"></st-input-number>
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
    kelc(e) {
      console.log(e)
    }
  }
}
</script>
