<template>
  <st-modal v-model="show" title="导出失败原因">
    <st-alert>{{ reason }}</st-alert>
  </st-modal>
</template>

<script>
export default {
  props: {
    reason: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
