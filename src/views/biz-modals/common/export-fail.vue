<template>
  <st-modal v-model="show" @ok="show = false" title="导出失败原因">
    {{ reason }}
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
