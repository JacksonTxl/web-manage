<template>
  <st-panel app>
    <st-input-number v-model="kael" :min="160" :max="500" @change="onClose"></st-input-number>
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
      // console.log(e)
    }
  }
}
</script>
